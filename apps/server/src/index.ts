import http from "http"
import SocketService from "./services/socket"
process.loadEnvFile()
async function init(){
    const socketService = new SocketService()

    const httpServer = http.createServer()
    const port = process.env.PORT;
    socketService.io.attach(httpServer)
    httpServer.listen(port,()=>{
        console.log(`Server is running at http://localhost:${port}`)
    })

    socketService.initListeners();
}

init()