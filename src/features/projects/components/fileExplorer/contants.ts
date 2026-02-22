



const BASE_PADDING = 3;
const LEVEL_PADDING = 3;

export const getItemPadding =(
    level:number,
    isFile:boolean
)=>{
 
 const fileOffset = isFile? 16 : 0
 
 return BASE_PADDING * level * LEVEL_PADDING + fileOffset

}