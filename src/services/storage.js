import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firebase from './firebase'

const storage = getStorage(firebase);

function uploadImg(imgFile,category,name){
  const storageRef = ref(storage, `${category}/${name}.jpg`);

 return uploadBytes(storageRef, imgFile)

}

function downloadImg(img){
  return getDownloadURL(ref(storage, img))
  .catch((error) => {
    // Handle any errors
    console.log(error.message)
  });
}

export default{uploadImg, downloadImg}