import express from "express";
import { orders } from "./orders";
class DataSource {
  dataSourceRouter;
  constructor () {
    this.dataSourceRouter = express.Router();
    this.initialize();
  }

  initialize() {
    this.dataSourceRouter.use("/", orders.getRoute());
  }

  public getRoute() {
    return this.dataSourceRouter;
  }
}

export const dataSource = new DataSource();
