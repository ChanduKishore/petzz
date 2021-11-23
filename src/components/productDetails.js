import {useState,useEffect} from 'react'
import { useParams, useLocation } from "react-router-dom"
import DB from '../services/database'
import { Link } from 'react-router-dom'
import './customMethods'
import LoadingScreen from './loadingScreen'
export default function ProductDetails(){
    const[loading,setLoading]=useState(true)
    const [product,setProduct]=useState(null)
    const {productID} =useParams()
    const location=useLocation()
    const collectionName=location.pathname.split('/')[1].capitalize();
    
    useEffect(()=>{
        setLoading(true)
        DB.getData(collectionName,productID)
        .then((doc)=>{
            console.log(doc)
            setProduct(doc)
            setLoading(false)
        })
        .catch(e=>console.log(e.message))
    },[productID])
    return (
    <>
    {loading
        ?<LoadingScreen/>
        :product
            ?<>
            <img src={product.image} style={{width:'300px'}}/>
            <p>Name: {product.name}</p>
            <p>Breed: {product.breed? product.breed:'not available'}</p>
            <p>Age: {product.age? product.age:'not available'}</p>
            <p>description: {product.description}</p>
            <strong>{product.price}rs</strong>
            <button>buy</button>

            <h2>Owner Details</h2>
            <div className='userProfile'>
                <img src={product.ownerProfilePic}  className='profilePic'/>
                <div>
                    <p>name: {product.owner}</p>
                    <p>mobile: {product.mobile}</p>
                    <p>location: {product.address}</p>
                </div>
            <Link to={`/Profiles/${product.ownerId}`}>view seller Profile</Link>

            </div>
            
            <footer>
                
            </footer>
            </>
            :<h1>No data found</h1>

    
}

        </>)
}