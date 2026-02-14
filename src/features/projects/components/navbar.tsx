'use client'


import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Id } from "../../../../convex/_generated/dataModel"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"
import { UserButton } from "@clerk/nextjs"
import { useProjectById, useRenameProject } from "../hooks/use-projects"
import { useState } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Cloud, CloudCheck, CloudCheckIcon, GlobeIcon, LoaderIcon } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

const font = Poppins({
    subsets:["latin"],
    weight:["400","500","600","700"]
})


export const Navbar = ({projectId}
    :{projectId:Id<"projects">})=>{

        const project = useProjectById(projectId)
        const renameProject = useRenameProject(projectId)
       
        const [isRenaming,setIsRenaming]=useState(false)
        const [name,setName]=useState("")

        const handleStartRename = ()=>{
         if(!project) return
         setName(project.name)
         setIsRenaming(true)
        }




    return (
        <nav className="flex justify-between items-center
        gap-x-2 p-2 bg-sidebar border-b">
        <div className="flex items-center gap-x-2"> 
          <Breadcrumb>
          <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
            className="flex items-center gap-1.5"
            asChild
            >
            <Button
            variant="ghost"
            className="w-fit! p-1.5! h-7!"
            >   
            <Link href="/" className="flex items-center gap-2">
            <Image
            src="/vercel.svg"
            alt="logo"
            width={20}
            height={20}
            />
              <span className={cn("text-sm font-semibold", font.className)}>
                Code-Council
               </span>
            </Link>
             
            </Button>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="ml-0! mr-1"/>
          <BreadcrumbItem>
          {isRenaming ?
          <input
          autoFocus
          type="text"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          onFocus={(e)=>e.currentTarget.select()}
          onBlur={()=>{}}
          onKeyDown={()=>{}}
           className="text-sm bg-transparent text-foreground  
            outline-none focus:ring-1 focus:ring-inset
            focus:ring-ring font-medium max-w-40 truncate"
          // "
          />
            :(

              <BreadcrumbPage
              onClick={handleStartRename}
              className="text-sm cursor-pointer
              hover:text-primary font-medium 
              max-w-40 truncate">
          {project?.name ?? "Loading..."}
          </BreadcrumbPage>
        )
      }
          </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          {
            project?.importStatus === "importing" 
            ?(
                <Tooltip>
                <TooltipTrigger asChild>
                <LoaderIcon className="text-muted-foreground size-4 animate-spin"/>
                </TooltipTrigger>
                <TooltipContent>
                  importing...
                </TooltipContent>
                </Tooltip>
            ):(          
            project?.updatedAt ? (
              <Tooltip>
                <TooltipTrigger asChild>
                <CloudCheckIcon className="text-muted-foreground size-4 "/>
                </TooltipTrigger>
                <TooltipContent>
                  Saved{" "}
                      {formatDistanceToNow(
                        project?.updatedAt,
                        {addSuffix:true}
                      )}
                  </TooltipContent>
                  </Tooltip>
            ):(
              "Loading..."
            )
            )
          }
        </div>
        <div className="flex items-center gap-2">
            <UserButton/>
        </div>
        </nav>
    )
}