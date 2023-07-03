import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Menu = () => {
    const [showMenu, setShowMenu] = useState(false)
    const navigate = useNavigate()
    return (
        <>
            <div className="menu_click" onClick={() => setShowMenu(!showMenu)}>Menu</div>
            {showMenu && (
                <div className="menu_list">
                    <ul onClick={() => setShowMenu(!showMenu)}>
                        <li onClick={() => navigate("/customer")}>Custome Info</li>
                        <li>Link</li>
                        <li>Link</li>
                        <li>Link</li>
                        <li>Link</li>
                        <li>Link</li>
                        <li>Link</li>01754092903
                        <li>Link</li>
                        <li>Link</li>
                    </ul>
                </div>
            )}
        </>
    )
}

export default Menu