SQS Event Handler App
Setup: run npm install

To run test cases: run npm run test

SQS Event Handler: An event handler lambda function that is triggered by an SQS event.

Sample Event:
{
    Records: [
      {
        messageAttributes: {
          data: {
            stringValue: JSON.stringify({messageAction: "PRINT", messageValue: "Amarnath"})
          }
        }
      }
    ]
}