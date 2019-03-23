
Test

.
├── README.md 
├── config
│   └── config.js `Details for configuring connection (password, etc.)`

├── models `Directory for files that handle db and table creation`

│   ├── example.js `Model for creating a table titled "example". Need to create our own (3 tables)`

│   ├── index.js `Do not touch. Created for free using squelize`

│   └── schema.sql `SQL file for creating db only. Just need to rename`

├── node_modules `Do not touch`
│
├── package-lock.json `Do not touch`

├── package.json `Do not touch. Directory for project details and dependencies. (Maybe change project name?)`

├── public `Public directory for Front-End logic and styling files`
│   ├── js
│   │   └── index.js `Contains logic for handling server requests and responses for form submitions and button clicks`
│   └── styles
│       └── styles.css `Styles our shit`

├── routes `Back-End logic dir for hanlding requests from UI and sending responses`

│   ├── apiRoutes.js `Handles db data requests view url paths / (CRUD) / Sends back json`

│   └── htmlRoutes.js `Handles db data requests via url paths / responses render html`
├── server.js
├── test
│   └── canary.test.js `test logic (idk)`

└── views `dir for Hanldebars html construction`
    ├── 404.handlebars `html for 404 errors for unmatching url paths`
    ├── example.handlebars `html container for rendering "example" data in main.handlebars layout`
    ├── index.handlebars `html div for rendering form in main. Note: contains script links to Jquery and index.js`
    └── layouts `
        └── main.handlebars `Main html skeleton for UI`

Test

Plan

1. Map out all needed files and directories using planned components of the app

2. Psuedo code in each file (planned contents and functionality) ex. Get/Post requests and potential urls

3. If we re-use existing example files (comment out working code for reference and delete when component is working)

4. Assign TODOs based on need and order to get MVP functioning