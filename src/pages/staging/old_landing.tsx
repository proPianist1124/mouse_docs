import Link from "next/link"

import Rocket_Icon from "../components/icons/landing/rocket"
import Book_Icon from "../components/icons/landing/book"
import Arrow_Icon from "../components/icons/arrow"
import Cheese_Icon from "../components/icons/cheese"
import Code_Icon from "../components/icons/code"
import Laptop_Icon from "../components/icons/laptop"

export function Landing(){
    const flex_card:any = {
        textAlign:"center",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        border:"none",
        color:"var(--text-darker)"
    }

    return (
        <>
        <div style = {{height:"100vh"}}>
            <h1 style = {{textAlign:"center", fontSize:45}} className = "header-left-right"><b>Your Friendly Neighborhood Text Editor</b></h1>
            <p style = {{color:"var(--text-darkest)", textAlign:"center", fontSize:20, fontStyle:"italic"}}><b>your gateway to the freedom of writing</b></p>
            <div style = {{paddingBottom:125}}></div>
            <div className = "container">
                <div className = "card" style = {flex_card}>
                    <h1><i>Your</i> Idea<br></br>Takes Flight</h1>
                    &nbsp;&nbsp;<Rocket_Icon/>
                </div>
                <div className = "card" style = {flex_card}>
                    <h1>Proudly<br></br>Open Source</h1>
                    &nbsp;&nbsp;<Book_Icon/>
                </div>
            </div>
            <div style = {{display:"flex", justifyContent:"center", paddingTop:75}}>
                <Arrow_Icon width = {50} height = {50}/>
            </div>
        </div>
        <div style = {{height:"100vh"}} id = "features">
            <h2 style = {{textAlign:"center", color:"var(--text-darker)"}}>Why Us?</h2><br></br>
            <div style = {{width:"100%", color:"var(--text-darker)", display:"flex", justifyContent:"center"}}>
                <div className = "card-hoverable" style = {{marginRight:45, height:200}}>
                    <h3>Alternative to Google Docs&nbsp;<Cheese_Icon width = {25} height = {25}/></h3>
                    The 100% more secure Docs alternative! Write your stories, ideas, our thoughts. Publish documents to the web with custom urls/expiraton dates and analytics or keep them private.
                </div>
                <div className = "card-hoverable" style = {{height:200}}>
                    <h3>Easily Customizable&nbsp;<Code_Icon width = {25} height = {25}/></h3>
                    Because this is an open source project, you can easily customize the styling and code to your preference by cloning our repo! Make Mouse Docs <i>yours</i>.
                </div>
                <div className = "card-hoverable" style = {{marginLeft:45, height:200}}>
                    <h3>Hosting Like Never Before&nbsp;<Laptop_Icon width = {25} height = {25}/></h3>
                    You could also host Mouse Docs locally if you&apos;re paranoid - just clone our Github repo and setup a <Link href = "https://supabase.com" target = "_blank">Supabase</Link> project for an API key!
                </div>
            </div>
        </div>
        <div style = {{height:"100vh"}} id = "stack">
            <h2 className = "header-top-bottom" style = {{textAlign:"center"}}>
                <span>Next.js</span>, <span>Typescript</span>, <span>Supabase</span>, <span>Resend</span>
            </h2>
            <div className = "card" style = {{border:"none", maxWidth:700, color:"var(--text-darker)", fontStyle:"italic"}}>
                <h3 style = {{textAlign:"center"}}>&quot;This modern tech stack are the essentials for a successful webapp&quot;</h3>
                <Link href = "https://propianist1124.vercel.app" target = "_blank"><h3 style = {{textAlign:"right"}}>- proPianist1124</h3></Link>
            </div>
        </div>
        <style jsx>{`
            div.card-hoverable{
                width:100%;
                height:150px;
                overflow-y:auto;
                line-height:1.5;
            }
            div.card-hoverable h3{
                display:flex;
                justify-content:center;
                align-items:center;
            }
            .header-top-bottom span:hover{
                color:black;
            }
            
            div.container{
                display:flex;
                padding-left:150px;
                padding-right:150px;
            }
            div.header{
                text-align:center;
                line-height:80%;
            }
            @media screen and (max-width: 800px) {
                div.header{
                    line-height:normal;
                }
                div.container{
                    flex:none;
                    padding-left:0;
                    padding-right:0;
                }
                div.card-hoverable{
                    width:150px;
                }
                div.card-hoverable h3 svg{
                    display:none;
                }
            }
        `}</style>
        </>
    )
}

export default function Index(){
    return (
        <>
        <Landing/>
        </>
    )
}