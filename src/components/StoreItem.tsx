import {Card, Button} from 'react-bootstrap'
import { formatCurrency } from '../utilities/formatCurrency'

type StoreItemProps = {
    id:number,
    name:string,
    price:number,
    imgUrl:string
}

export const StoreItem = ({id,name,price,imgUrl}:StoreItemProps)=>{

    const quantity = 1;

    return (
        <Card className='mb-2'>
            <Card.Img 
            style={{objectFit:"cover"}} 
            variant="top" 
            height="200px"
            src={imgUrl}
            />

            <Card.Body className='d-flex flex-column'>
                <Card.Title className='d-flex justify-content-between align-items-baseline mb-4'>
                    <span className='fs-2'>{name}</span>
                    <span className='ms-2 text-muted'>{formatCurrency(price)}</span>
                </Card.Title>
                <div className="mt-auto">
                    {quantity !== 1 ? (
                        <Button className='w-100'>+ Add to Cart</Button>
                    ):(
                        <div className="d-flex align-items-center flex-column" style={{gap:".5rem"}}>
                            <div className="d-flex align-items-center justify-content-center" style={{gap:".5rem"}}>
                                <Button>-</Button>
                                <div><span className='fs-3'>{quantity}</span>in Cart</div>
                                <Button>+</Button>
                            </div>
                            <Button variant="danger" size="sm" >Remove</Button>
                        </div>
                        

                    )

                    }
                </div>
            </Card.Body>

        </Card>
    )
}