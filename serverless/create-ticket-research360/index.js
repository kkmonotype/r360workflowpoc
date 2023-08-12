const axios = require("axios");

exports.handler = async (event, context) => {
  try {
    // Replace with your EC2 instance's private IP address and port
    const ec2InstanceIp = "ec2-44-202-213-131.compute-1.amazonaws.com";
    const ec2InstancePort = "4000";

    const url = `http://${ec2InstanceIp}:${ec2InstancePort}/api/tickets/research`; // Replace with your API endpoint URL
    const data = {
      SF_Ticket_ID: event.Id,
      Ticket_Priority: event.Priority__c,
      PSD_Number: event.Name,
      Account_ID: event.Account_Presales__c,
      Ticket_Status: event.Presales_Status__c,
      Call_Scheduled: event.Is_there_a_call_scheduled__c,
      Call_Scheduled_Date: event.When_is_the_next_call_scheduled__c,
      Sales_Rep: event.Sales_Rep__c,
      Opportunity_ID: event.Opportunity_PreSales__c,
      Sales_Comments: event.Sales_Comments_to_Research_Team__c,
      Researcher_ID: event["Account_Research_Rep__c.Name"],
      Ticket_Type: event.Record_type_Name__c,
      Apps_Research_Review: event.Mobile_Apps_Review__c,
      Websites_Research_Review: event.Websites_Review__c,
      DigiAds_Research_Review: event.Digital_Ads_Review__c,
      ePubs_Research_Review: event.ePubs_Review__c,
      Webserver_Research_Review: event.Web_Server_Review__c,
      Opportunity_Name: event["Opportunity_PreSales__c.Name"],
      Opportunity_Close_Date: event.Opportunity_Close_Date__c,
    };

    const response = await axios.post(url, data);

    return {
      statusCode: response.status,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
