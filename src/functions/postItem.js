const { app,output } = require('@azure/functions');

const cosmosOutput = output.cosmosDB({
    databaseName: 'DemoDatabase',
    containerName: 'DemoContainer1',
    connection: 'CosmosDB',
    createIfNotExists: true
});

app.http('postItem', {
    methods: ['POST'],
    authLevel: 'anonymous',
    extraOutputs: [cosmosOutput],
    route: 'items',
    handler: async (request, context) => {
        const data = await request.json();
        data.id = (Math.random() + 1).toString(36);
        context.extraOutputs.set(cosmosOutput, data);
        return {
            body: JSON.stringify(data),
            status: 201
        }
    }
});
