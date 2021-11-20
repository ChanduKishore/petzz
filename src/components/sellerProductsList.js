import DisplayProduct from "./displayProduct"


export default function SellerProductsList({title,productList}){
    console.log(productList,title)

   return(
       <>
        <h2>{title}</h2>
          {(productList.length!==0 )
          ?productList.map(obj=><DisplayProduct key={obj.id} product={obj}/>)
          :<h2>NO data available</h2>}
          </>)
  }