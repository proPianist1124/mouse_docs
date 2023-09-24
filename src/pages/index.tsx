import Head from "next/head"
import Script from "next/script"

import Index from "./components/landing"
import Navbar from "./components/navbar"

export default function Landing({user}:any){
    return (
        <>
        <Head>
            <title>Home - Rat Host</title>
        </Head>
        <Navbar user = {user}/>
        <Index/>
        <Script src = "https://ui.propianist1124.repl.co/script.js"/>
        </>
    )
}

export function getServerSideProps(context:any){
    let user = context.req.cookies.user
    return { props: { user } }
}