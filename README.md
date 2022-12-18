# Potluck Prototype

This is an MVP for creating wantlists for TradeMaximizer. The hope is that it can facilitate a math trade for things other than boardgames, which was the intention of the original TradeMaximizer. This only creates the wantlist text file that is inputted into the TradeMaximizer .jar file. The hope is that java file can be turned into a service or ported to javascript in the future so that everything can be done in this app.

Demo: https://nextjs-potluck.netlify.app/

## How to install

### Set up a MongoDB database

Set up a MongoDB database either locally or with [MongoDB Atlas for free](https://mongodb.com/atlas).

- To start mongodb, start from command line: `mongod --auth`

### Set up environment variables

Copy the `env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Set each variable on `.env.local`:

- `ATLAS_URI` - Cloud connection string
- `LOCAL_URI` - Local DB connection string
- `LOCAL_MONGODB_DB` - Local DB Name
- `ATLAS_MONGODB_DB` - Cloud DB Name
- `LOCAL_MONGOOSE_URI` - URI with local db in connection string
- `ATLAS_MONGOOSE_URI` - URI with cloud db in connection string
- `SEED_PREFIX` - Starting seed prefix. TODO: Have the app set automatically from this config, instead of manually by the developer

### Run Next.js in development mode

```bash
npm install
npm run dev

# or

yarn install
yarn dev
```

Your app should be up and running on [http://localhost:3001](http://localhost:3001)!

### Set up seed. IMPORTANT!

You only have to do this once, before using the application for the first time. Hit the api endpoint: "http:/localhost:3001/api/seeds" with a POST request with an object of form:

```js
{
  prefix: YOUR_CHOICE_STRING,
  counter: 0
}
```

This will create a seed that is used to create the official names for offerings.

#### Deploy Your Local Project

- Follow these directions to deploy to heroku: https://mariestarck.com/deploy-your-next-js-app-to-heroku-in-5-minutes/
- Make sure `next` dependency in `package.json` is explicityly set: https://www.reddit.com/r/nextjs/comments/hdkkps/sh_1_next_not_found_when_deploying_on_heroku/

## Innovation

To create the wantlists instead of using a grid like the OLWLG and Abecorn, or setting individual values, instead we simply sort a list. This means that the process of evaluating trades for the user decreases from O(n^2) to O(n) complexity.

!Warning - Still need to implement duplicate protection though!

## Credits and Prior Art

- Used https://github.com/beaucarnes/mern-exercise-tracker-mongodb as foundation (Mongoose may have been unnecessary).
- Inspiration from: https://github.com/abecorn/abecornlite
  - Also the commercial site: abecorn.com
- The BoardGameGeek community and everything they've done and shared about Math Trades - https://boardgamegeek.com/wiki/page/Math_Trades
- The original TradeMaximizer: https://github.com/chrisokasaki/TradeMaximizer
- Online Wantlist Generator: https://boardgamegeek.com/wiki/page/OLWLG#toc12
- TradeMaximizer wiki: https://boardgamegeek.com/wiki/page/TradeMaximizer
- Javascript Implementation of TradeMaximizer: https://boardgamegeek.com/thread/2818260/javascript-implementation-trademaximizer

## Links to useful things

- Setting up mongo locally: https://zellwk.com/blog/local-mongodb/
- https://zendeskgarden.github.io/react-components/tables/ for the sorting table and how to use it with https://github.com/atlassian/react-beautiful-dnd
- Inspiration that this can work in real-life during COVID as well: https://boardgamegeek.com/thread/2459102/9th-annual-pacific-northwest-game-swap/page/14
