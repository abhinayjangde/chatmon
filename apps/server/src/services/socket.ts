import { Server } from "socket.io";
import {Redis} from "ioredis"
process.loadEnvFile()

const pub = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT as undefined,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD
})

const sub = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT as undefined,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD
})
class SocketService {
    private _io:Server;
    constructor(){
        console.log("Init socket server...")
        this._io=new Server({
            cors: {
                allowedHeaders: ["*"],
                origin: "*"
            }
        });
        sub.subscribe("MESSAGES")

    }
    get io(){
        return this._io
    }

    public initListeners(){
        console.log("Initialize socket listener...")
        const io = this._io
        io.on("connect", (socket)=>{
            console.log("New socket connected", socket.id)
            socket.on("event:message", async ({message}:{message: string})=>{
                console.log(`New message Rec. ${message}`)
                await pub.publish("MESSAGES", JSON.stringify({message}))
            })
        })
        sub.on("message", (channel,message)=>{
            if(channel==="MESSAGES"){
                io.emit("message", message)
            }
        })

    }
}

export default SocketService