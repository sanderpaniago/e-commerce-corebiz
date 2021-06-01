import { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext'
import styles from '../styles/components/card.module.scss'

type Product = {
    productName: string,
    imageUrl: string,
    stars: number,
    listPrice: number,
    price: number,
    installments: {
        quantity: number,
        value: number,
    },
}

type CardProps = {
    data: Product
}

export default function Card({data}: CardProps) {

    const {addNewProductCart} = useContext(CartContext)

    const [stars, setStars] = useState([0,0,0,0,0])

    return (
        <article className={styles.cardContainer}>
            {data.listPrice && (
                <div className={styles.offContainer}>
                    <p>off</p>
                </div>
            )}
            <img src={data.imageUrl} alt={data.productName} />

            <div className={styles.cardContent}>
                <h3>{data.productName}</h3>

                <span>
                    {stars.map((item,index) => index < data.stars ? <img key={index} src="/icon/star.svg" alt="" /> : <img key={index} src="/icon/star-outline.svg" alt="" />)}
                </span>

                {data.listPrice ? <span>de R$ {data.listPrice}</span> : <span></span>}

                <p><strong>por R$ {data.price}</strong></p>

                {data.installments && <p>ou em {data.installments[0]?.quantity} de R$ {data.installments[0]?.value}</p>}
                

                <button
                    onClick={()=> addNewProductCart(data)}
                >Compar</button>
            </div>
        </article>
    )
}