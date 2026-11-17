import { createClient, type RedisClientType } from "redis";

export class RedisService {
    private readonly redis_client:RedisClientType
    constructor(){
        if (!process.env.REDIS_URL) {
            throw new Error("REDIS_URL is required. Add it to the active environment file.");
        }
        this.redis_client = createClient({
            url: process.env.REDIS_URL!

        });
        this.handleEvent()
    }
    handleEvent(){
        this.redis_client.on("error",(error)=>{
            console.log(`Redis error:${error.message}`)

        })
    }
    async connect(){
        if (this.redis_client.isOpen) return;
        await this.redis_client.connect();
        console.log("Redis connected Successfully")
    }
      setValue = async ({key, value, ttl} : {key:string,value:string,ttl:number}) => {
    try {
        value = typeof value === "string" ? value : JSON.stringify(value);
        return ttl ?
            await this.redis_client.set(key, value, {EX: ttl}) :
            await this.redis_client.set(key, value);
    } catch (err) {
        console.log(err);
    }
};
  update = async ({key, value, ttl} : {key:string,value:string,ttl:number}) => {
    try {
        if(!await this.redis_client.exists(key))return 0
        return ttl ?
            await this.redis_client.set(key, value, {EX: ttl}) :
            await this.redis_client.set(key, value);
    } catch (err) {
        console.log(err);
    }
};
  getValue = async (key:string) => {
    try {
        try {
            return JSON.parse(await this.redis_client.get(key)as string);
        } catch (err) {
            return await this.redis_client.get(key);
        }
    } catch (err) {
        console.log(err);
    }
};
      ttl = async (key:string) => {
        try {
            return await this.redis_client.ttl(key);
        } catch (err) {
            console.log(err);
        }
    };
      exists = async (key:string) => {
        try {
            return await this.redis_client.exists(key);
        } catch (err) {
            console.log(err);
        }
    };
      expire = async ({key, ttl} : {key:string,ttl:number}) => {
        try {
            return await this.redis_client.expire(key, ttl);
        } catch (err) {
            console.log(err);
        }
    };
      delKey = async (key:string) => {
        try {
            if(!key?.length)return 0
            return await this.redis_client.del(key);
        } catch (err) {
            console.log(err);
        }
    };
      keys = async (pattern:string) => {
        try {
            return await this.redis_client.keys(`${pattern}`);
        } catch (err) {
            console.log(err);
        }
    };
      incr = async (key:string) => {
        try {
            return await this.redis_client.incr(key);
        } catch (err) {
            console.log(err);
        }
    };
}
export default new RedisService()
