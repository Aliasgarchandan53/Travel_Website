const express = require("express");
const axios = require("axios");
const source = require("./Data/SOURCE_CITY.json");
const routes = require("./Data/Routes.json");
const cors = require("cors");
const app = express();
const PORT = 4000;

let requestRoute = null;
let availableRoutes = [];
let details={};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
//server home page
app.get("", (req, res) => {
  const html = `<h1>Bus reservation server is running.</h1>`;
  res.send(html);
});

// request to get source city
app.get("/source", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.json(source);
});

//request to get destination city
app.get("/destination", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.json(source);
});

//request for route request from user
app.post("/userRoute", (req, res) => {
  requestRoute = req.body;
  axios
    .get("http://localhost:4000/routes", {
      headers: {
        "x-apikey": "59a7ad19f5a9fa0808f11931",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      responseType: "json",
    })
    .then((response) => {
      availableRoutes = response.data;
      let isPresent = false;
      availableRoutes.forEach((route) => {
        if (
          route.source === requestRoute.source && route.destination === requestRoute.dest
        ) {
          isPresent = true;
          return;
        }
      });
  
       details ={
        "available":"",
        "source":requestRoute.source,
        "destination":requestRoute.dest
      }
      if(isPresent){
        details.available="Yes"
        console.log("A bus is available on this route.");
      }
      else{
        details.available="No"
        console.log("No bus is available on this route");
      }
    //   axios.post("http://localhost:4000/results",details);
    //   console.log("posted");

    });
});

//request for available routes
app.get("/routes", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.json(routes);
});

app.post("/results",(req,res)=>{
    console.log(req.body)  
    res.send(req.body);
})

app.get("/results",(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    console.log(details)
    res.json(details);
})