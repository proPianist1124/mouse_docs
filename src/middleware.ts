import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { get_user } from "./pages/api/data"
 
// Custom middleware for protection
export async function middleware(req: NextRequest) {
    let user:any = req.cookies.get("sid")
    if(user == undefined){
        return NextResponse.rewrite(new URL("/auth", req.url))
    }else{
        console.log(user.value)
        return NextResponse.next()
    }
}

export const config = {
    matcher: ["/", "/new", "/rats/:project_id/:cheese_id"]
}