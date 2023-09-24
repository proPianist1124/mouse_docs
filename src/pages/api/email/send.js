import { send_email } from "./template"

export default async function handler(req, res) {
    await send_email(req.query.to, req.query.subject, req.query.content)
    res.redirect(302, "/")
}