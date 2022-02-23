const express = require("express");
const app = express();
const requests = require("requests");
const iconUri = "https://openweathermap.org/img/wn/";

// const hbs   = require("hbs");
const path = require("path");
const port = process.env.PORT || 9000;
const staticPath = path.join(__dirname, "../public");

app.set("view engine", "hbs");
app.use(express.static(staticPath));
app.get("/", (req, res) => {
	requests(
		`https://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&appid=e183db96cbba841ac570dfd40db56deb&units=metric&precipitation.value`
	).on("data", (chunk) => {
		const data = JSON.parse(chunk);
		const myData = {
			temp: data.main.temp,
			iconUrl: iconUri + data.weather[0].icon + "@4x.png",
			location: data.name,
			country: data.sys.country,
			mintemp: data.main.temp_min,
			maxtemp: data.main.temp_max,
			wind: data.wind.speed,
		};
		res.render("index", myData);
	});
});

app.listen(port, (req, res) => {
	console.log("listening on port " + port);
});
