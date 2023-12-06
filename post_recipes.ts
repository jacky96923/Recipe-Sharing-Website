import { Router } from 'express'
import { client } from "./database"

export let post_recipeRouter = Router()

post_recipeRouter.get('/attributes', async (req, res) => {
    try {
        let result1 = await client.query(`select id, name as Diet from diet;`)
        let result2 = await client.query(`select id,name as Allergies FROM allergies;`)
        let result3 = await client.query(`select id, name as avoid from avoid;`)
        let result4 = await client.query(`select id, name as Cuisine from cuisine;`)

        let diet = result1.rows
        let allergies = result2.rows
        let avoid = result3.rows
        let cuisine = result4.rows

        console.log(diet)
        console.log(allergies);
        console.log(avoid)
        console.log(cuisine);
        
        res.json({diet, allergies, avoid, cuisine})
    } catch (error) {
        console.log(`Cannot get recipe attributes from postgreSQL`)
    }
})

