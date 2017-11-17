# API Doc
## Games
- #### `POST` /games
  - Creates and returns a new game
  
Params

| Field | Type | Description |
| ------ | ---- | ------ |
| creator | String | The ID of the user creating the game |

Success

| Field | Type | Description |
| ------ | ---- | ------ |
| creator | String | The ID of the user creating the game |
| _id | String | The game's unique ID |
| currentPlayer | String | The ID of the player whose turn it is in the game |
| users | [String] | Array of user IDs currently playing this game |

- #### `GET` /games
  - Gets all games
  
Success

| Field | Type | Description |
| ------ | ---- | ------ |
| games | [Game] | Array of all current game objects |

## Users
- #### `POST` /users
  - Creates a new user
  
Params

| Field | Type | Description |
| ------ | ---- | ------ |
| username | String | User's username |
| password | String | User's password |
     
Success

| Field | Type | Description |
| ------ | ---- | ------ |
| _id | String | User's unique ID |
| username | String | User's username |
| password | String | User's plaintext password (this will change) |
| games | [String] | Array of game IDs the user is a part of |
