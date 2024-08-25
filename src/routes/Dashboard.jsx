import React, { useState, useEffect } from 'react'
import { useLocalStorage } from 'react-use';
import Sidebar from './Sidebar'
import CarData from '../taladrod-cars.min.json'
import Chart from 'chart.js/auto';


function summarizeData(data) {
  const summary = {};

  data.Cars.forEach((car) => {
    const brand = CarData.MMList.find(mm => mm.mkID === car.MkID)?.Name || 'Unknown';
    const model = car.Model;

    if (!summary[brand]) {
      summary[brand] = { totalCars: 0, models: {} };
    }

    if (!summary[brand].models[model]) {
      summary[brand].models[model] = 0;
    }

    summary[brand].totalCars += 1;
    summary[brand].models[model] += 1;
  });

  return summary;
}

function CarTable({ data }) {
  const [selectedCars, setSelectedCars] = useLocalStorage('selectedCars', []);

  const handleRowClick = (index, car) => {
    const isSelected = selectedCars.some(selectedCar => selectedCar.Cid === car.Cid);
    if (isSelected) {
      // Remove from selection
      setSelectedCars(selectedCars.filter(selectedCar => selectedCar.Cid !== car.Cid));
    } else {
      // Add to selection
      setSelectedCars([...selectedCars, {
        Cid: car.Cid,
        Model: car.Model,
        NameMMT: car.NameMMT,
        Prc: car.Prc,
        Currency: car.Currency,
        Yr: car.Yr,
        Province: car.Province,
        Img100: car.Img100
      }]);
    }
  };

  return (
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Model</th>
          <th scope="col">NameMMT</th>
          <th scope="col">Price</th>
          <th scope="col">Year</th>
          <th scope="col">Province</th>
          <th scope="col">Image</th>
        </tr>
      </thead>
      <tbody>
        {data.Cars.map((car, index) => (
          <tr key={index} onClick={() => handleRowClick(index, car)} style={{ cursor: 'pointer' }}>
            <th scope="row">
              {selectedCars.some(selectedCar => selectedCar.Cid === car.Cid) ? (
                <i className="bi bi-star-fill"></i> // Filled star for selected
              ) : (
                <i className="bi bi-star"></i> // Empty star for unselected
              )}
            </th>
            <td>{car.Model}</td>
            <td>{car.NameMMT}</td>
            <td>{car.Prc} {car.Currency}</td>
            <td>{car.Yr}</td>
            <td>{car.Province}</td>
            <td><img src={car.Img100} alt={car.Model} width="100" /></td>
          </tr>
        ))}
      </tbody>
    </table>

  )
}

function SummaryTable({ data }) {
  const summary = summarizeData(data);
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (model) => {
    setExpandedRows(prev => ({ ...prev, [model]: !prev[model] }));
  };

  return (
    <div className="summary-table">
      <table className="table table-hover">
        <thead className="table-dark ">
          <tr>
            <th>Brand</th>
            <th>Model</th>
            <th>Number of Cars</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(summary).map(([brand, brandData]) => (
            <React.Fragment key={brand}>
              <tr className='table-info'>
                <td>{brand}</td>
                <td></td>
                <td>{brandData.totalCars}</td>
              </tr>
              {Object.entries(brandData.models).map(([model, modelData]) => (
                <React.Fragment key={model}>
                  <tr onClick={() => toggleRow(model)} style={{ cursor: 'pointer' }}>
                    <td></td>
                    <td>{model}<i className="bi bi-caret-down-fill m-2"></i></td>
                    <td>{modelData}</td>
                  </tr>
                  {expandedRows[model] && (
                    <tr>
                      <td colSpan="4">
                        <CarTable data={{ Cars: data.Cars.filter(car => car.Model === model) }} />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}



export default function Dashboard() {

  useEffect(() => {
    const summary = summarizeData(CarData);
    const brands = Object.keys(summary);
    const brandValues = brands.map(brand => summary[brand].totalCars);

    const pieCtx = document.getElementById('pieChart').getContext('2d');
    const pieChart = new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: brands,
        datasets: [{
          data: brandValues,
          backgroundColor: brands.map((_, i) => `hsl(${i * 20}, 70%, 50%)`),
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'left',
            labels: {
              boxWidth: 15,
              padding: 15
            }
          },
        },
      },
    });

    const barCtx = document.getElementById('barChart').getContext('2d');

    const data = {
      labels: Object.keys(summary), // Model names from the first brand
      datasets: Object.entries(summary).flatMap(([brand, brandData]) =>
        Object.entries(brandData.models).map(([model, _]) => ({
          label: model,
          data: Object.keys(summary).map(b => summary[b].models[model] || 0),
          backgroundColor: `hsl(${Math.random() * 360}, 70%, 50%)`, // Random color for each model
        }))
      )
    };


    const barChart = new Chart(barCtx, {
      type: 'bar',
      data: data,
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Stacked Bar Chart'
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        }
      },
    });

    // Cleanup on unmount
    return () => {
      pieChart.destroy();
      barChart.destroy();
    };
  }, []);

  return (
    <>
      <div className='d-flex'>
        <div className='col-auto'>
          <Sidebar />
        </div>
        <div className='main-container'>
          <div className='main-title'>
            <h3>DASHBOARD</h3>
          </div>
          <div className='main-cards'>
            <div className='card'>
              <h3>PRODUCTS TABLE</h3>
              <SummaryTable data={CarData} />
            </div>
            <div className='d-flex'>
              <div className='card-pie card'>
                <h3>PIE CHART</h3>
                <canvas id='pieChart' width='400' height='400'></canvas>
              </div>
              <div className='card-bar card'>
                <h3>BAR CHART</h3>
                <canvas id='barChart' width='400' height='400'></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



/*
A table showing Number of cars and values (in Baht) by brands and models 
eg. 
Honda = 100 
--> Honda / Accord = 20 
--> Honda / Civic = 30 
--> Honda / City = 50 
Toyota = 200 
--> Toyota / Camry = 100 
…etc 

A Pie Chart showing portion of cars by brand. 

A Stacked bar chart showing models of a brand in a bar. 
*/