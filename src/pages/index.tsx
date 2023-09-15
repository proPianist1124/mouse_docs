import Head from "next/head"

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
        </>
    )
}

export function getServerSideProps(context: { req: { cookies: { [x: string]: any } } }){
    let user = context.req.cookies.user
    return { props: { user } }
}