import Head from "next/head"
import { useRouter } from "next/router"
import { useRef } from "react"

import Navbar from "../../components/navbar"
import Custom404 from "../../404"
import Mouse_Icon from "../../components/icons/mouse"
import { get_user, get_cheeses } from "../../api/data"
import supabase from "../../api/supabase"

function Modal(){
    return (
        <div className="open">
			<div>
				<div className = "modal" id = "config">
					<div className="modal__window">
                        <a href = "#"><button className = "secondary" style = {{float:"right"}}>Close</button></a>
                        <h2 className = "modal-label">Mouse Config</h2>
                        <div className = "card" style = {{textAlign:"left", borderColor:"var(--background-bottom-lighter)"}}>
                            <p>Public</p>
                            <button className = "success" onClick = {() => alert("publish to the community")}>Publish</button>
                            &nbsp;&nbsp;<button className = "warning" onClick = {() => alert("restrict access with a password")}>Restrict</button>
                            &nbsp;&nbsp;<button onClick = {() => alert("share to specific people")}>Share</button>
                            <br></br><br></br>
                            <hr/>
                            <p style = {{color:"var(--danger)"}}>Danger</p>
                            <button className = "danger" onClick = {() => alert("delete mouse")}>Delete</button>
                            &nbsp;&nbsp;<button className = "danger" onClick = {() => alert("auto destruct after public visits")}>Auto Destruct</button>
                        </div>
					</div>
				</div>
			</div>
		</div>
    )
}

export default function Cheese({user, exists, file_titles, file_content}:any){
    const router = useRouter()

    let title:any = useRef()
    let content:any = useRef()

    if(exists == false){
        return <Custom404/>
    }
    const cheese = String(router.query.cheese_id).replace("_", " ")

    async function title_change(){
        file_titles[file_titles.indexOf(router.query.cheese_id)] = `${cheese.split(" ")[0]}_${title.current.value}`

        await supabase.from("mouses").update({ file_titles }).eq("title", router.query.project_id).eq("author", user)
        router.push(`/mouses/${router.query.project_id}/${cheese.split(" ")[0]}_${title.current.value}`)
    }
    async function content_change(){
        //console.log(`content has changed to ${content.current.value}`)
        file_content[file_titles.indexOf(router.query.cheese_id)] = content.current.value
        await supabase.from("mouses").update({ file_content }).eq("title", router.query.project_id).eq("author", user)
        //console.log(file_content[0].file_content)
    }
    return (
        <>
        <Head>
            <title>{`${router.query.cheese_id}/${router.query.project_id} - Mouse Docs`}</title>
        </Head>
        <Navbar user = {user}/>
        <br></br>
        <div style = {{display:"flex"}}>
            <a href = "#config"><button className = "secondary"><Mouse_Icon width = {16} height = {16}/></button></a>
            <input style = {{width:"100%"}} defaultValue = {cheese.split(" ")[1]} ref = {title} onBlur = {title_change}/>
        </div>
        <br></br>
        <textarea style = {{width:"100%", height:"70vh", outline:"none"}} autoComplete = "off" ref = {content} placeholder = "let your imagination run wild…" onChange = {content_change} defaultValue = {file_content[file_titles.indexOf(router.query.cheese_id)]}></textarea>
        <Modal/>
        </>
    )
}

export async function getServerSideProps(context:any){
    let user = await get_user(context.req.cookies.sid)
    let cheeses = JSON.parse(await get_cheeses(user, context.query.project_id))

    const { data: file_titles }:any = await supabase.from("mouses").select("file_titles").eq("title", context.query.project_id).eq("author", user)
    const { data: file_content }:any = await supabase.from("mouses").select("file_content").eq("title", context.query.project_id).eq("author", user)

    return { props: {
        user,
        exists:cheeses.includes(context.query.cheese_id),
        file_titles: JSON.parse(file_titles[0].file_titles),
        file_content: JSON.parse(file_content[0].file_content)
    } }
}