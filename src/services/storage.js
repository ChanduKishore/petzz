import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firebase from './firebase'

const storage = getStorage(firebase);

function uploadImg(imgFile,category,name,setUpdateStatus){
  setUpdateStatus('writing image file to storage')
  const storageRef = ref(storage, `${category}/${name}.jpg`);

 return uploadBytes(storageRef, imgFile).then(()=>'image stored succesfully')
 .catch((error)=>setUpdateStatus(error.message))

}

function downloadImg(img,setUpdateStatus){
  setUpdateStatus('retriving data from storage')
  return getDownloadURL(ref(storage, img))
    .then((url)=>{
      console.log(url)
          setUpdateStatus(' data retrived successfully! ')
      return url
    })
  .catch((error) => {
    // Handle any errors
   setUpdateStatus(error.message)
    console.log(error.message)
  });
}

export default{uploadImg, downloadImg}