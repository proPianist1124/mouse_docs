//import "@/styles/globals.css"
import type { AppProps } from "next/app"
import Link from "next/link"
import { useState, useEffect } from "react"
import ClipLoader from "react-spinners/ClipLoader"

export default function App({ Component, pageProps }: AppProps) {
  const [ loading, setLoading ] = useState(false)
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500);
  }, [Component, pageProps])

  const centered = {
    display:"flex", alignItems:"center", justifyContent:"center", height:"500px"
  }

  return (
    <>
    <link href="https://propianist1124-ui.propianist1124.repl.co/style.css" rel="stylesheet" type="text/css"/>
    {loading ? 
      <div style = {centered}>
        <ClipLoader size = {30} color = {"#fff"} loading = {loading}/>
      </div>
      :
      <main>
        <Component {...pageProps} />
        <footer>
          By <Link href = "https://propianist1124.vercel.app" target = "_blank">proPianist1124</Link>
        </footer>
      </main>}
    </>
  )
}