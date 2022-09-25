let response;

exports.handler = async (event, handler) => {
    const userID = "595.080.896-84";
    var url = "https://challenge.hackathonbtg.com/customers/v1/personal/identifications"
    var organizationIds = []
    var data = ""
    var organizationInfoList = []
    var jsonData = []
    var axios = require('axios');

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
            url: url,
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


    response = {
        'statusCode': 200,
        'body': JSON.stringify(organizationInfoList)
    }

    return response

}