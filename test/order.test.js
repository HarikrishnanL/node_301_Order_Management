const expect = require('chai').expect;
const app = require("../index");
const prefixUrl = "http://localhost:5003/order-management";
const superagent = require("superagent");
let token;
let newOrderId;

const customerLogin = async () => {
    let customerAccess = await superagent
        .post(process.env.customerTestUrl + "customer/login")
        .send({
            "email": "hari001@mindtree.com",
            "password": "harik@001"
        });
    token = customerAccess.body.response.token;
};



describe("Test cases for CRUD Order management API", () => {

    it("should reterive order by id", async () => {
        await customerLogin();
        let id = "610933c68426c919f8f65340";
        const res = await superagent
            .get(prefixUrl + "/order/single/" + id)
            .set('authToken', token);
        expect(res.status).to.equal(200);
    });

    it("should show error if such order id is not present in database", async () => {
        try {
            let id = "610933c68426c919f8f65341";
            const res = await superagent.get(prefixUrl + "/order/single/" + id).set('authToken', token);
            let response = JSON.parse(res.text);

        } catch (error) {
            expect(error.status).to.equal(404);
        }
    });

    it("should reterive all orders", async () => {
        const res = await superagent
            .get(prefixUrl + "/order/all")
            .set('authToken', token);
        expect(res.status).to.equal(200);
    });
-
    it("should place order", async () => {
        const res = await superagent
            .post(prefixUrl + "/order/customer/1/restaurant/1")
            .send({
                "menu": [
                    {
                        "dish": "Chicken Briyani",
                        "price": 10,
                        "quantity": 2
                    },
                    {
                        "dish": "Mutton Briyani",
                        "price": 15,
                        "quantity": 2
                    }
                ]
            })
            .set('authToken', token);
            newOrderId = res.body.data._id;

        expect(res.status).to.equal(200);
    });

    it("should update order by id", async () => {
        const res = await superagent
            .put(prefixUrl + "/order/"+newOrderId)
            .send({
                "menu": [
                    {
                        "dish": "Chicken Briyani",
                        "price": 10,
                        "quantity": 4
                    },
                    {
                        "dish": "Mutton Briyani",
                        "price": 15,
                        "quantity": 7
                    }
                ]
            })
            .set('authToken', token);
        expect(res.status).to.equal(200);
    });

    it("should update order status  by id", async () => {
        const res = await superagent
            .patch(prefixUrl + "/order/"+newOrderId)
            .send({
                "status":"Delivered"
            })
            .set('authToken', token);
        expect(res.status).to.equal(200);
    });

    it("should delete order by id", async () => {
        const res = await superagent
            .delete(prefixUrl + "/order/"+newOrderId)
            .set('authToken', token);
        expect(res.status).to.equal(200);
    });


});


