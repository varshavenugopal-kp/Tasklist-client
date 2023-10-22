import React, { useEffect, useState } from 'react'
import Add from '../Add/Add'
import { api } from '../../Services/Axios'
import axios from 'axios'
import Edit from '../Edit/Edit'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Home() {
    const  [addOpen,setAddOpen]=useState(false)
    const [editOpen,setEditOpen]=useState(false)
    const [select,selectOpen]=useState()
    const [taskId,settaskId]=useState()
    const [data,setData]=useState()
    const [prio,setPrio]=useState()

    useEffect(() => {
      fetchData();
    }, []);
  
    useEffect(() => {
      prioFetch();
    }, [prio]);
    
    const prioFetch = async () => {
     
      try {
        const response = await axios.post('http://localhost:8000/priorData', prio);
        console.log('Response from priority fetch:', response);
        if (response.data && response.data.data) {
            setData(response.data.data);
        }
    } catch (error) {
        console.error('Error occurred while fetching data:', error);
        // Handle errors here
    }
    };
  
    // const prioFetch = async () => {
    //   try {
    //     let url = 'http://localhost:8000/';
    //     if (prio && prio !== 'All') {
    //       url += `priorData/${prio}`;
    //     }
    //     const response = await axios.get(url);
    //     if (response.data && response.data.data) {
    //       setData(response.data.data);
    //     }
    //   } catch (error) {
    //     console.error('Error occurred while fetching data:', error);
    //   }
    // };


  
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/');
        console.log('Response from data fetch:', response);
        if (response.data && response.data.data) {
            setData(response.data.data);
        }
    } catch (error) {
        console.error('Error occurred while fetching data:', error);
        // Handle errors here
    }
    };
  
   console.log("there??",data);
    const modalOpen=()=>{
        setAddOpen(true)
    }
    const editModal=()=>{
      setEditOpen(true)
    }
    const handleSelect=(taskId)=>{
        selectOpen(taskId)
        
    }
    const handleClick=(taskId)=>{
      console.log("jjjjj");
      setEditOpen(true)
      settaskId(taskId)
   }

   const addPrio=((e)=>{
    setPrio({ ...prio, [e.target.name]: e.target.value })
   })
   console.log("kooi",prio);

   const handledelete=async(taskId)=>{
    try {
      await axios.post('http://localhost:8000/delete', { id: taskId });
      const updatedData = data.filter((task) => task.id !== taskId);
      setData(updatedData);
    } catch (error) {
      console.error('Error occurred while deleting data:', error);
      // Handle errors here
    }
   }
   console.log(taskId);
  return (
    <div>
       <nav className='shadow-md bg-sky-950 h-20'>
            
        </nav>
        <div className='flex justify-between p-4'>
        <div className='w-32 h-10 bg-sky-900 mt-7 cursor-pointer' onClick={()=>modalOpen()}><h1 className='text-white pt-2 px-2'>Create note</h1></div>
        <div>
        <div className='w-full mt-5'>
                            {/* <div>
                                <label className=''>Priority</label>
                            </div> */}

<select name="priority" className="w-48 h-10 border-2" onChange={addPrio}>
    <option value="" disabled selected hidden>
        Select Priority
    </option>
    <option value="Low">Low</option>
    <option value="Medium">Medium</option>
    <option value="High">High</option>
    <option value="All">All</option>
</select>
                        </div>
        </div>
        </div>
            
        <div>

        <div className='grid grid-cols-5 gap-4  p-10'>
          {
            data?.map((tasks) => (
              <div className='h-72 w-56 border border-black'>
                <img className='h-2/3 w-full ' src={tasks?.image}></img>
                <p className='p-3 text-lg font-semibold'>{tasks?.heading}</p>
                {/* <p className='ms-3 line-clamp-2 text-xs'>{tasks?.description}</p> */}
                {/* <div className='ms-3 mt-2 w-24 h-7 transition duration-300 ease-in-out hover:scale-90 bg-black cursor-pointer'> */}
               <div className='flex space-x-44 '>
               <div className=' px-2'><FontAwesomeIcon icon={faPenToSquare} className='text-sm text-left' key={tasks?._id} onClick={()=>handleClick(tasks?.id)}/></div>
               <div className='mt-2 '><FontAwesomeIcon icon={faTrashCan} className='text-sm text-left'key={tasks?._id} onClick={()=>handledelete(tasks?.id)} /></div>
            
                </div>
                

                  {/* <p className='text-white text-xs text-center py-1 pb-10' key={tasks?._id} onClick={()=>handleClick(tasks?.id)} >READ MORE</p> */}
                {/* </div> */}

                {/* <div className='ms-3 mt-2 w-24 h-7 transition duration-300 ease-in-out hover:scale-90 bg-black cursor-pointer'> */}
                  {/* <p className='text-white text-xs text-center py-1 pb-10' key={tasks?._id} onClick={()=>handledelete(tasks?.id)} >delete</p> */}
                
                {/* </div> */}
              </div>
           ))
          }
      </div>


      
{/* <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
             <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
    </div>
</div> */}



        {
            addOpen && <Add setAddOpen={setAddOpen}/>
        }
        </div>
        <div>
        {
          editOpen && <Edit setEditOpen={setEditOpen} taskId={taskId}/>
        }
        </div>
    </div>
   
  )
}

export default Home
