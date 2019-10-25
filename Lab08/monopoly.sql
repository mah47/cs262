--
-- This SQL script builds a monopoly database, deleting any pre-existing version.
--
-- @author kvlinden
-- @version Summer, 2015
--

-- Drop previous versions of the tables if they they exist, in reverse order of foreign keys.
DROP TABLE IF EXISTS PlayerGame CASCADE;
DROP TABLE IF EXISTS Game CASCADE;
DROP TABLE IF EXISTS Player CASCADE;
DROP TABLE IF EXISTS Property CASCADE;
DROP TABLE IF EXISTS PlayerProperty CASCADE;

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
	PRIMARY KEY (gameID, playerID),
	gameID integer REFERENCES Game(ID) NOT NULL,
	playerID integer REFERENCES Player(ID) NOT NULL,
        location integer NOT NULL,
	cash money,
	score integer
	);

CREATE TABLE Property (
	ID integer PRIMARY KEY,
	name varchar(50) NOT NULL,
	category varchar(50) NOT NULL
);

CREATE TABLE PlayerProperty(
	PRIMARY KEY (gameID, playerID, propertyID),
	gameID integer REFERENCES Game(ID) NOT NULL,
	playerID integer REFERENCES Player(ID) NOT NULL,
	propertyID integer REFERENCES Property(ID) NOT NULL,
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
INSERT INTO GAME VALUES (4, '2019-10-25 03:20:10');
INSERT INTO GAME VALUES (5, '2019-10-25 04:20:10');

INSERT INTO Player(ID, emailAddress) VALUES (1, 'me@calvin.edu');
INSERT INTO Player VALUES (2, 'king@gmail.edu', 'The King');
INSERT INTO Player VALUES (3, 'dog@gmail.edu', 'Dogbreath');
INSERT INTO Player VALUES (4, 'cat@gmail.edu', 'Catbreath');
INSERT INTO Player VALUES (5, 'mono@calvin.edu', 'Monop');

INSERT INTO PlayerGame VALUES (1, 1, 0, 500, 2750.00);
INSERT INTO PlayerGame VALUES (1, 2, 0, 500, 600.00);
INSERT INTO PlayerGame VALUES (1, 3, 0, 500, 2850.00);
INSERT INTO PlayerGame VALUES (2, 1, 0, 750, 1750.00);
INSERT INTO PlayerGame VALUES (2, 2, 0, 500, 2550.00);
INSERT INTO PlayerGame VALUES (2, 3, 0, 500, 1000.00);
INSERT INTO PlayerGame VALUES (2, 4, 0, 200, 5438.50);
INSERT INTO PlayerGame VALUES (3, 2, 0, 500, 500.00);
INSERT INTO PlayerGame VALUES (3, 3, 0, 500, 6000.00);

INSERT INTO Property VALUES (01,'Mediterranean Avenue','Dark Purple');
INSERT INTO Property VALUES (02, 'Atalantic Avenue', 'Light Blue');
INSERT INTO Property VALUES (03,'Oriental Avenue', 'Red');
INSERT INTO Property VALUES (04,'St. James Place', 'Orange');
INSERT INTO Property VALUES (05,'Kentucky Avenue', 'Yellow');


Insert INTO PlayerProperty(gameID, playerID, propertyID, houses) VALUES (1, 3, 03, 1);
Insert INTO PlayerProperty(gameID, playerID, propertyID, hotels) VALUES (2, 3, 05, 2);
Insert INTO PlayerProperty(gameID, playerID, propertyID, houses) VALUES (1, 1, 04, 3);
Insert INTO PlayerProperty(gameID, playerID, propertyID, hotels) VALUES (2, 2, 02, 2);