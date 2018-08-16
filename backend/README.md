## socket.io

URL: http://localhost:2998/graph

Pseudokod client strane:
```javascript
onJoinRoom() {
  if (user.name != room.createdBy) // ukoliko nije 'master' korisnik
    emit('get graph', {username: user.name, masterName: room.createdBy})
  
  on(user.name, (graph) => {
    setCurrentGraph(graph)
  }
}
```
```javascript
// u konstruktoru, npr.
if (user.name === room.createdBy) // definisemo samo za 'mastera'
  on(room.createdBy, (rcv) => {
    emit('graph', {username: rcv.username, graph: getCurrentGraph()})
  }
```
```javascript
onAddNode(newNode) {
  emit('add node', {room: room.name, sender: user.name, node: newNode})
}

onAddEdge(newEdge) {
  emit('add edge', {room: room.name, sender: user.name, edge: newEdge})
}
```
```javascript
// u konstruktoru, npr. ili bilo gde gde vam odgovara
on.(room.name + ' add node', (rcv) => {
  addNode(rcv.node) // takodje postoji i rcv.sender za onog koji je napravio izmenu
}

on.(room.name + ' add edge', (rcv) => {
  addEdge(rcv.edge) // takodje postoji i rcv.sender za onog koji je napravio izmenu
}
```

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
| /register   | POST    | /                     | username: String, password: String      | /                                         |
| /login      | POST    | /                     | username: String, password: String      | token: JWT token                          |
                    
### User                    
* **URI**: /api/user                    
                    
| Call        | Type    | Params                | Body                                    | Data                                      |
|-------------|---------|-----------------------|-----------------------------------------|-------------------------------------------|
| /:username  | GET     | username: String      | /                                       | data: User                                      |
                    
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

*GET zovite ovako za sad: /api/room/all, naknadno ce ubacimo ostale podele*

| Call        | Type    | Params                | Body                                    | Data                                      |
|-------------|---------|-----------------------|-----------------------------------------|-------------------------------------------|
| /:mode      | GET     | mode: String          | /                                       | data: Room[]                              |
| /get/:name  | GET     | name: String          | /                                       | data: Room                                |
| /get-graph/:name| GET | name: String          | /                                       | data: Number[]                            |
| /           | POST    | /                     | name: String, maxUsers: Number, createdBy: String, roomType: String   | msg: String |
| /join       | POST    | /                     | roomName: String, username: Number      | msg: String                               |
| /leave      | POST    | /                     | roomName: String, username: Number      | msg: String                               |
| /:name      | PUT     | name: String          | node: Number                            | msg: String                               |
| /:id        | DELETE  | id: String            | /                                       | msg: String                               |
