This is a small guide to run and use the API
The project is made using Node JS

Dependencies:
- body-parser
- cors
- csv-parser
- express
- sequelize
- sqlite3

Dev-Dependencies:
- chai
- mocha
- nodemon
- supertest

API Endpoits:

 - resorce : "computer" url:"/computer"
    - GET '/' : Returns all computers paginated 10 per page and page index 1
        - Optional query params limit and size
        - example '/computer?limit=10&page=2'
        - example response:
            - {count:10,result:[...],totalCount:1308}
    - GET '/cpus' Return all cpu types available and their count
        - - {count:10,cpus:[...]}
    - GET '/ram' Return all ram types available and their count
        - - {count:10,ram:[...]}
    - GET '/opsys' Return all opsys types available and their count
        - - {count:10,opsys:[...]}
    - GET '/inches' Return all inches types available and their count
        - - {count:10,inches:[...]}
    - POST '/search'
        - BODY 
            - {company:"string",product:"string",cpu:"Array",ram:"Array",opsys:"Array",inches:"Array"}
        - Optional query params limit and size
        - example '/computer/search?limit=10&page=2'
        - example response:
        - {count:10,result:[...],totalCount:28}

INSTALL instructions:
You must have installed NodeJS 
- npm install

RUN instructions:
- npm run

TEST instructions:
- uncomment index.js last line
- npm test
