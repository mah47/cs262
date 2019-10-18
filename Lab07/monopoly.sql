--
-- This SQL script builds a monopoly database, deleting any pre-existing version.
--
-- @author kvlinden
-- @version Summer, 2015
--

-- Drop previous versions of the tables if they they exist, in reverse order of foreign keys.
DROP TABLE IF EXISTS PlayerGame;
DROP TABLE IF EXISTS Game;
DROP TABLE IF EXISTS Player;
DROP TABLE IF EXISTS Property;
DROP TABLE IF EXISTS PlayerProperty;

-- Create the schema.
CREATE TABLE Game (
	ID integer PRIMARY KEY, 
	time timestamp
	);

CREATE TABLE Player (
	ID integer PRIMARY KEY, 
	emailAddress varchar(50) NOT NULL,
	name varchar(50)
	);

CREATE TABLE PlayerGame (
	PRIMARY KEY(gameID, playerID),
	gameID integer REFERENCES Game(ID), 
	playerID integer REFERENCES Player(ID),
	score integer,
	location integer NOT NULL,
	cash money
	);

CREATE TABLE Property (
	
	name varchar(50) PRIMARY KEY
	
);

CREATE TABLE PlayerProperty (
	gameID integer REFERENCES Game(ID) NOT NULL,
	playerID integer REFERENCES Player(ID) NOT NULL,
	propertyID integer REFERENCES Player(ID) NOT NULL,
	PRIMARY KEY (gameID, playerID, propertyID),
	houses integer,
	hotels integer
);
	

-- Allow users to select data from the tables.
GRANT SELECT ON Game TO PUBLIC;
GRANT SELECT ON Player TO PUBLIC;
GRANT SELECT ON PlayerGame TO PUBLIC;
GRANT SELECT ON Property TO PUBLIC;
GRANT SELECT ON PlayerProperty TO PUBLIC;

-- Add sample records.
INSERT INTO Game VALUES (1, '2006-06-27 08:00:00');
INSERT INTO Game VALUES (2, '2006-06-28 13:20:00');
INSERT INTO Game VALUES (3, '2006-06-29 18:41:00');

INSERT INTO Player(ID, emailAddress) VALUES (1, 'me@calvin.edu');
INSERT INTO Player VALUES (2, 'king@gmail.edu', 'The King');
INSERT INTO Player VALUES (3, 'dog@gmail.edu', 'Dogbreath');

INSERT INTO PlayerGame VALUES (1, 1, 0.00);
INSERT INTO PlayerGame VALUES (1, 2, 0.00);
INSERT INTO PlayerGame VALUES (1, 3, 2350.00);
INSERT INTO PlayerGame VALUES (2, 1, 1000.00);
INSERT INTO PlayerGame VALUES (2, 2, 0.00);
INSERT INTO PlayerGame VALUES (2, 3, 500.00);
INSERT INTO PlayerGame VALUES (3, 2, 0.00);
INSERT INTO PlayerGame VALUES (3, 3, 5500.00);

INSERT INTO Property VALUES ('Mediterranean Avenue');
INSERT INTO Property VALUES ( 'Atalantic Avenue');
INSERT INTO Property VALUES ('Oriental Avenue');
INSERT INTO Property VALUES ('St. James Place');
INSERT INTO Property VALUES ('Kentucky Avenue');

Insert INTO PlayerProperty(gameID, playerID, propertyID, houses) VALUES (1, 3, 03, 1);
Insert INTO PlayerProperty(gameID, playerID, propertyID, hotels) VALUES (2, 3, 05, 2);
Insert INTO PlayerProperty(gameID, playerID, propertyID, houses) VALUES (1, 1, 04, 3);
Insert INTO PlayerProperty(gameID, playerID, propertyID, hotels) VALUES (2, 2, 02, 2);

SELECT COUNT(*) FROM Property;
SELECT * FROM PlayerProperty;
