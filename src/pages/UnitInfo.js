import React from 'react'
import { confirmAlert } from 'react-confirm-alert';
import { useNavigate } from 'react-router-dom';

const UnitInfo = () => {
    const navigate = useNavigate();
    const handleDelete = (id) => {
        confirmAlert({
            title: "Confirm To Delete",
            message: `Are you sure to delete this category?`,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => { },
                },
                {
                    label: "No",
                },
            ],
        });
    };
    return (
        <>
            <div className='page_header'>
                <h3>Unit List</h3>
                <a onClick={() => navigate("/add-unit")}>ADD</a>
            </div>
            <div className='list_table'>
                <table>
                    <tr>
                        <th>Unit Name</th>
                        <th>Action</th>
                    </tr>
                    <tr>
                        <td>Kilogram</td>
                        <td>
                            <a
                                className="btn-danger btn-sm"
                                onClick={() => handleDelete()}
                            >
                                <i className="fa fa-trash"></i>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>Kilogram</td>
                        <td>
                            <a
                                className="btn-success btn-sm mr3"
                                onClick={() => handleDelete()}
                            >
                                <i className="fa fa-pencil"></i>
                            </a>
                            <a
                                className="btn-danger btn-sm"
                                onClick={() => handleDelete()}
                            >
                                <i className="fa fa-trash"></i>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>Kilogram</td>
                        <td>
                            <a
                                className="btn-danger btn-sm"
                                onClick={() => handleDelete()}
                            >
                                <i className="fa fa-trash"></i>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>Kilogram</td>
                        <td>
                            <a
                                className="btn-danger btn-sm"
                                onClick={() => handleDelete()}
                            >
                                <i className="fa fa-trash"></i>
                            </a>
                        </td>
                    </tr>
                </table>
            </div>
        </>

    )
}

export default UnitInfo