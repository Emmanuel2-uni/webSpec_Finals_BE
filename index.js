//instantiation
const express = require("express")
const app = express()

const mysql =  require("mysql")
const moment = require("moment")
const cors = require('cors')

const PORT = process.env.PORT || 5001

const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get("host")}${req.originalUrl} : ${moment().format()}`)
    next();
}

app.use(logger);
app.use(cors());
app.use(express.json());


const connection =  mysql.createConnection({
    host: "bf3t7c34bdext5lysjsz-mysql.services.clever-cloud.com",
    user: "uaidw5th30rttlwp",
    password: "RrJBOPEF7kMb3TAqi3H4",
    database: "bf3t7c34bdext5lysjsz",
});

connection.connect();

//REPORT - CRUD
app.get("/api/decks", (req, res) => {

    connection.query("SELECT * FROM deck_user", (err, rows, fields) => {
        if(err) throw err;
        res.json(rows)

    })
})

//REPORT - CRUD - SEARCH
app.get("/api/decks/:deck_id", (req, res) => {
    const id = req.params.id
    //const first_name = req.params.first_name
    //res.send(id)
    //res.send(first_name)
    connection.query(`SELECT * FROM deck_user WHERE deck_id = ${deck_id}`, (err, rows, fields) => {
        if(err) throw err;
        if(rows.length > 0){
            res.json(rows)
        }else{
            res.status(400).json({msg:`${id} id not found`})
        }
    })

})

//POST - CREATE - CRUD
app.use(express.urlencoded({extended: false}))
app.post("/api/decks/", (req, res) => {
    const deck_name = req.body.deck_name;
    const deck_id = req.body.deck_id;
    const card_id = req.body.card_id;
    const card_question = req.body.card_question;
    const card_answer = req.body.card_answer;

    connection.query(`INSERT INTO deck_user (deck_id, deck_name, card_id, card_question, card_answer) VALUES ('${deck_id}', '${deck_name}', '${card_id}', '${card_question}', '${card_answer}')`, (err, rows, fields) => {
        if(err) throw err;
        res.json({msg: `Successfully inserted`})
    })

})


// //POST - CREATE - CRUD
// app.use(express.urlencoded({extended: false}))
// app.put("/api/members", (req, res) => {
//     const fname = req.body.fname;
//     const lname = req.body.lname;
//     const email = req.body.email;
//     const gender = req.body.gender;
//     const id = req.body.id;

//     connection.query(`UPDATE userdata SET first_name='${fname}', last_name='${lname}', email='${email}', gender='${gender}' WHERE id='${id}'`, (err, rows, fields) => {
//         if(err) throw err;
//         res.json({msg: `Success`})
//     })

// })

// DELETE
app.use(express.urlencoded({extended: false}))
app.delete("/api/decks", (req, res) => {

    const card_id = req.body.card_id
    connection.query(`DELETE FROM deck_user WHERE card_id=${card_id})`, (err, rows, fields) => {
        if(err) throw err;
        res.json({msg: `Successfully yeeted`})

    })

})

app.listen(5001, () => {
    console.log(`Server is running in port ${PORT}`);
})
