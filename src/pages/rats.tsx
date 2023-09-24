import Head from "next/head"
import { useRouter } from "next/router" 
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from "react"

import Navbar from "./components/navbar"
import Rat_Icon from "./components/icons/rat"
import { get_rats } from "./api/data"

export default function Home({user, titles, descr}:any) {
  const router = useRouter()

  return (
    <>
    <Head>
      <title>Rats - Rat Host</title>
    </Head>
    <Navbar user = {user}/>
    <div className = "card">
      <h3 style = {{display:"flex", alignItems:"center", justifyContent:"center"}}>
        <Rat_Icon width = {22} height = {22}/>
        &nbsp;My Rats
      </h3>
      <br></br>
      {titles.map((title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined) =>
        <div className = "card-hoverable" key = {String(title)} onClick = {() => router.push(`/rats/${title}`)}>
          {title}
          <span style = {{float:"right", color:"var(--secondary)"}}>{descr[titles.indexOf(title)]}</span>
        </div>
      )}
      <br></br><br></br>
      <button style = {{width:"100%"}} onClick = {() => router.push("/new")}>
        Add a New Rat!
      </button>
    </div>
    </>
  )
}

export async function getServerSideProps(context:any){
  // rat file content here
  let user = context.req.cookies.user

  const rats = await get_rats(user)
  return { props: {
    user,
    titles:rats[0],
    descr:rats[1],
  } }
}