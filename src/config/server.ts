import sequelize from "../models/";
import config from "../config/config";
import { Application } from "express";
const Server = async (app: Application) => {
  try {
    sequelize
      .authenticate()
      .then(async () => {
        app.listen(config.PORT || 7000, () => {
          console.log(`Server is running on port ${config.PORT}.`);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.error("An error occurred while starting the server:", error);
  }
};

export default Server;
