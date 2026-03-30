import {cookies} from 'next/headers' 
export default  async function  getTokenFromCookies( ){ 
    const cookieStore  = await cookies();
    return cookieStore.get('token')?.value
}    