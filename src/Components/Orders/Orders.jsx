import './Orders.css'

import { useState } from 'react'
export default function Orders({ orders, setOrderCart, cartRequest }) {
    const types = [...new Set(orders.map(order => order.type))]
    const [cartIds, setCartIds] = useState(() => {
        return JSON.parse(localStorage.getItem('cart') || '[]')
    })
    const addToCart = (id) => {
        if (cartIds.includes(id)) return

        const cart = [...cartIds, id]

        localStorage.setItem('cart', JSON.stringify(cart))
        setCartIds(cart)

        cartRequest({ setOrderCart })
    }
    return (
        <>
            <section className={`orders `}>
                <h1 className='title'>Cardapio</h1>

                {types.map(type => (
                    <div key={type} className="order-category">
                        <h1>{type}</h1>

                        <div className="order-list">
                            {orders
                                .filter(order => order.type === type)
                                .map(order => (
                                    <div className="order" key={order.id}>
                                        <img src={order.image_url} alt={order.name} />

                                        <div className="order-info">
                                            <h1>{order.name}</h1>
                                            <p>{order.description}</p>
                                            <p>R${order.price}</p>

                                            <button
                                                disabled={cartIds.includes(order.id)}
                                                onClick={() => addToCart(order.id)}
                                            >
                                                {cartIds.includes(order.id)
                                                    ? 'Adicionado ✓'
                                                    : 'Adicionar ao carrinho'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}

            </section>
        </>
    )
}
