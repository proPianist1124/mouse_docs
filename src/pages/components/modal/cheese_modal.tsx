export default function Cheese_Modal(){
    return (
        <div className="open">
			<div>
				<div className = "modal" id = "config">
					<div className="modal__window">
                        <a href = "#"><button className = "secondary" style = {{float:"right"}}>Close</button></a>
                        <h2 className = "modal-label">Mouse Config</h2>
                        <div className = "card" style = {{textAlign:"left", border:"none"}}>
                            <p>Public</p>
                            <button className = "success" onClick = {() => alert("publish to the community")}>Publish</button>
                            &nbsp;&nbsp;<button className = "warning" onClick = {() => alert("please upgrade your plan first")}>Restrict</button>
                            &nbsp;&nbsp;<button onClick = {() => alert("share via email")}>Share</button>
                            <br></br><br></br>
                            <hr/>
                            <p style = {{color:"var(--danger)"}}>Danger</p>
                            <button className = "danger" onClick = {() => alert("delete mouse")}>Delete</button>
                            &nbsp;&nbsp;<button className = "danger" onClick = {() => alert("please upgrade your plan first")}>Auto Destruct</button>
                        </div>
					</div>
				</div>
			</div>
		</div>
    )
}