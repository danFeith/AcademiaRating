import * as express from "express"
import { Request, Response, NextFunction } from "express"
import { users, roles } from "./db/entities"
import { DBModel } from "./db/DBModel"
import * as cors from 'cors';
import { signup } from "./controllers/auth.controller";
import routes from './routes'
import { checkDuplicateUsernameOrEmail, checkRolesExisted } from "./middlewares/verifySignUp";
import { API_URL } from "./config/webServer.config";
import { corsOptions } from "./config/cors.config";
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/", routes);


DBModel
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")

    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })


// app.get("/createRoles", async function (req: Request, res: Response) {
//     await DBModel
//         .createQueryBuilder().insert().into(roles).values([
//             {
//                 name: "user"
//             },
//             {
//                 name: "admin"
//             },
//             {
//                 name: "moderator"
//             }
//         ]).execute()
//     res.sendStatus(200)
// })

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});