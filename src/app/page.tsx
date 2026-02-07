"use client"
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";


export default function Home() {
  const createProject = useMutation(api.projects.create)
  const projects = useQuery(api.projects.get)

  return (
    <div>
      <Button
       onClick={()=>(createProject({name:"Project123"}))}
       >
        Add new 
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
  );
}
   