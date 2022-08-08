import express from "express";
import { logger } from "../../log/logger";
import { controller } from "./controller";

class Orders {
  router;
  constructor () {
    this.router = express.Router();
    this.initialize();
  }

  private initialize() {
    this.router.get("/checkCapacity/:date", async (req, res) => {
      try {
        let date = req?.params?.date
        if (!date) {
          return res.send({ status: "failure", message: "Necessary Parameter Missing!!!" })
        }
        let finalResponse = await controller.checkMilkCapacity(date)

        return res.send(finalResponse);
      } catch (error) {
        logger.log("error", error)
        return res.send({ status: "failure", message: "Internal Server Error!!!" })
      }
    });
    this.router.post("/add", async (req, res) => {
      try {
        let { title, description, capacity, firstName, lastName, mobile, deliveryDate } = req.body
        if (!capacity || !firstName || !mobile || !deliveryDate) {
          return res.send({ status: "failure", message: "Necessary Parameter Missing!!!" })
        }
        let finalResponse = await controller.addOrder(title, description, capacity, firstName, lastName, mobile, deliveryDate)
        return res.send(finalResponse);
      } catch (error) {
        logger.log("error", error)
        return res.send({ status: "failure", message: "Internal Server Error!!!" })
      }
    });
    this.router.post("/updateStatus/:id", async (req, res) => {
      try {
        let { deliveryStatus } = req.body
        let orderId = req?.params?.id
        if (!orderId || !deliveryStatus) {
          return res.send({ status: "failure", message: "Necessary Parameter Missing!!!" })
        }
        if (deliveryStatus == "placed") {
          deliveryStatus = 0
        }
        if (deliveryStatus == "packed") {
          deliveryStatus = 1
        }
        if (deliveryStatus == "dispatched") {
          deliveryStatus = 2
        }
        if (deliveryStatus == "delivered") {
          deliveryStatus = 3
        }
        let finalResponse = await controller.updateOrderStatus(orderId, deliveryStatus)
        return res.send(finalResponse);
      } catch (error) {
        logger.log("error", error)
        return res.send({ status: "failure", message: "Internal Server Error!!!" })
      }
    });
    this.router.post("/update/:id", async (req, res) => {
      try {
        let orderId = req?.params?.id
        let { title, description, capacity, firstName, lastName, mobile, deliveryDate } = req.body
        if (!orderId) {
          return res.send({ status: "failure", message: "Necessary Parameter Missing!!!" })
        }
        let finalResponse = await controller.updateOrder(orderId, title, description, capacity, firstName, lastName, mobile, deliveryDate)
        return res.send(finalResponse)
      } catch (error) {
        logger.log("error", error)
        return res.send({ status: "failure", message: "Internal Server Error!!!" })
      }
    })
    this.router.post("/delete/:id", async (req, res) => {
      try {
        let orderId = req?.params?.id
        if (!orderId) {
          return res.send({ status: "failure", message: "Necessary Parameter Missing!!!" })
        }
        let finalResponse = await controller.deleteOrder(orderId)
        return res.send(finalResponse)
      } catch (error) {
        logger.log("error", error)
        return res.send({ status: "failure", message: "Internal Server Error!!!" })
      }
    })
  }


  public getRoute() {
    return this.router;
  }
}

export const orders = new Orders();
