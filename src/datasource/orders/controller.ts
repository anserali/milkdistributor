import { logger } from "../../log/logger";
import { Utility } from "../../utility/database/mysql/utility";
import { queryhelper } from "./queryBuilder/mysql";

class Controler {

    public checkMilkCapacity(date: string) {
        return new Promise(async (resolve, reject) => {
            try {
                let checkMilkCapacityQuery = queryhelper.checkMilkCapacity(date)
                let checkMilkCapacityResponse =
                    await Utility.queryExecutor(checkMilkCapacityQuery, "Check Milk Capacity")
                if (checkMilkCapacityResponse.length == 0) {
                    return resolve({ status: "failure", message: "No Data Found!!!" })
                }
                let milkCapacity = checkMilkCapacityResponse[0].milkLeft
                return resolve({ status: "success", milkLeft: milkCapacity })
            } catch (error) {
                return reject(error)
            }
        })
    }

    public addOrder(title, description, capacity, firstName, lastName, mobile, deliveryDate) {
        return new Promise(async (resolve, reject) => {
            try {
                let getMilkCapacityQuery = queryhelper.checkMilkCapacity()
                let checkMilkCapacityResponse = await Utility.queryExecutor(getMilkCapacityQuery, "Get Milk Capacity Query")
                let milkCapacity = checkMilkCapacityResponse[0]?.milkLeft
                if (milkCapacity - capacity < 0) {
                    return resolve({ status: "failure", message: "No Enough Milk!!!" })
                }
                let UpdateMilkCapacityQuery = queryhelper.UpdateMilkCapacity(milkCapacity - capacity)
                await Utility.queryExecutor(UpdateMilkCapacityQuery, "Update Milk Capacity Query")
                let createOrderQuery =
                    queryhelper.createOrder(title, description, capacity, firstName, lastName, mobile, deliveryDate)
                await Utility.queryExecutor(createOrderQuery, "Create Order Query")
                return resolve({ status: "status", message: "Order Created Successfully!!!" })
            } catch (error) {
                logger.log("error", error)
                return reject(error)
            }
        })
    }

    public updateOrderStatus(orderId, status) {
        return new Promise(async (resolve, reject) => {
            try {
                let updateOrderQuery = queryhelper.updateOrderStatus(orderId, status)
                await Utility.queryExecutor(updateOrderQuery, "Update Order Status")
                return resolve({ status: "success", message: "Order Status Updated Successfully!!!" })
            } catch (error) {
                logger.log("error", error)
                return reject(error)
            }
        })
    }

    public updateOrder(orderId, title, description, capacity, firstName, lastName, mobile, deliveryDate) {
        return new Promise(async (resolve, reject) => {
            try {
                let updateOrderQuery = queryhelper.updateOrder(orderId, title, description, capacity, firstName, lastName, mobile, deliveryDate)
                await Utility.queryExecutor(updateOrderQuery, "Update Order Query")
                return resolve({ status: "success", message: "Order Updated Successfully!!!" })
            } catch (error) {
                logger.log("error", error)
                return reject(error)
            }
        })
    }

    public deleteOrder(orderId) {
        return new Promise(async (resolve, reject) => {
            try {
                let deleteOrderQuery = queryhelper.deleteOrder(orderId)
                await Utility.queryExecutor(deleteOrderQuery, "Delete Order Query")
                return resolve({ status: "success", message: "Order Deleted Successfully!!!" })
            } catch (error) {
                logger.log("error", error)
                return reject(error)
            }
        })
    }

    public addMilkCapacity() {
        return new Promise(async (resolve, reject) => {
            try {
                let addMilkCapacity = queryhelper.insertMilkCapacity()
                await Utility.queryExecutor(addMilkCapacity, "Add Milk Capacity Query")
                return resolve("Milk Capacity Added!!!")
            } catch (error) {
                logger.log("error", error)
                return reject(error)
            }
        })
    }

}

export const controller = new Controler();
