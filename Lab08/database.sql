--LAB 08 Part 1

--A
--SELECT * FROM Game ORDER BY time DESC;

--B
--SELECT * FROM GAME WHERE time > Now() - INTERVAL '1 week';

--C
--SELECT * FROM Player WHERE name IS NOT NULL;

--D
--SELECT Player.ID FROM Player, PlayerGame WHERE Player.ID = PlayerGame.playerID AND PlayerGame.score > 2000.00;

--E
--SELECT * FROM Player WHERE emailAddress LIKE '%GMail%' OR emailAddress LIKE '%gmail%';



--Lab08 Part 2

--A
--SELECT PlayerGame.score FROM PlayerGame, Player WHERE PlayerGame.playerID = Player.ID AND Player.name = 'The King' ORDER BY PlayerGame.score DESC;

--B
--SELECT Player.name FROM Player, Game, PlayerGame WHERE Player.ID = PlayerGame.playerID AND Game.ID = PlayerGame.gameID AND Game.time = '2006-06-28 13:20:00' ORDER BY PlayerGame.score DESC LIMIT 1;

--C
--SELECT P1.name FROM Player AS P1, Player AS P2 WHERE P1.name = P2.name AND P1.ID < P2.ID;
--P1.ID < P2.ID stops the statement from returning players that are equal

--D
--I guess that it compares name and ID because if there a 2 usernames or ID # then there will be an issue. (example calvin student ID number, 
--if there are 2 usernames and ID number then they must generate a new one.