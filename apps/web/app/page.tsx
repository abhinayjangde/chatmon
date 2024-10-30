"use client"

import { useState } from "react"
import { useSocket } from "../context/SocketProvider"

const Home = () => {
  const {sendMessage, messages} = useSocket()
  const [message,setMessage]=useState("")
  
  console.log(messages)
  return (
    <div>
      <div>
        <input onChange={(e)=>setMessage(e.target.value)} className="border-2" type="text" placeholder="message..." />
        <button onClick={(e)=>sendMessage(message)} className="border-2 px-3">Send</button>
      </div>
      <div>

        {
          messages.map((msg,index)=>(
            <div key={index}>{msg}</div>
          ))
        }
   
      </div>
    </div>
  )
}

export default Home