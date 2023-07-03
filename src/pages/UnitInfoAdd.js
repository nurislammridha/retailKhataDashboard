import React from 'react'
import { confirmAlert } from 'react-confirm-alert';

const UnitInfoAdd = () => {

    return (
        <>
            <div className='page_header'>
                <h3>Add Unit</h3>
                <a>List</a>
            </div>
            <div className='add'>
                <div className='input_cell'>
                    <h4>Unit Name</h4>
                    <input
                        placeholder=''
                        value="text"
                        type='text'
                    />
                </div>
                <div className='input_cell'>
                    <h4>Unit Name</h4>
                    <input
                        placeholder=''
                        value="text"
                    />
                </div>
                <div className='input_cell'>
                    <h4>Unit Name</h4>
                    <input
                        placeholder=''
                        value="text"
                    />
                </div>
                <div className='input_cell'>
                    <a className='submit'>SUBMIT</a>
                </div>
            </div>
        </>

    )
}

export default UnitInfoAdd