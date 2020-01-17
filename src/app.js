const express = require("express");
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
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

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please, provide a valid address'
    })
  }

  geocode(req.query.address, (error, {
    latitude,
    longitude,
    location
  }) => {
    if (error) {
      return res.send({
        error
      })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        })
      }

      res.send({
        address: req.query.address,
        forecast: forecastData,
        location
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Please provide a valid term"
    })
  }

  res.send({
    products: []
  })
})

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