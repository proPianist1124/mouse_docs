import Head from "next/head"
import Link from "next/link"

import Mouse_Icon from "./components/icons/mouse"

export default function Custom404() {
    return (
        <>
        <Head>
            <title>404 - Mouse Docs</title>
        </Head>
        <h1 style = {{textAlign:"center", height:"300px", paddingTop:75}}>
            <span style = {{fontSize:45, display:"flex", alignItems:"center", justifyContent:"center", paddingBottom:15, color:"var(--primary-darker)"}}>
                <Mouse_Icon width = {45} height = {45}/> 404
            </span>
            <p style = {{color:"var(--secondary)", fontSize:16, fontWeight:"normal"}}>
                You seem lost, wary traveler. Perhaps you should go back to <Link href = "/">our home page</Link>.
            </p>
        </h1>
        </>
    )
}