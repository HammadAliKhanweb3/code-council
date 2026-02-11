import { useProjects } from "../hooks/use-projects"
import { FaGithub } from "react-icons/fa"
import { AlertCircleIcon, GlobeIcon, Loader2Icon } from "lucide-react"
import { Doc } from "../../../../convex/_generated/dataModel"

import { 
     Command,
     CommandDialog, 
     CommandEmpty,
     CommandGroup,
     CommandInput,
     CommandItem, 
     CommandList
    } from "@/components/ui/command"
import { useRouter } from "next/navigation"

interface ProjectCommandDialogProps {
open:boolean,
onOpenChange:(open:boolean)=>void
}

const getProjectIcon = (project: Doc<"projects">) => {
  if(project.importStatus === "completed"){
    return <FaGithub className="size-4 text-muted-foreground"/>
}
  if(project.importStatus === "failed"){
    return <AlertCircleIcon className="size-4 text-muted-foreground"/>
}
if(project.importStatus === "importing"){
    return <Loader2Icon className="size-4 text-muted-foreground animate-spin"/>
}
    return <GlobeIcon className="size-4 text-muted-foreground"/>

}




export const ProjectCommandDialog = ({open,onOpenChange}:ProjectCommandDialogProps)=>{

const router = useRouter()
const projects = useProjects()

const handleSelect = (projectId:string)=>{
router.push(`/projects/${projectId}`)
onOpenChange(false)
}



return (

    <div>
     <CommandDialog 
     open={open} 
     onOpenChange={onOpenChange} 
     title="Search Projects"
     description="Search and Navigate to your projects"
     >
        <Command>
             <CommandInput placeholder="Search Projects..."/>
             <CommandList>
                <CommandEmpty>No results foud.</CommandEmpty>
            <CommandGroup heading="projects">
               {projects?.map((project)=>(
                <CommandItem 
                key={project._id}
                value={`${project.name}-${project._id}`}
                onSelect={()=>handleSelect(project._id)}
                >
                    {getProjectIcon(project)}
                    {project.name}
                </CommandItem>
               ))
               }
            </CommandGroup>
             </CommandList>
             </Command>
     </CommandDialog>
    </div>
)
}