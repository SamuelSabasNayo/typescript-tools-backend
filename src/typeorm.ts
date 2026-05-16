import { DataSource } from "typeorm";

const connectDB = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "******",
  password: "*****",
  database: "typescript-tools-dev-db",
  ssl: false,
  // url: "postgres://postgres:Sam123!.@localhost:5432/typescript-tools-db",
  logging: true,
  synchronize: true,
  entities: [__dirname + "/../src/entities/*.ts"],
  // extra: {
  //   ssl: {
  //     rejectUnauthorized: false,
  //   },
  // }
});

connectDB.initialize()
  .then(() => {
    console.log("Database connection established");
  })
  .catch((error) => {
    console.error("Error initializing database connection:", error);
  });

export default connectDB;