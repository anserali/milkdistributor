import express from "express";
import { AddressInfo } from "net";
import { logger } from "./src/log/logger";
import { dataSource } from "./src/datasource/datasource";
import { environment } from "./src/environment/environment";
import { controller } from "./src/datasource/orders/controller";
var cors = require("cors");

let app = express();
let PORT = process.env.PORT || 8080;
let CronJob = require("cron").CronJob;

app.use(cors());

app.use(express.json());

app.get("/app/health-check", (req, res) => {
  res.json({ code: "0000", status: "success" });
});

let dataSourceRoutes = dataSource.getRoute();

new CronJob(
  "0 0 0 * * *",
  async function () {
    try {
      await controller.addMilkCapacity()
    } catch (error) {
      logger.log("error", error);
    }
  },
  null,
  true,
  "Asia/Kolkata"
);

app.use("/api", dataSourceRoutes);

app.get("/*", (req, res) => {
  return res.send({ status: "failure", message: "404 permission!!!" });
});
console.log(environment);
let server = app.listen(PORT, function () {
  var { address, port } = server.address() as AddressInfo;
  logger.log("debug", "running at http://" + address + ":" + port);
});




