import Link from 'next/link';
import style from './Header.module.css';

export default function Header() { 
    return ( 
        // Bạn có thể thêm class backgroundHeader vào đây khi cuộn trang (dùng JS)
        <header className={`${style.headerArea} ${style.headerSticky}`}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <nav className={style.mainNav}>
                            <a href="#" className={style.logo}>Art Factory</a>
                         
                            <ul className={style.nav}>
                                <li><a href="#welcome" className={style.active}>Home</a></li>
                                <li><Link href={"/dashboard"}>DashBoard</Link></li>
                                <li><Link href={"/users"}>Users</Link></li>
                                <li><a href="#frequently-question">Questions</a></li>
                                <li className={style.submenu}>
                                    <a href="#">Drop Down</a>
                                    <ul>
                                        <li><a href="">About Us</a></li>
                                        <li><a href="">Features</a></li>
                                    </ul>
                                </li>
                                <li><a href="#contact-us">Contact Us</a></li>
                            </ul>

                            <a className={style.menuTrigger}>
                                <span>Menu</span>
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}