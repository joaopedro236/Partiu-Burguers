import './StylesGlobals/reset.css'
import './StylesGlobals/root.css'
import './StylesGlobals/assets.css'
import { useState, useEffect } from 'react'
import getOrderRequisition from './Requisitions/getOrder'
import Orders from './Components/Orders/Orders'
import Cart from './Components/Cart/Cart'
import cartRequest from './Requisitions/cartRequest'
function App() {
  const [orders, setOrders] = useState([])
  const [orderCart, setOrderCart]= useState([])
  useEffect(()=> {
    getOrderRequisition(setOrders)
    cartRequest({setOrderCart})
  },[])
  return (
    <>
    <Cart orderCart={orderCart} setOrderCart={setOrderCart} cartRequest={cartRequest}/>
    <Orders orders={orders} cartRequest={cartRequest} setOrderCart={setOrderCart}/>

    </>
  )
}

export default App
