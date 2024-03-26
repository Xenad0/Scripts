const { app,output } = require('@azure/functions');

const cosmosOutput = output.cosmosDB({
    databaseName: 'DemoDatabase',
    containerName: 'DemoContainer1',
    connection: 'CosmosDB',
    createIfNotExists: true
});

app.http('deleteItem', {
    methods: ['DELETE'],
    authLevel: 'anonymous',
    extraOutputs: [cosmosOutput],
    route: 'items',
    handler: async (request, context) => {
        const data = await request.json();
        context.extraOutputs.set(cosmosOutput, data);
        return {
            body: JSON.stringify(data),
            status: 201
        }
    }
});
