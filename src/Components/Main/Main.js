import React from 'react'
import folderimg from './last2.jpg'
import './Main.scss'
import { IoAddCircleOutline } from 'react-icons/io5';
import { AiOutlineClose } from 'react-icons/ai';
import { LiaLessThanSolid ,LiaGreaterThanSolid } from 'react-icons/lia';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import {BsArrowLeft } from 'react-icons/bs';



export default function Main({imagelist,deleteImage,folderopen,images,setUploadimg,upload,imageupload, addimage ,viewimage,
 backwardimage,singleimageurl,forwardimage,closeimage,backtofolder,foldercreatebutton,folderName,folderdelete, foldercreate,
 inputvalue,foldercreatesubmit,inputvaluechange,videoshow,photoloop}) {



  return (
    <div className='main'>
      {/* ----------folder-view------- */}   
           <div className='image-folderdiv' >
           <div className='dummy'></div>
           {folderName.map((folderName,index)=>{return(
           <div className='imagefolder' key={index} >
              <img src={folderimg} alt='trial' className='folderimg' onClick={()=>folderopen(index)}></img>
               <h3>{folderName}</h3>
               <button onClick={()=>folderdelete(index)}>delete folder</button>
           </div>
              )})}
           <IoAddCircleOutline onClick={foldercreatebutton} className='addfolderbutton' ></IoAddCircleOutline>      
         </div>
        {foldercreate===true&&
          <div className='foldercreatediv'>
            <input className='enterfoldername' value={inputvalue} onChange={inputvaluechange} type='text' placeholder='Enter the folder name'></input>
            <button className='foldercreatesubmit' onClick={()=>foldercreatesubmit()}> create</button>
          </div>

        }
   
      {/*-----------list of images--------- */}
      {images===true&& 
        <div className='imagesshowndiv'>
          <div className='imagesshown'>
            <BsArrowLeft  onClick={backtofolder} className='backtofolder'></BsArrowLeft>
            
            {imagelist.map((imageData,index) => {
          return (
            <div className='imagecollection' key={imageData.name}>
              <img className='imagelistitem' src={imageData.url} alt='imglist' onClick={() => viewimage(index)} /> 
            </div>
            
          );
             })}
             {/* ----------addbutton and popup for add image------- */}
        <IoAddCircleOutline className='addimgbutton' onClick={addimage}></IoAddCircleOutline>
        {imageupload===true&&
            <div className='uploadimg'>
            <input className='browse' type='file' onChange={(e) => { setUploadimg(e.target.files[0]) }}></input>
             <button className='upload' onClick={upload}>Upload</button>
          </div>
        }
        
          </div>
        {/*-------------single image view---------- */}

     
        
        </div> 
      }
         {singleimageurl&&( 
            <div className='singleimagesshown'>
               <button className='videoshow' onClick={videoshow}>video</button>
              { photoloop?<>
             <LiaLessThanSolid className='backward' onClick={backwardimage}></LiaLessThanSolid>
             <img className='image' src={singleimageurl} alt='imglist' />
             <RiDeleteBin5Fill className ='imagedelete' onClick={() => deleteImage()}></RiDeleteBin5Fill>
             <LiaGreaterThanSolid className='forward' onClick={forwardimage}></LiaGreaterThanSolid>
             <AiOutlineClose  className='closeimage' onClick={closeimage}></AiOutlineClose>   </>
             :  (
              imagelist.map((imageData, index) => (
                <div className='slidediv'>
                <div className='slide' key={imageData.name}>
                  <img className='imageslide' src={imageData.url} alt='imglist' />
                </div>
                </div>
              ))
            )}
          </div>
         
        )}
    </div>

  )
}
