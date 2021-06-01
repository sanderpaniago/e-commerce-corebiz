import { createContext, ReactNode, useEffect, useState } from "react";


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

type CartContextData = {
    products: Product[];
    addNewProductCart: (product) => void;
    removeProductCart: (product) => void;
}

type CartProviderProps = {
    children: ReactNode
}

export const CartContext = createContext({} as CartContextData)

export function CartProvider({children}: CartProviderProps) {

    const [products, setProducts] = useState<Product[]>([])

    function addNewProductCart(product) {
        const newProducts = [...products, product]

        setProducts(newProducts)

        localStorage.setItem('products', JSON.stringify(newProducts))
    }

    function removeProductCart(product) {

    }

    useEffect(()=> {
        const productsLocal = localStorage.getItem('products')
        if (productsLocal) {
            setProducts(JSON.parse(productsLocal))
        }
    }, [])

    return (
        <CartContext.Provider value={{
            products,
            addNewProductCart,
            removeProductCart
        }}>
            {children}
        </CartContext.Provider>
    )
}