const { SQSEventHandler } = require("../app");

describe("SQS Event Handler Test Cases", () => {
    test("[POSITIVE] Should return success message for PRINT", () => {
        const mockCallback = jest.fn();
        const messageRequest = {
            Records: [{
                messageAttributes: {
                    data: {
                        stringValue: JSON.stringify({ messageAction: "PRINT", messageValue: "Process message 1" })
                    }
                }
            }]
        };

        SQSEventHandler(messageRequest, null, mockCallback);

        // Assert that callBack has been called once
        expect(mockCallback.mock.calls.length).toBe(1);

        // Assert that callback has err argument equal to null
        expect(mockCallback.mock.calls[0][0]).toEqual(null)

        // Assert that callback is called with success data
        expect(mockCallback.mock.calls[0][1]).toEqual("Message successfully processed.")

    });

    test("[POSITIVE] Should return success message for STORE", async () => {
        const mockCallback = jest.fn();
        const messageRequest = {
            Records: [{
                messageAttributes: {
                    data: {
                        stringValue: JSON.stringify({ messageAction: "STORE", messageValue: "Process message 2" })
                    }
                }
            }]
        };

        await SQSEventHandler(messageRequest, null, mockCallback);

        // Assert that callBack has been called once
        expect(mockCallback.mock.calls.length).toBe(1);

        // Assert that callback has err argument equal to null
        expect(mockCallback.mock.calls[0][0]).toEqual(null)

        // Assert that callback is called with success data
        expect(mockCallback.mock.calls[0][1]).toEqual("Message successfully processed.")
    });

    test("[POSITIVE] Should return success message for no messageAction", () => {
        const mockCallback = jest.fn();
        const messageRequest = {
            Records: [{
                messageAttributes: {
                    data: {
                        stringValue: JSON.stringify({ messageValue: "Process message 3" })
                    }
                }
            }]
        };

        SQSEventHandler(messageRequest, null, mockCallback);

        // Assert that callBack has been called once
        expect(mockCallback.mock.calls.length).toBe(1);

        // Assert that callback has err argument equal to null
        expect(mockCallback.mock.calls[0][0]).toEqual(null)

        // Assert that callback is called with success data
        expect(mockCallback.mock.calls[0][1]).toEqual("Message successfully processed.")
    });

    test("[NEGATIVE] Should return error empty messageValue", () => {
        const mockCallback = jest.fn();
        const messageRequest = {
            Records: [{
                messageAttributes: {
                    data: {
                        stringValue: JSON.stringify("")
                    }
                }
            }]
        };

        SQSEventHandler(messageRequest, null, mockCallback);

        // Assert that callBack has been called once
        expect(mockCallback.mock.calls.length).toBe(1);

        // Assert that callback has been called with an error
        expect(mockCallback.mock.calls[0][0]).toEqual("messageValue cannot be empty.")
    });

    test("[NEGATIVE] Should return error for invalid JSON in message", () => {
        const mockCallback = jest.fn();
        const messageRequest = {
            Records: [{
                messageAttributes: {
                    data: {
                        stringValue: "Invalid JSON"
                    }
                }
            }]
        };

        SQSEventHandler(messageRequest, null, mockCallback);

        // Assert that callBack has been called once
        expect(mockCallback.mock.calls.length).toBe(1);

        // Assert that callback has been called with an error
        expect(mockCallback.mock.calls[0][0]).toEqual("Could not process message.")
    });
})