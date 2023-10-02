import { Resend } from "resend"
const resend = new Resend(process.env.RESEND_PUBLIC_API_KEY)

export async function send_email(to, subject, content){
    (async function (){
      try{
        const data = await resend.emails.send({
          from: "Mouse Docs <no-reply@mouse-docs.obl.ong>",
          to: to,
          subject: subject,
          html: content,
        })
      }catch (error){
        console.log(error)
        return "an error occured"
      }
    })()
}