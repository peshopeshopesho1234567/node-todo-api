const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(`${__dirname}/views/partials`);

app.set("view engine", "hbs");
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
    var now = Date.now();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);

    fs.appendFile("server.log", `${log}\n`, (err) => {
        if (err) {
            console.log("Error: ", err);
        }
    });

    next();
});

hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
    return text.toUpperCase();
});

app.get("/", (req, res) => {
   // res.send("<h1>Hello, World!</h1>");
   res.render("home.hbs", {
        pageTitle: "Home page",
        welcomeMessage: "Hello, World"
    });
});

app.get("/about", (req, res) => {
    res.render("about.hbs", {
        pageTitle: "About page"
    });
});

app.get("/bad", (req, res) => {
    res.send({
        "error": "Unable to fulfull this request!"
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});