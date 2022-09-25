exports.handler = async (event) => {
    var userID = event.queryStringParameters.customerId
    var newXP = event.queryStringParameters.xp

    const { Client } = require('pg');
    const client = new Client({
        user: "postgres",
        host: "lepoli-metaverse-postgresql.cvpksv55zfzp.us-east-1.rds.amazonaws.com",
        database: "postgres",
        password: "123456789",
        port: 5432
    });

    await client.connect();

    const query1 = "SELECT xp from users where id = '"+userID+"';"
    var response1 = await client.query(query1)
    var actualXp = response1.rows[0].xp

    const query2 = "SELECT level from users where id = '"+userID+"';"
    var response2 = await client.query(query2)
    var actualLevel = response2.rows[0].level

    var totalXp = actualXp + newXP

    if(totalXp>=100){
        totalXp = totalXp - 100
        actualLevel += 1
        const query3 = "UPDATE Users SET xp = "+totalXp+" WHERE id = '"+userID+"';"
        await client.query(query3)
        const query4 = "UPDATE Users SET level = "+actualLevel+" WHERE id = '"+userID+"';"
        await client.query(query4)
    } else {
        const query5 = "UPDATE Users SET xp = "+totalXp+" WHERE id = '"+userID+"';"
        await client.query(query5)
    }

    return

};