    export default async function getOrderRequisition(setOrders){
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}/getOrder`)
            const data = await response.json()
            if (data?.Error){
                console.error(data?.Error)
            }
            setOrders(data.orders)
        }catch(error){
            console.error(error)
        }
    }