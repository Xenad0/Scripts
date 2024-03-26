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

    const itemId = "1"; // The id of the item you want to delete
    const { resource: deletedItem } = await container.item(itemId).delete();

    context.log(`Item deleted with id: ${deletedItem.id}`);
};