import { ProjectsIdViewLayout } from "@/features/projects/components/projects-id-layout"
import React from "react"
import { Id } from "../../../../convex/_generated/dataModel"

const Layout =async ({children,params}
    :{children:React.ReactNode,params:Promise<{projectId:Id<"projects">}>})=>{
    
    const {projectId }= await params

    return(
        <div>
            <ProjectsIdViewLayout projectId={projectId}>
            {children}
            </ProjectsIdViewLayout>
        </div>
    )
} 

export default Layout