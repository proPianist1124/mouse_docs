import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { get_user } from "./pages/api/data"
 
// Custom middleware for protection
export async function middleware(req: NextRequest, res: NextResponse) {
    let user:any = req.cookies.get("user")
    try{
        user = await get_user(user.value)
        return NextResponse.next()
    }catch(e){
        user = null
        return NextResponse.rewrite(new URL("/auth", req.url))
    }
}

export const config = {
    matcher: ["/", "/new", "/rats/:project_id/:cheese_id"]
}