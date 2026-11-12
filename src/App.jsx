import './StylesGlobals/reset.css'
import './StylesGlobals/root.css'
import './StylesGlobals/assets.css'
import { useState, useEffect } from 'react'
import getOrderRequisition from './Requisitions/getOrder'
import Orders from './Components/Orders/Orders'
import Cart from './Components/Cart/Cart'
function App() {
  const [orders, setOrders] = useState([])
  useEffect(()=> {
    getOrderRequisition(setOrders)
  },[])
  return (
    <>
    <Cart/>
    <Orders orders={orders} />

    </>
  )
}

export default App
