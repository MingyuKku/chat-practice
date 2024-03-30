import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {

    return (
        <React.Fragment>
            <div className={`header-wrap fixed w-full top-0 z-40 flex items-center justify-between h-basic-header px-5 bg-primary-01`}>
                <h1 className='relative z-[1] text-white text-[24px] font-medium'>
                    <Link to='/'>Home</Link>
                </h1>
                <div>
                    <Link to='/chat'>
                        <span className='text-white text-[14px]'>채팅</span>
                    </Link>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Header