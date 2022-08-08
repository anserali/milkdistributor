class Queryhelper {

    public checkMilkCapacity(date = "") {
        let query = ""
        if (date) {
            query = `SELECT Capacity AS milkLeft FROM MilkCapacity WHERE Date = '${date}'`
        } else {
            query = `SELECT Capacity AS milkLeft FROM MilkCapacity WHERE Date = CURDATE()`
        }
        return query
    }

    public UpdateMilkCapacity(capacity) {
        let query = `UPDATE MilkCapacity SET Capacity='${capacity}' WHERE Date = CURDATE()`
        return query
    }

    public createOrder(title = "", description = "", capacity, firstName, lastName, mobile, deliveryDate) {

        let key = ""
        let value = ""
        if (title) {
            key += "Title"
            value += `'${title}'`
        }

        if (description) {
            if (key) {
                key += ", Description"
                value += `, '${description}'`
            } else {
                key = "Description"
                value += `'${description}'`
            }
        }

        if (mobile) {
            if (key) {
                key += ", MobileNumber"
                value += `, '${mobile}'`
            } else {
                key = "MobileNumber"
                value += `'${mobile}'`
            }
        }
        if (capacity) {
            if (key) {
                key += ", Capacity"
                value += `, '${capacity}'`
            } else {
                key = "Capacity"
                value += `'${capacity}'`
            }
        } if (firstName) {
            if (key) {
                key += ", FirstName"
                value += `, '${firstName}'`
            } else {
                key = "FirstName"
                value += `'${firstName}'`

            }

        }
        if (lastName) {
            if (key) {
                key += ", LastName"
                value += `, '${lastName}'`
            } else {
                key = "LastName"
                value += `'${lastName}'`

            }

        }
        if (deliveryDate) {
            if (key) {
                key += ", DeliveryDate"
                value += `, '${deliveryDate}'`
            } else {
                key = "DeliveryDate"
                value += `'${deliveryDate}'`
            }
        }
        let query = `INSERT INTO Orders(${key}) VALUES (${value})`
        return query
    }

    public updateOrderStatus(orderId, status) {
        let query = `UPDATE Orders SET OrderStatus = '${status}' WHERE OrderId = '${orderId}'`
        return query
    }

    public updateOrder(orderId, title, description, capacity, firstName, lastName, mobile, deliveryDate) {

        let query = ""
        if (title) {
            query = this.updateOderHelper(query, "Title", title)
        }
        if (description) {
            query = this.updateOderHelper(query, "Description", description)
        }
        if (capacity) {
            query = this.updateOderHelper(query, "Capacity", capacity)
        }
        if (firstName) {
            query = this.updateOderHelper(query, "FirstName", firstName)
        }
        if (lastName) {
            query = this.updateOderHelper(query, "LastName", lastName)
        }
        if (mobile) {
            query = this.updateOderHelper(query, "MobileNumber", mobile)
        }
        if (deliveryDate) {
            query = this.updateOderHelper(query, "DeliveryDate", deliveryDate)
        }

        return `UPDATE Orders SET ${query} WHERE OrderId = '${orderId}'`

    }

    private updateOderHelper(previousQuery, key, value) {
        let query = `${key} ='${value}'`

        if (previousQuery) {
            previousQuery += `, ${query}`
        } else {
            previousQuery = query
        }
        return previousQuery
    }

    public deleteOrder(orderId) {
        let query = `UPDATE Orders SET IsActive = '0' WHERE OrderId = '${orderId}'`
        return query
    }

    public insertMilkCapacity() {
        return "INSERT INTO MilkCapacity(Capacity) VALUES (100)"
    }

}

export const queryhelper = new Queryhelper();
