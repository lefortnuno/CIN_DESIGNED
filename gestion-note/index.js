const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./config/.env" });

const etudiantRoute = require('./routes/etudiants.routes')
const matiereRoute = require('./routes/matieres.routes')
const noteRoute = require('./routes/notes.routes')
const bulletinRoute = require('./routes/butlletin.routes')
const classementRoute = require('./routes/classement.routes')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
});


app.use("/api/etudiant", etudiantRoute);
app.use("/api/matiere", matiereRoute);
app.use("/api/note", noteRoute);
app.use("/api/bulletin", bulletinRoute);
app.use("/api/classement", classementRoute);
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});