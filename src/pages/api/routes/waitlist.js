import { serialize } from "cookie"
import supabase from "../supabase"

import { send_email } from "../email/template"

export default async function handler(req, res){
    if(req.method == "POST"){
        if(req.body.email == process.env.EMAIL){
            res.setHeader("Set-Cookie", [
                serialize("user", "test", { path: "/" }),
            ]);
            res.redirect(302, "/")
        }else{
            await send_email(req.body.email, "Rat Host Waitlist", "Hey! Thanks for joining the waitlist! You'll get your account soon!")
            res.send("You have joined the waitlist.")
        }
    }else{
        res.send("Bad Request")
    }
}