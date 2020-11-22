const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require('./utils/geoCode');
const forcast = require('./utils/forecast');
const forecast = require("./utils/forecast");

const app = express();

// define path for express config
const viewsPath = path.join(__dirname, "../templates/views");
const publicDirectoryPath = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and view locations
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup Static directory to serve
app.use(express.static(publicDirectoryPath));

//  Routes
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Shiva",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "Shiva",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Shiva",
    helpText: "This is help page",
  });
});

app.get("/weather", (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geoCode(req.query.address, (error, {latitude, longitude, location} = {})=> {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastdata) => {
            if(error) {
                return res.send({error})
            }
            

            res.send({
                forecast:forecastdata,
                location,
                address: req.query.address
            })
        })
    })
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide search tearm",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404-error", {
    errorMessage: "Help article Not found",
    title: "404-Error",
    name: "Shiva",
  });
});

app.get("*", (req, res) => {
  res.render("404-error", {
    errorMessage: "Page not found",
    title: "404-Error",
    name: "Shiva",
  });
});

// Start Express Engine
app.listen(3000, () => {
  console.log("Server is up and running on port 3000");
});
