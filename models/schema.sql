DROP DATABASE IF EXISTS reflectdb;
CREATE DATABASE reflectdb;

DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;

USE reflectdb;
SELECT * FROM JournalEntries;

USE reflectdb;
SELECT * FROM Users;