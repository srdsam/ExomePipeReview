# GGCRD-API

## Introduction

The backend serves exomiser analysis in JSON format to the frontend via a nodeJS based API. The backend also handles user authorization for the frontend using BasicAuth. The backend assumes that there is a PostgreSQL database set up in the format described [here](#Database). 

## Structure

[Server.js](server.js) is the root of the project.

User authentication is handled by [user.controller](users/user.controller.js), which uses [user.service](users/user.service.js) to match login to stored user. [basic-auth.js](helpers/basic-auth.js) ensures each query has the appropriate authorization header. 

API queries which supply the exomiser analysis from the database are handled by [queries.js](queries.js).

## Launching API

Once the [database](#Database) is set up, launch the app using `node server.js`. Data can be manually entered into the database using the commands defined in the cheat sheet below. Make sure that the login credentials for the database, defined in [queries.js](queries.js), are correct. 

## Database

Set up PosgreSQL DB:
```bash
brew install postgresql
brew services start postgresql
# brew services stop postgresql 
psql postgres
postgres=#
postgres=# CREATE ROLE me WITH LOGIN PASSWORD 'password';
postgres=# ALTER ROLE me CREATEDB;
postgres=# \q

psql -d postgres -U me
postgres=> CREATE DATABASE sample_db;
postgres=> \c sample_db

api=>
CREATE TABLE probands_json (
  id serial NOT NULL,
  proband text UNIQUE,
  data jsonb
);

```

## Database Commands Cheatsheet

\q | Exit psql connection
\c | Connect to a new database
\dt | List all tables
\du | List all roles
\list | List databases

Inserting data into the database manually:
```sql
\set content `cat ./data/F380A1A11B8447.json`
INSERT INTO probands (proband, data) VALUES ('F380A1A11B8447', :'content');
```

Reading from jsonb examples:
```sql
SELECT proband FROM probands;

SELECT jsonb_array_elements(data) FROM probands WHERE proband = 'E41420C6893BEC';

SELECT data -> 1 ->> 'geneSymbol' AS gene FROM probands;

SELECT (jsonb_array_elements(data)::jsonb)->'geneSymbol' AS text FROM probands WHERE proband = 'E41420C6893BEC';

SELECT (jsonb_array_elements(data -> 0 -> 'priorityResults' -> 'HIPHIVE_PRIORITY' -> 'queryPhenotypeTerms')::jsonb)->'label' AS text FROM probands WHERE proband = 'E41420C6893BEC';
```

## Tutorial & Resources Used in this Project

https://www.postgresqltutorial.com/install-postgresql-macos/

https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/

https://www.compose.com/articles/faster-operations-with-the-jsonb-data-type-in-postgresql/

https://heap.io/blog/engineering/when-to-avoid-jsonb-in-a-postgresql-schema -> WARNING: SLOW PERFORMANCE FOR SEARCH QUERIES

https://jasonwatmore.com/post/2018/09/24/nodejs-basic-authentication-tutorial-with-example-api

https://hackernoon.com/how-to-query-jsonb-beginner-sheet-cheat-4da3aa5082a3

