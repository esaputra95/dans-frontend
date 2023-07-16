/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect, useState } from 'react'
import Header from '../../components/header'
import { AiFillDatabase } from "react-icons/ai";
import { fetchGet } from '../../hooks';
import { UserDataType } from '../../interfaces';
import moment from 'moment';

interface Filter {
	description: string;
	location: string;
	page: number,
	full_time: boolean | null
  }

  type ResponseProps = {code?: string, data?: string, message?: string }

const JobsPage = () => {
	const [dataJobs, setDataJobs] = useState<UserDataType[]>([]);
	const [filter, setFIlter] = useState<Filter>({description: '', location: '', page:1, full_time: null})

	useEffect(()=> {
		void getData(filter)
	},[])

	const getData = async (filter:Filter) => {
		const response = await fetchGet<ResponseProps>('recruitment', {...filter})
		let newData = [...response.data.data]
		if(filter.page>1){
			newData = [ ...dataJobs, ...newData,]
		}
		setDataJobs(newData)
	}

	const handleOnMoreData = () => {
		let newfilter = {...filter}
		newfilter = {
			...newfilter,
			page: newfilter.page+1
		}
		setFIlter(newfilter)
		void getData(newfilter)
	}
	

	return (
		<div className='w-full px-4 bg-gray-200 min-h-screen'>
			<div className='w-full bg-white min-h-screen'>
				<Header title='Github' />
				<div className='w-full flex px-2 items-end pt-4 sticky top-16 bg-white'>
					<div className='w-4/12 mx-2 bg-white'>
						<label className='font-semibold'>Job Description</label>
						<div className="relative text-gray-600 focus-within:text-gray-400">
							<span className="absolute inset-y-0 left-0 flex items-center pl-2">
								<button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
								<AiFillDatabase />
								</button>
							</span>
							<input type="search" name="q" className="pl-8 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(event)=>setFIlter({...filter, page:1, description: event.target.value})} placeholder="Filter by desription" />
						</div>
					</div>
					<div className='w-4/12 mx-2'>
						<label className='font-semibold'>Location</label>
						<div className="relative text-gray-600 focus-within:text-gray-400">
							<span className="absolute inset-y-0 left-0 flex items-center pl-2">
								<button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
								<AiFillDatabase />
								</button>
							</span>
							<input type="search" onChange={(event)=>setFIlter({...filter, page:1, location: event.target.value})} name="q" className="pl-8 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Filter by location" />
						</div>
					</div>
					<div className='w-2/12 flex ml-4'>
						<input type="checkbox" defaultChecked={filter.full_time} className='w-6 h-6 fill-green-400' onChange={(event)=>setFIlter({...filter, page:1, full_time: filter.full_time?false:true})} />
						<label className='font-semibold ml-2'>Full Time Only</label>
					</div>
					<div className='w-2/12'>
						<button onClick={()=>void getData(filter)} className='bg-gray-500 w-24 text-gray-50 h-10 rounded-md font-medium'>Search</button>
					</div>
				</div>
				<div className='border-b mt-2 shadow-md'></div>
				<div className='w-full px-8 mb-10'>
					<div className='w-full py-4 border-b-2'>
						<label className='text-2xl font-bold'>Job List</label>
					</div>
					
						{
							dataJobs.length > 0 ? dataJobs.map((value)=>(
								<div key={value.id} className='w-full flex  items-center'>
									<div className='w-full h-16 border-b-2'>
										<div className='flex justify-between'>
											<a href={`/detail/${value.id}`}>
												<label className='text-blue-600 text-lg font-semibold hover:cursor-pointer'>{value?.title}</label>
											</a>
											<label className='text-gray-800'>{value?.location}</label>
										</div>
										<div className='flex justify-between'>
											<div>
												<label className='text-gray-500'>{value?.company} - </label>
												<label className='text-green-500 font-semibold'>{value?.type}</label>
											</div>
											
											<label className='text-sm text-gray-500'>{moment(value?.created_at).fromNow()  }</label>
										</div>
									</div>
								</div>
							)):null
						}
						
				</div>
				<div className='w-full sticky bottom-0 h-16 px-8'>
					<button onClick={handleOnMoreData} className='w-full bg-blue-800 rounded-2xl h-10 text-blue-100'>More Jobs</button>
				</div>
			</div>
			
		</div>
	)
}

export default JobsPage