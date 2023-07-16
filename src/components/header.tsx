import React, {FC} from 'react'

interface Interface {
    title: string;
}

const Header: FC<Interface> = ({title}) => {
    return (
        <div className='w-full bg-blue-800 h-16 flex items-center px-2 sticky top-0'>
            <label className='text-4xl font-semibold text-blue-50'>{title}</label>
            <label className='text-4xl ml-2 text-blue-50'>Jobs</label>
        </div>
    )
}

export default Header