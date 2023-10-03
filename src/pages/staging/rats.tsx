import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from "react"
import { get_user, get_mice } from "../api/data"

export default function mice({titles, descr}:any){
    return (
        <>
        <div className = "card">
            {titles.map((title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined) =>
                <div className = "card" key = {String(title)}>
                    {title}
                    <span style = {{float:"right", color:"var(--secondary)"}}>{descr[titles.indexOf(title)]}</span>
                </div>
            )}
        </div>
        </>
    )
}

export async function getServerSideProps(context: { req: { cookies: { [x: string]: any } } }){
    let user = await get_user(context.req.cookies.sid)
    const mice = await get_mice(user)
    return { props: {
        titles:mice[0],
        descr:mice[1],
    } }
}