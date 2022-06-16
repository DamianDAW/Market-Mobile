import { useContext } from 'react'
import AppContext from '../../context/AppContext'
import './Cart.css'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './customUI.css'


export const Cart = () => {

  const {shoppingCart, setShoppingCart} = useContext(AppContext) 


  const handleAddToShoppingCart = (product) => {
    const {id, brand, model, price, imgUrl} = product

    setShoppingCart({
      type: "increment", 
      payload:{id, brand, model, price, imgUrl}
    })

  }

  const handleSustractOfShoppingCart = (product) => {
    const {id, brand, model, price, imgUrl} = product

    setShoppingCart({
      type: "decrement", 
      payload:{id, brand, model, price, imgUrl}
    })

  }

  const handleProductDelete = (product) => {
    const {id, brand, model, price, imgUrl, total} = product
    confirmAlert({    
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h1>Advise</h1>
            <p>You want to delete this product from cart?</p>
            <div className='react-confirm-alert-button-group'>
              <button label='no' onClick={onClose}>No</button>
              <button
                label='yes'
                onClick={() => {
                  setShoppingCart({
                    type: "delete", 
                    payload:{id, brand, model, price, imgUrl, total}
                  })            
                  onClose();
                }}
              >
                Yes, Delete it!
              </button>
            </div>
          </div>
        )
      }
    })

  }

  return (
   
    <div className='main-container'>
    <div className="cart-container">
      <div className='inner-container'>
        <div className='container-title'>
        <h3  className='cartTitle'>Your cart</h3>
        </div>

        {
          shoppingCart.products.length === 0 ?
            <div className='center'>
              <h4>Your cart is empty</h4>
              <button 
                className='buy-disabled' 
                type='button'
                disabled
              >
                  buy
              </button>
            </div>            
          :
          <>
            <table>
              <thead>
                <tr>
                  <th>Products</th>
                  <th>Price</th>
                  <th>Amount</th>
                  <th>Total</th>
                </tr>
              </thead> 
              <tfoot>
                <tr>
                  <td></td>  
                  <td></td>  
                  <td> 
                    <br />
                    <div className='total-div'>
                      <b>Total</b> <span className='total-span'> {shoppingCart.total}€</span>
                    </div>
                  </td>  
                </tr>
              </tfoot> 
              <tbody>            
                  {
                    shoppingCart.products.sort((productoA, productoB) => productoA.model.localeCompare(productoB.model) ).map(product => {
                      return (
                      <tr key={product.id}>
                        <td>{product.model}</td>
                        <td>{product.price}</td>
                        <td>
                          <button 
                            className='btncart btn-plus'
                            onClick={(event) => {
                              handleAddToShoppingCart(product)
                            }}               
                            >
                              +
                          </button>
                          {product.amount}
                          <button 
                            className='btncart btn-minus'
                            onClick={(event) => {
                              handleSustractOfShoppingCart(product)
                            }}  
                            >
                              -
                          </button>  
                        </td>
                        <td>{product.total}</td>
                        <td>
                          <button 
                          className='trash-icon'
                          onClick={(event) => {
                            handleProductDelete(product)}
                          }
                          ></button>
                        </td>
                      </tr>
                    )})
                  }
              </tbody>
            </table>  
            <div className='container-button'>
              <button className='btn-buy'>
                buy
              </button>
            </div>  
          </> 
        }
        </div>  
      </div>       
    </div>
      
  )
}