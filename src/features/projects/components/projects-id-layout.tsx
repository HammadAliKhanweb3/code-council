"use client"
import { Id } from "../../../../convex/_generated/dataModel"
import { Navbar } from "./navbar"
import { Allotment } from "allotment";
import "allotment/dist/style.css";


const MIN_SIDEBAR_WIDTH =200
const MAX_SIDEBAR_WIDTH =800
const DEFAULT_CONVERSATION_SIDEBAR_WIDTH=300
const DEFAULT_MIAN_SIZE= 1000




export const ProjectsIdViewLayout = ({children,projectId}:
    {children:React.ReactNode,projectId:Id<"projects">})=>{
    return (
        <div className="w-ful h-screen flex flex-col">  
            <Navbar projectId={projectId}/>
           <div className="flex-1 flex overflow-hidden">
             <Allotment className="flex-1" 
            defaultSizes={[
                DEFAULT_CONVERSATION_SIDEBAR_WIDTH,
                DEFAULT_MIAN_SIZE
            ]}
            >
             <Allotment.Pane 
             snap 
             minSize={MIN_SIDEBAR_WIDTH} 
             maxSize={MAX_SIDEBAR_WIDTH} 
             preferredSize={DEFAULT_CONVERSATION_SIDEBAR_WIDTH}>
                   <div>Conversation Sidebar</div>
             </Allotment.Pane>
            <Allotment.Pane >
            {children}
            </Allotment.Pane>
            </Allotment>
           </div>
        </div>
    )
}