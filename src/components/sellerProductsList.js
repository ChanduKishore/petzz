import SellerProduct from "./sellerProduct"


export default function SellerProductsList({title,productList,uid}){
    console.log(productList,title)

   return(
       <>
        <h2>{title}</h2>
          {(productList.length!==0 )
          ?productList.map(obj=><SellerProduct key={obj.id} product={obj} productList={productList} uid={uid}/>)
          :<h2>NO data available</h2>}
          </>)
  }