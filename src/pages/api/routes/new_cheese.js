import supabase from "../supabase"

export default async function handler(req, res){
    if(req.method == "POST"){
        const {data: rat_titles} = await supabase.from("rats").select("title")
        const {data: rat_file_titles} = await supabase.from("rats").select("file_titles")
        const {data: rat_file_content} = await supabase.from("rats").select("file_content")

        let titles = []

        for(let i = 0; i < rat_titles.length; i++){
            titles.push(rat_titles[i].title)
        }
        const file_titles_array = rat_file_titles[titles.indexOf(req.body.project)].file_titles
        const file_content_array = rat_file_content[0].file_content

        res.send(file_titles_array)
        /*file_titles_array.push(`file${file_titles_array.length+1}_${req.body.cheese}`)
        file_content_array.push("")

        //res.send(file_content_array)

        await supabase
            .from("rats")
            .update({ file_titles: file_titles_array })
            .eq("title", req.body.project)
        await supabase
            .from("rats")
            .update({ file_content: file_content_array })
            .eq("title", req.body.project)
        
        res.redirect(302, `/rats/${req.body.project}`)*/
    }else{
        res.send("Bad Request")
    }
}