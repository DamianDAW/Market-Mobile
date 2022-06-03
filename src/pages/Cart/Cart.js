import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import CartContext from "../../context/CartContext";
import { MobileList } from "../_components/MobileList/MobileList"
import './Cart.css'

export const Cart = () => {

  const {addedToCart} = useContext(CartContext)

  let prices
  if(addedToCart.length > 0) {
    prices = addedToCart.map(mobile => Number(mobile.price)).reduce((prevItem, currentVal) => prevItem + currentVal)
  } else {
    prices = 0
  }
  console.log(prices);
 
  const navigate = useNavigate()   
  const handleReturn = () => {
     navigate('/mobiles')
  }     


  if(addedToCart.length === 0 ) {
    return (      
      <div className='center'>
        <h4>No items added to cart</h4>
        <button className='button' onClick={handleReturn}>
                Return
        </button>
      </div>            
    ) 
  }
  return (
    <div>     
      <div className="mt-4">
        <h4>Cart</h4>
          <hr/>
      </div> 
      <MobileList mobiles={addedToCart} />
      <div className="mt-5">
        <h4>Total Price</h4>
      </div> 
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Total
          <span className="badge badge-success badge-pill">{prices}€</span>
        </li>         
      </ul>
      <div className="button-div">
        <button className='button mt-5' onClick={handleReturn}>
                Return
        </button>
      </div>
    </div>  
  )
}