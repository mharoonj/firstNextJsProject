import ResponsiveAppBar from "./Appbar";

export default function CustomLayout({children}:{children:React.ReactNode}){
    return <>
  
    <ResponsiveAppBar />  
    {children}
    </> 
}