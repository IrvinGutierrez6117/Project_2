# Express App Starter [![Build Status](https://travis-ci.com/bburrier/express-ci-starter.svg?branch=master)](https://travis-ci.com/bburrier/express-ci-starter)

Simple Node/Express CRUD application and scaffolding to help students quickly get started with a new project, with tests and CI support.

- Node + Express
- Sequelize
- Handlebars
- Mocha + Chai
- Travis CI

## Development Setup

```
# Install packages
npm install

# Initialize local database
mysql < models/schema.sql

# Create .env, update as needed
cp .env.example .env

# Run tests
npm test

# Start node application
npm start
```

## Heroku Deployment
1. Create application [https://devcenter.heroku.com/articles/git](https://devcenter.heroku.com/articles/git)
2. Add on JawsDB [https://devcenter.heroku.com/articles/jawsdb](https://devcenter.heroku.com/articles/jawsdb)


