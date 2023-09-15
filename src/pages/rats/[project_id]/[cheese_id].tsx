import Head from "next/head"
import { useRouter } from "next/router"

import Navbar from "../../components/navbar"

export default function Rat({user}:any){
    const router = useRouter()

    let cheese = String(String(router.query.cheese_id).replace("file", "Cheese ")).replace("_", " ").split(/(\s+)/).filter((x) => x.trim().length>0);
    return (
        <>
        <Head>
            <title>{`${router.query.cheese_id}/${router.query.project_id} - Rat Host`}</title>
        </Head>
        <Navbar user = {user}/>
        <br></br>
        <div className = "card">
            /<b>rats/{cheese[2]}</b>/<b>{router.query.project_id}</b>
            <br></br><br></br>
            <p>Your Code</p>
            <textarea style = {{width:"100%", height:"400px", fontFamily:"courier"}} autoComplete = "off" spellCheck = "false"></textarea>
            <br></br><br></br>
            <div style = {{display:"flex", alignItems:"center", justifyContent:"center"}}>
                <form><button type = "submit" style = {{width:150}}>Save</button></form>
                &nbsp;&nbsp;
                <form><button type = "submit" className = "danger" style = {{width:150}}>Delete</button></form>
            </div>
        </div>
        </>
    )
}

export async function getServerSideProps(context: { req: { cookies: { [x: string]: any } } }){
    let user = context.req.cookies.user

    return { props: {
        user,
    } }
}