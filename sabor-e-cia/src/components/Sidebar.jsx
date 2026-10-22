import { BarChart3, CheckSquare, Home, LogOut } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from '..styles/components/SideBar.module.css'

const ITEMS = [
    { route: '/dashboard', label: "Painel", icon: Home },
    { route: '/tasks', label: "Tarefas", icon: CheckSquare },
    { route: '/analytics', label: "Analytics", icon: BarChart3 },
]
function Sidebar(){
    const { logout } = useAuth()
    function uponLeaving(){
        logout()
    }
    return(
        <nav className={styles.nav} aria-label="Navegação principal">
            <Link to='/' className={styles.brand}>
                ToDo-List
            </Link>
            <ul className={styles.list}>
                {ITEMS.map(({ route, label, icon }) => {
                    const Icon = icon
                    return(
                        <li key={route}>
                            <NavLink
                             to={route}
                             end
                             className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`}
                             >
                                <Icon size={20} aria-hidden='true'/>
                                <span className={styles.itemLabel}>
                                    {label}
                                </span>
                             </NavLink>
                        </li>
                    )
                })}
                <li>
                    <button type='button' onClick={uponLeaving} className={styles.item}>
                        <LogOut size={20} aria-hidden='true'/>
                        <span className={styles.itemLabel}>Sair</span>
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export {Sidebar}