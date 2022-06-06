import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import { MobileList } from "../_components/MobileList/MobileList"
import './Cart.css'

export const Cart = () => {

  const {addedToCart} = useContext(AppContext)

  const isRepeated = addedToCart.items.filter(mobile => mobile.amount > 1)

  console.log(addedToCart);
  // let prices
  // if(addedToCart.length > 0) {
  //   prices = addedToCart.map(mobile => Number(mobile.price)).reduce((prevItem, currentVal) => prevItem + currentVal)
  // } else {
  //   prices = 0
  // }
  // console.log(prices);
 
  const navigate = useNavigate()   
  const handleClickReturn = () => {
    navigate('/mobiles')
  }

  const handleClickClear = () => {

    window.localStorage.removeItem('cart-added-mobiles')
    window.location.reload()

  }

  if(addedToCart.items.length === 0 ) {
    return (      
      <div className='center'>
        <h4>No items added to cart</h4>
        <button className='button' onClick={handleClickReturn}>
                Return
        </button>
      </div>            
    ) 
  }
  return (
    <div>  
       <div className="redirect mt-4" onClick={handleClickReturn}>
          <div className="redirect-text">
            <h4>&#60; Return</h4>
          </div>
        </div>
      <div className="mt-4">
        <h4>Cart</h4>
          <hr/>
      </div> 
      <MobileList mobiles={addedToCart.items} />    
      <div className="mt-5">
        <h4>Total Price</h4>
      </div> 
      <ul className="list-group list-group-flush">       
        <li 
          key={isRepeated[0].id} 
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          {isRepeated[0].amount} 
        </li>    
       
        <li  
          key={addedToCart.items.id} 
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          Total
          <span className="badge badge-success badge-pill">{addedToCart.total}€</span>
        </li>         
      </ul>
      <div className="button-div">
        <button className='button mt-5' onClick={handleClickClear}>
                Clear all 
        </button>
      </div>
    </div>  
  )
}