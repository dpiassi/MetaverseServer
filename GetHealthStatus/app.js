const axios = require('axios')
//let data;
//let status;

exports.lambdaHandler = async (event, context) => {
    const customerId = event.queryStringParameters.customerId;
    let organizationId = await getOrgId(customerId)

    const response = await generateScore(organizationId, customerId)

    return response
};

//return the id of the organization
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
            console.log('============= getOrgId =============')
            console.log(error);
        });

    for (var index = 0; index < jsonData.length; index++){
        if(jsonData[index].customerId == userID){
            organizationIds.push(jsonData[index].organizationId)
        }
    }

    return organizationIds
}

//return an accountId
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
        console.log('============= getAccountId =============')
        console.log(error)
        accountData = ''
    })

    return accountData[0].accountId
}

//return account limits and usage
async function getAccountLimit(organizationId, customerId, accountId){
    const limitURL = `https://challenge.hackathonbtg.com/accounts/v1/accounts/${accountId}/overdraft-limits`;

    const config = {
        headers:{
            'organizationid': organizationId,
            'customerid': customerId
        }
    };
    let limitData

    await axios.get(limitURL, config).then(res => {
        limitData = res.data.data
    }).catch(error => {
        console.log('============= getAccountLimit =============')
        console.log(error)
        limitData = ""
    })

    return limitData
}

//return an array of loans warranties
async function getLoanWarranties(organizationId, customerId){
    const loanURL = `https://challenge.hackathonbtg.com/loans/v1/contracts`;

    const config = {
        headers:{
            'organizationid': organizationId,
            'customerid': customerId
        }
    };
    let loansData

    await axios.get(loanURL, config).then(res => {
        loansData = res.data.data
    }).catch(error => {
        console.log('============= getLoanWarranties - 1 =============')
        console.log(error)
        loansData = ''
    })

    let loansWarranties = new Array()

    if (loansData != 0 && loansData != null){

        for (var i = 0; i < loansData.length; i++) {

            const contractId = loansData[i].contractId
            const loanWarrantieURL = `https://challenge.hackathonbtg.com/loans/v1/contracts/${contractId}/warranties`
            let loanWarrantieData

            await axios.get(loanWarrantieURL, config).then(res => {
                loanWarrantieData = res.data.data
            }).catch(error => {
                console.log('============= getLoanWarranties - 2 =============')
                console.log(error)
                loanWarrantieData = ''
            })

            if (loanWarrantieData != '' && loanWarrantieData != null) {
                const amount = parseFloat(loanWarrantieData[0].warrantyAmount)
                loansWarranties.push(amount)
            }
        }
    }

    return loansWarranties
}

//return an array of loans warranties
async function getFinancingsWarranties(organizationId, customerId){
    const financingURL = 'https://challenge.hackathonbtg.com/financings/v1/contracts'
    const config = {
        headers:{
            'organizationid': organizationId,
            'customerid': customerId
        }
    };
    let financingsData

    await axios.get(financingURL, config).then(res => {
        financingsData = res.data.data
    }).catch(error => {
        console.log('============= getFinancingsWarranties - 1 =============')
        console.log(error)
        financingsData = ''
    })

    let financingsWarranties = new Array()

    if (financingsData != 0 && financingsData != null){

        for (var i = 0; i < financingsData.length; i++) {

            const contractId = financingsData[i].contractId
            const financingWarrantieURL = `https://challenge.hackathonbtg.com/financings/v1/contracts/${contractId}/warranties`
            let financingWarrantieData

            await axios.get(financingWarrantieURL, config).then(res => {
                financingWarrantieData = res.data.data
            }).catch(error => {
                console.log('============= getFinancingsWarranties - 2 =============')
                console.log(error)
                financingWarrantieData = ''
            })

            if (financingWarrantieData != '' && financingWarrantieData != null) {
                const amount = parseFloat(financingWarrantieData[0].warrantyAmount)
                financingsWarranties.push(amount)
            }
        }
    }

    return financingsWarranties


}

//return the generated score to health status
async function generateScore(organizationId, customerId){

    let score = 0
    const accountId = await getAccountId(organizationId[0], customerId)
    const accountLimit = await getAccountLimit(organizationId[0], customerId, accountId)

    const contracted = parseInt(accountLimit.overdraftContractedLimit) + 1
    const used = parseInt(accountLimit.overdraftUsedLimit) + 1
    const unarranged = parseInt(accountLimit.unarrangedOverdraftAmount) + 1
    score += ((contracted / used) - (contracted / unarranged)) * 50

    const loansWarranties = await getLoanWarranties(organizationId[0], customerId)

    const financingsWarranties = await getFinancingsWarranties(organizationId[0], customerId)

    let loansWarrantiesAmount =0
    for (var i = 0; i < loansWarranties.length; i++) {
        loansWarrantiesAmount += loansWarranties[i]
    }

    let financingsWarrantiesAmount =0
    for (var i = 0; i < financingsWarranties.length; i++) {
        financingsWarrantiesAmount += financingsWarranties[i]
    }

    let loans = loansWarranties.length
    let financings = financingsWarranties.length

    if (loans > 5) loans = 5
    if (financings > 5) financings = 5

    score += loans * 5
    score += financings * 5

    console.log(score)

    return {
        'score' : score,
        'loansWarrantiesAmount' : loansWarrantiesAmount,
        'financingsWarrantiesAmount' : financingsWarrantiesAmount,
        'unusedLimit' : contracted - used
    }

}