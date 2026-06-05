export default function BoardDetailLayout({children, modal} : {children: React.ReactNode; modal?: React.ReactNode}){
    return (
        <section>
            {children} 
            {modal}
        </section>
    )
}