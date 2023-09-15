import Head from "next/head"
import { useRouter } from "next/router"

import Navbar from "../components/navbar"
import Cheese_Icon from "../components/icons/cheese"
import { get_cheeses } from "../api/data"

export default function Rat({user}:any){
    const router = useRouter()

    let description = "temp descr"
    
    return (
        <>
        <Head>
            <title>{`${router.query.project_id} - Rat Host`}</title>
        </Head>
        <Navbar user = {user}/>
        <div className = "card">
            <b>Rat</b>: {router.query.project_id}
            <span style = {{color:"var(--secondary)", float:"right"}}>{description}</span>
            <br></br><br></br>
            <p style = {{color:"var(--secondary)"}}>
                &nbsp;Cheeses <Cheese_Icon width = {20} height = {20}/>
            </p>
            <div className = "card-hoverable">
                test
            </div>
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

    // String(context.req.url).split("/")[2]
    console.log(await get_cheeses(user, context.query.project_id))

    return { props: {
        user,
    } }
}