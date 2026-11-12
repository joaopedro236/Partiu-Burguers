import './cart.css'
export default function Cart({ orderCart }) {
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
                strokeLinejoin="round"
                className='absolute top-5 right-5 z-[99] cursor-poiter'
            >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <section className="cart  " >
                <h1>Meu carrinho</h1>

                <div className="cart-items">
                    {orderCart.map(order => (
                        <div className="cart-item" key={order.id}>
                            <img src={order.image_url} alt={order.name} />

                            <div className="cart-info">
                                <h2>{order.name}</h2>
                                <p>R$ {order.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}