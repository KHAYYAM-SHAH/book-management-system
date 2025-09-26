CREATE DATABASE book_manager;
USE book_manager;
create table books(
id int auto_increment primary key,
title varchar(255) not null,
author varchar(255) not null,
genre varchar(255),
yearPublished int
);
