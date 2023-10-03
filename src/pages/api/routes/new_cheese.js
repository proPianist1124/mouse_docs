import supabase from "../supabase"
import { get_user } from "../data"
import { get } from "http"

export default async function handler(req, res){
    if(req.method == "POST"){
        const { data: titles } = await supabase.from("mice").select("file_titles").eq("author", await get_user(req.cookies.sid)).eq("title", req.body.mouse)
        const { data: content } = await supabase.from("mice").select("file_content").eq("author", await get_user(req.cookies.sid)).eq("title", req.body.mouse)

        let title_array = JSON.parse(titles[0].file_titles)
        let content_array = JSON.parse(content[0].file_content)
        title_array.push(`cheese${title_array.length+1}_${req.body.cheese}`)
        content_array.push("")

        await supabase.from("mice").update({ file_titles: title_array }).eq("title", req.body.mouse).eq("author", await get_user(req.cookies.sid))
        await supabase.from("mice").update({ file_content: content_array }).eq("title", req.body.mouse).eq("author", await get_user(req.cookies.sid))
        res.redirect(302, `/mice/${req.body.mouse}`)
    }else{
        res.send("Bad Request")
    }
}