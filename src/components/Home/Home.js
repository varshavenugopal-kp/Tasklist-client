import React, { useEffect, useState } from 'react'
import Add from '../Add/Add'
import { api } from '../../Services/Axios'
import axios from 'axios'
import Edit from '../Edit/Edit'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Single from '../Single/Single'

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
        settaskId(taskId)
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
                <img className='h-2/3 w-full ' src={tasks?.image} key={tasks?.id} onClick={()=>handleSelect(tasks?.id)}></img>
                <p className='p-3 text-lg font-semibold'>{tasks?.heading}</p>
                {/* <p className='ms-3 line-clamp-2 text-xs'>{tasks?.description}</p> */}
                {/* <div className='ms-3 mt-2 w-24 h-7 transition duration-300 ease-in-out hover:scale-90 bg-black cursor-pointer'> */}
               <div className='px-2 flex justify-between'>
               <div className=''><FontAwesomeIcon icon={faPenToSquare} className='text-sm text-left' key={tasks?.id} onClick={()=>handleClick(tasks?.id)}/></div>
               <div className=''><FontAwesomeIcon icon={faTrashCan} className='text-sm text-left'key={tasks?.id} onClick={()=>handledelete(tasks?.id)} /></div>
            
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



        {
            addOpen && <Add setAddOpen={setAddOpen}/>
        }
        </div>
        <div>
        {
          editOpen && <Edit setEditOpen={setEditOpen} taskId={taskId}/>
        }
        </div>
        <div>
          {
            select && <Single selectOpen={selectOpen} taskId={taskId}/>
          }
        </div>
    </div>
   
  )
}

export default Home
