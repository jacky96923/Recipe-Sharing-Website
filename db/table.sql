-- only for create and alter table

create table users(
    id serial primary key,
    password varchar(255) not null,
    email varchar(255) unique not null,
    profile_pic varchar(255),
    user_name varchar(255) not null
);


create table coffee_transaction(
    id serial primary key,
    user_id integer references users(id),
    coffee_amount integer not null
);


create table cuisine(
    id serial primary key,
    name varchar(255) not null
);


create table diet(
    id serial primary key,
    name varchar(255) not null
);


create table allergies(
    id serial primary key,
    name varchar(255) not null
);

create type preferences as enum ('like','dislike');

create table user_cuisine(
    id serial primary key,
    user_id integer references users(id),
    cuisine_id integer references cuisine(id),
    preference preferences
);

create table recipe(
    id serial primary key,
    user_id integer references users(id),
    title integer not null,
    video varchar(255),
    cuisine_id integer references cuisine(id),
    calories integer not null,
    content text not null,
    diet_id integer references diet(id)
);


create table recipe_image(
    id serial primary key,
    recipe_id integer references recipe(id),
    image varchar(255) not null,
    is_cover boolean not null
);


create table recipe_ingredient(
    id serial primary key,
    recipe_id integer references recipe(id),
    ingredient_name text not null,
    amount decimal not null,
    unit text not null
);


create table user_like(
    id serial primary key,
    user_id integer references users(id),
    recipe_id integer references recipe(id)
);


create table user_diet(
    id serial primary key,
    user_id integer references users(id),
    diet_id integer references diet(id)
);


create table recipe_like(
    id serial primary key,
    user_id integer references users(id),
    recipe_id integer references recipe(id)
);


create table recipe_view(
    id serial primary key,
    user_id integer references users(id),
    recipe_id integer references recipe(id)
);


create table meal_schedule(
    id serial primary key,
    user_id integer,
    date date not null,
    breakfast_recipe_id integer references recipe(id),
    lunch_recipe_id integer references recipe(id),
    dinner_recipe_id integer references recipe(id)
);

create table user_allergies(
    id serial primary key,
    user_id integer references users(id),
    allergies_id integer references allergies(id)
);


create table recipe_allergies(
    id serial primary key,
    recipe_id integer references recipe(id),
    allergies_id integer references allergies(id)
);

alter table recipe alter column title type text;



create table preference(
    id serial primary key,
    name varchar(255) not null
);

create table user_preference(
    id serial primary key,
    user_id integer references users(id),
    preference_id integer references preference(id)
);

create table recipe_preference(
    id serial primary key,
    recipe_id integer references recipe(id),
    preference_id integer references preference(id)
);

drop table recipe_preference;
drop table user_preference;
drop table preference;


create table exclude(
    id serial primary key,
    name varchar(255) not null
);

create table user_exclude(
    id serial primary key,
    user_id integer references users(id),
    exclude_id integer references exclude(id)
);

create table recipe_exclude(
    id serial primary key,
    recipe_id integer references recipe(id),
    exclude_id integer references exclude(id)
);































-- alter table users rename user_name to username


