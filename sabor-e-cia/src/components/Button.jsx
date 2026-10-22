import styles from '../styles/components/Button.module.css'

function Button({ variant = 'primary', size = 'md', type = 'button', className = '', children, ...props}){
    return(
        <button
         type={type}
         className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
         {...props}>
            {children}
         </button>
    )
}
export { Button }