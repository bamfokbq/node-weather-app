const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();
// SETTING UP THE PATH
const pathToDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const pathToPartials = path.join(__dirname, "../templates/partials");
// SETTING THE HBS ENGINE
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(pathToPartials);

app.use(express.static(pathToDirectory));
// HOMEPAGE
app.get("", (req, res) => {
  res.render("index", {
    name: "Paa Bamfo",
    title: "WEATHER"
  });
});
// ABOUT PAGE
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Paa Bamfo"
  });
});
// HELP PAGE
app.get("/help", (req, res) => {
  res.render("help", {
    title: "HELP",
    message: "In case of any difficulties, please call ",
    contact: "0249490464",
    name: "Paa Bamfo",
  });
});

app.get('/help/*', (req, res) => {
  res.render('error', {
    name: "Paa Bamfo",
    title: '404 ERROR',
    error: 'Help page not found'
  })
})

app.get('*', (req, res) => {
  res.render('error', {
    name: "Paa Bamfo",
    title: '404 ERROR',
    error: 'Page Not Found'
  })
})
// Running the
const PORT = 3000;
app.listen(PORT, () => {
  console.log("SERVER RUNNING ON PORT:" + PORT);
});