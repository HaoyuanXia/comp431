import React, {Component} from 'react'

import Register from './register'
import Login from './login'

export const Landing = () => {

    return(
        <div className='container-fluid'>
            <div className='row'>
                <h1> Welcome to RiceBook </h1>
                <h3> author: Haoyuan Xia </h3>
            </div>
            <div className='space' />
            <div className='landing'>
                <div className='row'>
                    <div className='col-md-offset-1 col-md-4 register'>
                        <h2> Register </h2>
                        <div className='space' />
                        <Register />
                    </div>
                    <div className='col-md-offset-2 col-md-4 login'>
                        <h2> Welcome Back! </h2>
                        <div className='space' />
                        <Login />
                    </div>
                </div>
            </div>
            <div className='doubleSpace' />
        </div>
    )
}



export default Landing