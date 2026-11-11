import './Orders.css'
export default function Orders({ orders }) {
    return (
        <>
            <section className="orders flex flex-col gap-5">
                {[...new Set(orders.map(order => order.type))].map(type => (
                    <div key={type} className="flex flex-col gap-3">
                        <h1>{type}</h1>

                        {orders.filter(order => order.type === type).map(order => (
                            <div key={order.id}>
                                <img src={order?.image_url} alt="photo burguer" />
                                <h1>{order?.name}</h1>
                                <p>{order?.description}</p>
                                <p>{order?.price}</p>
                                <p>{order?.active}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </section>
        </>
    )
}