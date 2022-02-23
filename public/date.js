const day = document.getElementById("day");
const monthdate = document.getElementById("monthdate");
const year = document.getElementById("year");
const box = document.querySelector(".box");
const date = new Date();
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
if (date.getHours() > 18 || date.getHours() < 5) {
	box.classList.add("bg-night");
	box.classList.remove("bg-primary");
} else {
	box.classList.add("bg-primary");
	box.classList.remove("bg-night");
}
day.innerText = weekdays[date.getDay()];
monthdate.innerText = date.getDate() + " " + months[date.getMonth()];
year.innerText = date.getFullYear();
