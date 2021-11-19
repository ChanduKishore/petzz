import { getFirestore, doc, updateDoc, collection, setDoc,getDoc} from "firebase/firestore"
const db = getFirestore();

async function getData(collectionName,username){
    const docRef = doc(db, collectionName, username);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    //console.log("Document data:", docSnap.data());
    return docSnap.data()
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
  }
  
  async function addData(collectionName,username,dataObj){
    // Add a new document with a generated id.
  const docRef = await setDoc(doc(db, collectionName,username), dataObj);
  console.log("Document written successfuly");
  }
  
  async function updateData(collectionName,username,data){
    const usernameRef = doc(db, collectionName, username);
  
  // Set the "capital" field of the city 'DC'
  await updateDoc(usernameRef, data);
  }
  
  export default {addData,getData,updateData} 