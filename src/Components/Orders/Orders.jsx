import './Orders.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { useState } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
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

                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={16}
                            slidesPerView="auto"
                            navigation
                            grabCursor
                            breakpoints={{
                                320: { spaceBetween: 12 },
                                768: { spaceBetween: 16 }
                            }}
                        >
                            {orders
                                .filter(order => order.type === type)
                                .map(order => (
                                    <SwiperSlide
                                        key={order.id}
                                        style={{ width: '260px', height: 'auto' }}
                                    >
                                        <div className="order" >
                                            <img
                                                src={order.image_url}
                                                alt={order.name}
                                            />
                                            <h1>{order.name}</h1>
                                            <p>{order.description}</p>
                                            <p>R${order.price}</p>
                                            <button
                                                className="w-full"
                                                disabled={cartIds.includes(order.id)}
                                                onClick={() => addToCart(order.id)}
                                            >
                                                {cartIds.includes(order.id)
                                                    ? 'Adicionado ✓'
                                                    : 'Adicionar no carrinho'}
                                            </button>
                                        </div>
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                    </div>
                ))}
            </section>
        </>
    )
}