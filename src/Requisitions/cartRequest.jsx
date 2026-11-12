export default async function cartRequest({setOrderCart}) {
    try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');

        const response = await fetch(`${import.meta.env.VITE_API_URL}/getCart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ids: cart })
        });
        const data = await response.json()
        if(data?.Error){
            console.error(error)
        }
        setOrderCart(data.orders)
    }catch(error){
        console.error(error)
    }
}