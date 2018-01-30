var matchInfo;
var its = 0;
var loggingArray = ["", "", "", "", "", "", "", "", "", ""];

function startMatch() {
	setPositions();
}

function setPositions() {
	var http = new XMLHttpRequest();
	http.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			var result = JSON.parse(this.responseText);
			console.log(result);
			var c = document.getElementById("map");
			var ctx = c.getContext("2d");
			ctx.canvas.width = result[0];
			ctx.canvas.height = result[1];
			for (i = 2; i < result.length - 1; i++) {
				ctx.beginPath();
				ctx.moveTo(result[i], result[i + 1]);
				ctx.lineTo(result[i] + 1, result[i + 1] + 1);
				if (i < 24) {
					ctx.strokeStyle = '#ff0000';
				} else if (i > 12 && i < result.length - 3) {
					ctx.strokeStyle = '#0000FF';
				} else {
					ctx.strokeStyle = '#000000';
				}
				ctx.stroke();
				i++;
			}
			ctx.moveTo(result[result.length - 3], result[result.length - 2]);
			ctx.lineTo(result[result.length - 3] + 1, result[result.length - 2] + 1);
			ctx.stroke();
			matchInfo = result[result.length - 1];
			document.getElementById("result").innerHTML = matchInfo.kickOffTeam.name + ": " + matchInfo.kickOffTeamStatistics.goals + " - " + matchInfo.secondTeamStatistics.goals + " :" + matchInfo.secondTeam.name;
		}
	};
	http.open("GET", "/getStartPos", true);
	http.send();
}

function getMatch() {
	var iterations = 10;
	for (i = 0; i < iterations; i++) {
		movePlayers("/movePlayers");
	}
}

function movePlayers(endpoint) {
	var http = new XMLHttpRequest();
	http.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			its++;
			var result = JSON.parse(this.responseText);
			var c = document.getElementById("map");
			var ctx = c.getContext("2d");
			console.log(result);
			ctx.canvas.width = result[0];
			ctx.canvas.height = result[1];
			for (i = 2; i < result.length - 1; i++) {
				ctx.beginPath();
				ctx.moveTo(result[i], result[i + 1]);
				ctx.lineTo(result[i] + 1, result[i + 1] + 1);
				if (i < 24) {
					ctx.strokeStyle = '#ff0000';
				} else if (i > 12 && i < result.length - 3) {
					ctx.strokeStyle = '#0000FF';
				} else {
					ctx.strokeStyle = '#000000';
				}
				ctx.stroke();
				i++;
			}
			matchInfo = result[result.length - 1];
			loggingArray[0] = loggingArray[1];
			loggingArray[1] = loggingArray[2];
			loggingArray[2] = loggingArray[3];
			loggingArray[3] = loggingArray[4];
			loggingArray[4] = loggingArray[5];
			loggingArray[5] = loggingArray[6];
			loggingArray[6] = loggingArray[7];
			loggingArray[7] = loggingArray[8];
			loggingArray[8] = loggingArray[9];
			loggingArray[9] = "Iteration " + its + ": " + result[result.length - 1].iterationLog;
			document.getElementById("logging").innerHTML = loggingArray[0] + "<br>" + loggingArray[1] + "<br>" + loggingArray[2] + "<br>" + loggingArray[3] + "<br>" + loggingArray[4] + "<br>" + loggingArray[5] + "<br>" + loggingArray[6] + "<br>" + loggingArray[7] + "<br>" + loggingArray[8] + "<br>" + loggingArray[9];
			document.getElementById("result").innerHTML = matchInfo.kickOffTeam.name + ": " + matchInfo.kickOffTeamStatistics.goals + " - " + matchInfo.secondTeamStatistics.goals + " :" + matchInfo.secondTeam.name + "   Moves(" + its + ")";
			var elem = document.getElementById('logging');
			elem.scrollTop = elem.scrollHeight;
		}
	};
	http.open("GET", endpoint, true);
	http.send();
}

function switchSides() {
	loggingArray = ["", "", "", "", "", "", "", "", "", ""];
	var http = new XMLHttpRequest();
	http.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			var result = JSON.parse(this.responseText);
			console.log(result);
			var c = document.getElementById("map");
			var ctx = c.getContext("2d");
			ctx.canvas.width = result[0];
			ctx.canvas.height = result[1];
			for (i = 2; i < result.length - 3; i++) {
				ctx.beginPath();
				ctx.moveTo(result[i], result[i + 1]);
				ctx.lineTo(result[i] + 1, result[i + 1] + 1);
				if (i < 24) {
					ctx.strokeStyle = '#ff0000';
				} else if (i > 12 && i < result.length - 2) {
					ctx.strokeStyle = '#0000FF';
				} else {
					ctx.strokeStyle = '#000000';
				}
				ctx.stroke();
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

function getMatchDetails() {
	var http = new XMLHttpRequest();
	http.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			var mdetails = JSON.parse(this.responseText);
			document.getElementById("stats").innerHTML = "Half: " + mdetails.half + "<br>" + mdetails.kickOffTeam.name + " Statistics: <br>" + JSON.stringify(mdetails.kickOffTeamStatistics) + "<br>" + mdetails.secondTeam.name + " Statistics: <br>" + JSON.stringify(mdetails.secondTeamStatistics);
		}
	};
	http.open("GET", "/getMatchDetails", true);
	http.send();
}
