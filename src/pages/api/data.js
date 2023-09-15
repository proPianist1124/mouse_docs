import { NextRequest } from "next/server"
import supabase from "./supabase"


export async function get_user(username){
    let { data: users } = await supabase.from("users").select("username").eq("username", username)
    let user;
    try{
        user = users[0].username
    }catch(err){
        user = null
    }
    return user
}

export async function get_password(username){
    let { data: passwords } = await supabase.from("users").select("password").eq("username", username)
    let password = passwords[0].password
    return password
}

export async function get_rats(username){
    let { data: rat_titles } = await supabase.from("rats").select("title").eq("author", username)
    let { data: rat_descr } = await supabase.from("rats").select("description").eq("author", username)

    const titles = []
    const descr = []
    for(let i = 0; i < rat_titles.length; i++){
        titles.push(rat_titles[i].title)
        descr.push(rat_descr[i].description)
    }
    return [titles, descr]
}

export async function get_cheeses(username, project){
    let { data: rat_file_titles } = await supabase.from("rats").select("file_titles").eq("author", username).eq("title", project)
    return rat_file_titles
}

export default async function handler(req, res){
    //const {data:files} = await supabase.from("rats").select("file_titles")
    //res.send(files[0].file_titles[0]);
    res.send(await get_cheeses("proPianist1124", "asdf")) // trying to get the rats of a specific user
}