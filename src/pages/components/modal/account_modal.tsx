import Mouse_Icon from "../icons/mouse"

export default function Account_Modal({user}:any){
    return (
        <div className="open">
			<div>
				<div className = "modal" id = "account">
					<div className="modal__window">
                        <a href = "#"><button className = "secondary" style = {{float:"right"}}>Close</button></a>
                        <br></br>
						<h2 className = "modal-label">My User Settings</h2>
                        <br></br>
                        <div className = "card" style = {{border:"none"}}>
                            <br></br>
                            <div>
                                <b>Username</b>&nbsp;&nbsp;<span style = {{color:"var(--text-darkest)"}}>{user}</span>
                            </div>
                            <br></br>
                            <div>
                                <b>Password</b>&nbsp;&nbsp;<span style = {{color:"var(--text-darkest)"}}>******</span>
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