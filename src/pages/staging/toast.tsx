import { toast } from "sonner"

export default function Toast(){
    return (
        <>
        <button onClick = {() => toast.success("Toast has been opened!")}>Open Toast</button>
        </>
    )
}