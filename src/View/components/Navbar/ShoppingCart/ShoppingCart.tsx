import { Offcanvas, Button, Stack } from "react-bootstrap";
import { ShopCartItem } from "./ShopCartItem";
import { formatCurrency } from "../../../../Controller/Utilities/formatCurrency";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//Types
import { Product } from "../../../../Model/Types/ProductTypes";

//Contexts:
import { useUser } from "../../../../Controller/Context/UserContext";
import { useShoppingCart } from "../../../../Controller/Context/ShoppingCartContext";

//Services:
import { createMyOrder } from "../../../../Model/Services/Order/index";
import { findProducts } from "../../../../Model/Services/Product/index";

type ShoppingCartProps = {
    isOpen: boolean
}

export function ShoppingCart({ isOpen }: ShoppingCartProps){
    const { closeCart, cartItems, removerFromCart } = useShoppingCart()
    
    const { user } = useUser();
    const [cartProducts, setCartProducts] = useState<Product[] | null>(null)

    async function fetchCartProducts() {
        const idsProducts: number[] = cartItems.map(item => item.id)

        const response = await findProducts(idsProducts);
        setCartProducts(response);
    }

    const navigate = useNavigate();

    const handleCreateOrder = async () => {
        if(user){
            const productsOrder: number[] = [];
            const quantitiesOrder: number[] = [];
            cartItems.map(item => {
                productsOrder.push(item.id)
                quantitiesOrder.push(item.quantity)
                removerFromCart(item.id)
            })
            await createMyOrder(productsOrder, quantitiesOrder);

        }else{
            navigate("/login");
        }
        
    }

    useEffect(()=>{
        if(!cartProducts || (cartProducts.length !== cartItems.length)){
            fetchCartProducts();
        }

    }, [isOpen, cartItems])

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
                                if(i.id == item.id) return i;
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
                            const product= cartProducts?.find(i => i.id === CartItem.id);
                            return total + ( product?.price || 0) * CartItem.quantity
                        }, 0))}
                    </div>
            </Stack>

                <div className="d-flex justify-content-center">
                    <Button 
                        style={{ width: "70%" }}
                        onClick={() => {
                            closeCart()
                            handleCreateOrder()
                        }}
                    >
                        Registrar Orden
                    </Button>
                </div>
        </Offcanvas.Body>
    </Offcanvas>
}