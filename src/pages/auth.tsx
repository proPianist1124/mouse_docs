import Head from "next/head"
import { useState } from "react"

import Index from "./components/landing"
import Waitlist_login from "./components/waitlist_login"
import Cheese_Icon from "./components/icons/cheese"
import Logout_Icon from "./components/icons/logout"

export default function Auth(){
    const [ page, setPage ] = useState(true)
    return (
        <>
        <Head>
            <title>{page ? "Your Text Editor - Rat Host" : "Join the Waitlist - Rat Host"}</title>
        </Head>
        <div style = {{float:"right"}}>
            <button onClick = {()=> setPage(!page)} className = "secondary">
                {page ? <span>Join the Waitlist&nbsp;&nbsp;<Cheese_Icon width = {15} height = {15}/></span> : <span>Back&nbsp;&nbsp;<Logout_Icon width = {15} height = {15}/></span>}
            </button>
        </div>
        <br></br><br></br>
        {page ? <Index/> : <Waitlist_login/>}
        </>
    )
}