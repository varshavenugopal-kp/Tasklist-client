import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Single({selectOpen,taskId}) {
    const [data,setData]=useState()
    const closeModal = () => {
        selectOpen(false);
    };

    useEffect(()=>{
        fetchData()
    },[])
    const fetchData=(async()=>{
        const response = await axios.get(`http://localhost:8000/single/${taskId}`)
        console.log("ooo",response);
        setData(response.data.data[0])
    })
    console.log("hehehe",data);
  return (
    <div>
           <div className="fixed inset-0 flex items-center justify-center z-50">

<div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
    {/* <div>
    <div className='flex justify-end'>
            <button onClick={() => closeModal()}><FontAwesomeIcon icon={faXmark}></FontAwesomeIcon></button>
        </div>

    </div>
     <div></div>
    <img className='h-2/3 w-full ' src={tasks?.image}></img>
    */}
   
   </div>
</div>

    </div>
  )
}

export default Single
