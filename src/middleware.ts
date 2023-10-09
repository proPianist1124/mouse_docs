import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { get_user } from "./pages/api/data"
 
// Custom middleware for route protection

export async function middleware(req: NextRequest) {
    let user:any = req.cookies.get("sid")
    
    if(user == undefined){
        return NextResponse.rewrite(new URL("/auth", req.url))
    }else{
        if(await get_user(user.value) == null){
            return NextResponse.rewrite(new URL("/auth", req.url))
        }else{
            return NextResponse.next()
        }
    }
}

export const config = {
    matcher: ["/", "/new", "/mice/:project_id/:cheese_id"]
}