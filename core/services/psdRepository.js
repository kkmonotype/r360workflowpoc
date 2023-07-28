const {
    Cohort,
    Employee,
    PSD,
    mySqlORM
} = require('../db');

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

    console.log('cohortLead', cohortLead);

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

module.exports = new PSDRepository();

