const fs = require("fs");
const http = require("http");
const requests = require("requests");
const url = "https://openweathermap.org/img/wn/";
const homeFile = fs.readFileSync("home.html", "utf8");
const replaceVal = (homeFile, myData) => {
	let template = homeFile.replace("{%temp%}", myData.main.temp);
	template = template.replace("{%location%}", myData.name);
	template = template.replace("{%country%}", myData.sys.country);
	template = template.replace("{%mintemp%}", myData.main.temp_min);
	template = template.replace("{%maxtemp%}", myData.main.temp_max);
	template = template.replace("{%wind%}", myData.wind.speed);
	template = template.replace("{%iconurl%}", url + myData.weather[0].icon + "@4x.png");
	return template;
};
const server = http.createServer((req, res) => {
	requests(
		"https://api.openweathermap.org/data/2.5/weather?q=dhanbad &appid=e183db96cbba841ac570dfd40db56deb&units=metric&precipitation.value"
	)
		.on("data", function (chunk) {
			const data = JSON.parse(chunk);
			const myData = replaceVal(homeFile, data);
			res.write(myData);
		})
		.on("end", function (err) {
			if (err) return console.log("connection closed due to errors", err);
			res.end();
		})
		.on("error", function (err) {
			console.log(err);
		});
});
server.listen(8000, () => {
	console.log("Starting server on port 8000");
});
