export default async function getOrder(){
    try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}`)
    }catch(error){
        console.error(error)
    }
}