import Link from "next/link"

import Arrow_Icon from "./icons/arrow"
import Cheese_Icon from "./icons/cheese"
import Code_Icon from "./icons/code"
import Laptop_Icon from "./icons/laptop"

function Rocket_Icon(){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" viewBox="0 0 210 210" fill="none">
            <path d="M39.375 144.375C26.25 155.4 21.875 188.125 21.875 188.125C21.875 188.125 54.6 183.75 65.625 170.625C71.8375 163.275 71.75 151.988 64.8375 145.163C61.4364 141.916 56.9563 140.041 52.257 139.895C47.5576 139.75 42.9702 141.345 39.375 144.375Z" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M105 131.25L78.75 105C83.4063 92.92 89.2693 81.3406 96.25 70.4375C106.445 54.1361 120.642 40.7142 137.489 31.4483C154.336 22.1824 173.273 17.3807 192.5 17.5C192.5 41.3 185.675 83.125 140 113.75C128.948 120.739 117.222 126.601 105 131.25Z" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M78.75 105H35C35 105 39.8125 78.4875 52.5 70C66.675 60.55 96.25 70 96.25 70" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M105 131.25V175C105 175 131.513 170.188 140 157.5C149.45 143.325 140 113.75 140 113.75" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}
export function Landing(){

    return (
        <>
        <div style = {{height:"100vh"}}>
            <div className = "header">
                <h1 style = {{fontSize:50}}>Where <span style = {{color:"var(--primary)"}}>Innovation</span> Takes Flight</h1>
                <h2 style = {{fontWeight:450, color:"var(--text-darker)"}}>Your Friendly Neighborhood Hosting Service</h2>
            </div>
            <div className = "card" style = {{border:"none", maxWidth:750, display:"flex", color:"var(--text-darker)"}}>
                <div style = {{paddingRight:50}}>
                    <Rocket_Icon/>
                </div>
                <p>
                    Mouse Docs is an open-source, online word processor. Aiming to be intuitive, secure, and versatile, this is the gateway to your freedom of writing.
                    <br></br><br></br>
                    <Link href = "/about"><button style = {{borderRadius:50}}>About Us</button></Link> <button style = {{borderRadius:50}} className = "secondary">Pricing</button>
                </p>
            </div>
            <div style = {{display:"flex", justifyContent:"center", paddingTop:100}}>
                <Arrow_Icon width = {50} height = {50}/>
            </div>
        </div>
        <div style = {{height:"100vh"}} id = "features">
            <h2 style = {{textAlign:"center", color:"var(--primary)"}}>Why Us?</h2><br></br>
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
        <div style = {{height:"100vh"}} id = "pricing">
             <h2 style = {{textAlign:"center", color:"var(--primary)"}}>Pricing</h2>
             <p style = {{color:"var(--secondary)", textAlign:"center"}}>all subscriptions are one-time payments</p>
             <br></br>
             <div className = "card" style = {{maxWidth:1200, border:"none", display:"flex"}}>
                <div className = "card">
                    <h3>Free $0</h3>
                    <i>For the causal writer</i>
                    <ul>
                        <li>Unlimited Mice & Cheese</li>
                        <li>1 Public Cheese</li>
                        <li>1 Locked Cheese</li>
                    </ul>
                    <button className = "secondary">Buy Now</button>
                </div>
                <div className = "card">
                    <h3>Pro $15 / <span style = {{color:"#CF85EA"}}>1 Month Nitro</span></h3>
                    <i>For the causal writer</i>
                    <ul>
                        <li>Unlimited Mice & Cheese</li>
                        <li>Unlimited Public Cheeses</li>
                        <li>Unlimited Locked Cheeses</li>
                        <li>Custom Analytics</li>
                        <li>Custom Shorteners</li>
                        <li>1 Auto Self Destruct Cheese</li>
                    </ul>
                    <button className = "secondary" style = {{color:"var(--primary-darker)"}}><b>Most Popular</b></button>
                </div>
                <div className = "card">
                    <h3>Enterprise $50</h3>
                    <i>For the causal writer</i>
                    <ul>
                    <li>Unlimited Mice & Cheese</li>
                        <li>Unlimited Public Cheeses</li>
                        <li>Unlimited Locked Cheeses</li>
                        <li>Unlimited Auto Self Destruct Cheeses</li>
                        <li>Unlimited Team Members</li>
                        <li>Custom Analytics</li>
                        <li>Custom Shorteners</li>
                        <li>Custom Organization</li>
                    </ul>
                    <button className = "secondary">Buy Now</button>
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