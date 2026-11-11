    export default async function getOrderRequisition(setOrders){
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}/getTrips`)
            if (!response.ok) {
                throw new Error(`Failed to fetch orders: ${response.status} ${response.statusText}`)
            }
            const data = await response.json()
            if (data?.Error){
                console.error(data?.Error)
                return
            }
            if (!Array.isArray(data?.orders)) {
                console.error('Invalid orders response: expected an orders array')
                return
            }
            setOrders(data.orders)
        }catch(error){
            console.error(error)
        }
    }