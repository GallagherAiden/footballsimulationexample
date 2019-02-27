# Football Simulation Example
---
## Overview
This project is an example implementation of the [footballsimulationengine](https://www.npmjs.com/package/footballsimulationengine) node module available on npmjs.

---
## Install
1. Download the project onto your system ({dir})
2. cd {dir}
3. run ``npm install``
---
## Run the Game
1. load your team into the {dir}/teams directory (you can use an existing team as an example)
2. in '{dir}/server.js' change for team1 and team2:
```
readFile("teams/team1.json").then(function (team1) {
```
to your newly created .json file i.e.
```
readFile("teams/myTeam.json").then(function (team1) {
```
3. Set the pitch size by changing the ``pitchWidth`` and ``pitchHeight`` in '{dir}/teams/pitch.json'
*Note: Any changes will need changes made to the start positions of the players*
4. run ``npm start``
5. Go To ``http://localhost:1442/match.html``
---
## Playing A Match
1. Press ``Setup``
- This starts a new match where the pitch size is displayed on the screen and the players are in their correct positions.
2. Press ``>``
- This runs half the number of iterations defined in `public/js/match.js`
```
var gamelength = 12000;
```
3. Press pause ``||`` to pause the iteration
4. Press ``2nd Half`
- This flips the players to opposite sides
5. Press ``Show Logs`` to toggle on or off logging
i.e. `Iteration 50: Closest Player to ball: Louise Johnson,Closest Player to ball: Aiden Smith`

---
* See a match example [here](https://www.youtube.com/watch?v=ZuMKhEpWPEI)