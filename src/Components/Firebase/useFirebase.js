
import { useEffect, useState } from 'react';

import { storage } from './firebase';
import { ref, listAll, uploadBytes, getDownloadURL, deleteObject ,list } from 'firebase/storage';
import { v4 } from "uuid";
export default function useFirebase() {
  const [uploadimg, setUploadimg] = useState('');
  const [imagelist, setImagelist] = useState([]);
  const [images,setImages]=useState(false)
  const[imageupload,setImageupload]=useState(false)
  const[folderName,setFolderName]=useState([])
  const[foldercreate,setFoldercreate]=useState([])
  const[inputvalue,setInputvalue]=useState('')
const[photoloop,setPhotoloop]=useState(true)

const [imageindex,setImageindex]=useState([])
const [singleimageurl,setSingleimageurl]=useState()



const folderupdate=()=>{

  const listFolders = async (folderPath) => {
    const storageRef = ref(storage, folderPath);
  
    try {
      const items = await list(storageRef);
      const folderNames = [];
  
      for (const item of items.prefixes) {
        // Add each folder name to the list
        folderNames.push(item.name);
  
        // Recursively list sub-folders
        const subFolderNames = await listFolders(item.name);
        folderNames.push(...subFolderNames);
      }
  
      return folderNames;
    } catch (error) {
      console.error('Error listing folders:', error);
      return [];
    }
  };
  
  // Call the function to list all folders within the root path
  listFolders('/')
    .then((allFolderNames) => {
      setFolderName(allFolderNames)
      console.log('All Folder Names:', allFolderNames);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

useEffect (() => {
folderupdate()
},[])


const foldercreatebutton=()=>{
  setFoldercreate(!foldercreate)
}

const inputvaluechange=(e)=>{
  setInputvalue(e.target.value)
}

const foldercreatesubmit=()=>{
  
  if (foldercreate == null) return;

  const imageref = ref(storage, `/${inputvalue}/.folder`);
  uploadBytes(imageref)
    .then(() => {
      console.log("File uploaded successfully");
      setFoldercreate(!foldercreate);
      folderupdate()
    })
    
    .catch((error) => {
      console.error("Error uploading file", error);
    });
   
  setFoldercreate(!foldercreate)
  setPhotoloop(!photoloop)
}

  const folderopen = (index) => {
    setImages(!images)
    console.log(images,'df')
    const imagelistref = ref(storage, `${folderName[index]}/`);
    listAll(imagelistref)
      .then((response) => {
        const promises = response.items.map(async (item) => {
          const url = await getDownloadURL(item);
          const name = item.name; // Extract the image name

          return { url, name };
        });
        Promise.all(promises)
          .then((imageData) => {
            setImagelist(imageData);
            console.log('Images fetched:', imageData);
          })
          .catch((error) => {
            console.error("Error getting download URLs:", error);
          });
      })
      .catch((error) => {
        console.error("Error listing images:", error);
      })
  };
  
const videoshow=()=>{
setPhotoloop(!photoloop)
}

  const folderdelete = (index) => {
    const folderNameToDelete = folderName[index];
    const folderRef = ref(storage, folderNameToDelete);
  
    // Check if the folder exists
    list(folderRef)
      .then((result) => {
        if (result.items.length === 0) {
          console.log(`Folder ${folderNameToDelete} does not exist.`);
          return;
        }
  
        // List all files and subfolders within the folder to be deleted
        listAll(folderRef)
          .then((listResult) => {
            // Create an array of promises to delete all files and subfolders
            const deletePromises = listResult.items.map((item) => {
              return deleteObject(item);
            });
  
            // Delete all files and subfolders
            return Promise.all(deletePromises);
          })
          .then(() => {
            // Delete the main folder itself
            return deleteObject(folderRef);
          })
          .then(() => {
            console.log(`Folder ${folderNameToDelete} and its contents deleted successfully.`);
            setFolderName((prev) => prev.filter((item) => item !== folderNameToDelete));
          })
          .catch((error) => {
            console.error(`Error deleting folder ${folderNameToDelete}:`, error);
          });
      })
      .catch((error) => {
        console.error(`Error checking folder ${folderNameToDelete}:`, error);
      });
  };
  
  

  console.log(folderName,'hdsjsns')
  const backtofolder= () => {
    setImages(!images)
  }
  const addimage=()=>{
    setImageupload(!imageupload)
  }
  const upload = () => { 
    if (uploadimg == null) return;
    const imageref = ref(storage, `/image/${uploadimg.name + v4()}`);
    uploadBytes(imageref, uploadimg).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        const name = snapshot.metadata.name; // Extract the image name
        setImagelist((prev) => [...prev, { url, name }]);
      });
    });
    setImageupload(!imageupload) 
  };

  const deleteImage = () => {
    const name=imageindex.value
    const imageRef = ref(storage, `image/${name}`);
    deleteObject(imageRef)
      .then(() => {
        setImagelist((prev) => prev.filter((item) => item.name !== name));
        forwardimage()
        console.log(`Image ${name} deleted.`);
      })
      .catch((error) => {
        console.error(`Error deleting image ${name}:`, error);
      });
  };

// single image-----backward------forward----close----------delete



const viewimage=(index)=>{
  console.log(index,'trial')
 
  const value=imagelist[index].name
  console.log(value,'trial1')
  setImageindex({index,value})
  setSingleimageurl(imagelist[index].url) 
}
console.log(imageindex,'trial2')
const closeimage=()=>{
  setSingleimageurl('')
}
console.log(singleimageurl,'check')
const backwardimage=()=>{
  console.log(imageindex.index,'dsbifb')
  if(imageindex.index===0){
  const newindex=0
  console.log(newindex,'new')
  setImageindex({index:newindex})
  viewimage(newindex)}

  else {
  console.log(imageindex.index,'dsbifb')
  const newindex=imageindex.index-1
  console.log(newindex,'new')
  setImageindex({index:newindex })
  viewimage(newindex)}
}
const forwardimage=()=>{
  const folderitemsno=imagelist.length
  console.log(folderitemsno,'number')
  if(folderitemsno===imageindex.index+1){
  const newindex=imageindex.index
  console.log(newindex,'new')
  setImageindex({index:newindex})
  viewimage(newindex)}

  else {
  const newindex=imageindex.index+1
  console.log(newindex,'new')
  setImageindex({index:newindex})
  viewimage(newindex)}
}


  return{setUploadimg,upload,folderopen,imagelist,deleteImage,images,imageupload,setImageupload,addimage,
    viewimage,backwardimage,singleimageurl,forwardimage,closeimage,backtofolder,folderName,folderdelete,
    foldercreatebutton,foldercreate,foldercreatesubmit,inputvalue,inputvaluechange,videoshow,photoloop
  }
}
