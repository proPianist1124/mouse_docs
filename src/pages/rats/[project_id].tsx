import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import Navbar from "../components/navbar"
import Custom404 from "../404"
import Cheese_Icon from "../components/icons/cheese"
import supabase from "../api/supabase"
import { get_cheeses } from "../api/data"
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from "react"

export default function Rat({user, descr, cheeses}:any){
    const router = useRouter()

    let description = "temp descr"
    
    if(cheeses == null){
        return <Custom404/>
    }

    return (
        <>
        <Head>
            <title>{`${router.query.project_id} - Rat Host`}</title>
        </Head>
        <Navbar user = {user}/>
        <div className = "card">
            <b>Rat</b>: {router.query.project_id}
            <span style = {{color:"var(--secondary)", float:"right"}}>{descr}</span>
            <br></br><br></br>
            <p style = {{color:"var(--secondary)"}}>
                &nbsp;Cheeses <Cheese_Icon width = {20} height = {20}/>
            </p>
            {cheeses.map((cheese: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined) =>
                <div className = "card-hoverable" key = {String(cheese)} onClick = {() => router.push(`/rats/${router.query.project_id}/${cheese}`)}>
                    {cheese}
                </div>
            )}
            <br></br><br></br>
            <form action = "/api/routes/new_cheese" method = "POST" style = {{display:"flex", justifyContent:"center"}}>
                <input type = "hidden" defaultValue = {router.query.project_id} name = "project" required/>
                <input type = "text" autoComplete = "off" placeholder = "cheese name…" name = "cheese" required/>&nbsp;
                <button>
                    Add Cheese
                </button>
            </form>
        </div>
        </>
    )
}

export async function getServerSideProps(context:any){
    let user = context.req.cookies.user
    const { data: descr }:any = await supabase.from("rats").select("description").eq("title", context.query.project_id).eq("author", context.req.cookies.user)

    return { props: {
        user,
        cheeses:JSON.parse(await get_cheeses(user, context.query.project_id)),
        descr:descr[0].description
    } }
}