import {useState,useEffect} from 'react'
import { useParams, useLocation } from "react-router-dom"
import DB from '../services/database'
import { Link } from 'react-router-dom'
import './customMethods'
export default function ProductDetails(){
    const [product,setProduct]=useState(null)
    const {productID} =useParams()
    const location=useLocation()
    const collectionName=location.pathname.split('/')[1].capitalize();
    
    useEffect(()=>{
        DB.getData(collectionName,productID)
        .then((doc)=>{
            console.log(doc)
            setProduct(doc)
        })
        .catch(e=>console.log(e.message))
    },[productID])
    return (
    <>
    
    {
        product
    ?<>
    <small>product id: {productID}</small>
    <img src={product.image} style={{width:'300px'}}/>
    <p>Name: {product.name}</p>
    <p>Breed: {product.breed? product.breed:'not available'}</p>
    <p>Age: {product.age? product.age:'not available'}</p>
    <p>description: {product.description}</p>
    <strong>{product.price}rs</strong>
    <button>buy</button>

    <h2>Owner Details</h2>
    <img src={product.ownerImage}
    />
    <p>name:{product.owner}</p>
    <p>mobile:{product.mobile}</p>
    <p>location:{product.address}</p>
    <Link to={`/Profiles/${product.ownerId}`}>view seller Profile</Link>
    
    </>
    :<h1>No data found</h1>

    }


        </>)
}