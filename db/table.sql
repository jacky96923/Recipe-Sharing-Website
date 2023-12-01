-- only for create and alter table

create table users(
    id serial primary,
    password varchar(255) not null,
    email varchar(255) unique not null,
    isVegetarian boolean,
    profile_pic varchar(255),
    user_name varchar(255) not null
)

-- alter table users rename user_name to username


