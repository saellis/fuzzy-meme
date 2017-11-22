-- the current games across the whole service
CREATE TABLE IF NOT EXISTS games (
  _id text PRIMARY KEY, -- unique id of the game
  creator_id text NOT NULL, -- user id of whoever created the game
  current_player_id text NOT NULL, -- user id of whoever's turn it is
  current_player_acted_once boolean NOT NULL, -- whether or not the user acted the first half of their turn (useful for pulling two cards, returning pathcards, etc.)
  players text[],
  face_up_trains text[5], -- the five face up cards available to the current user
  face_down_trains text[], -- the stack of face down cards that the user can pull from
  discarded_trains text[], -- the pile of cards that were played to build track
  route_cards text[], -- the route card IDs that the player can pull from
  discarded_route_cards text[] -- the route card IDs that players chose not to keep (out for the entire game)
);

-- the current users across the whole service
CREATE TABLE IF NOT EXISTS users (
  _id text PRIMARY KEY, -- unique id of the user
  username text UNIQUE, -- unique username
  password_hash text NOT NULL, -- the user's hashed password (using bcrypt)
  game_ids text[], -- the list of game ids that the user is assigned to
  train_hand text[], -- the current train cards the player holds
  route_hand text[] -- the current route card IDs the player holds
);

-- The assignments of users to games
CREATE TABLE IF NOT EXISTS game_players (
  game_id text references games(_id) NOT NULL, -- the game id
  user_id text references users(_id) NOT NULL, -- the user id
  PRIMARY KEY(game_id, user_id)
);


-- Static table of all available route cards
CREATE TABLE IF NOT EXISTS route_cards (
  _id text NOT NULL, -- the route card's unique id (to relate to)
  cityA text NOT NULL,
  cityB text NOT NULL,
  points int NOT NULL,
  PRIMARY KEY(cityA, cityB)
);
