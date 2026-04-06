import '../../styles/public.css';
import '../../styles/carousel.css';
import '../../styles/flex.css';

import Footer from '@/src/components/Footer';
import Header from '@/src/components/Header';
type Props = { 
    children :  React.ReactNode; 
}

export default function PublicLayOut({ children } : Props) {
    return ( 
        <>
           <Header/>
            <main>{children}</main> 
            <Footer/>
        </>
    )
}

