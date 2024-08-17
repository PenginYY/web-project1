import { useState, useRef } from 'react'
import accessoryData from './accessory.json'
import DataTable from './components/DataTable'
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  // For a component, it must return a single JSX element.
  // So if you have multiple elements, you need to wrap them in a single element.
  // You can use <>...</> to wrap multiple elements (only in JSX).

  const [selectedItems, setSelectedItems] = useState([])

  const quantityRef = useRef()
  const productRef = useRef()
  const [price, setPrice] = useState(accessoryData[0].price)

  const handleSubmit = (e) => {
    const productId = parseInt(productRef.current.value)
    const product = accessoryData.find(accessory => accessory.id === productId)
    const order = {
      // id: product.id,
      // name: product.name,
      // price: product.price, 
      ...product,
      quantity: quantityRef.current.value
    }
    console.table(order)
    selectedItems.push(order) // this does not update DataTable, why?
    // setSelectedItems(selectedItems) // not working, it is the same reference to the array.
    setSelectedItems([...selectedItems]) // this works, it creates new array

  }

  const updatePrice = (e) => {
    const productId = parseInt(e.target.value)   // Integer expected
    const product = accessoryData.find(accessory => accessory.id === productId)
    setPrice(product.price)
  }

  // console.table(accessoryData)

  return (
    <>
      <Container>
        <Row>
          <Col xs={2}> Product: </Col>
          <Col xs={10}><select ref={productRef} onChange={updatePrice}>
            {accessoryData.map((accessory, index) => (
              <option key={index} value={accessory.id}>{accessory.name}</option>
            ))}
          </select>
          </Col>
          <Col> Price: </Col>
          <Col> {price} </Col>

          <Col> Quantity: </Col>
          <Col><input type="number" ref={quantityRef} defaultValue={1} /> </Col>
        </Row>
      </Container>
      <Button onClick={handleSubmit}>Submit</Button>

<Container>
      <DataTable data={selectedItems} />
      </Container>

      {/*
      Product: <select ref={productRef} onChange={updatePrice}>
        {accessoryData.map((accessory, index) => (
          <option key={index} value={accessory.id}>{accessory.name}</option>
        ))}
      </select><br />
      Price: {price}<br />
      Quantity: <input type="number" ref={quantityRef} defaultValue={1}/><br />
      <button onClick={handleSubmit}>Submit</button>

      <DataTable data={selectedItems} />
      */}
      
    </>
  )
}

export default App
