DROP DATABASE IF EXISTS desafio04;
CREATE DATABASE desafio04;

DROP TABLE IF EXISTS users;

CREATE TABLE users(
  id serial PRIMARY KEY,
  name varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  password varchar(100) NOT NULL,
  cpf varchar(11),
  phone varchar(12)
  )

DROP TABLE IF EXISTS clients;

CREATE TABLE clients(
  id serial PRIMARY KEY,
  name varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  cpf varchar(11) NOT NULL,
  phone varchar(13) NOT NULL,
  cep varchar(8),
  address varchar(100),
  complement varchar(100),
  neighborhood varchar(100),
  city varchar(100),
  state varchar(100)
  );