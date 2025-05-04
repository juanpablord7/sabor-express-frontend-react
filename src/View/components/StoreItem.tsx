import { Button, Card } from "react-bootstrap"
import { formatCurrency } from "../../Controller/utilities/formatCurrency"
import { useShoppingCart } from "../../Controller/context/ShoppingCartContext"
import { Product } from "../../Model/types/productTypes";


const baseURL = import.meta.env.VITE_API_BASE_URL;

export function StoreItem({ product_id, name, price, image}: Product){
    const { getItemQuantity,
        increaseQuantity,
        decreaseQuantity,
        removerFromCart} = useShoppingCart()
    const quantity = getItemQuantity(product_id)

    const imageUrl = baseURL + '/image/' + image;
    console.log(imageUrl)
    
    return <Card className="h-100">
        <Card.Img 
            variant="top" 
            src={imageUrl}
            height= "200px"
            style={{objectFit:"cover" }}/>
        <Card.Body 
            className="d-flex flex-column"
        >
            <Card.Title className="d-flex 
                justify-content-between 
                align-items-baseline mb-4"
            >
                <span className="fs-5">{name}</span>
                <span className="ms-6 text-muted">{formatCurrency(price)}</span>
            </Card.Title>
            <div className="mt-auto">
                {quantity === 0 ? (
                    <Button className="w-100" 
                        onClick={() => increaseQuantity(product_id, name)}>
                        + Add To Cart
                    </Button>
                ) : 
                    <div 
                        className="d-flex align-itmes-center
                        flex-column" style={{ gap: ".5rem" }}
                    >
                        <div 
                            className="d-flex align-items-center
                            justify-content-center" style={{gap:".5rem"}}
                        >
                            <Button onClick={() => decreaseQuantity(product_id)}>-</Button>
                            <div>
                                <span className="fs-3">{quantity}</span>
                                in cart
                            </div>
                            <Button onClick={() => increaseQuantity(product_id, name)}>+</Button>       
                        </div>
                        <Button variant="danger" 
                            size="sm"
                            onClick={() => removerFromCart(product_id)}
                        >
                            Remove
                        </Button>
                    </div>
                }
            </div>            
        </Card.Body>
    </Card>
}