"use client"
import { io, Socket } from "socket.io-client";
import React, { useCallback, useContext, useEffect, useState } from "react"

interface SocketProviderProps{
    children?:React.ReactNode,
}

interface ISocketContext{
    sendMessage: (msg:string)=>any;
    messages: string[]
}
const SocketContext = React.createContext<ISocketContext | null>(null)

export const useSocket = ()=>{
    const state = useContext(SocketContext)
    if(!state) throw new Error("state is undefined")
    return state
}
const SocketProvider: React.FC<SocketProviderProps> = ({children}:SocketProviderProps) => {
    const [socket, setSocket]=useState<Socket>()
    const [messages, setMessages]=useState<string[]>([])
    const sendMessage: ISocketContext["sendMessage"] = useCallback((msg)=>{
        console.log("Send message", msg)
        if(socket){
            socket.emit("event:message",{message: msg})
        }
    },[socket])

    const onMessageReceived = useCallback((msg:string)=>{
        console.log("Msg from server received", msg)
        try {
            const { message } = JSON.parse(msg);
            setMessages((prev) => [...prev, message]);
        } catch (error) {
            console.error("Failed to parse message", error);
        }
    },[])
    useEffect(()=>{
        const _socket = io(process.env.NEXT_PUBLIC_SERVER_URL)
        setSocket(_socket)
        _socket.on("message", onMessageReceived)
        return ()=>{
            _socket.disconnect()
            _socket.off("message", onMessageReceived)
            setSocket(undefined)
        }
    },[])
  return (
    <SocketContext.Provider value={{sendMessage, messages}} >
        {children}
    </SocketContext.Provider>

  )
}

export default SocketProvider