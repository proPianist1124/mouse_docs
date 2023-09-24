import { useRouter } from "next/router"
import { useState, useRef } from "react"
import Cookies from "js-cookie"

import Rat_Icon from "./icons/rat"
import supabase from "../api/supabase"
import { get_user, get_password } from "../api/data"

function Waitlist(){
    return (
        <>
        <h2 style = {{textAlign:"center"}}><Rat_Icon width = {25} height = {25}/> Rat Host</h2>
        <br></br>
        <div className = "card" style = {{border:"none", display:"flex", alignItems:"center", justifyContent:"center"}}>
            Join the Beta waitlist!&nbsp;&nbsp;
           <form action = "/api/routes/waitlist" method = "POST" style = {{display:"flex"}}>
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

    const key = (e:any) => {
        if(e.key == "Enter"){
            login()
        }
    }
    document.addEventListener("keydown", key)

    async function login(){
        if(user.current.value == "" || password.current.value == ""){
            setMessage("Please provide a username and password")
        }else{
            if(await get_user(user.current.value) == null){
                setMessage("Something went wrong. Please try again.")
            }else{
                if(await get_password(user.current.value) == password.current.value){
                    const { data: email }:any = await supabase.from("users").select("email").eq("username", user.current.value)

                    setLoading("Logging in...")
                    setTimeout(() => {
                        Cookies.set("user", user.current.value)
                        //router.push(`/api/email/send?to=${email[0].email}&subject=Suspicious&content=There%20was%20suspicious%20login%20activity%20from%20your%20account%2C%20%3Cb%3E${user.current.value}%3C/b%3E`)
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

export default function Combo(){
    const [ state, setState ] = useState(false);
    return (
        <>
        {state ? <Login/> : <Waitlist/>}
        <div className = "card" style = {{border:"none", textAlign:"center", color:"var(--secondary)"}}>
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