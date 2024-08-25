import React from 'react'
import { useLocalStorage } from 'react-use';
import Sidebar from './Sidebar'


export default function Highlighted() {
    const [selectedCars, setSelectedCars] = useLocalStorage('selectedCars', []);

    const removeCar = (cid) => {
        setSelectedCars(selectedCars.filter(car => car.Cid !== cid));
    };
    // Debugging: Log the selectedCars to check the available properties
    console.log('Selected Cars:', JSON.stringify(selectedCars, null, 5));


    return (
        <>
            <div className='d-flex'>
                <div className='col-auto'>
                    <Sidebar />
                </div>
                <div className='main-container'>
                    <div className='main-title'>
                        <h3>HIGHLIGHTED CARS</h3>
                    </div>
                    <div className='highlighted-cars'>
                        {selectedCars && selectedCars.length > 0 ? (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Model</th>
                                        <th scope="col">NameMMT</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Year</th>
                                        <th scope="col">Province</th>
                                        <th scope="col">Image</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedCars.map((car, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{car.Model}</td>
                                            <td>{car.NameMMT}</td>
                                            <td>{car.Prc} {car.Currency}</td>
                                            <td>{car.Yr}</td>
                                            <td>{car.Province}</td>
                                            <td><img src={car.Img100} alt={car.Model} width="100" /></td>
                                            <td>
                                                <button onClick={() => removeCar(car.Cid)} className="btn btn-danger">
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No highlighted cars selected</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

/*
The page shows highlighted cars 

Select cars to be shown on the page. 

Remove cars from highlight page 

On reload, the highlighted items persists.
*/