import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import styles from '../styles/components/header.module.scss'

export default function Header() {

    const {products} = useContext(CartContext)

    return (
        <header className={styles.headerContainer}>
            <div className={styles.content}>
                <button>
                    <img src="/icon/menu.svg" alt="Menu" />
                </button>
                
                <img src="/logo.svg" alt="Corebiz" />

                <div className={`${styles.searchContainer} ${styles.desktop}`}>
                    <label htmlFor="search">
                        <input type="search" placeholder="Oque está procurando?"/>
                        <button>
                            <img src="/icon/search.svg" alt="Buscar" />
                        </button>
                    </label>
                </div> 

                <div className={`${styles.mycount} ${styles.desktop}`}>
                    <img src="/icon/user.svg" alt="" />
                    <p>Minha Conta</p>
                </div>

                <div className={styles.cartContainer}>
                    <img src="/icon/cart.svg" alt="Carrinho" />
                    { products && products.length !== 0 && <span>{products.length}</span>}
                </div>
            </div>

            <div className={`${styles.searchContainer} ${styles.mobile}`}>
                <label htmlFor="search">
                    <input type="search" placeholder="Oque está procurando?"/>
                    <button>
                        <img src="/icon/search.svg" alt="Buscar" />
                    </button>
                </label>
            </div> 
        </header>
    )
}