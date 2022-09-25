exports.handler = async (event) => {
    var userID = event.queryStringParameters.customerId
    var newCoins = event.queryStringParameters.coins

    const { Client } = require('pg');
    const client = new Client({
        user: "postgres",
        host: "lepoli-metaverse-postgresql.cvpksv55zfzp.us-east-1.rds.amazonaws.com",
        database: "postgres",
        password: "123456789",
        port: 5432
    });

    await client.connect();
    const query1 = "SELECT coins from users where id = '"+userID+"';"
    var response1 = await client.query(query1)
    var actualCoins = response1.rows[0].coins
    var totalCoins = actualCoins + newCoins
    const query2 = "UPDATE Users SET coins = "+totalCoins+" WHERE id = '"+userID+"';"
    await client.query(query2)

    await client.end()

    return

};