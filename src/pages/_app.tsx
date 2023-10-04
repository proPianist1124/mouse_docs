import "@/styles/globals.css"
import { Analytics } from "@vercel/analytics/react"
import type { AppProps } from "next/app"
import Link from "next/link"
import Script from "next/script"
import { useState, useEffect } from "react"
import Loader from "react-spinners/MoonLoader" // custom loader

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
        <Loader size = {30} color = {"#fff"} loading = {loading}/>
      </div>
      :
      <main>
        <Component {...pageProps} />
        <Analytics />
        <div style = {{paddingBottom:200}}></div>
        <footer>
          By <Link href = "https://propianist1124.vercel.app" target = "_blank">proPianist1124</Link>
        </footer>
      </main>}
      <Script src = "https://ui.propianist1124.repl.co/script.js"></Script>
      <Script id="config">{`
        localStorage.setItem("theme", "gradient");
      `}</Script>
    </>
  )
}