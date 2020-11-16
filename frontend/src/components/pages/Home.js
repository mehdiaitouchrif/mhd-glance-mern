import React, { Fragment } from 'react'
import Products from '../products/Products'
import Newsletter from '../layout/Newsletter'
import Sidebar from '../layout/Sidebar'

const Home = () => {
    return (
        <Fragment>
            <div className='homepage'>
                <div className="container">
                    <Sidebar />
                    <Products />
                </div>
            </div>
            {/* <Newsletter /> */}

        </Fragment>

    )
}

export default Home
