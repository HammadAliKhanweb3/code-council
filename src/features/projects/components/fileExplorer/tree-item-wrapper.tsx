import { cn } from "@/lib/utils"
import { Doc } from "../../../../../convex/_generated/dataModel"
import { ContextMenu,ContextMenuContent,ContextMenuItem,ContextMenuSeparator,ContextMenuShortcut,ContextMenuTrigger } from "@/components/ui/context-menu"
import { getItemPadding } from "./contants"


export const TreeItemWrapper = (
{
  item,
  children,
  level,
  isActive,
  onClick,
  onDoubleClick,
  onRename,
  onDelete,
  onCreateFile,
  onCreateFolder,
}:{
    item:Doc<"files">
    children:React.ReactNode,
    level:number,
    isActive:boolean,
    onClick?:()=>void,
    onDoubleClick?:()=>void,
    onRename?:()=>void,
    onDelete?:()=>void,
    onCreateFile?:()=>void,
    onCreateFolder?:()=>void,
}
)=>{
    
    return(
        <ContextMenu>
            <ContextMenuTrigger asChild>            
                  <button
                  onClick={onClick}
                  onDoubleClick={onDoubleClick}
                  onKeyDown={(e)=>{
                    if(e.key === "Enter"){
                        e.preventDefault()
                        onRename?.()
                    }
                  }}
                  className={
                    cn("groub flex items-center gpa-1 w-full h-5.5 hover:bg-accent/30 bg-yellow-500 outline:none focus:ring-1 focux:ring-inset focus:ring-ring",
                            isActive && "bg-accent/30"
                    )
                  }
                  style={{paddingLeft:getItemPadding(level, item.type==="file",)}}
                  >
                    {children}
                  </button>
            </ContextMenuTrigger>
            <ContextMenuContent
            onCloseAutoFocus={(e)=>e.preventDefault()}
            className="text-sm"
            >
                {
                    item.type === "folder" && (
                        <>
                        <ContextMenuItem onClick={onCreateFile}>
                             New File...
                        </ContextMenuItem>
                        <ContextMenuItem onClick={onCreateFolder}>
                             New Folder...
                        </ContextMenuItem>
                       <ContextMenuSeparator/>
                        </>
                    )
                }

        <ContextMenuItem 
          onClick={onRename}
          className="text-sm"
        >
          Rename...
          <ContextMenuShortcut>
            Enter
          </ContextMenuShortcut>
        </ContextMenuItem>
         <ContextMenuItem 
          onClick={onDelete}
          className="text-sm"
        >
          Delete Permanently
          <ContextMenuShortcut>
            ⌘Backspace
          </ContextMenuShortcut>
        </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>

    )
}