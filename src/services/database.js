import { getFirestore, doc, updateDoc, collection,where, setDoc,getDoc,query,getDocs} from "firebase/firestore"
const db = getFirestore();

async function getData(collectionName,docName){
  console.log('getting data from database',docName)
    const docRef = doc(db, collectionName, docName);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    //console.log("Document data:", docSnap.data());
    return docSnap.data()
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
  }

  async function getDocsWithQuery(collectionName,searchFeild,value){
    console.log('getting specified doc from database')

      const Query = query(collection(db, collectionName),where(searchFeild,'==',value))
    const docSnap = await getDocs(Query);
    const docArray=[]
    docSnap.forEach(doc=>{
      console.log("Document data:", doc.data());
      docArray.push(doc.data())
    })
      
   return docArray
    }

  async function getCollection(collectionName){
      console.log('getting a collection')
  
        const Query = query(collection(db, collectionName))
      const docSnap = await getDocs(Query);
      const docArray=[]
      docSnap.forEach(doc=>{
        docArray.push(doc.data())
      })
        
     return docArray
      }


  // addData function add document to a specified collection 
  //like you can use thi function to create user to the users collection or pet to pets collection
  //to use this function you need to give collection name (where to add doc) and document name (name of doc ) and data(as an object)
  
  async function addData(collectionName,docName,dataObj){
    // Add a new document with a generated id.
  const docRef = await setDoc(doc(db, collectionName,docName), dataObj);
  console.log("Document written successfuly");
  }
  
  
  
  // update functions updates data in already existed doc 
  async function updateData(collectionName,username,data,setUpdateStatus=''){
    setUpdateStatus('writing data to database')
    const usernameRef = doc(db, collectionName, username);
  
  // Set the "capital" field of the city 'DC'
  await updateDoc(usernameRef, data)
  .then(()=>{setUpdateStatus('succcess!')})
  .catch(e=> setUpdateStatus(e.message));
  }
  export default {addData,getData,updateData,getDocsWithQuery,getCollection} 