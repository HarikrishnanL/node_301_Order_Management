const superagent = require("superagent");
const logger = require("../../utils/logger");

exports.getCustomer = async (id, token) => {
    try {
        let customer = await superagent
            .get(process.env.customerTestUrl + "customer/" + id)
            .set('authToken', token);
        return customer.body.response;
    } catch (error) {
        logger.error(error.message)
        throw error;
    }
}