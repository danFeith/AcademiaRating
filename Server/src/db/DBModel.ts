import { DataSource } from "typeorm"
import * as entities from "./entities/index"

export const DBModel = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "academiaratingdb",
    charset: "utf8mb4",
    entities: Object.values(entities),
    logging: true,
    synchronize: true,
    acquireTimeout: 60 * 60 * 10000,
    connectTimeout: 60 * 60 * 10000,
    maxQueryExecutionTime: 60 * 60 * 10000
})