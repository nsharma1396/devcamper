# DevCamper API

> Backend API for DevCamper application, which is a bootcamp directory website developed using [Kvell.js](https://kvelljs.now.sh/)

## Usage

Rename "env.config" to ".env" and update the values/settings to your own

## Install Dependencies

```
npm install
```

## Run App

```
# Run in dev mode
npm start

# Run in prod mode
npm run build start
```

## Database Seeder

To seed the database with users, bootcamps, courses and reviews with data from the "\_data" folder, run

```
# Destroy all data
node seeder -d

# Import all data
node seeder -i
```

## Demo

The API is live at [https://www.devbootcamps.co.in/](https://www.devbootcamps.co.in/)

<!--
Extensive documentation with examples [here](https://www.devbootcamps.co.in/)
-->

- Version: 1.0.0
- License: MIT
- Author: Neeraj Sharma
