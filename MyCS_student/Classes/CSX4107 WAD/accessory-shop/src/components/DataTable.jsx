import React from 'react';
import Table from 'react-bootstrap/Table';

const DataTable = ({ data }) => {
    return (
        <Table variant="dark" striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Qty</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default DataTable;