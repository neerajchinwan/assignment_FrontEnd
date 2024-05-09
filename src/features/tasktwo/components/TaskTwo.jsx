import React, { useState, useEffect} from 'react';
import { taskStart, taskSuccess, taskFailure, taskAdd, taskUpdate } from '../taskSlice';
import { useDispatch, useSelector } from 'react-redux'

export default function TaskTwo() {
  const dispatch = useDispatch();
  const [hideUpdateTable, setHideUpdateTable] = useState(true)

  const loading = useSelector(state => state.task.loading);
  const error = useSelector(state => state.task.error);
  const tableData = useSelector(state => state.task.tasks);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profession: '',
    companyName: '',
    id: ''
  });

  const callTaskApi = async() => {
    const response = await fetch('/api/v1/task');
    const data = await response.json();
    console.log(data.data)
    dispatch(taskSuccess(data.data));
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      dispatch(taskStart());
      const response = await fetch('/api/v1/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
  
      const data = await response.json();
      console.log(data);
      if(data.status === false){
        dispatch(taskFailure(data.error));
        return;
      }
      dispatch(taskAdd(data.data))
      setFormData({name: '', email: '', profession: '', companyName: '', id: ''})
    }catch(err){
      dispatch(taskFailure(err.message));
    }
  }

  const handleUpdateSubmit = async(e) => {
    e.preventDefault();
    try{
      dispatch(taskStart());
      const response = await fetch(`/api/v1/task/${formData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
  
      const data = await response.json();
      console.log(data);
      if(data.status === false){
        dispatch(taskFailure(data.error));
        return;
      }
      dispatch(taskUpdate(data.data));
      setHideUpdateTable(true);
      setFormData({name: '', email: '', profession: '', companyName: '', id: ''})
    }catch(err){
      dispatch(taskFailure(err.message));
    }
  }

  useEffect(() => {
    callTaskApi();
  }, [])

  const handleCountApi = async(e) => {
    const response = await fetch('/api/v1/count');
    const data = await response.json();
    alert(`number of Api hit: ${data.data}`)
  }

  const handleUpdateTable = (e) => {
    setHideUpdateTable(false);
    const data = tableData.find(item => item._id === e.target.id);
    setFormData({name: data.name, email:data.email, profession: data.profession, companyName: data.companyName, id:e.target.id});
  }


  return (
    <div className='max-w-screen-2xl sm:max-w-screen-xl mx-auto mt-5'>
      {/* This form is for adding new data in the table */}
      <div className='max-w-screen-2xl sm:max-w-screen-sm' hidden={!hideUpdateTable}>
        <form onSubmit={handleSubmit} className='flex gap-3'>
          <input 
          type="text" 
          placeholder='Name' 
          className='p-3 bg-blue-50 rounded-lg focus-within:outline-0'
          name='name'
          onChange={handleChange}
          value={formData.name}
          />
          <input 
          type="text" 
          placeholder='Email' 
          className='p-3 bg-blue-50 rounded-lg focus-within:outline-0'
          name='email'
          onChange={handleChange}
          value={formData.email}
          />
          <input 
          type="text" 
          placeholder='Profession' 
          className='p-3 bg-blue-50 rounded-lg focus-within:outline-0'
          name='profession'
          onChange={handleChange}
          value={formData.profession}
          />
          <input 
          type="text" 
          placeholder='Company Name' 
          className='p-3 bg-blue-50 rounded-lg focus-within:outline-0'
          name='companyName'
          onChange={handleChange}
          value={formData.companyName}
          />
          <button disabled={loading} className='px-8 py-2 bg-blue-950 rounded-lg focus-within:outline-0 text-white uppercase hover:bg-blue-700'>{loading ? 'Loading': 'Submit'}</button>
          
        </form>
        
      </div>
      {error && <p className='text-red-600 font-semibold mt-2' hidden={!hideUpdateTable}>{error}</p>}


      {/* This form is for update the data in the table */}
      <div className='max-w-screen-2xl sm:max-w-screen-sm mt-3' hidden={hideUpdateTable}>
        <form onSubmit={handleUpdateSubmit} className='flex gap-3'>
          <input 
          type="text" 
          placeholder='Name' 
          className='p-3 bg-blue-50 rounded-lg focus-within:outline-0'
          name='name'
          onChange={handleChange}
          value={formData.name}
          />
          <input 
          type="text" 
          placeholder='Email' 
          className='p-3 bg-blue-50 rounded-lg focus-within:outline-0'
          name='email'
          onChange={handleChange}
          value={formData.email}
          />
          <input 
          type="text" 
          placeholder='Profession' 
          className='p-3 bg-blue-50 rounded-lg focus-within:outline-0'
          name='profession'
          onChange={handleChange}
          value={formData.profession}
          />
          <input 
          type="text" 
          placeholder='Company Name' 
          className='p-3 bg-blue-50 rounded-lg focus-within:outline-0'
          name='companyName'
          onChange={handleChange}
          value={formData.companyName}
          />
          <button disabled={loading} className='px-8 py-2 bg-blue-950 rounded-lg focus-within:outline-0 text-white uppercase hover:bg-blue-700'>{loading ? 'Loading': 'Update'}</button>
          
        </form>
        
      </div>
      {error && <p className='text-red-600 font-semibold mt-2' hidden={hideUpdateTable}>{error}</p>}

      <div className='mt-9'>
        <button className='mx-auto bg-red-700 px-6 py-3 rounded-lg uppercase font-semibold text-white' onClick={handleCountApi}> countApi </button>
      </div>





    {/* table content starts from here */}
      <div className="overflow-x-auto mt-10">
        <table className="table-auto min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profession</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          {tableData.length > 0 ? <tbody className="bg-white divide-y divide-gray-200">
            {
              tableData.map(data => {
                return <tr key={data._id}>
                        <td className="px-6 py-4 whitespace-nowrap">{data.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{data.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{data.profession}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{data.companyName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-indigo-600 hover:text-indigo-900" id={data._id} onClick={handleUpdateTable}>Edit</button>
                        </td>
              </tr>
              })
            }
          </tbody>:
          <tbody className="bg-white divide-y divide-gray-200">
          <tr className='text-center w-full'><td colSpan={5} className='text-xl font-semibold py-2'>No Data</td></tr>
        </tbody>}
          
        </table>
      </div>

    </div>
  )
}
