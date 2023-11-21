module.exports = function makeDeleteCompany({ companyDb, Kafka, Joi }) {
  return async function deleteCompany({ id }) {
    try {
      const value = validateInput({ id });

      //check if data available
      const result = await companyDb.isCompanyExistById({ id: value.id });

      if (!result) {
        throw new Error("Company Data dose note exist");
      }

      //delete
      await companyDb.deleteCompany({ id: value.id });

      //producer call
      const topic = "microservices";
      await produceData({ topic, companyId: value.id });
      return "company data deleted successfully";
    } catch (err) {
      throw err.message;
    }
  };

  function validateInput({ id }) {
    const schema = Joi.object({
      id: Joi.string().trim().guid().required(),
    });
    const { error, value } = schema.validate({ id });
    if (error) {
      throw error.details[0];
    }
    return value;
  }

  //produce companyId function
  async function produceData({ topic, companyId }) {
    try {
      const kafka = new Kafka({
        clientId: "company-microservice",
        brokers: ["localhost:9092"],
      });

      const producer = kafka.producer();

      await producer.connect();

      //companyId object
      const message = {
        companyId,
      };
      await producer.send({
        topic: topic,
        messages: [{ value: JSON.stringify(message) }],
      });
      console.log("CompanyID  sent successfully on Kafka");
      await producer.disconnect();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
