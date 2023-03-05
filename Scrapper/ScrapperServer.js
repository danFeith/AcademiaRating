const express = require('express')
const fs = require('fs');

var cors = require('cors')
const bodyParser = require('body-parser');

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json())



// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, accept, access-control-allow-origin');

//     if ('OPTIONS' == req.method) res.sendStatus(200);
//     else next();
// });

const port = 5000
var currentFacultIndex = 1
var numberOfOptions = 0
var currentOptionIndex = 0
var coursesJson = {}

app.get('/currentFacultIndex', (req, res) => {
    res.json({ currentFacultIndex: currentFacultIndex })
})

app.get('/currentOptionIndex', (req, res) => {
    currentOptionIndex++;
    res.json({ currentOptionIndex: currentOptionIndex })
})

app.get('/increaseCurrentFacultIndex', (req, res) => {
    currentFacultIndex += 1
    res.json({ currentFacultIndex: currentFacultIndex })
})

app.post('/setCurrentOptionIndex', (req, res) => {
    currentOptionIndex = req.body.currentOptionIndex
    res.sendStatus(200)
})

app.post('/addCourse', (req, res) => {
    if (coursesJson[req.body.courseNumber] &&
        JSON.stringify(coursesJson[req.body.courseNumber]["teachersArray"]) == JSON.stringify(req.body.teachersArray) &&
        coursesJson[req.body.courseNumber]["courseName"] == req.body.courseName &&
        coursesJson[req.body.courseNumber]["facult"] == req.body.facult) {
        console.log("courseNumber already exists: " + req.body.courseNumber + " - " + req.body.teacher)
    } else {
        coursesJson[req.body.courseNumber] = {
            id: req.body.courseNumber,
            courseName: req.body.courseName,
            facult: req.body.facult,
            teachersArray: req.body.teachersArray
        }
    }
    res.sendStatus(200)
})

app.get("/finish", (req, res) => {
    fs.writeFile('myjsonfile.json', JSON.stringify(coursesJson), (err) => { if (err) { console.log(err) } else { console.log("finish") } });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})