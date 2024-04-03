
const { app } = require('@azure/functions');
const { CosmosClient } = require("@azure/cosmos");

const endpoint = "https://dbcosmoscampus.documents.azure.com:443";
const key = "KEY";
const client = new CosmosClient({ endpoint, key });

const databaseId = "DemoDatabase";
const containerId = "DemoContainer1";

app.http('deleteItem', {
    methods: ['DELETE'],
    authLevel: 'anonymous',
    route: 'items/{id}',
    handler: async (request) => {
        const database = client.database(databaseId);
        const container = database.container(containerId);

        const itemId = request.params.id; // The id of the item you want to delete
        const { resource: deletedItem } = await container.item(itemId, itemId).delete();
    }
});