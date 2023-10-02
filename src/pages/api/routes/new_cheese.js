import supabase from "../supabase"

export default async function handler(req, res){
    if(req.method == "POST"){
        const {data: mouse_titles} = await supabase.from("mouses").select("title")
        const {data: mouse_file_titles} = await supabase.from("mouses").select("file_titles")
        const {data: mouse_file_content} = await supabase.from("mouses").select("file_content")

        let titles = []

        for(let i = 0; i < mouse_titles.length; i++){
            titles.push(mouse_titles[i].title)
        }
        const file_titles_array = JSON.parse(mouse_file_titles[titles.indexOf(req.body.project)].file_titles)
        const file_content_array = JSON.parse(mouse_file_content[0].file_content)

        file_titles_array.push(`cheese${file_titles_array.length+1}_${req.body.cheese}`)
        file_content_array.push("")

        await supabase
            .from("mouses")
            .update({ file_titles: file_titles_array })
            .eq("title", req.body.project)
        await supabase
            .from("mouses")
            .update({ file_content: file_content_array })
            .eq("title", req.body.project)
        
        res.redirect(302, `/mouses/${req.body.project}`)
    }else{
        res.send("Bad Request")
    }
}