import './Orders.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
export default function Orders({ orders }) {
    const types = [...new Set(orders.map(order => order.type))]
    return (
        <>
            <section className="orders">
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
                                        <div className="order">
                                            <img
                                                src={order.image_url}
                                                alt={order.name}
                                            />
                                            <h1>{order.name}</h1>
                                            <p>{order.description}</p>
                                            <p>{order.price}</p>
                                            <p>{String(order.active)}</p>
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