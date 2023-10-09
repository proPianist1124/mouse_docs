import { useState } from "react"

export default function Bold_Test(){
    let [ array, setArray ]:any = useState()
    function add_bold(){
        const e:any = document.getElementById("myTextarea")
        const f = e.selectionEnd
        console.log(e.value[f])
        console.log(e.value.length)

        let newArray:any = []
        for(let i = 0; i < e.value.length; i++){
            if(i == f){
                newArray.push(`${e.value[f]} **** `)
            }else{
                newArray.push(e.value[i])
            }
        }
        setArray(newArray)
        e.value = newArray.join("")
    }
    return (
        <>
        <button onClick = {add_bold}>make bold</button>
        <br></br>
        <textarea id = "myTextarea" placeholder = "test"></textarea>
        {array}
        </>
    )
}