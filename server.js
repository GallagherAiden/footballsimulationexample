//------------------------
//    NPM Modules
//------------------------
var fs = require("fs");
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var async = require("async");
var http = require("http");
var footballEngine = require("footballsimulationengine");
var matchInfo;
let its;

//---create a new express server-------
var app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

//------------------------
//    Express Endpoints
//------------------------
app.all("/", function (req, res) {
	return res.redirect('/match.html');
});

app.get("/getstartPOS", function (req, res) {
	readFile("teams/pitch.json").then(function (pitchSize) {
		readFile("teams/Slugs.json").then(function (team1) {
			readFile("teams/Dragons.json").then(function (team2) {
				footballEngine.initiateGame(team1, team2, pitchSize).then(function (matchSetup) {
					matchInfo = matchSetup;
					console.log(matchSetup)
					processPositions(matchInfo.kickOffTeam, matchInfo.secondTeam, matchInfo).then(function (sendArray) {
						res.send(sendArray);
					}).catch(function (error) {
						console.error("Eror when processing positions: ", error);
					})
				}).catch(function (error) {
					console.error("Error: ", error);
				});
			});
		});
	});
});

app.get("/startSecondHalf", function (req, res) {
	footballEngine.startSecondHalf(matchInfo).then(function (matchSetup) {
		matchInfo = matchSetup;
		processPositions(matchInfo.kickOffTeam, matchInfo.secondTeam, matchInfo).then(function (sendArray) {
			res.send(sendArray);
		}).catch(function (error) {
			console.error("Eror when processing positions: ", error);
		});
	}).catch(function (error) {
		console.error("Error: ", error);
	});
});

app.get("/movePlayers", function (req, res) {
	footballEngine.playIteration(matchInfo).then(function (matchSetup) {
		its++;
		matchInfo = matchSetup;
		processPositions(matchInfo.kickOffTeam, matchInfo.secondTeam, matchInfo).then(function (sendArray) {
			res.send(sendArray);
		}).catch(function (error) {
			console.error("Eror when processing positions: ", error);
		});
	}).catch(function (error) {
		console.error("Error: ", error);
	});
});

app.get("/getMatchDetails", function (req, res) {
	console.log(matchInfo);
	res.send();
});

//------------------------
//   Functions
//------------------------
function readFile(filePath) {
	return new Promise(function (resolve, reject) {
		fs.readFile(filePath, 'utf8', function (err, data) {
			if (err) {
				reject(err);
			} else {
				data = JSON.parse(data);
				resolve(data);
			}
		})
	});
}

function processPositions(A, B, C) {
	return new Promise(function (resolve, reject) {
		var sendArray = [];
		sendArray.push(C.pitchSize[0]);
		sendArray.push(C.pitchSize[1]);
		async.eachSeries(A.players, function eachPlayer(thisPlayerA, thisPlayerACallback) {
			sendArray.push(thisPlayerA.startPOS[0]);
			sendArray.push(thisPlayerA.startPOS[1]);
			thisPlayerACallback();
		}, function afterAllAPlayers() {
			async.eachSeries(B.players, function eachPlayer(thisPlayerB, thisPlayerBCallback) {
				sendArray.push(thisPlayerB.startPOS[0]);
				sendArray.push(thisPlayerB.startPOS[1]);
				thisPlayerBCallback();
			}, function afterAllBPlayers() {
				sendArray.push(C.ball.position[0]);
				sendArray.push(C.ball.position[1]);
				sendArray.push(C);
				resolve(sendArray);
			});
		});
	});
}
//------------------------
//    Express HTTP
//------------------------

// serve the files out of ./public as our main files
app.use(express.static("public"));

//create a HTTP listener
http.createServer(app).listen(1442);
console.log("server starting on IP using port 1442 for HTTP");
