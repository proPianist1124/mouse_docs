import Head from "next/head"

import Navbar from "./components/navbar"
import { get_user } from "./api/data"

export default function New({user}:any){
    return (
        <>
        <Head>
            <title>New Project - Rat Host</title>
        </Head>
        <Navbar user = {user}/>
        <div className = "card">
            <h2 style = {{textAlign:"center"}}>Your New Rat!</h2>
            <br></br>
            <form action = "/api/routes/new_rat" method = "POST">
                <p>Title</p>
                <input name = "title" autoComplete = "off" style = {{width:"100%"}} required/>
                <p>Description</p>
                <input name = "description" autoComplete = "off" style = {{width:"100%"}} required/>
                <br></br><br></br><br></br>
                <button style = {{width:"100%"}}>
                    Create
                </button>
            </form>
        </div>
        </>
    )
}

export async function getServerSideProps(context:any){
    let user = await get_user(context.req.cookies.sid)
    return { props: { user } }
}