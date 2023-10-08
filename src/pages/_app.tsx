import "@/styles/globals.css"
import { Analytics } from "@vercel/analytics/react"
import type { AppProps } from "next/app"
import Head from "next/head"
import Link from "next/link"
import { useState, useEffect } from "react"
import Loader from "react-spinners/MoonLoader"
import { Toaster } from "sonner"

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
    <Head>
      <title>Your Text Editor - Mouse Docs</title>
      <meta name="title" content="Your Text Editor - Mouse Docs" />
      <meta name="description" content="The open-source Google Docs alternative! Sign up for free today!" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://mouse-docs.obl.ong/" />
      <meta property="og:title" content="Your Text Editor - Mouse Docs" />
      <meta property="og:description" content="The open-source Google Docs alternative! Sign up for free today!" />
      <meta property="og:image" content="https://mouse-docs.obl.ong/favicon.ico" />
      <meta property="twitter:card" content="https://mouse-docs.obl.ong/favicon.ico" />
      <meta property="twitter:url" content="https://mouse-docs.obl.ong/" />
      <meta property="twitter:title" content="Your Text Editor - Mouse Docs" />
      <meta property="twitter:description" content="The open-source Google Docs alternative! Sign up for free today!" />
      <meta property="twitter:image" content="https://mouse-docs.obl.ong/favicon.ico" />
    </Head>
    <link rel="icon" type="image/x-icon" href="https://res.cloudinary.com/dyemytgtv/image/upload/v1696728813/Screenshot_2023-10-07_at_6.30.56_PM_rg1rnl.png"></link>
    {loading ? 
      <div style = {centered}>
        <Loader size = {30} color = {"var(--primary)"} loading = {loading}/>
      </div>
      :
      <main>
        <Component {...pageProps} />
        <Analytics />
        <Toaster richColors/>
        <div style = {{paddingBottom:200}}></div>
        <footer>
          <Link href = "https://twitter.com/mousedocs" target = "_blank">Follow us on &#120143;</Link>
        </footer>
      </main>}
    </>
  )
}