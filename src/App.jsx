import './StylesGlobals/reset.css'
import './StylesGlobals/root.css'
import './StylesGlobals/assets.css'
import { useState, useEffect } from 'react'
import getOrderRequisition from './Requisitions/getOrder'
import Orders from './Components/Orders/Orders'
function App() {
  const [orders, setOrders] = useState([])
  useEffect(()=> {
    getOrderRequisition(setOrders)
  },[])
  return (
    <>
    <Orders orders={orders} />

    </>
  )
}

export default App
