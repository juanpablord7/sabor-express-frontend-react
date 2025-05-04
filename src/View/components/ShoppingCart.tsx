import { Offcanvas, Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../../Controller/context/ShoppingCartContext";
import { ShopCartItem } from "./CartItem";
import { formatCurrency } from "../../Controller/utilities/formatCurrency";
import { useNavigate } from "react-router-dom" // <-- Importamos el hook
import { findProducts } from "../../Model/services/productsService";
import { useEffect, useState } from "react";
import { Product } from "../../Model/types/productTypes";



type ShoppingCartProps = {
    isOpen: boolean
}

export function ShoppingCart({ isOpen }: ShoppingCartProps){
    const { closeCart, cartItems } = useShoppingCart()
    
    const navigate = useNavigate() // <-- Inicializamos el hook de navegación
    
    const [cartProducts, setCartProducts] = useState<Product[] | null>(null)

    async function fetchCartProducts() {
        const idsProducts: number[] = cartItems.map(item => item.id)

        const response = await findProducts(idsProducts);
        setCartProducts(response.products);
        console.log(response.products)
    }

    useEffect(()=>{
        fetchCartProducts();
    }, [])

    return <Offcanvas 
        show={isOpen} 
        placement="end"
        onHide={closeCart}
        className="cartShoppingBar"
        >
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>
                Cart
            </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Stack gap={3}>
                    {cartItems.map(item => {
                        let product:Product | null = null;
                        if(cartProducts){
                            product = cartProducts.find(i => {
                                console.log(i)
                                if(i.product_id == item.id) return i;
                            }) || null
                            /*
                            product = cartProducts.find(i => i.product_id == item.id)
                                return i;
                            }
                            */
                        }
                        
                        return <ShopCartItem key={item.id} cartItem={item} product={product}/>
                    })}
                    <div className="ms-auto fs-5">
                        Total: {" "}
                        {formatCurrency(cartItems.reduce( (total, CartItem) => {
                            const product= cartProducts?.find(i => i.product_id === CartItem.id);
                            return total + ( product?.price || 0) * CartItem.quantity
                        }, 0))}
                    </div>
            </Stack>

                <div className="d-flex justify-content-center">
                    <Button 
                        className="pay_button neon-pulse"
                        style={{ width: "70%" }}
                        onClick={() => {
                        closeCart()
                        navigate("/pay")
                        }}
                    >
                        Pay
                    </Button>
                </div>
        </Offcanvas.Body>
    </Offcanvas>
}