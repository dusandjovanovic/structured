## JSON

* **User**
```javascript
{
  username: String,
  password: String,
  friends[]: String
}
```

* **FriendRequest**
```javascript
{
  sender: String,
  receiver: String,
  time: Date
}
```

* **Room**
```javascript
{
  name: String,
  users[]: String,
  currentUsers: Number,
  maxUsers: Number,
  time: Date
}
```

## API

**PROMENE** Svaki zahtev vraca podatke u obliku:
```javascript
{
  success: Boolean,
  token | msg | data: SomeType
}
```
Ukoliko je zahtev ispunjen, success je true, ukoliko nije, success je false i drugi podatak je uvek msg tipa String koji sadrzi informacije o gresci.

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
