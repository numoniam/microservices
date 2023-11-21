const { Kafka } = require("kafkajs");
const Joi=require('@hapi/joi')
const { deleteEmployeeById, deleteRoleById } = require("../use-cases");

const makeConsumerHandler = require("./consumer-handler");
const consumerHandler = makeConsumerHandler({
  deleteEmployeeById,
  deleteRoleById,
  Kafka,
  Joi,
});


module.exports={consumerHandler}