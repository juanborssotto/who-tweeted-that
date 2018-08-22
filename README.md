# Who tweeted that?!

Guess who of your friends tweeted that

Add your twitter's developer tokens to  ~/twitConfig.js
```js
module.exports = {
  consumer_key:         '...',
  consumer_secret:      '...',
  access_token:         '...',
  access_token_secret:  '...',
}
```

Run with npm
```shell
$ npm run make
`````
```shell
$ npm run start
`````

Run with docker
```shell
$ docker build -t who-tweeted-that .
`````
```shell
$ docker run -p 3000:3000 -it who-tweeted-that
`````

Server running at:
http://localhost:3000
