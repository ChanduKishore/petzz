import { useState, useEffect} from 'react';
import { Link,Routes,Route } from 'react-router-dom';
import DB from '../services/database'
import DisplayProduct from './displayProduct';
import LoadingScreen from './loadingScreen'
import ProductsList from './productsList';
import LandingPage from './landingPage'
export default function Home(){
    const [loading,setLoading]=useState(true)
  const [pets,setPets]=useState('')

    useEffect(()=>{
        DB.getData('Services','Pets').then(data=>{
            setPets(data)
            setLoading(false)})
            },[])
    return(
      <>
        {(loading)
        ?<LoadingScreen/>
        : <>
        <nav>
          <Link to='/pets'>Pets</Link>
          <Link to='/food'>Food</Link>
        </nav>
        
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/pets' element={<ProductsList title='pets' listObj={pets}/>}/>
          <Route path='/food' element={<ProductsList title='Food' listObj={null}/>}/>
        </Routes>

        </>}
       
        </>
        )


}