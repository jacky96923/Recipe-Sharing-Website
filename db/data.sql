-- test data

insert into users (password,email,profile_pic,user_name) values ('1234','cock@cuntmail.com','/Volumes/SD/OSX Stuff/DownloadsEX/meme_man.webp' , 'fuckface');
insert into users (password,email,profile_pic,user_name) values ('88888888', 'dicks@dicksmail.com','/Volumes/SD/OSX Stuff/DownloadsEX/photo-1576618148400-f54bed99fcfd.jpeg','dickface');

insert into cuisine (name) values ('chinese');
insert into cuisine (name) values ('Thai');

insert into diet (name) values ('vegetarian');
insert into diet (name) values ('Pescetarian');

insert into allergies (name) values ('Peanut-Free');
insert into allergies (name) values ('Gluten-Free');

insert into user_cuisine (user_id, cuisine_id, preference) values ( 1, 1, 'like');
insert into user_cuisine (user_id, cuisine_id, preference) values ( 2, 2, 'dislike');

insert into recipe (user_id, title, video, cuisine_id, calories, content, diet_id) values ( 1, 'fake chicken', '/Users/kaheilai/Desktop/uncycle1.m4v', 1, 800, 'When creating this recipe, I did a bunch of research on KFC’s famous seasoning blend. While their method is technically “top secret,” I did find some base recipes for the blend that I was able to tweak and make my own. There are quite a few components to the seasoning blend, but chances are, you already have most of the spices at home. Here’s what you’ll need: Italian Seasoning Garlic Salt Celery Salt
White Pepper Black Pepper Paprika Ginger Mustard Powder', 1);

insert into recipe (user_id, title, video, cuisine_id, calories, content, diet_id) values ( 2, 'fishy fish', '/Users/kaheilai/Desktop/uncycle1.m4v', 2, 500, 'Sprinkle catfish with salt and pepper. Whisk the eggs, mustard and milk in a shallow bowl. Place flour and pretzels in separate shallow bowls. Coat fillets with flour, then dip in egg mixture and coat with pretzels. Heat 1/4 in. oil to 375° in an electric skillet. Fry fillets, a few at a time, until fish flakes easily with a fork, 3-4 minutes on each side. Drain on paper towels. Serve with lemon slices if desired.', 2);


insert into recipe_image (recipe_id, image, is_cover) values ( 1, 'chicken.jpg', true);
insert into recipe_image (recipe_id, image, is_cover) values ( 2, 'fish.jpg', true);

insert into recipe_ingredient (recipe_id, ingredient_name, amount, unit) values ( 1, 'chicken', 1, 'kg'); 
insert into recipe_ingredient (recipe_id, ingredient_name, amount, unit) values ( 1, 'flour', 0.5, 'kg'); 
insert into recipe_ingredient (recipe_id, ingredient_name, amount, unit) values ( 2, 'fish', 2, 'kg');
insert into recipe_ingredient (recipe_id, ingredient_name, amount, unit) values ( 2, 'salt', 3, 'tsp');


DELETE FROM allergies WHERE id IN (1, 2);

insert into allergies (name) values ('Peanut');
insert into allergies (name) values ('Gluten');

update allergies set id = 1 where id = 3;
update allergies set id = 2 where id = 4;

insert into recipe_allergies ()
