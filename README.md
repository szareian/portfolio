# Portfolio
[![Build Status](https://travis-ci.com/szareian/portfolio.svg?branch=master)](https://travis-ci.com/szareian/portfolio)

Portfolio is a full stack web application built on __Angular__, __Node.js__, and __express__ that provides NBA-related news/reports such as:
- Players personal information e.g. height, weight, position,...
- Each player's seasonal average filtered based on season.
- A Team schedule displaying the matchups, game arena, scores and the status of games in a specific season.  
- The latest news (Twitter) from NBA,teams and players.
 
## Demo
### Dashboard:
Players can be queried by their first name or last name or both:
![Dashboard](src/assets/gifs/portfolio_dashboard.gif)

By clicking on a player, his personal info. and NBA stats (for a specific season) can be found.

### Team Schedule:
A timetable that provides the games played by a team during a specified season including both regular season and postseason. 

One can lookup different schedules by providing the name of the team and a season at the top of the page. For instance, the games played by lakers in 2016-17 season are displayed below:

![Team Schedule](src/assets/gifs/portfolio_team_schedule.gif)

__Note:__ Other information provided about the games are:
- The status of the game: Final, TBD, or the last completed quarter (i.e. 1,2,3).
- The scores: given the game is either taking place right now or are already finished.
- The arena in which the game is being played at.
- The date and the exact time the game starts/started.

### News (Twitter):
The latest tweets by NBA, teams, players, and, sport journalists:

![News](src/assets/gifs/portfolio_news.gif)

## License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
