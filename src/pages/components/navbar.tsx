import Link from "next/link"
import { useRouter } from "next/router"
import Cookies from "js-cookie"

import Menu_Icon from "./icons/menu"
import Logout_Icon from "./icons/logout"
import RoundPlus_Icon from "./icons/roundplus"
import Mouse_Icon from "./icons/mouse"
import User_Icon from "./icons/user"

export default function Navbar({user}:any){
    return(
        <>
        <div className = "navbar">
            <Link href = "/" className = "left" style = {{display:"flex", alignItems:"center"}}>
                <Mouse_Icon width = {17} height = {17}/>
                &nbsp;<b style = {{fontSize:20}}>Mouse Docs</b>
            </Link>
            <span className = "right" style = {{marginRight:70, display:"flex", alignItems:"center"}}>
                {String(user)}
                &nbsp;&nbsp;<Dropdown/>
            </span>
        </div>
        <Settings user = {user}/>
        </>
    )
}

function Dropdown(){
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

function Settings({user}:any){
    return (
        <div className="open">
			<div>
				<div className = "modal" id = "account">
					<div className="modal__window">
                        <a href = "#"><button className = "secondary" style = {{float:"right"}}>Close</button></a>
                        <br></br>
						<h2 className = "modal-label">My User Settings</h2>
                        <br></br>
                        <div className = "card" style = {{borderColor:"var(--background-bottom-lighter)"}}>
                            <br></br>
                            <div>
                                <b>Username</b>&nbsp;&nbsp;<span style = {{color:"var(--primary-darkest)"}}>{user}</span>
                            </div>
                            <br></br>
                            <div>
                                <b>Password</b>&nbsp;&nbsp;<span style = {{color:"var(--primary-darkest)"}}>******</span>
                            </div>
                            <br></br><br></br>
                            <p style = {{color:"var(--secondary-darker)", fontSize:13}}>Secured by <b>Mouse Docs</b> <Mouse_Icon width = {15} height = {15}/></p>
                        </div>
					</div>
				</div>
			</div>
		</div>
    )
}