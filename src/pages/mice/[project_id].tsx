import Head from "next/head"
import { useRouter } from "next/router"
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from "react"

import Navbar from "../components/navbar"
import Custom404 from "../404"
import Cheese_Icon from "../components/icons/cheese"

import supabase from "../api/supabase"
import { get_user, get_cheeses } from "../api/data"

export default function Rat({user, cheeses, descr}:any){
    const router = useRouter()
    
    if(cheeses == null){
        return <Custom404/>
    }

    return (
        <>
        <Head>
            <title>{`${router.query.project_id} - Mouse Docs`}</title>
        </Head>
        <Navbar user = {user}/>
        <div className = "card" style = {{border:"none"}}>
            <span style = {{color:"var(--primary)"}}><b>Mouse: </b> {router.query.project_id}</span>
            <span style = {{color:"var(--secondary)", float:"right"}}>{descr}</span>
        </div>
        <div className = "card">
            <p style = {{color:"var(--secondary)"}}>
                &nbsp;Cheeses <Cheese_Icon width = {20} height = {20}/>
            </p>
            {cheeses.map((cheese: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined) =>
                <div className = "card-hoverable" key = {String(cheese)} onClick = {() => router.push(`/mice/${router.query.project_id}/${cheese}`)}>
                    {cheese}
                </div>
            )}
            <br></br><br></br>
            <form action = "/api/routes/new_cheese" method = "POST" style = {{display:"flex", justifyContent:"center"}}>
                <input type = "hidden" defaultValue = {router.query.project_id} name = "mouse" required/>
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
    let user = await get_user(context.req.cookies.sid)
    const { data: descr }:any = await supabase.from("mice").select("description").eq("title", context.query.project_id).eq("author", user)
    const cheeses = JSON.parse(await get_cheeses(user, context.query.project_id))

    try{
        return { props: {
            user,
            cheeses,
            descr:descr[0].description
        } }
    }catch(e){
        return { props: {
            user,
            cheeses,
            descr:null
        } }
    }
}