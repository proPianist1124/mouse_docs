import Head from "next/head"

import Index from "./components/landing"
import Navbar from "./components/navbar"

import { get_user } from "./api/data"

export default function Landing({user}:any){
    return (
        <>
        <Head>
            <title>Home - Mouse Docs</title>
        </Head>
        <Navbar user = {user}/>
        <Index/>
        </>
    )
}

export async function getServerSideProps(context:any){
    let user = await get_user(context.req.cookies.sid)
    return { props: { user } }
}