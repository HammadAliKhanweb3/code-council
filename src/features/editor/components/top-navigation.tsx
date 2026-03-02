import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Id } from "../../../../convex/_generated/dataModel";
import { useEditor } from "../hooks/use-editor";
import { useFile } from "@/features/projects/hooks/use-files";


const Tab = (
    {
        fileId,
        isFirst,
        projectId
    }:
    {
        fileId:Id<"files">,
        isFirst:boolean,
        projectId:Id<"projects">
    }
)=>{
    const file = useFile(fileId)
return(
    <div>
        
    </div>
)
}


export const TopNavigation = (
    {projectId}:
    {projectId:Id<"projects">})=>{

        const {openTabs} = useEditor(projectId)

return(
    <ScrollArea className="flex-1">
        <nav className="bg-sidebar flex item-center h-8.75 border-b">
         {
            openTabs.map((fileId,index)=>(

                <Tab
                key={fileId}
                fileId={fileId}
                isFirst={index===0}
                projectId={projectId}
                />
            ))
         }
        </nav>
        <ScrollBar orientation="horizontal"/>
    </ScrollArea>
)
}