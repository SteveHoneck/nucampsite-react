# nucampsite-react

Application created throughout the course of the Nucamp Bootcamp. Built using React. 

Allows users to explore information on campsites, review and post comments, and register for campsites.

### Installation
- Install MongoDB (project built and tested with 4.2.13) via [MongoDB website](https://www.mongodb.com/try/download/community)
- Clone / download `nucampsite-react`
- Open the `nucampsite` folder in code editor / terminal and install dependencies with:

```
$ yarn install
```

- Clone / download [nucampsiteServer](https://github.com/SteveHoneck/nucampsiteServer)
- Open `nucampsiteServer` in code editor / terminal and install dependencies with:

```
$ npm install
```

- Open a terminal in the `nucampsiteServer` folder and start MongoDB with:

```
$ mongod --dbpath=data
```

- Open a second terminal in the `nucampsiteServer` folder and start the server with:

```
$ npm start
```

- Open a third terminal in the `nucampsite` folder and start the React client with:

```
$ yarn start
```
- A web browser should open with to the Nucamp site. If it does not, open a browser and navigate to http://localhost:3001 


That's it! Explore the NuCamp website. 

There is not support for registering a new user at this point, but to login, use: 
- Username: admin
- Password: password

Future updates:
- Add frontend support to Register a user
- Add backend support for submitting feedback
- If user is not logged in: remove favorites from Nav Bar, remove option to add a comment to a campsite
