import Markdown from 'react-markdown'

export default function Markdown_Test(){
    return (
        <Markdown>
            Hey! this document is supported with **markdown**!
            no *way*
            ```
            console.log("hello world")
            ```
        </Markdown>
    )
}