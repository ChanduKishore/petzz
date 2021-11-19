import { useState, useEffect} from 'react';
import DB from '../services/database'
import DisplayProduct from './displayProduct';
import LoadingScreen from './loadingScreen'
import ProductsList from './productsList';

export default function Home(){
    const [loading,setLoading]=useState(true)
  const [pets,setPets]=useState('')

    useEffect(()=>{
        DB.getData('Services','Pets').then(data=>{
            setPets(data)
            setLoading(false)})
            },[])
    return(
        (loading)
        ?<LoadingScreen/>
        : <ProductsList title='pets' listObj={pets}/>)
}