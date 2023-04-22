# GGCRD-Client

## Introduction

This project is the reactJS frontend for the client. Scripts defining the functioning of the page are all found in [src](./src). [build](./build) is the minified production build of the entire app. [public](./public) consists of graphics that can later be used to improve the app. [app-server.js](app-server.js) is a script that launches the production version of the project.

## Structure

All of the components of the website are within [src](./src). The project is seperated into three 'pages':

- [loginPage](./src/loginPage/loginPage.jsx)
    - Renders login form
    - Uses [user.service](./src/services/user.service.js) to authenticate user

- [homePage](./src/homePage/homePage.jsx)
    - Renders table with list of probands
    - Each proband has link to samplePage for that specific proband
    - Uses [api.service](./src/services/api.service.js) to GET request list of probands, and then GET request the phenotype of each proband. 
    - Uses [user.service](./src/services/user.service.js) to authenticate user

- [samplePage](./src/samplePage/samplePage.jsx)
    - Renders exomiser analysis of a proband for the selected gene
    - Contains function to autogenerate report for proband
    - Uses [navibar component](./src/component/Navibar.jsx) to create a top navigation bar. 
    - Uses [clinvar component](./src/component/Clinvar.jsx) to handle the clinvar analysis. 
    - Uses [VEP component](./src/component/Vep.jsx) to handle the VEP analysis. 
    - Uses [api.service](./src/services/api.service.js) to GET request list of genes for the proband, and full exomiser analysis of proband. 
    - Uses [user.service](./src/services/user.service.js) to authenticate user

The [helpers dir](./src/helpers) contains two functions for parsing json retrieved via API. ReactJS fails to map nested JSON, which is why these exist. It also contains a helper function for writing BasicAuth headers. [Private route](./src/component/privateRoute.js) ensures users are logged in using redirects. 

## Launching the App

### Launching in Production

`npm run build`
`node app-server.js`

### Launching in Testing

`npm start`

### Logging In

Currently the user logins are hardcoded [here](../ggcrd-api/users/user.service.js). In the future these should be shifted into the database, and withdrawn using a query. 
