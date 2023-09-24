import Head from "next/head"
import { useRouter } from "next/router"

import Navbar from "../../components/navbar"
import Custom404 from "../../404"
import { get_cheeses } from "../../api/data"

export default function Rat({user, exists}:any){
    const router = useRouter()

    if(exists == false){
        return <Custom404/>
    }

    //let cheese = String(String(router.query.cheese_id).replace("file", "Cheese ")).replace("_", " ").split(/(\s+)/).filter((x) => x.trim().length>0);
    return (
        <>
        <Head>
            <title>{`${router.query.cheese_id}/${router.query.project_id} - Rat Host`}</title>
        </Head>
        <Navbar user = {user}/>
        <br></br>
        <div className = "card" style = {{maxWidth:900}}>
            <textarea style = {{width:"100%", height:400, outline:"none"}} autoComplete = "off" placeholder = "let your imagination run wild…"></textarea>
            <br></br><br></br>
            <div style = {{display:"flex", alignItems:"center", justifyContent:"center"}}>
                <form action = "../../api/routes/save_cheese">
                    <input name = "rat" type = "hidden" value = {router.query.project_id}/>
                    <input name = "cheese" type = "hidden" value = {router.query.cheese_id}/>
                    <button type = "submit" style = {{width:150}}>Save</button>
                </form>
                &nbsp;&nbsp;
                <form><button type = "submit" className = "danger" style = {{width:150}}>Delete</button></form>
            </div>
        </div>
        </>
    )
}

export async function getServerSideProps(context:any){
    let user = context.req.cookies.user
    let cheeses = await get_cheeses(context.req.cookies.user, context.query.project_id)

    return { props: {
        user,
        exists:cheeses.includes(context.query.cheese_id)
    } }
}