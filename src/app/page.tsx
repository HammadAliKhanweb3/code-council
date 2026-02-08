"use client"
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";


export default function Home() {
  const createProject = useMutation(api.projects.create)
  const projects = useQuery(api.projects.get)

 const handleDemoBlocking = async () => {
 const response =   await fetch("/api/demo/blocking",{
    method:"POST"
  })
  console.log(await response.text());
  
 }

 const handleDemoNonBlocking = async () => {
  console.log("befor response");
  
 const response =   await fetch("/api/demo/background",{
    method:"POST"
  })  

  console.log(await response.text());
  
 }

  return (
   <div>
     <div>
      <Button
       onClick={handleDemoBlocking}
       >
        Blocking 
      </Button>
      {
        projects?.map((project)=>(
                <div className="border rounded p-2 flex flex-col" key={project._id}>
               {project._id}
               <p>{project.name}</p>
               <p>Owner Id:{project.ownerId}</p>
                </div>  
        )
      )
      }
    </div>
     <div>
      <Button
       onClick={handleDemoNonBlocking}
       >
        Non-Blocking
      </Button>
      {
        projects?.map((project)=>(
                <div className="border rounded p-2 flex flex-col" key={project._id}>
               {project._id}
               <p>{project.name}</p>
               <p>Owner Id:{project.ownerId}</p>
                </div>  
        )
      )
      }
    </div>
   </div>
  );
}
   