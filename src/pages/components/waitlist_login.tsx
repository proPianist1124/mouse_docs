import { useRouter } from "next/router"
import { useState, useRef } from "react"
import Cookies from "js-cookie"

import Rat_Icon from "./icons/rat"
import { get_user, get_password} from "../api/data"

function Waitlist(){
    return (
        <>
        <h2 style = {{textAlign:"center"}}><Rat_Icon width = {25} height = {25}/> Rat Host</h2>
        <br></br>
        <div className = "card" style = {{border:"none", display:"flex", alignItems:"center", justifyContent:"center"}}>
            Join the Beta waitlist!&nbsp;&nbsp;
           <form action = "/api/routes/login" method = "POST" style = {{display:"flex"}}>
            <input name = "email" autoComplete = "off" placeholder = "john.doe@gmail.com" type = "email"/>
            &nbsp;
            <button type = "submit">
                Join
            </button>
           </form>
        </div>
        </>
    )
}

function Login(){
    const router = useRouter()
    let [ message, setMessage ]:any = useState("")
    let [ loading, setLoading ]:any = useState("Login")

    const user:any = useRef(null)
    const password:any = useRef(null)
    const error:any = useRef(null)

    async function login(){
        if(user.current.value == "" || password.current.value == ""){
            setMessage("Please provide a username and password")
        }else{
            if(JSON.stringify(await get_user(String(user.current.value))) == "[]"){
                setMessage("Invalid credentials")
            }else{
                if(await get_password(user.current.value) == password.current.value){
                    setLoading("Logging in...")
                    setTimeout(() => {
                        Cookies.set("user", user.current.value)
                        router.push("/")
                    }, 1500);
                }else{
                    setMessage("Invalid credentials")
                }
            }
        }
    }
    return (
        <>
        <div className = "card">
            <h2 style = {{textAlign:"center"}}>Login to Rat Host</h2>
            <br></br>
            <p>Username</p>
            <input autoComplete = "off" ref = {user} style = {{width:"100%"}}/>
            <p>Password</p>
            <input type = "password" ref = {password} style = {{width:"100%"}}/>
            <p ref = {error} style = {{color:"var(--danger)"}}>{message}</p>
            <br></br>
            <button onClick = {login} style = {{width:"100%"}}>{loading}</button>
        </div>
        </>
    )
}

export default function Waitlist_Login(){
    const [ state, setState ] = useState(false);
    return (
        <>
        {state ? <Login/> : <Waitlist/>}
        <div className = "card" style = {{border:"none", textAlign:"center", color:"var(--primary-darkest)"}}>
            {state ? <span>No account?</span> : <span>Already have an account?</span>}
            &nbsp;<span onClick = {()=> setState(!state)} className = "switch">
                {state ? <span>Join the Waitlist</span> : <span>Login</span>}</span>
        </div>
        <style jsx>{`
            span.switch{
                text-decoration:underline;
            }
            span.switch:hover{
                text-decoration:none;
                cursor:pointer;
            }
        `}</style>
        </>
    )
}