import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../../Controller/context/ShoppingCartContext"
import { formatCurrency } from "../../Controller/utilities/formatCurrency"
import { CartItem } from "../../Model/types/cartItemTypes";
import { Product } from "../../Model/types/productTypes";

type ShopCartItemProps = {
    product: Product | null;
    cartItem: CartItem;
}

const baseURL = import.meta.env.VITE_API_BASE_URL;

export function ShopCartItem({ product, cartItem }: ShopCartItemProps) {
    const { removerFromCart } = useShoppingCart()
    
    let imageUrl = baseURL + '/image/'
    if(product){
        imageUrl += product.image; 
    }

    return (
        <>
            <Stack 
                direction="horizontal" 
                gap={2}
                className="d-flex align-items-center"
            >
                {product && (
                    <img
                        className="justify-content-center"
                        src={imageUrl}
                        height="75px"
                        style={{
                        aspectRatio: "1/1",
                        objectFit: "cover",
                        }}
                    />
                )}
                <div>
                    <div>
                        {cartItem.name}
                    </div>
                    <table style={{ marginTop: "0.25rem" }}>
                        <tbody>
                            <tr>
                                {product &&
                                    <td style={{ width: "70px" }}>{formatCurrency(product.price)}</td>
                                }
                                    <td style={{ paddingLeft: "1rem", color: "green" }}>x{cartItem.quantity}</td>
                            </tr>
                            </tbody>
                    </table>
                </div>
                <div className="ms-auto">
                    {product &&
                        <div>
                            {formatCurrency(product.price * cartItem.quantity)}
                        </div>
                    }
                    
                    <Button 
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removerFromCart(cartItem.id)}
                    >
                        Remove
                    </Button>
                </div>
            </Stack>
        </>
    )
}
