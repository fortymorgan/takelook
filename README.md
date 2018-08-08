# Takelook
App for search TV-shows with [TVmaze API](http://www.tvmaze.com/api).

## Screenshots

### Search result
<img src="https://github.com/fortymorgan/takelook/blob/master/screenshots/Search.png" alt="Search" title="Search result" />

### Show info
<img src="https://github.com/fortymorgan/takelook/blob/master/screenshots/Show.png" alt="Show" title="Show info" />

## How to develop
First you need to create `bundle.js` with:
```
npm run build
```
Then, to run the app locally:
```
npm run start
```
Server wil listen to `http://localhost:3000`. (You can change port number in `server.js`)

## How to deploy
First you need to install [Surge](http://surge.sh)
```
npm install -g surge
```
Change domain prefix for `deploy-surge` script in `package.json`, then run:
```
npm run deploy
```
If it your first run, Surge will ask you for email and password and create an account for you.  
Then the project will be deployed for domain, which you used in `package.json` `deploy-surge` script.  
(If domain is already used, Surge will tell about that).
