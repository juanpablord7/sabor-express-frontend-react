import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { ShoppingCart } from "../../View/Components/Navbar/ShoppingCart/ShoppingCart";
import { useLocalStorage } from "../LocalStorage/useLocalStorage";
import { CartItem } from "../../Model/Types/CartItemTypes";

type ShoppingCartProviderProps = {
    children: ReactNode
}

type ShoppingCartContext = {
    getItemQuantity: (id: number) => number
    increaseQuantity: (id: number, name:string) => void
    decreaseQuantity: (id: number) => void
    removerFromCart: (id: number) => void

    openCart: () => void
    closeCart: () => void
    cartQuantity: number
    cartItems: CartItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}


export function ShoppingCartProvider({ children }: ShoppingCartProviderProps){
    
    const [cartItems, setCartItem] = useLocalStorage<CartItem[]>("shopping-cart", [])

    function getItemQuantity(id:number){
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseQuantity(id:number, name:string){
        setCartItem(currentItems => {
            if (currentItems.find(item => item.id === id) == null){
                return [...currentItems, {id, quantity: 1, name: name}]
            } else {
                return currentItems.map(item =>{
                    if (item.id === id){
                        return {...item, quantity: item.quantity + 1}
                    } else{
                        return item
                    }
                })
            }
        })
    }

    function decreaseQuantity(id:number){
        setCartItem(currentItems => {
            if (currentItems.find(item => item.id === id)?.quantity === 1){
                return currentItems.filter(item => item.id !== id)
            } else {
                return currentItems.map(item =>{
                    if (item.id === id){
                        return {...item, quantity: item.quantity - 1}
                    } else{
                        return item
                    }
                })
            }
        })
    }

    function removerFromCart(id:number){
        setCartItem(currentItems => {
            return currentItems.filter(item => item.id !== id)
        })
    }

    const [isOpen, setIsOpen] = useState(false)
    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)
    const cartQuantity = cartItems.reduce((quantity, item) => 
        item.quantity + quantity, 0
    )

    const value = useMemo(() => {
        return {
            getItemQuantity,
            increaseQuantity,
            decreaseQuantity,
            removerFromCart,
            
            openCart,
            closeCart,
            cartQuantity,
            cartItems
        }
        }, [cartItems])
        

    return <ShoppingCartContext.Provider 
        value={value}
    >
        {children}

        <ShoppingCart isOpen={isOpen}/>
    </ShoppingCartContext.Provider>
}