exports.handler = async (event) => {
    var color = event.queryStringParameters.color
    var userID = event.queryStringParameters.customerId
    var landID = event.queryStringParameters.land
    var organizationIds = []
    var jsonData = []
    var axios = require('axios');
    var organizationInfoList = []

    var config = {
        method: 'get',
        url: 'https://squad-12-lepoli.s3.sa-east-1.amazonaws.com/mock-cliente-com-sua-instituicao-financeira.json',
        headers: { }
    };

    await axios(config)
        .then(function (response) {
            jsonData = response.data
        })
        .catch(function (error) {
            console.log(error);
        });

    for (var index = 0; index < jsonData.length; index++){
        if(jsonData[index].customerId == userID){
            organizationIds.push(jsonData[index].organizationId)
        }
    }

    for (var index = 0; index < organizationIds.length; index++) {

        var config = {
            method: 'get',
            url: 'https://challenge.hackathonbtg.com/customers/v1/personal/identifications',
            headers: {
                'organizationid': organizationIds[index],
                'customerid': userID
            }
        };

        await axios(config)
            .then(function (response) {
                data = response.data
            })
            .catch(function (error) {
                throw error;
            });

    }

    if (data.data[0].customerId === userID){
        let organizationInfo = {
            organizationID: data.data[0].organizationId,
            organizationName: data.data[0].brandName,
        }
        organizationInfoList.push(organizationInfo)
    }

    var organizationID = organizationIds[0]
    var organizationName = organizationInfoList[0].organizationName


    const { Client } = require('pg');
    const client = new Client({
        user: "postgres",
        host: "lepoli-metaverse-postgresql.cvpksv55zfzp.us-east-1.rds.amazonaws.com",
        database: "postgres",
        password: "123456789",
        port: 5432
    });

    await client.connect();
    const query1 = 'INSERT INTO buildings (color, landID, organizationID, organizationname) VALUES ('+color+','+landID+",'"+organizationID+"','"+organizationName+"');"
    await client.query(query1)
    const query2 = "SELECT id from buildings where organizationID ='"+organizationID+"';"
    var buildingIDArray = await client.query(query2)
    var buildingID = buildingIDArray.rows[0].id
    const query3 = "INSERT INTO userBuildings (userid, buildingid) VALUES ('"+userID+"',"+buildingID+");"
    await client.query(query3)

    await client.end()

};


