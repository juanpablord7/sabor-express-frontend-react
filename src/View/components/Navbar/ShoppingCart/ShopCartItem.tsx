import { Button, Stack } from "react-bootstrap"
import { formatCurrency } from "../../../../Controller/Utilities/formatCurrency"

//Types:
import { CartItem } from "../../../../Model/Types/CartItemTypes";
import { Product } from "../../../../Model/Types/ProductTypes";

//Contexts:
import { useShoppingCart } from "../../../../Controller/Context/ShoppingCartContext"

//Services:
import { imagePath } from "../../../../Model/Services/Image/index";

type ShopCartItemProps = {
    product: Product | null;
    cartItem: CartItem;
}

export function ShopCartItem({ product, cartItem }: ShopCartItemProps) {
    const { removerFromCart } = useShoppingCart()
    
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
                        src={imagePath + product.image}
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
                        Eliminar
                    </Button>
                </div>
            </Stack>
        </>
    )
}
