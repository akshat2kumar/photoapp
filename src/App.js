import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Main from './Components/Main/Main';
import useFirebase from './Components/Firebase/useFirebase';

function App() {
  const {setUploadimg,upload,folderopen,imagelist,deleteImage,images ,imageupload,addimage,viewimage,singleimageurl,backwardimage,
    forwardimage,closeimage,backtofolder,foldercreate,folderName,folderdelete ,foldercreatebutton,foldercreatesubmit,inputvalue,
    inputvaluechange,videoshow,photoloop}=useFirebase();
  return (
    <div className="App">
      <Navbar></Navbar>
      <Main imagelist={imagelist} deleteImage={deleteImage} folderopen={folderopen} images={images}
       setUploadimg={setUploadimg} upload={upload} imageupload={imageupload} addimage={addimage} 
       viewimage={viewimage} singleimageurl={singleimageurl} backwardimage={backwardimage} forwardimage={forwardimage} 
       closeimage={closeimage} backtofolder={backtofolder} foldercreate={foldercreate} folderName={folderName} folderdelete={folderdelete} 
       foldercreatebutton={foldercreatebutton} foldercreatesubmit={foldercreatesubmit} inputvaluechange={inputvaluechange}
        inputvalue={inputvalue} videoshow={videoshow} photoloop={photoloop}></Main>

    </div>
  );
}

export default App;
