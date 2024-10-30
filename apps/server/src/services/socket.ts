import { Server } from "socket.io";

class SocketService {
    private _io:Server;
    constructor(){
        console.log("Init socket server...")
        this._io=new Server();
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
                console.log(`New messsage Rec. ${message}`)
            })
        })
    }
}

export default SocketService