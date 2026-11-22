import "./StylesGlobals/reset.css"
import "./StylesGlobals/root.css"
import "./StylesGlobals/assets.css"
import { useEffect, useState } from "react"
import Cart from "./Components/Cart/Cart.jsx"
import Orders from "./Components/Orders/Orders.jsx"
import cartRequest from "./Requisitions/cartRequest.jsx"
import getOrder from "./Requisitions/getOrder.jsx"

function App() {
  const [orders, setOrders] = useState([])
  const [orderCart, setOrderCart] = useState([])

  useEffect(() => {
    getOrder(setOrders)
    cartRequest({ setOrderCart })
  }, [])

  return (
    <>
      <Orders
        orders={orders}
        setOrderCart={setOrderCart}
        cartRequest={cartRequest}
      />
      <Cart
        orderCart={orderCart}
        setOrderCart={setOrderCart}
        cartRequest={cartRequest}
      />
    </>
  )
}

export default App
