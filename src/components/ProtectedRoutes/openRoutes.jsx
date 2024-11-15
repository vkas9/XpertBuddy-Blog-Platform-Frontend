import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
const OpenRoute=({children})=>{
    const {token}=useSelector((store)=>store.credential)
    if(token===null)return children;
    else return <Navigate to="/social-hub/all-blogs"/>
}
export default OpenRoute;