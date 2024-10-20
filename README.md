## Project setup

First, create the project name  'WalletOpenPayments'
Next, create two folders client(for frontend files) and server(for backend files)


---
title: Node.js
---

## Setup

First, create a directory for your project and `cd` into the directory.

Then, install the TigerBeetle client:

```console
npm install tigerbeetle-node
```

Now, create `server.js` and copy this into it:

```javascript
const { id } = require("tigerbeetle-node");
const { createClient } = require("tigerbeetle-node");

console.log("Import ok!");
```

Finally, build and run:

```console
node index.js
```

Now that all prerequisites and dependencies are correctly set
up, let's dig into using TigerBeetle.

## Frontend

- Create the html files for index, charrity and active projects
- Create the the js file, for payment form submission (for Donors) and for notifying donor (for Charities)

## Backend

create the 

```.env``` file

- Update `API_KEY` with the API endpoint that we created from https://sandbox.chimoney.io/

 - Run the following commands to setup locally,

```bash
npm install 
npm run dev
```
- create two js files, for interledger open payment and server.js for handling payments from donors, Charity notifies donor when money is spent, Send notification via WebSocket

## We are getting bugs and still trying to fix them


