import { config } from 'dotenv'
import populateEnv from 'populate-env'

config()

export let env = {
    SESSION_SECRET: '',
    PORT: 8200,
}
console.log(env)


populateEnv(env, { mode: 'halt' })