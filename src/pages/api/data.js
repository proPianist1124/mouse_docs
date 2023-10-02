import { NextRequest } from "next/server"
import supabase from "./supabase"

export async function get_uuid(key){
    let { data: uuids } = await supabase.from("uuids").select("uuid").eq("key", key)
    let uuid = uuids[0].uuid
    return uuid
}

export async function get_user(uuid){
    const { data: sid } = await supabase.from("users").select("username").eq("sid", uuid)
    try {
        return sid[0].username
    }catch(e){
        return null
    }
}

export async function get_password(username){
    let { data: passwords } = await supabase.from("users").select("password").eq("username", username)
    let password = passwords[0].password
    return password
}

export async function get_mouses(username){
    let { data: mouse_titles } = await supabase.from("mouses").select("title").eq("author", username)
    let { data: mouse_descr } = await supabase.from("mouses").select("description").eq("author", username)

    const titles = []
    const descr = []
    for(let i = 0; i < mouse_titles.length; i++){
        titles.push(mouse_titles[i].title)
        descr.push(mouse_descr[i].description)
    }
    return [titles, descr]
}

export async function get_cheeses(username, project){
    let { data: mouse_file_titles } = await supabase.from("mouses").select("file_titles").eq("author", username).eq("title", project)
    try{
        return mouse_file_titles[0].file_titles
    }catch(e){
        return null
    }
}

export default async function handler(req, res){
    const {data:files} = await supabase.from("mouses").select("file_titles")
    res.send(files[0].file_titles[0]);
}