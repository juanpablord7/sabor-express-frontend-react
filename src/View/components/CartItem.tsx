import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../../Controller/context/ShoppingCartContext"
import { formatCurrency } from "../../Controller/utilities/formatCurrency"
import { CartItem } from "../../Model/types/cartItemTypes";
import { Product } from "../../Model/types/productTypes";
import { imagePath } from "../../Model/services/imageService";

type ShopCartItemProps = {
    product: Product | null;
    cartItem: CartItem;
}

export function ShopCartItem({ product, cartItem }: ShopCartItemProps) {
    const { removerFromCart } = useShoppingCart()

    console.log(imagePath)


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
                        Remove
                    </Button>
                </div>
            </Stack>
        </>
    )
}
