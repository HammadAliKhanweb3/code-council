import { useEffect, useMemo, useRef } from "react"
import { EditorView } from "@codemirror/view"
import {basicSetup} from "codemirror"
import {javascript} from "@codemirror/lang-javascript"
import {oneDark} from "@codemirror/theme-one-dark"
import { customTheme } from "../extensions/custom-theme"
import { getLanguageExtension } from "../extensions/language-extension"



interface Props{
    fileName:string
}
export const CodeEditor = ({fileName}:Props)=>{

    const editorRef = useRef<HTMLDivElement>(null)
    const viewRef = useRef<EditorView | null>(null)


    const languageExtension = useMemo(()=> getLanguageExtension(fileName),[fileName])

    useEffect(()=>{

            if (!editorRef.current) return

            const view = new EditorView({
                doc:`function add(param1,param2) {eeee
                         return param1+param2
                     }

                  console.log(add(1,2))`,
                parent:editorRef.current,
                extensions:[
                    oneDark,
                    customTheme,
                    basicSetup,
                    javascript({typescript:true})
                ]
            })

            viewRef.current = view
            
            return()=>{
                view.destroy()
            }
    },[])


    return(
        <div ref={editorRef} className="size-full pl-4 bg-background "/>
    )

}
