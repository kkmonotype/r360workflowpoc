const {
  SQSClient,
  ReceiveMessageCommand,
  DeleteMessageCommand,
  SendMessageCommand,
} = require('@aws-sdk/client-sqs')
const { configobject } = require('../credentials')
const sqsClient = new SQSClient(configobject)

function SQSService() {}

SQSService.prototype.deleteMessage = async (receiptHandle, queueURL) => {
  try {
    return await sqsClient.send(
      new DeleteMessageCommand({
        QueueUrl: queueURL,
        ReceiptHandle: receiptHandle,
      })
    )
  } catch (e) {
    console.error('Failed to delete message from SQS =>', e)
  }
}

SQSService.prototype.sendMessage = async (messageBody, queueURL) => {
  try {
    return await sqsClient.send(
      new SendMessageCommand({
        QueueUrl: queueURL,
        MessageBody: messageBody,
        MessageGroupId: 'my-message-group',
      })
    )
  } catch (e) {
    console.error('Failed to send message to SQS =>', e)
  }
}

SQSService.prototype.pullMessage = async (queueUrl, MessageAttributes) => {
  try {
    const command = new ReceiveMessageCommand({
      MaxNumberOfMessages: 10,
      QueueUrl: queueUrl,
      WaitTimeSeconds: 5,
      MessageAttributes: MessageAttributes,
    })

    return await sqsClient.send(command)
  } catch (e) {
    console.error('Failed to receive message from SQS =>', e)
  }
}

module.exports = new SQSService()
