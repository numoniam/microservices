module.exports = function makeConsumerHandler({
  deleteEmployeeById,
  deleteRoleById,
  Kafka,
  Joi,
}) {
  return async function consumerHandler() {
    try {
      const topicName = "microservices";
      const companyId = await createConsumer({ topicName });
      validateInput({ companyId });
      //delete employee by compnayId
      await deleteEmployeeById({ id: companyId });
      //delete role by compnayId
      await deleteRoleById({ id: companyId });
      //permission automatically deleted because i take referance from employee and role and add onDelete:cascade with the employeeID and roleId
    } catch (err) {
      throw err;
    }
  };

  async function createConsumer({ topicName }) {
    return new Promise(async function (resolve, reject) {
      try {
        const kafka = new Kafka({
          clientId: "employee-microservice",
          brokers: ["localhost:9092"],
        });

        const consumer = kafka.consumer({ groupId: "employee" });

        await consumer.connect();

        await consumer.subscribe({ topic: topicName });

        await consumer.run({
          eachMessage: ({ topic, partition, message }) => {
            const { companyId } = JSON.parse(message.value.toString());
            consumer.stop();
            resolve(companyId);
          },
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  function validateInput({ companyId }) {
    const schema = Joi.object({
      companyId: Joi.string().guid().required(),
    });
    const { error } = schema.validate({ companyId });
    if (error) {
      throw error.details[0];
    }
  }
};
