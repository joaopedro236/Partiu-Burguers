import './StylesGlobals/reset.css'
import './StylesGlobals/root.css'
import './StylesGlobals/assets.css'
import Home from './Components/Home/Home'
import { useState, useEffect } from 'react'
import getOrderRequisition from './Requisitions/getOrder'
import Orders from './Components/Orders/Orders'
function App() {
  const [orders, setOrders] = useState({})
  useEffect(()=> {
    getOrderRequisition(setOrders)
  },[])
  return (
    <>
    <Home/>
    <Orders orders={orders}/>
    </>
  )
}

export default App
