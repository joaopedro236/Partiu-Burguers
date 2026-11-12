import './ordersActive.css'
export default function OrdersActive({ ordersActive, setOrdersActive }) {
    return (
        <>
            <section className={`ordersActive min-h-screen  text-center flex-col w-full ${ordersActive != null ? 'flex' : 'hidden'}`}>
                <header className='flex flex-col  text-center  relative'>
                    <button className='absolute top-4 left-4 flex items-center justify-center rounded-full ' onClick={()=> setOrdersActive(null)}>X</button>
                    <img src={ordersActive?.image_url} alt="photo burguer" className='w-full h-80' />
                </header>
                <div className='flex flex-col items-center justify-center '>

                    <h1>{ordersActive?.name}</h1>
                    <p>{ordersActive?.description}</p>
                    <p className='money'>R${ordersActive?.price}</p>
                    <button className='w-full buy '>Adicionar no carrinho</button>
                </div>
            </section>
        </>
    )
}