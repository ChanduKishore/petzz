import {useState, useEffect} from 'react'
import firebase from './services/firebase'
import SellerProfile from './components/sellerProfile'
import { Link,Routes,Route,Navigate,useNavigate} from 'react-router-dom'
import './App.css';
import Home from './components/home'
import Register from './components/register'
import Login from './components/login'
import Auth from './services/auth'
import ProductDetails from './components/productDetails';
import SellerDetails from './components/sellerDetails';
export default function App(){
    const [uid,setUid]=useState(null)
    let navigate =useNavigate();
    
   console.log(uid)
 useEffect(()=>{
     Auth.trackuserSigninStatus(setUid)},[uid])
return(<>
    <center><h1>Petzz</h1></center>
    
        <nav>
            <Link to="/">Home</Link>
            {uid
            ?<><Link to="/profile">Profile</Link>
                <button onClick={()=>Auth.logout(setUid,navigate)}>Logout</button>
                </>
            :<>
            <Link to="/register">Register</Link>
            <Link to="/login">|Login</Link>
            </>
            }
        </nav>
       
        <Routes>
            <Route path='/*' element={<Home uid={uid}/>}>
            <Route path='pets/:productID' element={<ProductDetails/>}/>
            </Route>
            <Route path='/profile' element={<SellerProfile uid={uid} userId={uid}/>} />
            <Route path='/register' element={uid?<Navigate to='/profile'/>:<Register setUid={setUid}/>} />
            <Route path='/login' element={uid?<Navigate to='/profile'/>:<Login setUid={setUid}/>} />
            <Route path='/Profiles/:profileID' element={<SellerDetails uid={uid}/>}/>
        </Routes>
    
    
    
    </>)
}