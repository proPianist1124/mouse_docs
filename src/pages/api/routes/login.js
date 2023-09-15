import { serialize } from "cookie"
import supabase from "../supabase"

export default function handler(req, res){
    if(req.method == "POST"){
        if(req.body.email == process.env.EMAIL){
            res.setHeader("Set-Cookie", [
                serialize("user", "test", { path: "/" }),
            ]);
            res.redirect(302, "/")
        }else{
            res.send("You have joined the waitlist.")
        }
    }else{
        res.send("Bad Request")
    }
}