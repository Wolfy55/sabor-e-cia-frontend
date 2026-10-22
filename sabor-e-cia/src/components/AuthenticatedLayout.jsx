import { Outlet } from "react-router-dom";
import { Sidebar } from "lucide-react";
import styles from '../styles/components/AuthenticatedLayout.module.css'

function AuthenticatedLayout(){
    return(
        <div className={styles.wrapper}>
            <Sidebar/>
            <main id="principal-content" className={styles.content}>
                <Outlet/>
            </main>
        </div>
    )
}

export {AuthenticatedLayout}