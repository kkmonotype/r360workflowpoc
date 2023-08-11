const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    // Replace with your EC2 instance's private IP address and port
    const ec2InstanceIp = 'ec2-44-202-213-131.compute-1.amazonaws.com';
    const ec2InstancePort = '4000';

    const response = await axios.get(`http://${ec2InstanceIp}:${ec2InstancePort}/api/psds`);

    return {
      statusCode: response.status,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' })
    };
  }
};
