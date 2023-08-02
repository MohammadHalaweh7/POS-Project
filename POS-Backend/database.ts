import { Sequelize } from "sequelize";
const sequelize = new Sequelize({
  host: "./dev.sqlite",
  username: "user",
  password: "pass",
  database: "POS-db",
  dialect: "sqlite",
  storage: "./data/mydatabase.db",
  define: {
    timestamps: false
  }
});

export default sequelize;
