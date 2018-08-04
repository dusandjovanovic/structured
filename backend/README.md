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

| Call       | Type    | Params                | Body                                    | Data                                      |
|------------|---------|-----------------------|-----------------------------------------|-------------------------------------------|
| /register  | POST    | /                     | username: String, password: String      | /                                         |
| /login     | POST    | /                     | username: String, password: String      | token: JWT token                          |
                    
### User                    
* **URI**: /api/user                    
                    
| Call       | Type    | Params                | Body                                    | Data                                      |
|------------|---------|-----------------------|-----------------------------------------|-------------------------------------------|
| /:username | GET     | username: String      | /                                       | data: User                                      |
                    
### Friend request                    
* **URI**: /api/friend-request                    
                    
| Call       | Type    | Params                | Body                                    | Data                                      |
|------------|---------|-----------------------|-----------------------------------------|-------------------------------------------|
| /:username | GET     | username: String      | /                                       | data: FriendRequest[]                     |
| /add       | POST    | /                     | sender: String, receiver: String        | msg: String                               |
| /confirm   | POST    | /                     | id: String                              | msg: String                               |
| /delete    | DELETE  | id: String            |  /                                      | msg: String                               |
| /check     | POST    | /                     | sender: String, receiver: String        | data: {exists: Boolean, friends: Boolean} |

### Room
* **URI**: /api/room

*GET zovite ovako za sad: /api/room/all, naknadno ce ubacimo ostale podele*

| Call       | Type    | Params                | Body                                    | Data                                      |
|------------|---------|-----------------------|-----------------------------------------|-------------------------------------------|
| /:mode     | GET     | mode: String          | /                                       | data: Room[]                              |
| /          | POST    | /                     | name: String, maxUsers: Number          | msg: String                               |
