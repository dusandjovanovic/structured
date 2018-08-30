# Model perzistencije i podataka

## Model perzistencije

Zbog kompatibilnosti unutar MEAN (MongoDB, Express, Angular, Node.js) stack-a kao i pogodnosti koje pruža zahvaljujući svojoj asinhronoj prirodi odabrali smo MongoDB. Ne-striktno struktuirana priroda podataka koje čuvamo zahtevala je implementaciju noSQL baze podataka, a MongoDB se pozicionirala kao standard na ovom polju.

Šema baze mapirana je pomoću Mongoose biblioteke za objektno modeliranje.

**UserSchema**
```javascript
{
  username: String,
  password: String,
  about: String,
  history: [{
    date: Date,
    score: Number
  }],
  friends: [String]
}
```

**RoomSchema**
```javascript
{
  name: String,
  roomType: String,
  users: [String],
  graph: [String],
  currentUsers: Number,
  maxUsers: Number,
  createdBy: String,
  time: Date
}
```

**FriendRequest**
```javascript
{
  sender: String,
  receiver: String,
  time: Date
}
```

**GraphSchema**
```javascript
{
  nodes: [{
    index: Number,
    key: String,
    vx: Number,
    vy: Number,
    x: Number,
    y: Number,
    inEdges: [String],
    outEdges: [String]
  }],
  edges: [{
    index: Number,
    key: String,
    source: {
      index: Number,
      key: String,
      vx: Number,
      vy: Number,
      x: Number,
      y: Number,
      inEdges: [String],
      outEdges: [String]
    },
    target: {
      index: Number,
      key: String,
      vx: Number,
      vy: Number,
      x: Number,
      y: Number,
      inEdges: [String],
      outEdges: [String]
    }
  }]
}
```

## Model podataka

Za pribavljanje modela perzistencije i njihovo transformisanje u odgovarajući model podataka definisan je RESTful API. Sam model perzistencije je napravljen tako da je potrebno minimalno transformisanje u model podataka. Većina API ruta vraća model podataka na način na koji je on sačuvan u bazi, dok samo nekoliko ruta vrši transformaciju u odgovarajući oblik koji se očekuje na front-endu.

Svaki zahtev vraca podatke u obliku:
```javascript
{
  success: Boolean,
  token | msg | data: SomeType
}
```
Ukoliko je zahtev ispunjen, success je true, ukoliko nije, success je false i drugi podatak je uvek msg tipa String koji sadrži informacije o grešci.

### Auth
* **URI**: /api/auth

| Call        | Type    | Params                | Body                                    | Data                                      |
|-------------|---------|-----------------------|-----------------------------------------|-------------------------------------------|
| /register   | POST    | /                     | username: String, password: String, about: String  | /                              |
| /login      | POST    | /                     | username: String, password: String      | token: JWT token                          |
                    
### User                    
* **URI**: /api/user                    
                    
| Call        | Type    | Params                | Body                                    | Data                                      |
|-------------|---------|-----------------------|-----------------------------------------|-------------------------------------------|
| /:username  | GET     | username: String      | /                                       | data: User                                |
| /:username/history  | GET     | username: String      | /                               | history: {date: Date, score: Number}      |
| /:username  | PUT     | username: String      | score: Number                           | msg: String                               |
                    
### Friend request                    
* **URI**: /api/friend-request                    
                    
| Call        | Type    | Params                | Body                                    | Data                                      |
|-------------|---------|-----------------------|-----------------------------------------|-------------------------------------------|
| /:username  | GET     | username: String      | /                                       | data: FriendRequest[]                     |
| /add        | POST    | /                     | sender: String, receiver: String        | msg: String                               |
| /confirm    | POST    | /                     | id: String                              | msg: String                               |
| /delete/:id | DELETE  | id: String            |  /                                      | msg: String                               |
| /check      | POST    | /                     | sender: String, receiver: String        | data: {exists: Boolean, friends: Boolean} |

### Room
* **URI**: /api/room

| Call        | Type    | Params                | Body                                    | Data                                      |
|-------------|---------|-----------------------|-----------------------------------------|-------------------------------------------|
| /:mode      | GET     | mode: String          | /                                       | data: Room[]                              |
| /get/:name  | GET     | name: String          | /                                       | data: Room                                |
| /get-graph/:name| GET | name: String          | /                                       | data: Number[]                            |
| /           | POST    | /                     | name: String, maxUsers: Number, createdBy: String, roomType: String   | msg: String |
| /join       | POST    | /                     | roomName: String, username: Number      | msg: String                               |
| /leave      | POST    | /                     | roomName: String, username: Number      | msg: String, newMaster: String            |
| /:name      | PUT     | name: String          | node: Number                            | msg: String                               |
| /:id        | DELETE  | id: String            | /                                       | msg: String                               |

### Graph
* **URI**: /api/graph

| Call        | Type    | Params                | Body                                    | Data                                      |
|-------------|---------|-----------------------|-----------------------------------------|-------------------------------------------|
| /:id        | GET     | id: String            | /                                       | data: Graph                               |
| /           | POST    | /                     | graph: Graph                            | msg: String                               |
