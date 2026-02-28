import { useState } from "react"
import { Doc, Id } from "../../../../../convex/_generated/dataModel"
import { useCreateFile, useCreateFolder, 
    useDeleteFile, useFolderContent, 
    useRenameFile } from "../../hooks/use-files"
import { TreeItemWrapper } from "./tree-item-wrapper"
import { FileIcon, FolderIcon } from "@react-symbols/icons/utils"
import { ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { LoadingRow } from "./loading-row"
import { getItemPadding } from "./contants"
import { CreateInput } from "./create-input"
import { RenameInput } from "./rename-input"
import { useEditor } from "@/features/editor/hooks/use-editor"



export const Tree = ({
 item,
 level=0,
 projectId
}:{
  item:Doc<"files">,
  level?:number,
  projectId:Id<"projects">
})=>{
    
    const [isOpen,setIsOpen] = useState(false)
    const [isRenaming,setIsRenaming] = useState(false)
    const [creating,setCreating]=useState<"file" | "folder" | null>(null)

    const {acitveTabId,openFile,openTabs,closeTab}= useEditor(projectId)   
    const renameFile = useRenameFile()
    const deleteFile = useDeleteFile()
    const createFile = useCreateFile()
    const createFolder = useCreateFolder()

        const folderContents = useFolderContent({
        projectId, 
        parentId: item._id,
        enabled: item.type === "folder" && isOpen
})

    const handleCreate = (name:string)=>{
        setCreating(null)
        if(creating === "file"){
            createFile({
                projectId,
                parentId:item._id,
                content:"",
                name
            });
        }else{
                createFolder({
                    name,
                    parentId:item._id,
                    projectId
                })
            }

    }

    const handleRename = (newName:string)=>{
     setIsRenaming(false)

     if(newName===item.name){
            return
     }

     renameFile({id:item._id,newName})
    }

    const startCreating = (type:"file"|"folder")=>{
        setIsOpen(true)
        setCreating(type)
    }

    if(item.type === "file"){
        const fileName = item.name
        const isActive = acitveTabId === item._id

        if(isRenaming){
         return(
        <RenameInput
        type="file"
        defaultValue={fileName}
        level={level}
        onSubmit={handleRename}
        onCancel={()=>setIsRenaming(false)}
        />

    )
   }
        return(
            <TreeItemWrapper
            item={item}
            level={level}
            isActive={isActive}
            onClick={()=>openFile(item._id,{pinned:false})}
            onDoubleClick={()=>openFile(item._id,{pinned:true})}
            onRename={()=>setIsRenaming(true)}
            onDelete={()=>  {
                closeTab(item._id)
                deleteFile({id:item._id})
            }}
            >
              <FileIcon fileName={fileName} autoAssign className="size-4"/>
              <span className="truncate text-sm">{fileName}</span>
            </TreeItemWrapper>
        )
    }
 
    const folderName = item.name

    const folderContent = (
    <>
    <div className="flex items-center gap-0.5">        
        <ChevronRightIcon
        className={
            cn("size-4 shrink-0 text-muted-foreground",
                isOpen && "rotate-90"
            )
        }
        />
        <FolderIcon folderName={folderName} className="size-4"/>
    </div> 
    <span className="text-sm truncate">{folderName}</span>
    </>
    )

    if(creating){
     return(
        <>
        <button
        onClick={()=>setIsOpen((value)=>!value)}
        className="group flex items-center gap-1 h-5.5 hover:bg-accent/30 bg-amber-800"
        style={{paddingLeft:getItemPadding(level,false)}}
       >
        {folderContent }
        </button>
        
        {isOpen && (
           <>
           {folderContents === undefined && <LoadingRow level={level+1}/>}
           <CreateInput
           type={creating}
           level={level+1}
           onSubmit={handleCreate}
           onCancel={()=>setCreating(null)}
           />
           {folderContents?.map((subitem)=>(
            <Tree
            key={subitem._id}
            item={subitem}
            level={level+1}
            projectId={projectId}
            />
           ))}  
           </>
        )}
        </>
    )
    }
 
if(isRenaming){
    console.log("inside renaming");
    
     return(
        <>        
        <RenameInput
           type="folder"
           defaultValue={folderName}
           level={level}
           isOpen={isOpen}
           onSubmit={handleRename}
           onCancel={()=>setIsRenaming(false)}
           />
        
        {isOpen && (
           <>
           {folderContents === undefined && <LoadingRow level={level+1}/>}
           
           {folderContents?.map((subitem)=>(
            <Tree
            key={subitem._id}
            item={subitem}
            level={level+1}
            projectId={projectId}
            />
           ))}  
           </>
        )}
        </>
    )
    }
    return (
        <>
         <TreeItemWrapper
         level={level}
         onClick={()=>setIsOpen((value)=>!value)}
         onDoubleClick={()=>{}}
         onRename={()=>setIsRenaming(true)}
         item={item}
         onDelete={()=>{
            deleteFile({id:item._id})
         }}
         isActive={false}
         onCreateFile={()=>startCreating("file")}
         onCreateFolder={()=>startCreating("folder")}
         >
          {folderContent}   
         </TreeItemWrapper>  
         {
            isOpen && (
                <>
                {folderContent === undefined && <LoadingRow level={level+1}/>}
                {folderContents?.map((subItem)=>(
                         <Tree
                         key={subItem._id} 
                         item={subItem}
                         level={level+1}
                         projectId={projectId}
                         />
                )
                )}
                </>
            )
         }
        </>
    )

  

}