import DashBoardNavBar from '@/src/components/layouts/DashBoardNavBar';
import './dashboard.css';
type Props = { 
    children :  React.ReactNode
}

export default function DashBoardLayout({children} : Props) { 
    return (
                 <div className="app-container">
                {/* Main Content */}
                <main className="main-content">
               <DashBoardNavBar/>
            {children}
                </main>
              
                </div>
    )
}