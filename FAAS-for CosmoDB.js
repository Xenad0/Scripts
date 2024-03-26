const { CosmosClient } = require("@azure/cosmos");

const endpoint = "<your_endpoint_uri>";
const key = "<your_primary_key>";
const client = new CosmosClient({ endpoint, key });

const databaseId = "<your_database_id>";
const containerId = "<your_container_id>";

module.exports = async function (context, myTimer) {
    const timeStamp = new Date().toISOString();

    if (myTimer.isPastDue) {
        context.log('JavaScript is running late!');
    }
    context.log('JavaScript timer trigger function ran!', timeStamp);   

    const database = client.database(databaseId);
    const container = database.container(containerId);

    const itemBody = { id: "1", name: "Azure Function Item" };
    const { resource: createdItem } = await container.items.create(itemBody);

    context.log(`Item created with id: ${createdItem.id}`);
};