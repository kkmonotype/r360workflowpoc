const {
    Cohort,
    Employee,
    PSD,
    mySqlORM
} = require('../db');
const SqsService = require('../scheduler/sqsService');
const { Op } = require('sequelize');

function TicketRepository() { }

TicketRepository.prototype.createTicket = async function (psdInput) {
    const {
        SF_Ticket_ID,
        PSD_Number,
        PSD_Source,
        ticketType,
        Ticket_Priority,
        ACCOUNT_ID_FK,
        Account_Name,
        Cohort_FK,
        cohortLead,
        ETC,
        ETS
    } = psdInput;

    return await PSD.create(
        {
            SF_Ticket_ID: SF_Ticket_ID,
            PSD_Number: PSD_Number,
            PSD_Source: PSD_Source,
            ticketType: ticketType,
            Ticket_Priority: Ticket_Priority,
            ACCOUNT_ID_FK: ACCOUNT_ID_FK,
            Account_Name: Account_Name,
            Cohort_FK: Cohort_FK,
            Employee_FK: cohortLead,
            ETC: ETC,
            ETS: ETS
        }
    );
}

TicketRepository.prototype.getTicketDetails = async function (R360_PSD_ID) {
    const instances = await PSD.findAll({ where: { R360_PSD_ID } });
    return instances ? instances.map(instance => instance.toJSON()) : [];
}

TicketRepository.prototype.getTickets = async function (status = '') {

    console.log('status', status);
    if ('' !== status) {
        const instances = await PSD.findAll(
            {
                where: { Ticket_Status: status },
                order: [
                    ['R360_PSD_ID', 'DESC'],
                ]
            });
        return instances ? instances.map(instance => instance.toJSON()) : [];
    } else {
        const instances = await PSD.findAll(
            {
                order: [
                    ['R360_PSD_ID', 'DESC'],
                ]
            }
        );
        return instances ? instances.map(instance => instance.toJSON()) : [];
    }
}

TicketRepository.prototype.getCohortLead = async function (Cohort_FK) {
    try {
        const [results] = await mySqlORM.query(
            "SELECT DISTINCT manager.Manager_Id AS manager_id FROM EMPLOYEE AS employee JOIN EMPLOYEE AS manager ON employee.Employee_ID = manager.Employee_ID WHERE employee.Cohort_FK = '4312X000025CT9eGRT'"
        );

        if (results && results.length > 0) {
            return results[0].manager_id
        }
    } catch (error) {
        console.error('Error executing Sequelize query:', error);
        throw error;
    }
}

TicketRepository.prototype.updateTicket = async function (psdInput) {
    const {
        Ticket_Status,
        Employee_FK,
        R360_PSD_ID,
        Ticket_Role = 'Researcher'
    } = psdInput;

    const psdDetails = await this.getPSDDetails(R360_PSD_ID);

    if ('' !== Ticket_Status) {
        if ('open' === Ticket_Status) {
            await PSD.update(
                { Ticket_Role: Ticket_Role, Ticket_Status: 'open' },
                { where: { R360_PSD_ID: R360_PSD_ID } }
            );
        }

        if ('' !== Employee_FK) {
            await PSD.update({ Ticket_Status: Ticket_Status, Employee_FK: Employee_FK }, {
                where: {
                    R360_PSD_ID: R360_PSD_ID
                }
            });
        }

        //Get psd details
        const callbackQueue = "https://sqs.us-east-1.amazonaws.com/450512176569/R360CallbackQueue.fifo";

        // Send message to callback queue
        const send_result = await SqsService.sendMessage(JSON.stringify({
            taskToken: psdDetails[0].Workflow_Token,
            R360_PSD_ID: R360_PSD_ID,
            status: 'approved',
            escalation: false,
        }), callbackQueue);

        if (send_result) {
            console.log("Message sent successfully");
        }
    } else {
        await PSD.update({ Ticket_Status: Ticket_Status, Ticket_Role: Ticket_Role, Employee_FK: Employee_FK }, {
            where: {
                R360_PSD_ID: R360_PSD_ID
            }
        });
    }

    return {};
}


TicketRepository.prototype.updateTicketStatus = async function (R360_PSD_ID, Ticket_Status) {
    await PSD.update(
        { Ticket_Status: Ticket_Status },
        { where: { R360_PSD_ID: R360_PSD_ID } }
    );
    return {};
}

TicketRepository.prototype.getListOfEscalatedTickets = async function () {
    const instances = await PSD.findAll({ where: { Ticket_Status: 'in-progress', 
    ETC: {
        [Op.lt]: new Date(),
      },

} });

    return instances ? instances.map(instance => instance.toJSON()) : [];
}

module.exports = new TicketRepository();

