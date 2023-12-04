
insert into users (password, email, user_name) VALUES ('passwords', 'peter@gmail.com', 'Peter');
insert into users (password,email,profile_pic,user_name) values ('1234','cock@cuntmail.com','/Volumes/SD/OSX Stuff/DownloadsEX/meme_man.webp' , 'fuckface');
insert into users (password,email,profile_pic,user_name) values ('88888888', 'dicks@dicksmail.com','/Volumes/SD/OSX Stuff/DownloadsEX/photo-1576618148400-f54bed99fcfd.jpeg','dickface');

insert into cuisine (name) VALUES ('Japanese');
insert into cuisine (name) values ('chinese');
insert into cuisine (name) values ('Thai');

insert into diet (name) VALUES (not);

insert into allergies (name) VALUES ('seafood'),('lemon');

insert into diet (name) VALUES ('vegetarian'),('meat_lover'),('pescetarian'),('ketogenic');

ALTER TABLE recipe ALTER TITLE TYPE text;

insert into recipe (user_id, title, video, cuisine_id, calories, content, diet_id) VALUES (2, '星米', null, 2, 300, '落獲上獲', 3);

insert into recipe_image (recipe_id, image, is_cover) VALUES (1, '/Users/Man/Downloads/lovepik-boys-head-png-image_400233604_wh1200.png', true);