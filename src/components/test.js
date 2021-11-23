import { useEffect } from "react/cjs/react.development"
import Storage from "../services/storage"
export default function Test(){
    useEffect(()=>{
        Storage.downloadImg('Pets/cats.jpg')
    })
    return (<>
    <h1>test</h1>
    </>)
}