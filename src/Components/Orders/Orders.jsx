import './Orders.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
export default function Orders({ orders, setOrderCart, cartRequest }) {
    const types = [...new Set(orders.map(order => order.type))]
    const addToCart = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');

        if (!cart.includes(id)) {
            cart.push(id);
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    };
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
                                            <button className='w-full'
                                                onClick={() => {
                                                    addToCart(order.id)
                                                    cartRequest(setOrderCart)
                                                }}>Adicionar no carrinho</button>
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