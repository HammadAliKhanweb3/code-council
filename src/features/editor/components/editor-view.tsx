import { Id } from "../../../../convex/_generated/dataModel"
import { FileBreadcrumbs } from "./file-breadcrumbs"
import { TopNavigation } from "./top-navigation"



export const EditorView= (
    {projectId}:
    {projectId:Id<"projects">
    })=>{

    return(
        <div className="h-full flex flex-col">
            <div className="flex items-center">
               <TopNavigation projectId={projectId}/>
            </div>
            {projectId && 
              <FileBreadcrumbs projectId={projectId}/>
            }
        </div>
    )
}