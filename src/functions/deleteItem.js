
const { app } = require('@azure/functions');
const { CosmosClient } = require("@azure/cosmos");

const endpoint = "https://dbcosmoscampus.documents.azure.com:443";
const key = "blabla";
const client = new CosmosClient({ endpoint, key });

const databaseId = "DemoDatabase";
const containerId = "DemoContainer1";

app.http('deleteItem', {
    methods: ['DELETE'],
    authLevel: 'anonymous',
    route: 'items/{id}',
    handler: async (myTimer, context) => {
        const timeStamp = new Date().toISOString();

        if (myTimer.isPastDue) {
            context.log('JavaScript is running late!');
        }
        context.log('JavaScript timer trigger function ran!', timeStamp);   

        const database = client.database(databaseId);
        const container = database.container(containerId);

        const itemId = context.options.trigger.route; // The id of the item you want to delete
        const { resource: deletedItem } = await container.item(itemId, itemId).delete();
    }
});