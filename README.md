# Potluck Prototype
This is an MVP for creating wantlists for TradeMaximizer. The hope is that it can facilitate a math trade for things other than boardgames, which was the intention of the original TradeMaximizer. This only creates the wantlist text file that is inputted into the TradeMaximizer .jar file. Hope is that that is turned into a service or ported to javascript in the future to be done all in app.

Demo: https://potluck-prototype.herokuapp.com/

## How to install
- Install mongodb, setup a database
- Change `.env.example` to `.env` and fill info with your connection string
  - You can use cloud-based Atlas service or local mongodb server.
- `npm install` all the things in the root folder and `client` subfolder
- To start mongodb, start from command line: `mongod --auth`
- Run server in cli tab with `nodemon server.js`. This watches server files and reloads automatically
- Run front-end app by `cd client`, then `npm run start`. This also hot reloads
- Create a `seeds` collection with one entry with `counter: 0` property in database

## Innovation
To create the wantlists instead of using a grid like the OLWLG and Abecorn, or setting individual values, instead we simply sort a list. 

!Warning - Still need to implement duplicate protection though!

## Credits and Prior Art

- Used https://github.com/beaucarnes/mern-exercise-tracker-mongodb as foundation (Mongoose may have been unnecessary).
- Inspiration from: https://github.com/abecorn/abecornlite
  - Also the commercial site: abecorn.com
- The BoardGameGeek community and everything they've done and shared about Math Trades - https://boardgamegeek.com/wiki/page/Math_Trades
- The original TradeMaximizer: https://github.com/chrisokasaki/TradeMaximizer
- Online Wantlist Generator: https://boardgamegeek.com/wiki/page/OLWLG#toc12
- TradeMaximizer wiki: https://boardgamegeek.com/wiki/page/TradeMaximizer 

## Links to useful things
- Setting up mongo locally: https://zellwk.com/blog/local-mongodb/
- https://zendeskgarden.github.io/react-components/tables/ for the sorting table and how to use it with https://github.com/atlassian/react-beautiful-dnd
- Inspiration that this can work in real-life during COVID as well: https://boardgamegeek.com/thread/2459102/9th-annual-pacific-northwest-game-swap/page/14


## Configuration

### Set up a MongoDB database

Set up a MongoDB database either locally or with [MongoDB Atlas for free](https://mongodb.com/atlas).

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

### Run Next.js in development mode

```bash
npm install
npm run dev

# or

yarn install
yarn dev
```

Your app should be up and running on [http://localhost:3001](http://localhost:3001)! If it doesn't work, post on [GitHub discussions](https://github.com/vercel/next.js/discussions).

You will either see a message stating "You are connected to MongoDB" or "You are NOT connected to MongoDB". Ensure that you have provided the correct `MONGODB_URI` and `MONGODB_DB` environment variables.

When you are successfully connected, you can refer to the [MongoDB Node.js Driver docs](https://mongodb.github.io/node-mongodb-native/3.4/tutorials/collections/) for further instructions on how to query your database.

#### Deploy Your Local Project

- Follow these directions to deploy to heroku: https://mariestarck.com/deploy-your-next-js-app-to-heroku-in-5-minutes/
- Make sure `next` dependency in `package.json` is explicityly set: https://www.reddit.com/r/nextjs/comments/hdkkps/sh_1_next_not_found_when_deploying_on_heroku/
