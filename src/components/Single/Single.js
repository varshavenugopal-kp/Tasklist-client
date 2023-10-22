import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Single({selectOpen,taskId}) {
    console.log(taskId,"eeeeeeeeeeee");
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
           {data && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
                        <div>
                            <div className="flex justify-end">
                                <button onClick={() => closeModal()}>
                                    <FontAwesomeIcon icon={faXmark} />
                                </button>
                            </div>
                        </div>
                        <div>
                            <img className="h-2/4 w-full" src={data.image} alt="Task Image" />
                        </div>
                        <div>
                            <p className="text-lg font-semibold">{data.heading}</p>
                        </div>
                        <div>
                            <p className="text-lg">{data.description}</p>
                        </div>
                        <div>
                            <p className="text-xs">{data.date ? new Date(data.date).toISOString().split('T')[0] : ''}</p>
                        </div>
                        <div>
                            <p className="text-xs">{data.time}</p>
                        </div>
                      
                    </div>
                </div>
            )}
    </div>
  )
}

export default Single
