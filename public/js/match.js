// User Settings
var gamelength = 12000;
var speed = 100;
// -----------------------
var matchInfo;
var its = 0;
var logs = "";
let loggingON = false;
var pause = false;

function startMatch() {
	setPositions();
}

function setPositions() {
	var http = new XMLHttpRequest();
	http.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			var result = JSON.parse(this.responseText);
			// console.log(result);
			var c = document.getElementById("map");
			var ctx = c.getContext("2d");
			ctx.canvas.width = result[0];
			ctx.canvas.height = result[1];
			for (i = 2; i < result.length - 1; i++) {
				ctx.beginPath();
				ctx.moveTo(result[i], result[i + 1]);
				// ctx.lineTo(result[i] + 2, result[i + 1] + 2);
				ctx.arc(result[i], result[i + 1], 2, 0, 2 * Math.PI);
				if (i < 24) {
					ctx.fillStyle = 'red';
				} else if (i > 12 && i < result.length - 3) {
					ctx.fillStyle = 'blue';
				} else {
					ctx.fillStyle = 'lime';
				}
				ctx.fill();
				i++;
			}
			ctx.moveTo(result[result.length - 3], result[result.length - 2]);
			ctx.lineTo(result[result.length - 3] + 1, result[result.length - 2] + 1);
			ctx.stroke();
			matchInfo = result[result.length - 1];
			document.getElementById("result").innerHTML = matchInfo.kickOffTeam.name + ": " + matchInfo.kickOffTeamStatistics.goals + " - " + matchInfo.secondTeamStatistics.goals + " :" + matchInfo.secondTeam.name;
		}
	};
	http.open("GET", "/getstartPOS", true);
	http.send();
}

function pauseGame() {
	pause = true;
}

function playGame() {
	pause = false;
	getMatch();
}

function getMatch() {
	setInterval(function () {
		if (pause == true) {
			clearInterval()
		} else if (its === (gamelength / 2)) {
			clearInterval()
			switchSides()
			console.log('switched')
		} else if (its > gamelength) {
			return
		} else {
			movePlayers("/movePlayers");
		}
	}, speed);
}

function movePlayers(endpoint) {
	var http = new XMLHttpRequest();
	http.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			its++;
			var result = JSON.parse(this.responseText);
			var c = document.getElementById("map");
			var ctx = c.getContext("2d");
			// console.log(result);
			ctx.canvas.width = result[0];
			ctx.canvas.height = result[1];
			for (i = 2; i < result.length - 1; i++) {
				ctx.beginPath();
				ctx.moveTo(result[i], result[i + 1]);
				// ctx.lineTo(result[i] + 4, result[i + 1] + 4);
				ctx.arc(result[i], result[i + 1], 2, 0, 2 * Math.PI);
				if (i < 24) {
					ctx.fillStyle = 'red';
				} else if (i > 12 && i < result.length - 3) {
					ctx.fillStyle = 'blue';
				} else {
					ctx.fillStyle = 'lime';
				}
				ctx.fill();
				i++;
			}
			matchInfo = result[result.length - 1];
			logs += "Iteration " + its + ": " + result[result.length - 1].iterationLog + "<br>";
			if (loggingON) {
				document.getElementById("logging").innerHTML = logs;
			}
			document.getElementById("result").innerHTML = matchInfo.kickOffTeam.name + ": " + matchInfo.kickOffTeamStatistics.goals + " - " + matchInfo.secondTeamStatistics.goals + " :" + matchInfo.secondTeam.name + "   Moves(" + its + ")";
			var elem = document.getElementById('logging');
			elem.scrollTop = elem.scrollHeight;
		}
	};
	http.open("GET", endpoint, true);
	http.send();
}

function switchSides() {
	its++;
	loggingArray = ["", "", "", "", "", "", "", "", "", ""];
	var http = new XMLHttpRequest();
	http.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			var result = JSON.parse(this.responseText);
			// console.log(result);
			var c = document.getElementById("map");
			var ctx = c.getContext("2d");
			ctx.canvas.width = result[0];
			ctx.canvas.height = result[1];
			for (i = 2; i < result.length - 3; i++) {
				ctx.beginPath();
				ctx.moveTo(result[i], result[i + 1]);
				// ctx.lineTo(result[i] + 4, result[i + 1] + 4);
				ctx.arc(result[i], result[i + 1], 2, 0, 2 * Math.PI);
				if (i < 24) {
					ctx.fillStyle = 'red';
				} else if (i > 12 && i < result.length - 3) {
					ctx.fillStyle = 'blue';
				} else {
					ctx.fillStyle = 'lime';
				}
				ctx.fill();
				i++;
			}
			ctx.moveTo(result[result.length - 3], result[result.length - 2]);
			ctx.lineTo(result[result.length - 3] + 1, result[result.length - 2] + 1);
			ctx.stroke();
			matchInfo = result[result.length - 1];
			document.getElementById("result").innerHTML = matchInfo.kickOffTeam.name + ": " + matchInfo.kickOffTeamStatistics.goals + " - " + matchInfo.secondTeamStatistics.goals + " :" + matchInfo.secondTeam.name;
		}
	};
	http.open("GET", "/startSecondHalf", true);
	http.send();
}

function showlogs() {
	var x = document.getElementById("logging");
	if (x.style.display === "none") {
		x.style.display = "block";
		loggingON = true;
	} else {
		x.style.display = "none";
		loggingON = false;
	}
}

function getMatchDetails() {
	var http = new XMLHttpRequest();
	http.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			// console.log("done");
		}
	};
	http.open("GET", "/getMatchDetails", true);
	http.send();
}
