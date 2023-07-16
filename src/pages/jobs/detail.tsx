/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { UserDataType } from '../../interfaces';
import { fetchGet } from '../../hooks';
import Header from '../../components/header';
import { AiOutlineArrowLeft } from "react-icons/ai";

type ResponseProps = {code?: string, data?: string, message?: string }

const DetailPage = () => {
	const [dataJobDetail, setDataJobDetail] = useState<UserDataType>()
	const {id} = useParams();
	const navigate = useNavigate();

	useEffect(()=> {
		void getData(id)
	},[])

	const getData = async (id:any) => {
		const response = await fetchGet<ResponseProps>(`recruitment/${id}`, {})
		setDataJobDetail(response.data.data)
	}

	return (
		<div className='w-full px-4 bg-gray-200 min-h-screen'>
			<div className='w-full bg-white min-h-screen'>
				<Header title='Github' />
				<div className='w-full flex h-12 items-center px-2'>
					<AiOutlineArrowLeft  />
					<label className='ml-2 text-blue-800 font-semibold hover:cursor-pointer' onClick={()=>navigate(-1)}>Back</label>
				</div>
				<div className='w-full bg-white p-4'>
					<div className='w-full px-2 py-4 border-b-2'>
						<div className='flex flex-col'>
							<label>{dataJobDetail?.type} / {dataJobDetail?.location}</label>
							<label className='font-bold text-xl'>{dataJobDetail?.title}</label>
						</div>
					</div>
					<div className='bg-white flex w-full px-2'>
						<div className='w-8/12' dangerouslySetInnerHTML={{__html: 	`${dataJobDetail?.description}`}} />
						<div className='ml-4 w-4/12'>
							<div className='bg-white shadow-md rounded-md p-2 mb-4 '>
								<label className='font-semibold'>The Republic</label>
								<img src={dataJobDetail?.company_logo} />
							</div>
							<div className='bg-yellow-50 rounded-md p-2'>
								<label className='font-semibold'>How to Apply</label>
								<div className='w-full' dangerouslySetInnerHTML={{__html: 	`${dataJobDetail?.how_to_apply}`}} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DetailPage