
# Memopedia - Back/API

This project is the backend of the project named Memopedia


## Dependencies installation

All dependencies can be installed with the command : `npm install`


## Start the server

You can start the server with npm and nodemon, but you need to change the "entities" property of the **ormconfig.json** file :

**note -> nodemon must be installed to be used**

* **npm** -> "entities": ["dist/\*\*/\*\*/*.entity{.ts,.js}"] - `npm run start`
* **nodemon** -> "entities": ["src/\*\*/*.entity{.ts,.js}"] - `nodemon src/main.ts`

Then, the server should start at [http://localhost:2500](http://localhost:2500)

## Routes

The available routes are (with the prefix : **http://localhost:2500**) :

* *Post* - /account/createAccount : create a new user account
* *Get* - /account/login : login
* *Get* - /memes/ : random memes
* *Get* - /memes/one/:id : one meme by id
* *Get* - /memes/byTag?tags=tag1,tag2 : meme search by tags
* *Post* - /memes/postMeme : post a new meme

## Authors

- [@Uretashi](https://www.github.com/uretashi)
- [@YaourtSaveur](https://www.github.com/yaourtSaveur)
- [@NightOutrun](https://github.com/NightOutrun)
