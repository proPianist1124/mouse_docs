import Head from "next/head"
import { useRouter } from "next/router" 
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from "react"

import Navbar from "./components/navbar"
import Mouse_Icon from "./components/icons/mouse"
import { get_user, get_mouses } from "./api/data"

export default function Home({user, titles, descr}:any) {
  const router = useRouter()

  return (
    <>
    <Head>
      <title>Mouses - Mouse Docs</title>
    </Head>
    <Navbar user = {user}/>
    <div className = "card">
      <h3 style = {{display:"flex", alignItems:"center", justifyContent:"center"}}>
        <Mouse_Icon width = {22} height = {22}/>
        &nbsp;My Mouses
      </h3>
      <br></br>
      {titles.map((title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined) =>
        <div className = "card-hoverable" key = {String(title)} onClick = {() => router.push(`/mouses/${title}`)}>
          {title}
          <span style = {{float:"right", color:"var(--secondary)"}}>{descr[titles.indexOf(title)]}</span>
        </div>
      )}
      <br></br><br></br>
      <button style = {{width:"100%"}} onClick = {() => router.push("/new")}>
        Add a New Mouse!
      </button>
    </div>
    </>
  )
}

export async function getServerSideProps(context:any){
  let user = await get_user(context.req.cookies.sid)

  const mouses = await get_mouses(user)
  return { props: {
    user,
    titles:mouses[0],
    descr:mouses[1],
  } }
}