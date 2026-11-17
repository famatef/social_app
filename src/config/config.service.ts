import {config} from "dotenv";
import{resolve} from "path";
const NODE_ENV = process.env.NODE_ENV!
const envPath ={
    development:"./.env.development",
    production:"./.env.production",
}
config({path:resolve(envPath[NODE_ENV as keyof typeof envPath])as string});
export const PORT = +process.env.PORT!
export const DB_URI = process.env.DB_URI!
