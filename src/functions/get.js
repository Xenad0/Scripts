const { app } = require('@azure/functions');

const cosmosInput = input.cosmosDB({
    databaseName: 'DemoDatabase',
    collectionName: 'DemoContainer1',
    partitionKey: 'id',
    connectionStringSetting: 'CosmosDbConnectionString',
});

app.http('get', {
    methods: ['GET'],
    authLevel: 'anonymous',
    extraInputs: [cosmosInput],
    handler: async (request, context) => {
        const items = context.extraInputs.get(cosmosInput);
            return {
                body: items,
            };
    }
});
