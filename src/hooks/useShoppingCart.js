 
 import { useReducer, } from 'react';


 export function useShoppingCart (){
    
    const getInitialShoppingCart = () => {
    const data = window.localStorage.getItem('shoppingCart')
      if(data) {
      return JSON.parse(data)   
      } 
      return {
        products: [],
        total: 0,
      };      
    }
  
      
     const [shoppingCart, dispatch] = useReducer(reducer, getInitialShoppingCart())

    return [shoppingCart,dispatch]
}

const saveOnLocalStorage = (name, value)=>{
    window.localStorage.setItem(name, JSON.stringify(value))  
  }

const reducer = (shoppingCart, action)=>{
    const {id, brand, model, price, imgUrl, total} = action.payload
    let isProductRepeated
    let newCart
     switch (action.type) {
  
      case 'increment':
         isProductRepeated = shoppingCart.products.find(item => item.id === id)
  
        if(isProductRepeated ) {
          /**find hace referencia al elemento encontrado en el array y lo actualiza*/
          isProductRepeated.amount++
          isProductRepeated.total = isProductRepeated.amount * Number(isProductRepeated.price)
      
          newCart = {
              products: [...shoppingCart.products.filter(product => product.id !== id), isProductRepeated],      
              total: shoppingCart.total + Number(price)
          } 
          
          } else {
            newCart = {
              products: [
                ...shoppingCart.products,
                { id, brand, model, price, amount: 1, total:  Number(price), imgUrl },
              ],
  
              total: shoppingCart.total + Number(price),
            }
          }
          saveOnLocalStorage("shoppingCart",newCart)
          return newCart
  
  
      case 'decrement':
  
         isProductRepeated = shoppingCart.products.find(item => item.id === id)
         if(isProductRepeated.amount ===1){

          newCart = { products: [
            ...shoppingCart.products.filter((producto) => producto.id !== id),
          ],
          total: shoppingCart.total - Number(price),}

          console.log(newCart)
         }else  {
          isProductRepeated.amount--
          isProductRepeated.total -=  Number(isProductRepeated.price)
      
          newCart = {
              products: [...shoppingCart.products.filter(product => product.id !== id), isProductRepeated],      
              total: shoppingCart.total - Number(price)
          }         
        } 
        
        saveOnLocalStorage("shoppingCart",newCart)
        return newCart
  
  
      case 'delete':
         
        newCart = {
              products: [...shoppingCart.products.filter(product => product.id !== id)],      
              total: shoppingCart.total - total
          }              
      
      
        saveOnLocalStorage("shoppingCart",newCart)
        return newCart
        
     
      default:
        throw new Error()
    }
  }