const axios = require('axios')
let url = 'https://challenge.hackathonbtg.com/customers/v1/personal/qualifications';
let config = {
  headers:{
    'organizationid': '69665991-da55-4aac-a1f2-32d23daba8fe',
    'customerid': '595.080.896-84'
  }
};

let response;
let data;
let status;

exports.lambdaHandler = async (event, context) => {
    await axios.get(url, config).then(res => {
        status = res.status
        data = res.data
    }).catch(error => {
        console.log(error)
        status = 500;
        data = "";
    })

    return response = {
      'statusCode': status,
      'body': data.data
    }
};