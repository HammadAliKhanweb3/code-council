import { useState } from "react"
import { getItemPadding } from "./contants"
import { ChevronRightIcon} from "lucide-react"
import { FileIcon,FolderIcon } from "@react-symbols/icons/utils"


export const RenameInput = (
    {
        type,
        defaultValue,
        isOpen,
        level,
        onSubmit,
        onCancel
    }:{
     type:"file"|"folder",
     defaultValue:string,
     isOpen?:boolean,
     level:number,
     onSubmit:(name:string) => void,
     onCancel:()=>void
    }
)=>{

    const [value,setValue] = useState(defaultValue)
    
    const handleSubmit = ()=>{
        
        const trimmedValue = value.trim() || defaultValue
        onSubmit(trimmedValue)
        
        }

    return(
        <div className="w-full flex items-center gap-1 h-5.5 bg-accent/30"
        style={{paddingLeft:getItemPadding(level,type==="file")}}
        >
            <div className="flex items-center gap-0.5">
                {
                    type === "folder" && (
                        <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground"/>
                    )
                }{
                    type==="file" && (
                        <FileIcon fileName={value} className="size-4"/>
                    )
                }{
                    type === "folder" && (
                        <FolderIcon folderName={value} className="size-4"/>
                    )
                }
            </div>
            <input 
            autoFocus
            type="text"
            defaultValue={defaultValue}
            value={value}
            onChange={(e)=>setValue(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none
            focus:ring-1 focus:ring-inset focus:ring-ring"
            onBlur={handleSubmit}
            onKeyDown={(e)=>{
                if(e.key === "Enter"){
                    handleSubmit()
                }
                
                if(e.key === "Escape"){
                    onCancel()
                }
            }}
            onFocus={(e)=>{
                
                const value = e.currentTarget.value
                const lastDotIndex = value.lastIndexOf(".")
                
                if(lastDotIndex>0){
                    e.currentTarget.setSelectionRange(0,lastDotIndex)
                }else{
                    e.currentTarget.select()  
                }
            }}
            />
        </div>
    )

}