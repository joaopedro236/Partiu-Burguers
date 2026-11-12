import './ordersActive.css'
export default function OrdersActive({ordersActive, setOrdersActive}){
    return (
        <>
        <section className={`ordersActive min-h-screen  items-center text-center justify-center w-full ${ordersActive != null ? 'flex' : 'hidden'}`}>
            <header className='flex flex-col items-center text-center justify-center relative'>
                <button className='absolute top-4 left-4 rounded-full '>X/</button>
                <img src={ordersActive?.image_url} alt="photo burguer" className='w-full h-80'/>
            </header>
                <h1>{ordersActive?.name}</h1>
                <p>{ordersActive?.description}</p>
                <p>{ordersActive?.price}</p>
                <button>Adicionar no carrinho</button>
        </section>
        </>
    )
}