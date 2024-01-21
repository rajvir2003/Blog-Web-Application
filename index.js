import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

app.get("/", (req, res) => {
    res.render("home.ejs", {
        title : titles,
        desc : descriptions
    });  
});

app.get("/create", (req, res) => {
    res.render("create.ejs"); 
});

app.post("/create-post", (req, res) => {
    titles.push(req.body["title"]);
    descriptions.push(req.body["desc"]);
    res.render("home.ejs", {
        title : titles,
        desc : descriptions,
        operation : "create"
    });
});

app.get("/blog/:i", (req, res) => {
    let index = req.params.i;
    res.render("views.ejs", {
        idx : index,
        title : titles,
        desc : descriptions
    }); 
});

app.get("/delete/:i", (req, res) => {
    let idx = req.params.i;
    titles.splice(idx, 1);
    descriptions.splice(idx, 1);
    res.render("home.ejs", {
        title : titles,
        desc : descriptions,
        operation : "delete"
    });
});

app.get("/edit/:i", (req, res) => {
    let index = req.params.i;
    res.render("edit.ejs", {
        idx : index,
        title : titles,
        desc : descriptions
    });
});

app.post("/edit-post/:i", (req, res) => {
    let index = req.params.i; 
    titles[index] = req.body["title"];
    descriptions[index] = req.body["desc"];
    res.render("home.ejs", {
        title : titles,
        desc : descriptions,
        operation : "update"
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

var titles = [];
var descriptions = [];