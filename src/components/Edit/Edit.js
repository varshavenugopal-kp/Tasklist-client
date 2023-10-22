import { faCircleXmark, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Edit({setEditOpen,taskId}) {
    const [data,setData]=useState({})
    const [fileUrl, setUrl] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleFileChange = ((e) => {
        const file = e.target.files?.[0]
        
        if (file) {
            generateUrl(file)
        } else {
            console.log("nulll");

        }
    })

    const generateUrl = async (img) => {
        setIsLoading(true)
        const datas = new FormData()
        datas.append('file', img)
        datas.append('upload_preset', 'user_doc')
        datas.append('cloud_name', "dn6cqglmo")

        const { data } = await axios.post("https://api.cloudinary.com/v1_1/dn6cqglmo/image/upload", datas)
        console.log("urls:", data);


        setUrl(data.url)
        setIsLoading(false)
        return data.url

    }

    const closeModal = () => {
        setEditOpen(false);
    };

    useEffect(()=>{
        fetchData()
    },[])
    const fetchData=(async()=>{
        const response = await axios.get(`http://localhost:8000/single/${taskId}`)
        console.log("ooo",response);
        setData(response.data.data[0])
    })

    const handleEdit =async(e) => {
        e.preventDefault();
  try {
    console.log("Handling edit...", data); // Log the data before sending
    const formattedDate = new Date(data.date).toISOString().slice(0, 19).replace('T', ' ');
    let updatedData
    if(fileUrl){
        updatedData = { ...data, date: formattedDate,image:fileUrl };
    }else{
       updatedData = { ...data, date: formattedDate };
    }
     
      console.log("hhhhhhhhhhhhhhhhhhh",updatedData);
    const { data: responseData } = await axios.post('http://localhost:8000/editData',{...updatedData,id:taskId});
    console.log(responseData);
  } catch (error) {
    // Handle errors
    console.error("Error occurred:", error);
  }
    }

    const addDetails = ((e) => {
        setData({ ...data, [e.target.name]: e.target.value })
      })
    console.log("hehehe",data);
  return (
    <div>
        <div className="fixed inset-0 flex items-center justify-center z-50">

<div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
    <div>
    <div className='flex justify-end'>
            <button onClick={() => closeModal()}><FontAwesomeIcon icon={faXmark}></FontAwesomeIcon></button>
        </div>
        <div className='text-center'>
            <h1 className='font-bold text-2xl'>Add a Task</h1>

        </div>

    </div>


    <form className='' onSubmit={handleEdit}>
        <div className='w-full mt-5'>
            {/* <div>
                <label className=''>Heading</label>
            </div> */}

            <div>
                <input type='text' className='shadow appearance-none border rounded w-full py-2 px-3 h-9'  name='heading' value={data.heading} onChange={addDetails} ></input>
            </div>
        </div>

        <div className='w-full mt-5'>
            {/* <div>
                <label className=''>Description</label>
            </div> */}
            <div className='w-full'>
                <textarea name='description' className='shadow appearance-none border rounded w-full py-2 px-3 h-24' value={data.description} onChange={addDetails}></textarea>
            </div>
        </div>
        <div className='w-full mt-5'>
            {/* <div>
                <label className=''>Date</label>
            </div> */}

            <div>
                <input type='date' className='shadow appearance-none border rounded w-full py-2 px-3 h-9' name='date' value={data.date ? new Date(data.date).toISOString().split('T')[0] : ''} onChange={addDetails}></input>
            </div>
        </div>
        <div className='w-full mt-5'>
            {/* <div>
                <label className=''>Priority</label>
            </div> */}

<select name="priority" className="w-full h-10 border-2" value={data.priority} onChange={addDetails}>
<option value="" disabled selected hidden>
Select Priority
</option>
<option value="Low">Low</option>
<option value="Medium">Medium</option>
<option value="High">High</option>
</select>
        </div>
        {/* <div className='relative w-full overflow-x-scroll flex scrollbar gap-2  py-2 px-1'>
                            <FontAwesomeIcon className='fixed text-xl' icon={faCircleXmark} />
                            <input type="file" accept="image/*" name="file_upload" className="hidden" onChange={handleFileChange} />
                           <img src={data.image} className='pt-6 h-24  bg-gray-300'/>
                            
                        </div> */}


                   {
                    fileUrl?
                    <div className='relative w-full overflow-x-scroll flex scrollbar gap-2  py-2 px-1'>
                            <FontAwesomeIcon onClick={()=>setUrl(null)} className='fixed text-xl' icon={faCircleXmark} />
                           <img src={fileUrl} className='pt-6 h-24'/>
                            
                        </div>:
                       <div className='relative w-full overflow-x-scroll flex scrollbar gap-2  py-2 px-1'>
                       <label htmlFor="file_upload" className="cursor-pointer">
                         <FontAwesomeIcon className='fixed text-xl' icon={faCircleXmark} />
                       </label>
                       <input id="file_upload" type="file" accept="image/*" name="file_upload" className="hidden" onChange={handleFileChange} />
                       <img src={data.image} className='pt-6 h-24  bg-gray-300'/>
                     </div>
                   }
     <button className='bg-sky-950 text-white py-2 px-6 text-sm rounded-md' >Edit</button>
                                
                       
        </form> 
                </div>
            </div>
    </div>
  )
}

export default Edit
