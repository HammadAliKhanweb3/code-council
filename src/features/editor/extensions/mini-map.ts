import {showMinimap} from "@replit/codemirror-minimap"



const createElement = ()=>{
    const dom = document.createElement("div") 
    return {dom}
}


export const minimap=()=>[
    showMinimap.compute(["doc"],()=>{
    return{
        create:createElement
    }
    })
]