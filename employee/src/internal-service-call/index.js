const axios=require('axios')
const serviceEndpoints=require("../config/service-endpoints")

const makeGetCompanyId=require('./get-company-id')
const getCompanyId=makeGetCompanyId({axios,serviceEndpoints})

const makeGetCompanyDetail=require('./get-company-detail')
const getCompanyDetail=makeGetCompanyDetail({axios,serviceEndpoints})

module.exports={
    getCompanyId,
    getCompanyDetail
}