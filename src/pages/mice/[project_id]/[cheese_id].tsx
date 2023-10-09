import Head from "next/head"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import Markdown from "react-markdown"

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
    const [ area, setArea]:any = useState(true)

    if(exists == false){
        return <Custom404/>
    }
    const cheese = String(router.query.cheese_id).replace("_", " ")

    // autosaving changes in document
    async function title_change(){
        file_titles[file_titles.indexOf(router.query.cheese_id)] = `${cheese.split(" ")[0]}_${title.current.value}`

        await supabase.from("mice").update({ file_titles }).eq("title", router.query.project_id).eq("author", user)
        router.push(`/mice/${router.query.project_id}/${cheese.split(" ")[0]}_${title.current.value}`)
    }
    async function content_change(){
        file_content[file_titles.indexOf(router.query.cheese_id)] = content.current.value
        await supabase.from("mice").update({ file_content }).eq("title", router.query.project_id).eq("author", user)
    }

    // font style changes
    function add_bold(){
        const e:any = document.getElementById("content")
        const f = e.selectionEnd

        let newArray:any = []
        for(let i = 0; i < e.value.length; i++){
            if(i == f){
                newArray.push(`${e.value[f]} **** `)
            }else{
                newArray.push(e.value[i])
            }
        }
        console.log(newArray.join(""))
        e.value = newArray.join("")
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
            <input style = {{width:"100%"}} defaultValue = {cheese.replace(cheese.split(" ")[0], "")} ref = {title} onBlur = {title_change}/>
            <button className = "success" onClick = {() => setArea(!area)}>
                {area ? "Preview" : "Edit"}
            </button>
        </div>
        <br></br>
        <div className = "card" style = {{maxWidth:"100%", display:"flex", alignItems:"center", border:"none"}}>
            <button className = "secondary" onClick = {add_bold}><Bold_Icon width = {16} height = {16}/></button>
            &nbsp;<button className = "secondary" onClick = {() => content.current.value += "**"}><Italic_Icon width = {16} height = {16}/></button>
            <ToolBar_Spacer/>
            &nbsp;<button className = "secondary" onClick = {() => setFontSize(fontSize+1)}><Plus_Icon width = {16} height = {16}/></button>
            &nbsp;<span style = {{color:"var(--text-darkest)"}}>{fontSize}</span>
            &nbsp;<button className = "secondary" onClick = {() => setFontSize(fontSize-1)}><Minus_Icon width = {16} height = {16}/></button>
            <ToolBar_Spacer/>
            &nbsp;<button className = "secondary" onClick = {() => setTextAlign("left")}><AlignLeft_Icon width = {16} height = {16}/></button>
            &nbsp;<button className = "secondary" onClick = {() => setTextAlign("center")}><AlignCenter_Icon width = {16} height = {16}/></button>
            &nbsp;<button className = "secondary" onClick = {() => setTextAlign("right")}><AlignRight_Icon width = {16} height = {16}/></button>
            <ToolBar_Spacer/>
            &nbsp;
            <div className = "dropdown">
                <span><button className = "secondary">{fontFamily}</button></span>
                <div className = "dropdown-content">
                    <span>Arial</span>
                    <span onClick = {() => setFontFamily("Courier")}>Courier</span>
                    <span onClick = {() => setFontFamily("Tahoma")}>Tahoma</span>
                    <span onClick = {() => setFontFamily("Times")}>Times</span>
                    <span onClick = {() => setFontFamily("Verdana")}>Verdana</span>
                </div>
            </div>
        </div>
       { area ? 
        <>
        <textarea style = {{width:"100%", height:"70vh", outline:"none", border:"1px solid var(--background-lightest)", fontSize, textAlign, fontFamily}} autoComplete = "off" ref = {content} id = "content" placeholder = "let your imagination run wild…" onChange = {content_change} defaultValue = {file_content[file_titles.indexOf(router.query.cheese_id)]}></textarea>
        <p style = {{color:"var(--secondary)", fontStyle:"italic"}}>Cheese supports markdown</p>
        </>
        :
        <div className = "card">
            <Markdown>
                {content.current.value}
            </Markdown>
        </div> }
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