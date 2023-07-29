const {
    Cohort,
    Employee,
    PSD,
    mySqlORM
} = require('../db');
const SqsService = require('../scheduler/sqsService');

function PSDRepository() { }

PSDRepository.prototype.createPSD = async function (psdInput) {
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

PSDRepository.prototype.getPSDDetails = async function (R360_PSD_ID) {
    const instances = await PSD.findAll({ where: { R360_PSD_ID } });
    return instances ? instances.map(instance => instance.toJSON()) : [];
}

PSDRepository.prototype.getCohortLead = async function (Cohort_FK) {
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

PSDRepository.prototype.updatePSD = async function (psdInput) {
    const {
        Ticket_Status,
        Ticket_Role,
        Employee_FK,
        R360_PSD_ID
    } = psdInput;

    // Line manager needs to approve the task
    if ('' !== Ticket_Role) {
        await PSD.update(
            { Ticket_Role: Ticket_Role },
            { where: { R360_PSD_ID: R360_PSD_ID } }
        );

        await PSD.update(
            { Ticket_Role: Ticket_Role },
            { where: { R360_PSD_ID: R360_PSD_ID } }
        );

        //Get psd details
        const psdDetails = await this.getPSDDetails(R360_PSD_ID);
        const callbackQueue = "https://sqs.us-east-1.amazonaws.com/450512176569/R360CallbackQueue.fifo";

        // Send message to callback queue
        const send_result = await SqsService.sendMessage(JSON.stringify({
            taskToken: psdDetails[0].Workflow_Token,
            R360_PSD_ID: R360_PSD_ID,
            status: 'approved',
        }), callbackQueue);

        if (send_result) {
            console.log("Message sent successfully");
        }
    }

    if ('' !== Ticket_Status) {
        await PSD.update({ Ticket_Status: Ticket_Status }, {
            where: {
                R360_PSD_ID: R360_PSD_ID
            }
        });
    }


    if ('' !== Employee_FK) {
        await PSD.update({ Employee_FK: Employee_FK }, {
            where: {
                R360_PSD_ID: R360_PSD_ID
            }
        });
    }

    // else {
    //     await TaskAllocationPlan.update({ status: status, employee_id: auditor_id }, {
    //         where: {
    //             task_allocation_plan_id: task_allocation_plan_id
    //         }
    //     });
    // }

    return {};
}

module.exports = new PSDRepository();

