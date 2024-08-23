import React from "react"
import { Link } from 'react-router-dom'

export default function Sidebar() {
    return (
        <>
            <div className="sidebar d-flex flex-column justify-content-between bg-dark text-white p-4 vh-100">
                <div>
                    <Link to="/" className="d-flex align-items-center">
                        <span className="fs-4">Car Market Analytics</span>
                    </Link>
                    <hr className="text-secondary mt-3" />
                    <ul className="nav nav-pills flex-column p-0 m-0">
                        <li className="nav-item p-1">
                            <Link to="/" className="nav-link text-white">
                                <i className="bi bi-speedometer2 me-2 fs-5"></i>
                                <span className="fs-6">Dashboard</span>
                            </Link>
                        </li>
                        <li className="nav-item p-1">
                            <Link to="/highlighted" className="nav-link text-white">
                                <i className="bi bi-car-front me-2 fs-5"></i>
                                <span className="fs-6">Highlighted</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>

    )
}