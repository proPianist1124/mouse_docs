import { get_user } from "../api/data"

export default function Sid_Test({sid}:any){
    return (
        <>
        <h1>SID test</h1>
        <p>{sid}</p>
        </>
    )
}

export async function getServerSideProps(context:any){
    let sid = await get_user(context.req.cookies.sid)
    console.log(sid)
    return { props: {
        sid
    } }
}