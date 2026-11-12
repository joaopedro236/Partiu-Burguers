import './StylesGlobals/reset.css'
import './StylesGlobals/root.css'
import './StylesGlobals/assets.css'
import { useState, useEffect } from 'react'
import getOrderRequisition from './Requisitions/getOrder'
import Orders from './Components/Orders/Orders'
import OrdersActive from './Components/OrdersActive/OrdersActive'
function App() {
  const [orders, setOrders] = useState([])
  const [ordersActive, setOrdersActive] = useState(null)
  useEffect(()=> {
    getOrderRequisition(setOrders)
  },[])
  return (
    <>
    <Orders orders={orders} ordersActive={ordersActive} setOrdersActive={setOrdersActive}/>
    <OrdersActive ordersActive={ordersActive} setOrdersActive={setOrdersActive}/>

    </>
  )
}

export default App
