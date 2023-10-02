-- Create a new database called 'SEEMLY-React'
CREATE DATABASE SEEMLY-React;

-- Create a new schema called 'task_tist_app'
CREATE SCHEMA task_tist_app;

-- Create a new table called 'tasks' with a 'category_id' foreign key
CREATE TABLE task_list_app.tasks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    date DATE,
    completion_state BOOLEAN,
    favorite BOOLEAN,
    deleted BOOLEAN,
    category_id INTEGER REFERENCES task_list_app.categories(id)
);

-- Create a new table called 'users'
CREATE TABLE task_list_app.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    profile_pic VARCHAR(255)
);

-- Create a new table called 'categories'
CREATE TABLE task_list_app.categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    color VARCHAR(7) 
);