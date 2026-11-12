import './Orders.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
export default function Orders({ orders, ordersActive, setOrdersActive }) {
    const orderTypes = ['Artesanais', 'Tradicionais', 'Combos', 'Porções', 'Bebidas'];

    const types = [...new Set(orders.map(order => order.type).filter(Boolean))];

    types.sort((a, b) => {
        const normalize = value => value.trim().toLowerCase();
        const indexA = orderTypes.findIndex(t => normalize(t) === normalize(a));
        const indexB = orderTypes.findIndex(t => normalize(t) === normalize(b));

        return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
    });
    return (
        <>
            <section className={`orders ${ordersActive != null ? 'hidden!' : ''}`}>
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
                                .filter(order => order.type?.trim().toLowerCase() === type.toLowerCase())
                                .map(order => (
                                    <SwiperSlide
                                        key={order.id}
                                        style={{ width: '260px', height: 'auto' }}
                                    >
                                        <div className="order" onClick={() => setOrdersActive(order)}>
                                            <img
                                                src={order.image_url}
                                                alt={order.name}
                                            />
                                            <h1>{order.name}</h1>
                                            <p>{order.description}</p>
                                            <p>R${order.price}</p>
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