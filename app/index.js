const { MessageActions } = require("./utils/constants");
const { printService } = require("./service/printService");
const { storeService } = require("./service/storeService");

const SQSEventHandler = async (event, _context, callback) => {
    try {
        console.log("Event", event);

        const receivedMessage = JSON.parse(event.Records[0].messageAttributes.data.stringValue);

        console.log("Message Received From SQS", receivedMessage);

        const { messageValue = null, messageAction = null } = receivedMessage;

        if(!messageValue)
            return callback("messageValue cannot be empty.");

        switch (messageAction) {
            case MessageActions.PRINT:
                printService(messageValue);
                break;

            case MessageActions.STORE:
                await storeService(messageValue);
                break;

            default:
                break;
        }

        return callback(null, "Message successfully processed.");

    } catch (err) {
        console.log("Unexpected error occurred.", err);
        return callback("Could not process message.");
    }


}

/**
 * Sample event and message format
 * const sampleRequest = {
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

* SQSEventHandler(sampleRequest, null, (err, data) => {
    console.log(err);
    console.log(data)
  })
 */

module.exports.SQSEventHandler = SQSEventHandler;