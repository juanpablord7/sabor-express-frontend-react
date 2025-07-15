import { Button, Card } from "react-bootstrap"
import { formatCurrency } from "../../Controller/Utilities/formatCurrency"

//Contexts:
import { useShoppingCart } from "../../Controller/Context/ShoppingCartContext"

//Types:
import { Product } from "../../Model/Types/ProductTypes";
import { imagePath } from "../../Model/Services/Image/index";

export function StoreItem({ id, name, price, image}: Product){
    const { getItemQuantity,
        increaseQuantity,
        decreaseQuantity,
        removerFromCart} = useShoppingCart()
        
    const quantity = getItemQuantity(id)
    
    return <Card className="h-100">
        <Card.Img 
            variant="top" 
            src={imagePath + image}
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
                            onClick={() => increaseQuantity(id, name)}>
                        + Añadir al Carrito
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
                            <Button onClick={() => decreaseQuantity(id)}>-</Button>
                            <div>
                                <span className="fs-3">{quantity} </span>
                                en el carrito
                            </div>
                            <Button onClick={() => increaseQuantity(id, name)}>+</Button>       
                        </div>
                        <Button variant="danger" 
                            size="sm"
                            onClick={() => removerFromCart(id)}
                        >
                            Remove
                        </Button>
                    </div>
                }
            </div>            
        </Card.Body>
    </Card>
}