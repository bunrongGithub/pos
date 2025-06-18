import Joi from "joi"
import path from "path"
import dotenv from "dotenv"

type Config = {
    env: string
    port: number
    jwtSecret: string
}

const loadConfig = (): Config => {
    const env = process.env.NODE_ENV ?? "dev"
    const _env_part = path.resolve(__dirname, `./configs/.env.${env}`)
    dotenv.config({ path: _env_part });
    const _env_var_schema = Joi.object({
        NODE_ENV: Joi.string().required(),
        PORT: Joi.number().required(),
        JWT_SECRET_KEY: Joi.number().required()
    }).unknown().required()
    const { value: envVars, error } = _env_var_schema.validate(process.env)
    if (error) {
        throw new Error(`Config validation error: ${error.message}`)
    }
    return {
        env: envVars.NODE_ENV,
        port: envVars.PORT,
        jwtSecret: envVars.JWT_SECRET_KEY
    }
}

const config = loadConfig();
export default config