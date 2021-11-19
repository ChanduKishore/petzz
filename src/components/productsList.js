import DisplayProduct from "./displayProduct"
export default function ProductsList({title,listObj}){
    return(<>
    <h2>{title}</h2>
         { listObj
          ?Object.values(listObj).map(obj=><DisplayProduct key={obj.id} pet={obj}/>)
          :<p>no data availble in datbase or feature is under construction</p>}
    </>)
  }