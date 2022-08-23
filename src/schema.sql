DROP DATABASE IF EXISTS desafio04;
CREATE DATABASE desafio04;

DROP TABLE IF EXISTS users;

CREATE TABLE users(
  id serial PRIMARY KEY,
  name varchar(50) NOT NULL,
  email varchar(40) NOT NULL,
  password varchar(30) NOT NULL
  )

DROP TABLE IF EXISTS clients;

CREATE TABLE clients(
  id serial PRIMARY KEY,
  name varchar(50) NOT NULL,
  email varchar(40) NOT NULL,
  password varchar(30) NOT NULL,
  cep varchar(8),
  address varchar(60),
  complement varchar(40),
  neighborhood varchar(30),
  city varchar(30),
  state varchar(20)
  );