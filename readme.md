# Football Simulation Example
---
## Overview
This project is an example implementation of the [footballsimulationengine](https://www.npmjs.com/package/footballsimulationengine) node module available on npmjs.

---
## Install & Start Game
1. Download the project onto your system ({dir})
2. cd {dir}
3. run ``node server.js``
4. Go To ``http://localhost:1442/match.html``
---
## Playing A Match
1. Press ``start match``
- This starts a new match where the pitch size is displayed on the screen and the players are in their correct positions.
2. Press ``play match``
- This runs '10' iterations, moving the players and give iteration logs for each iteration.
i.e. `Iteration 50: Closest Player to ball: Louise Johnson,Closest Player to ball: Aiden Smith`
3. Press ``play match`` until the iterations reach 5,000
- We can make this quicker by changing the number of iterations per "play" in {dir}/public/js/match.js
```
function getMatch() {
	var iterations = 10;
	for (i = 0; i < iterations; i++) {
		movePlayers("/movePlayers");
	}
}
```
to
```
function getMatch() {
	var iterations = X;
	for (i = 0; i < iterations; i++) {
		movePlayers("/movePlayers");
	}
}
```
where X is the number of iterations to do at a time.
4. Press ``start second half``
- This flips the players to opposite sides
5. Press ``play match`` until the iterations reach 10,000
6. Record the results
---
