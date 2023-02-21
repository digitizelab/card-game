# Card Game

## Technologies
* Node v16 is used with TypeScript
* Jest for testing

## Running the game

```sh
# Build TypeScript 
npm run build
# Play the game
npm start
```

## Tests with code coverage

```sh
npm run test:ci
```

## Running with Docker

```sh 
npm run up
```

## Running the game with hot-reload

```sh
# Build with hot-reload
npm run build:watch
# Run with nodemon + debug
npm run debug
```

## Todo
* Implement interfaces, remove concrete dependancies using DI
