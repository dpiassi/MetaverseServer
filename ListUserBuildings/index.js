exports.handler = async (event) => {
    var userID = event.queryStringParameters.customerId
    var buildingsInfo = []

    const { Client } = require('pg');
    const client = new Client({
        user: "postgres",
        host: "lepoli-metaverse-postgresql.cvpksv55zfzp.us-east-1.rds.amazonaws.com",
        database: "postgres",
        password: "123456789",
        port: 5432
    });

    await client.connect();
    const query1 = "select buildingid from userbuildings where userid = '"+userID+"';"
    var response1 = await client.query(query1)
    var buildingID = response1.rows

    for(let index=0; index < buildingID.length; index++){

        const query2 = "select * from buildings where id ="+buildingID[index].buildingid+";"
        var response2 = await client.query(query2)
        buildingsInfo.push(response2.rows)
    }

    await client.end()

    return buildingsInfo


};
