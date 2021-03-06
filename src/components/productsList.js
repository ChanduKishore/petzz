import DisplayProduct from "./displayProduct"
import { useState, useEffect} from 'react';
import DB from '../services/database'
import LoadingScreen from './loadingScreen'

export default function ProductsList({title,products}){
    const [loading,setLoading]=useState(false)
    const [productList,setProductList]=useState('')
    console.log(productList,title,loading)
    console.log()
  useEffect(()=>{
     setLoading(true)
       
     if(!products){
          if(title){
               DB.getCollection(title).then(data=>{
               console.log('collection fetched succesfully')
               setProductList(data)
               setLoading(false)}).catch(e=> console.log(e.message))
          }
     }else{
          setProductList(products)
          setLoading(false)
     }
        },[title])
   return(<>
   {(loading)
        ?<LoadingScreen/>
        :<>
    <h2>{title}</h2>
    {(productList.length!==0)
          ?productList.map((product)=><DisplayProduct key={product.id} product={product}/>)
          :<h2>No data available in database</h2>}
          </>}
    </>)
  }