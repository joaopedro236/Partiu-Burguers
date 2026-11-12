import './cart.css'
import { useState } from 'react'
export default function Cart({ orderCart, setOrderCart, cartRequest }) {
    const [cartActive, setCartActive] = useState(false)
    const removeFromCart = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]')
        localStorage.setItem('cart', JSON.stringify(cart.filter(item => item !== id)))
        setOrderCart(orderCart.filter(order => order.id !== id))
    }
    const total = orderCart.reduce((acc, order) => acc + Number(order.price), 0)
    const sendWhatsApp = () => {
        const phone = '5511976391353'

        const products = orderCart.map(order =>
            `• ${order.name} - R$ ${Number(order.price).toFixed(2)}`
        ).join('\n')

        const message = `Olá! Gostaria de fazer um pedido.

*Meu pedido:*
${products}

*Total: R$ ${total.toFixed(2)}*

Aguardo confirmação!`

        const url = `https://web.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`

        window.open(url, '_blank')
    }
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                onClick={() => setCartActive(prev => !prev)}
                strokeLinejoin="round"
                className={`${cartActive ? 'fixed' : 'absolute'} top-5 right-5 z-[99] iconCart`}
            >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <section className={`cart z-[98]   ${!cartActive ? 'hidden!' : ''}`}>
                <h1>Meu carrinho</h1>

                <div className="cart-items">
                    {orderCart.map(order => (
                        <div className="cart-item" key={order.id}>
                            <img src={order.image_url} alt={order.name} />

                            <div className="cart-info">
                                <h2>{order.name}</h2>
                                <p>R$ {order.price}</p>
                            </div>
                            <button onClick={() => {
                                removeFromCart(order.id)

                                cartRequest({ setOrderCart })
                            }}>X</button>
                        </div>
                    ))}
                </div>
                <h2 className={`${orderCart.length === 0 ? 'hidden!' : ''}`}>Total: R$ {total.toFixed(2)}</h2>
                <button onClick={sendWhatsApp} className={`buyCart ${orderCart.length === 0 ? 'hidden!' : ''}`}>Chamar no whatsapp</button>
            </section>
        </>
    )
}