import { Link,Routes,Route,Outlet} from 'react-router-dom';
import ProductsList from './productsList';
import LandingPage from './landingPage'
export default function Home(){

    return(
         <>
        <nav>
          <Link to='/pets'>Pets</Link>
          <Link to='/food'>Food</Link>
        </nav>
        <Outlet/>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/pets' element={<ProductsList title='Pets'/>}/>
          <Route path='/food' element={<ProductsList title='Food'/>}/>
        </Routes>

        </>
       
        )


}