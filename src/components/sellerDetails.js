import { useParams } from "react-router-dom"
import SellerProfile from "./sellerProfile"
export default function SellerDetails({uid}){
 const {profileID}= useParams()

    return(
    <>
    
    <SellerProfile uid={profileID} userId={uid}/>
    </>)
}