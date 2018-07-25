### Auth
* **URI**: /api/auth

| Call       | Type    | Params                | Body                                    | Data                  |
|------------|---------|-----------------------|-----------------------------------------|-----------------------|
| /register  | POST    | /                     | username: String, password: String      | /                     |
| /login     | POST    | /                     | username: String, password: String      | JWT token             |

### User
* **URI**: /api/user

| Call       | Type    | Params                | Body                                    | Data                  |
|------------|---------|-----------------------|-----------------------------------------|-----------------------|
| /:username | GET     | username: String      | /                                       | User                  |

### Friend request
* **URI**: /api/friend-request

| Call       | Type    | Params                | Body                                    | Data                  |
|------------|---------|-----------------------|-----------------------------------------|-----------------------|
| /:username | GET     | username: String      | /                                       | FriendRequest[]       |
| /add       | POST    | /                     | sender: String, receiver: String        | /                     |
| /confirm   | POST    | /                     | id: String                              | /                     |
| /delete    | DELETE  | /                     | id: String                              | /                     |
