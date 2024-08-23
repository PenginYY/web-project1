import React from 'react'
import Sidebar from './Sidebar'


export default function Highlighted() {
    const [highlightedCars, setHighlightedCars] = useState([]);

    // Load highlighted cars from local storage on component mount
    useEffect(() => {
        const storedCars = JSON.parse(localStorage.getItem('highlightedCars')) || [];
        setHighlightedCars(storedCars);
    }, []);

    // Function to add a car to highlights
    const selectCar = (car) => {
        if (!highlightedCars.includes(car)) {
            const updatedCars = [...highlightedCars, car];
            setHighlightedCars(updatedCars);
            localStorage.setItem('highlightedCars', JSON.stringify(updatedCars));
        }
    };

    // Function to remove a car from highlights
    const removeCar = (car) => {
        const updatedCars = highlightedCars.filter(item => item !== car);
        setHighlightedCars(updatedCars);
        localStorage.setItem('highlightedCars', JSON.stringify(updatedCars));
    };

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
                    <div className='main-cards'>
                        <div className='card'>
                            <div className='card-inner'>
                                <h3>HIGHLIGHTED CARS</h3>
                                <ul>
                                    {highlightedCars.map((car, index) => (
                                        <li key={index}>
                                            {car} 
                                            <button onClick={() => removeCar(car)}>Remove</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className='card'>
                            <div className='card-inner'>
                                <h3>SELECT CARS</h3>
                                <button onClick={() => selectCar('Toyota Camry')}>Highlight Toyota Camry</button>
                                <button onClick={() => selectCar('Honda Accord')}>Highlight Honda Accord</button>
                                {/* Add more buttons for different cars as needed */}
                            </div>
                        </div>
                        <div className='card'>
                            <div className='card-inner'>
                                <h3>REMOVE CARS</h3>
                                {/* Additional remove functionality can go here */}
                            </div>
                        </div>
                        <div className='card'>
                            <div className='card-inner'>
                                <h3>On reload, the highlighted items persist.</h3>
                            </div>
                        </div>
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