import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { get_user } from "./pages/api/data"
 
// Custom middleware for protection
export async function middleware(req: NextRequest) {
    /*let user:any = req.cookies.get("user")
    try{
        user = await get_user(user.value)
    }catch(e){
        user = null
        return NextResponse.rewrite(new URL("/auth", req.url))
    }*/

    console.log("mw ran")
    
    return NextResponse.next()
}

export const config = {
    matcher: ["/", "/new", "/rats/:project_id/:cheese_id"]
}