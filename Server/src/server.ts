import * as express from "express"
import { Request, Response, NextFunction } from "express"
import { users, roles, institution, institutionType, course, degree, lecturer } from "./db/entities"
import { DBModel } from "./db/DBModel"
import * as cors from 'cors';
import { signup } from "./controllers/auth.controller";
import routes from './routes'
import { checkDuplicateUsernameOrEmail, checkRolesExisted } from "./middlewares/verifySignUp";
import { API_URL } from "./config/webServer.config";
import { corsOptions } from "./config/cors.config";
import institutionTypeRepository from "./repositories/institutionType.repository";
import institutionRepository from "./repositories/institution.repository";
import * as fs from 'fs';
import DegreeRepository from "./repositories/Degree.repository";
import courseRepository from "./repositories/course.repository";
import lecturerRepository from "./repositories/lecturer.repository";
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


app.get("/insertData", async function (req: Request, res: Response) {
    await insertCourses()
    res.sendStatus(200)
})


const insertCourses = async () => {
    const telAvivInst = await institutionRepository.findByName("אוניברסיטת תל אביב")
    let currDegree: degree
    fs.readFile("C:/AcademiaRating/Scrapper/myjsonfile_english.json", "utf8", async (err, data) => {
        const degreeObj = {}
        if (err) {
            console.log(err)
        } else {
            Object.values(JSON.parse(data)).forEach(async course => {
                let degName: string = course["facult"].split("/")[1]

                await DegreeRepository.findWhere({ name: degName }).then(async (deg) => {
                    let lecturerArray: lecturer[] = course["teachersArray"]
                        .filter((teacher: string) => (teacher != "" && teacher != " " && teacher != "  " && teacher != "   "))
                        .map((teacher: string) => { return lecturerRepository.create({ name: teacher }) })

                    await courseRepository.save(courseRepository.create({
                        id: Number(course["id"]),
                        name: course["courseName"],
                        degree: deg,
                        institution: telAvivInst,
                        lecturers: lecturerArray
                    })).catch(err => {
                        console.log(err)
                    })
                })

            })
        }
    })
}




const insertDegrees = async () => {
    const telAvivInst = await institutionRepository.findByName("אוניברסיטת תל אביב")
    let i = 0
    const degreeObj = {}
    fs.readFile("C:/AcademiaRating/Scrapper/myjsonfile_hebrew.json", "utf8", (err, data) => {
        if (err) {
            console.log(err)
        } else {
            Object.values(JSON.parse(data)).forEach(async course => {
                let degName: string = course["facult"].split("/")[1]
                if (!degreeObj[degName]) {
                    const currDegree = DegreeRepository.create({
                        name: degName,
                        institution: telAvivInst
                    })
                    degreeObj[degName] = true
                    await DegreeRepository.save(currDegree).then(() => {
                        console.log(currDegree.name)
                    })
                }
            })
        }
    })

    fs.readFile("C:/AcademiaRating/Scrapper/myjsonfile_english.json", "utf8", (err, data) => {
        if (err) {
            console.log(err)
        } else {
            Object.values(JSON.parse(data)).forEach(async course => {
                let degName: string = course["facult"].split("/")[1]
                if (!degreeObj[degName]) {
                    const currDegree = DegreeRepository.create({
                        name: degName,
                        institution: telAvivInst
                    })
                    degreeObj[degName] = true
                    await DegreeRepository.save(currDegree).then(() => {
                        console.log(currDegree.name)
                    })
                }
            })
        }
    })
}


const insertInstitutionTypes = async () => {

    await DBModel
        .createQueryBuilder().insert().into(institutionType).values([
            {
                name: "אוניברסיטה",
            },
            {
                name: "מכללה",
            }
        ]).execute()
}


const insertInstitution = async () => {
    await institutionTypeRepository.findByName("מכללה").then(async (uniType: institutionType) => {
        const inst = institutionRepository.create({
            name: "המכללה למנהל",
            address: "זית 44",
            institutionType: uniType
        })
        await institutionRepository.save(inst)
    })
}


const insertRoles = async () => {
    await DBModel
        .createQueryBuilder().insert().into(roles).values([
            {
                name: "user"
            },
            {
                name: "admin"
            },
            {
                name: "moderator"
            }
        ]).execute()
}


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});