import './Orders.css'
export default function Orders({ orders }) {
    return (
        <>
            <section className="orders">
    {[...new Set(orders.map(order => order.type))].map(type => (
        <div key={type} className="order-category">
            <h1>{type}</h1>

            <div className="order-list">
                {orders.filter(order => order.type === type).map(order => (
                    <div className="order" key={order.id}>
                        <img src={order?.image_url} alt={order.name} />
                        <h1>{order?.name}</h1>
                        <p>{order?.description}</p>
                        <p>{order?.price}</p>
                        <p>{order?.active}</p>
                    </div>
                ))}
            </div>
        </div>
    ))}
</section>
        </>
    )
}