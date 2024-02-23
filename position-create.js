
const axios = require('axios');


function generateBasicAuthHeader(username, password) {
    return 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
}

async function createposition(inputrequest) {
    
    const authHeader = generateBasicAuthHeader('SravyasriV@SFPART050640', 'Pragati@98');
    const positionSapData = PreparePositionSAPdata(inputrequest[0]);
    try {
        const apiresponse = await axios.post('https://apisalesdemo8.successfactors.com/odata/v2/Position', positionSapData, {
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json'
            }
        });
        const succresp = {
            data: JSON.stringify(apiresponse.data),
            success: true
        }
        return outputapisuccresp;
    }
    catch (error) {
        const errrdl = {
            code: error.response.data.error.code,
            message: error.response.data.error.message.value
        }
        const errresp = {
            success: false,
            errordetails: errrdl
        }
        return errresp;
    }
}


function PreparePositionSAPdata(positioninpdata) {
    const positionSapData = {} ;
        Object.keys(positioninpdata).forEach(
            key => {
                if (key !== 'Action') {
                    positionSapData[key] = positioninpdata[key];
                }
            })
    return positionSapData;
}

module.exports = { createposition };
