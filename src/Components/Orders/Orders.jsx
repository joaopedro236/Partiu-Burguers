import './Orders.css'

import { useState } from 'react'

function compareByDisplayOrder(first, second) {
    const firstOrder = Number(first.display_order)
    const secondOrder = Number(second.display_order)
    const firstHasOrder = Number.isFinite(firstOrder)
    const secondHasOrder = Number.isFinite(secondOrder)

    if (firstHasOrder && secondHasOrder && firstOrder !== secondOrder) {
        return firstOrder - secondOrder
    }
    if (firstHasOrder !== secondHasOrder) {
        return firstHasOrder ? -1 : 1
    }
    return Number(first.id) - Number(second.id)
}

export default function Orders({ orders, setOrderCart, cartRequest }) {
    const categoryOrder = [
        'Tradicional',
        'Artesanal',
        'Combo Tradicional',
        'Combo Artesanal',
        'Porção',
        'Bebida'
    ]

    const types = categoryOrder.filter(type =>
        orders.some(order => order.type === type)
    )
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
        <section className="orders">
            <h1 className="title">Cardapio</h1>

            {types.map(type => (
                <div key={type} className="order-category">
                    <h1>{type}</h1>

                    <div className="order-list">
                        {orders
                            .filter(order => order.type === type)
                            .sort(compareByDisplayOrder)
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
    )
}
