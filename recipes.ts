import { Router } from 'express'

import { client } from './server';


export let recipeRouter = Router()


recipeRouter.get('/recipe/:id', async (req, res) => {
    try {
        let id=req.params.id
        let result = await client.query(`select recipe.id, user_name, title as recipe_title, video, calories, content, cuisine.name as cuisine, image, ingredient_name, amount, unit, profile_pic from recipe join cuisine on recipe.cuisine_id = cuisine.id 
        join recipe_image on recipe_image.recipe_id = recipe.id 
        join recipe_ingredient on recipe.id= recipe_ingredient.recipe_id
        join recipe_allergies on recipe_allergies.recipe_id  = recipe.id
        join users on recipe.user_id = users.id
        where recipe.id = $1`,[id])
        let recipes = result.rows
        console.log(recipes);
        
        res.json(recipes)
    } catch (error) {
        
    }
})


