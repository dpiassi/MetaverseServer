const axios = require('axios')
let data
let status

exports.lambdaHandler = async (event, context) => {
    const customerId = event.queryStringParameters.customerId;

    const accountBalances = await getAccountsBalance(customerId)

    return {
        'totalBalanceBetweenAccounts': accountBalances
    }
};

async function getOrgId(userID){
    let jsonData
    let organizationIds = new Array()
    let config = {
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

    return organizationIds
}

async function getAccountId(organizationId, customerId){
    const accountURL = 'https://challenge.hackathonbtg.com/accounts/v1/accounts'
    const config = {
        headers:{
            'organizationid': organizationId,
            'customerid': customerId
        }
    };
    let accountData

    await axios.get(accountURL, config).then(res => {
        accountData = res.data.data
    }).catch(error => {
        console.log(error)
        accountData = ''
    })

    return accountData[0].accountId
}

async function getAccountsBalance(customerId){

    const orgIds = await getOrgId(customerId)

    let accountBalances = 0
    for (var i = 0; i < orgIds.length; i++) {
        const url = 'https://challenge.hackathonbtg.com/customers/v1/personal/qualifications'
        let config = {
            headers:{
                'organizationid': orgIds[i],
                'customerid': customerId
            }
        };

        let otherAccounts
        await axios.get(url, config).then(res => {
            otherAccounts = res.data.data
        }).catch(error => {
                console.log(error)
                otherAccounts = "";
            }
        )
        const patrimony = parseFloat(otherAccounts.informedPatrimony.amount)
        accountBalances += patrimony
    }

    return accountBalances
}