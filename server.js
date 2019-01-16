const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

url = "mongodb://localhost:27017/";
var db;
MongoClient.connect(url, (err, databank) => {
    if (err) return console.log(err);
    db = databank.db("brand")
    app.listen(3420, () => {
        console.log("3420 420 420");
    })
})

app.get("/", (req, res) => { res.redirect("/brand") })
app.get("/brand", (req, res) => {
    res.render("index.ejs", {})
})

app.post("/brand", (req, res) => {
    db.collection("brand").insertOne(req.body, (err, resultaat) => {
        if (err) return console.log(err);
        res.redirect("/result")
    })
})

app.get("/result", (req, res) => {
    db.collection("brand").find().toArray((err, resultaat) => {
        if (err) return console.log(err);
        res.render("result.ejs", { brand: resultaat })
    })
})

app.post("/back", (req, res) => {
    res.redirect("/brand")
})

app.post("/verwijderAlles", (req, res) => {
    db.collection("brand").deleteMany((err, resultaat) => {
        res.redirect("/result");
    })
})

app.post("/verwijder1", (req, res) => {
    res.redirect("/verwijderen")
})

app.get("/verwijderen", (req, res) => {
    res.render("gone.ejs", {})
})

app.post("/deleteForm", (req, res) => {
    db.collection("brand").deleteOne({ "name": req.body.delname }, (err, resultaat) => {
        res.redirect("/result")
    })
})

app.post("/zoek", (req, res) => {
    res.redirect("/search")
})

app.get("/search", (req, res) => {
    res.render("search.ejs", { naam: "" })
})

app.post("/searchForm", (req, res) => {
    query = { name: req.body.searname }
    db.collection("brand").find(query).toArray((err, resultaat) => {
        if (err) return console.log(err);
        res.render("search.ejs", { naam: resultaat[0] })
    })
})




//update!!!

