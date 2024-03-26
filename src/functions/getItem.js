const { app,input } = require('@azure/functions');

const cosmosInput = input.cosmosDB({
    databaseName: 'DemoDatabase',
    containerName: 'DemoContainer1',
    connection: 'CosmosDB',
    sqlQuery: 'select * from c where c.id = {id}'
});

app.http('getItem', {
    methods: ['GET'],
    authLevel: 'anonymous',
    extraInputs: [cosmosInput],
    route: 'items/{id}',
    handler: async (request, context) => {
        const item = context.extraInputs.get(cosmosInput);
        console.log("..........................", item)
            return {
                body: JSON.stringify(item),
            };
    }

});
