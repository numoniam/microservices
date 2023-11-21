const {validatePermission}=require("../use-cases")

const makeValidateMiddleware=require("./validate-middleware")
const validateMiddlewar=makeValidateMiddleware({validatePermission})

module.exports={validateMiddlewar}