import React from 'react'
import spinner from './spinner.gif'

const Spinner = ()=>{
        return (
            <div style={{textAlign:"center"}}>
                <img src={spinner} alt="loading" />
            </div>
        )
}
export default Spinner