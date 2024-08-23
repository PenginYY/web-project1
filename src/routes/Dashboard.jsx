import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import CarData from '../taladrod-cars.min.json'
import Chart from 'chart.js/auto';

function summarizeData(data) {
  const summary = {};

  data.Cars.forEach((car) => {
    const brand = CarData.MMList.find(mm => mm.mkID === car.MkID)?.Name || 'Unknown';
    const model = car.Model;
    const price = parseFloat(car.Prc.replace(/,/g, ''));

    if (!summary[brand]) {
      summary[brand] = { totalCars: 0, totalValue: 0, models: {} };
    }

    if (!summary[brand].models[model]) {
      summary[brand].models[model] = { count: 0, value: 0 };
    }

    summary[brand].totalCars += 1;
    summary[brand].totalValue += price;
    summary[brand].models[model].count += 1;
    summary[brand].models[model].value += price;
  });

  return summary;
}

function SummaryTable({ data }) {
  const summary = summarizeData(data);

  return (
    <div className="summary-table table-responsive-sm">
      <table className="table table-hover table-sm">
        <thead class="table-dark">
          <tr>
            <th>Brand</th>
            <th>Model</th>
            <th>Number of Cars</th>
            <th>Total Value (Baht)</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(summary).map(([brand, brandData], index) => (
            <React.Fragment key={index}>
              <tr>
                <td>{brand}</td>
                <td></td>
                <td>{brandData.totalCars}</td>
                <td>{brandData.totalValue.toLocaleString()}</td>
              </tr>
              {Object.entries(brandData.models).map(([model, modelData], subIndex) => (
                <tr key={subIndex}>
                  <td></td>
                  <td>{model}</td>
                  <td>{modelData.count}</td>
                  <td>{modelData.value.toLocaleString()}</td>
                </tr>
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
    const modelLabels = brands.flatMap(brand => 
      Object.keys(summary[brand].models).map(model => `${brand} / ${model}`)
    );

    const pieCtx = document.getElementById('pieChart').getContext('2d');
    const pieChart = new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: brands,
        datasets: [{
          data: brandValues,
          backgroundColor: ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              boxWidth: 20,
              padding: 15
            }
          },
        },
      },
    });

    const barCtx = document.getElementById('barChart').getContext('2d');
    const barChart = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: modelLabels,
        datasets: [{
          label: 'Cars by Model',
          data: brands.flatMap(brand => 
            Object.values(summary[brand].models).map(modelData => modelData.count)
          ),
          backgroundColor: ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
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
          <div className='main-cards d-flex'>
            <div className='card'>
              <div className='card-inner'>
                <h3>PRODUCTS TABLE</h3>
                <SummaryTable data={CarData} />
              </div>
            </div>

            <div>
              <div className='card'>
                <div className='card-inner'>
                  <h3>PIE CHART</h3>
                  <canvas id='pieChart' width='400' height='400'></canvas>
                </div>
              </div>
              <div className='card'>
                <div className='card-inner'>
                  <h3>BAR CHART</h3>
                  <canvas id='barChart'></canvas>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
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


/*
function CarTable({ data }) {
  return (
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        {data.Cars.map((car, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
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
*/