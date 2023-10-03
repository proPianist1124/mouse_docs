import supabase from "../supabase"

export default async function handler(req, res){
    if(req.method == "POST"){
        // logic
        await supabase
            .from("mice")
            .insert({
                    title:req.body.title,
                    author:req.cookies.user,
                    file_titles:[],
                    file_content:[],
                    description:req.body.description
                });
        res.redirect(302, "/mice")
    }else{
        res.send("Bad Request")
    }
}