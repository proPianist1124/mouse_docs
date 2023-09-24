import { useRouter } from "next/router"

export default function Query(){
    const router = useRouter()
    return (
        <>
        {router.query.test}
        </>
    )
}