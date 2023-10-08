import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useRef, useState } from "react"

import Navbar from "../../components/navbar"
import Custom404 from "../../404"
import Cheese_Modal from "../../components/modal/cheese_modal"
import ToolBar_Spacer from "../../components/toolbar_spacer"
import Mouse_Icon from "../../components/icons/mouse"
import Bold_Icon from "../../components/icons/bold"
import Italic_Icon from "../../components/icons/italic"
import Plus_Icon from "../../components/icons/plus"
import Minus_Icon from "../../components/icons/minus"
import AlignLeft_Icon from "../../components/icons/alignLeft"
import AlignCenter_Icon from "../../components/icons/alignCenter"
import AlignRight_Icon from "../../components/icons/alignRight"

import { get_user, get_cheeses } from "../../api/data"
import supabase from "../../api/supabase"


export default function Cheese({user, exists, file_titles, file_content, fonts}:any){
    const router = useRouter()

    let title:any = useRef()
    let content:any = useRef()

    const [ fontSize, setFontSize ]:any = useState(16)
    const [ textAlign, setTextAlign ]:any = useState("left")
    const [ fontFamily, setFontFamily ]:any = useState("Arial")

    if(exists == false){
        return <Custom404/>
    }
    const cheese = String(router.query.cheese_id).replace("_", " ")

    async function title_change(){
        file_titles[file_titles.indexOf(router.query.cheese_id)] = `${cheese.split(" ")[0]}_${title.current.value}`

        await supabase.from("mice").update({ file_titles }).eq("title", router.query.project_id).eq("author", user)
        router.push(`/mice/${router.query.project_id}/${cheese.split(" ")[0]}_${title.current.value}`)
    }
    async function content_change(){
        file_content[file_titles.indexOf(router.query.cheese_id)] = content.current.value
        await supabase.from("mice").update({ file_content }).eq("title", router.query.project_id).eq("author", user)
    }
    return (
        <>
        <Head>
            <title>{`${router.query.cheese_id}/${router.query.project_id} - Mouse Docs`}</title>
        </Head>
        <Navbar user = {user}/>
        <br></br>
        <div style = {{display:"flex"}}>
            <a href = "#config"><button><Mouse_Icon width = {16} height = {16}/></button></a>
            <input style = {{width:"100%"}} defaultValue = {cheese.split(" ")[1]} ref = {title} onBlur = {title_change}/>
        </div>
        <br></br>
        <div className = "card" style = {{maxWidth:"100%", display:"flex", alignItems:"center", border:"none"}}>
            <button><Bold_Icon width = {16} height = {16}/></button>
            &nbsp;<button><Italic_Icon width = {16} height = {16}/></button>
            <ToolBar_Spacer/>
            &nbsp;<button onClick = {() => setFontSize(fontSize+1)}><Plus_Icon width = {16} height = {16}/></button>
            &nbsp;<span style = {{color:"var(--text-darkest)"}}>{fontSize}</span>
            &nbsp;<button onClick = {() => setFontSize(fontSize-1)}><Minus_Icon width = {16} height = {16}/></button>
            <ToolBar_Spacer/>
            &nbsp;<button onClick = {() => setTextAlign("left")}><AlignLeft_Icon width = {16} height = {16}/></button>
            &nbsp;<button onClick = {() => setTextAlign("center")}><AlignCenter_Icon width = {16} height = {16}/></button>
            &nbsp;<button onClick = {() => setTextAlign("right")}><AlignRight_Icon width = {16} height = {16}/></button>
            <ToolBar_Spacer/>
            &nbsp;<div className = "dropdown">
                <span><button>{fontFamily}</button></span>
                <div className = "dropdown-content">
                    <span>Arial</span>
                    <span onClick = {() => setFontFamily("Courier")}>Courier</span>
                    <span onClick = {() => setFontFamily("Tahoma")}>Tahoma</span>
                    <span onClick = {() => setFontFamily("Times")}>Times</span>
                    <span onClick = {() => setFontFamily("Verdana")}>Verdana</span>
                </div>
            </div>
        </div>
        <textarea style = {{width:"100%", height:"70vh", outline:"none", border:"1px solid var(--background-lightest)", fontSize, textAlign, fontFamily}} autoComplete = "off" ref = {content} placeholder = "let your imagination run wild…" onChange = {content_change} defaultValue = {file_content[file_titles.indexOf(router.query.cheese_id)]}></textarea>
        <Cheese_Modal/>
        </>
    )
}

export async function getServerSideProps(context:any){
    let user = await get_user(context.req.cookies.sid)
    let cheeses = JSON.parse(await get_cheeses(user, context.query.project_id))

    const { data: file_titles }:any = await supabase.from("mice").select("file_titles").eq("title", context.query.project_id).eq("author", user)
    const { data: file_content }:any = await supabase.from("mice").select("file_content").eq("title", context.query.project_id).eq("author", user)

    const fonts = [ "Arial", "Courier", "Tahoma", "Trebuchet", "Times", "Verdana" ]

    return { props: {
        user,
        exists:cheeses.includes(context.query.cheese_id),
        file_titles: JSON.parse(file_titles[0].file_titles),
        file_content: JSON.parse(file_content[0].file_content),
        fonts
    } }
}