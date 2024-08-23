/*
import React from "react"
import Data from '../taladrod-cars.min.json'

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

export default function CarData() {

    return (
        <SummaryTable data={Data} />
    )
}
*/

