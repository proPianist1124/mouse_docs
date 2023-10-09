import Link from "next/link"
import { useRouter } from "next/router"
import Cookies from "js-cookie"

import Account_Modal from "./modal/account_modal"
import Mouse_Icon from "./icons/mouse"
import Menu_Icon from "./icons/menu"
import Logout_Icon from "./icons/logout"
import RoundPlus_Icon from "./icons/roundplus"
import User_Icon from "./icons/user"

function Account_Dropdown(){
    const router = useRouter()

    function logout(){
        Cookies.remove("sid")
        router.push("/")
        router.reload()
    }
    
    return (
        <div className = "dropdown">
            <span><Menu_Icon width = {21} height = {21}/></span>
            <div className = "dropdown-content">
                <a href = "#account"><span><User_Icon width = {17} height = {17}/> Account</span></a>
                <Link href = "/mice"><span><Mouse_Icon width = {17} height = {17}/> My Mice</span></Link>
                <Link href = "/new"><span><RoundPlus_Icon width = {17} height = {17}/> Add New</span></Link>
                <span className = "danger" onClick = {logout}><Logout_Icon width = {17} height = {17}/> Logout</span>
            </div>
        </div>
    )
}
export default function Navbar({user}:any){
    return(
        <>
        <div className = "navbar">
            <Link href = "/" className = "left" style = {{display:"flex", alignItems:"center"}}>
                <Mouse_Icon width = {17} height = {17}/>
                &nbsp;<b style = {{fontSize:20}}>Mouse Docs</b>
            </Link>
            <span className = "right" style = {{marginRight:70, display:"flex", alignItems:"center"}}>
                <Link href = "/">{String(user)}</Link>
                &nbsp;&nbsp;<Account_Dropdown/>
            </span>
        </div>
        <Account_Modal user = {user}/>
        </>
    )
}