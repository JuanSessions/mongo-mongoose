const {
    env
} = process;

const dot = require("dotenv")
dot.config()

const config = {
    env: env.NODE_ENV || "development"
}

const devConfig = {

        db: env.MONGO_LOCAL,
        jwt_key: env.S_KEY
    }
    //this configuration is for the development


const prodConfig = {
        db: env.MONGO_PROD,
        jwt_key: env.S_KEY
    }
    //this configuration is for the production

const currentConfig = config.env === "production" ? prodConfig : devConfig;

module.exports = Object.assign({}, config, currentConfig)

//create this new object and exporting it