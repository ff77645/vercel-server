CREATE TABLE USERS (
  id SERIAL PRIMARY KEY,
  phone VARCHAR(50) UNIQUE,
  email VARCHAR(50) UNIQUE,
  username VARCHAR(50),
  nickname VARCHAR(50),
  avatar TEXT,
  gender VARCHAR(10),
  password VARCHAR(128),
  ip VARCHAR(128),
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);