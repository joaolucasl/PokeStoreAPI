# Pagar.me Challenge - Pokemon API
___

This project was built as part of the selection process for a position @ [Pagar.me](pagar.me), a Brazilian payments company offering awesome payment solutions for Brazil and LatAm.   
The challenge was to update an old and unmaintained API codebase and make it production-ready: refactoring, troubleshooting, organisation, etc. 

The original code sent as a basis for this challenge may be found in the `index.js` file, which isn't part of my code, per se.

## Getting started

After cloning or downloading this repository, go to the project's folder and run: ` npm install ` to download this project's dependencies. 
Now, copy the `.env.example` file to both `.env` and `.env.test` and setup your database credentials as well as your Pagar.me API Key. 

> Please notice that the `DB_STORAGE` environment variable is meant only for SQLite, so you may leave that field empty if you're using another type of database.

Now, start the API Server by running `npm start`. The server defaults to port `3000` - if you want to run it using another port setup a port before running the command, e.g. : `PORT=8080 npm start`.

### Testing
Some unit tests  were created to test the application endpoints. They probably are in a number much less than ideal, but I think decently cover most of the cases. If I had more time and this application would grow, I'd probably improve this testing section. For instance, I haven't created tests for the Models.
I used Mocha, Chai and SuperAgent for the test suites. While writing my tests I faced some performance issues, but I managed to surpass them. My hunt for the source of slowness [can be checked here.](https://twitter.com/joaolucasluc/status/755564106644594689)
You can run the tests for yourself using `npm run test` - this is important since there are some custom configuration to Mocha done in that call.

### Coding Style
I used [AirBNB's JS Style Guide](https://github.com/airbnb/javascript) with ESLint to keep my code organised and structured. You can run `npm run lint` to check that there are no warnings or errors related to style in this project!

### Stack
Since the code sent to me was written in Node but no version was specified I chose to work with Node v6.x to leverage ES6 capabilities. At the time of writing, Node v6.2 was the latest version and it was used in development - Other versions were not tested against. 
For development I used [SQLite](https://www.sqlite.org) but my tests with [MySQL](http://mysql.org) also worked well. Given we are using Sequelize as our ORM, other databases should also work with this project since it doesn't have any extraordinarily complex DB Operations. If you wish so, you can try setting up alternate databases in your `.env` files.

## Structure
The two available endpoints are `/pokemon` and `purchase`. This API accepts and returns JSON for all requests. 
I updated the original structure to be more compliant with a RESTful API design. Instead of using `actionname-pokemons` as my route naming pattern I leveraged the HTTP methods for different actions:

**Pokemon Endpoint:**

|	METHOD	 |	ACTION  |
|------------|----------|
|	GET		|	List All |
|	GET(:id)|	Details by Id|
|	POST	|	New Pokemon |

**Purchase Endpoint**

|	METHOD	 |	ACTION  |
|------------|----------|
|	POST	|	New Purchase |

###	`/pokemon` POST Parameters
This endoint is used to create a new Pokemon in the database, so you need to supply it with parameters accordingly. A sample valid request body would be:
```json
    {
        "name": "Charmeleon",
        "price": 830.6,
        "stock": 16
    }
```
### `/purchase` POST Parameters
To create a new purchase you must supply a few parameters in the request body. A valid request body would be similar as:
```json
    {
        "id": 20,
        "quantity": 1,
        "card_number": "4024007138010896",
        "card_holder_name": "Usuario de Teste",
        "card_expiration_date": "1050",
        "card_cvv": "123"
    }
```
I am fully aware that passing sensitive data to the payment gateway is not the best approach - had the deadline been longer, I would implement [the card hash approach](https://docs.pagar.me/api/#gerando-card_hash-manualmente), recommended by Pagar.me and way more secure than this one. Since I was oriented to not overengineer this project I didn't make a fuss about that, but I would certainly change this approach were I to update this project.

##	LICENSE

> The MIT License (MIT)
Copyright (c) 2016 João Lucas G. Lucchetta

> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

