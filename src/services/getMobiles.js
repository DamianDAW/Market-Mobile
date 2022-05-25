
          /**VERSION STANDARD*/
// export const getMobiles = () => {
//   const apiURL = 'https://front-test-api.herokuapp.com/api/product' 
     
//   return fetch(apiURL)
//      .then(res => res.json()) 
//      .catch((e) => console.error(e))
// }



        /**VERSION ASYNC/AWAIT*/
export  const getMobiles = async() => {
  const apiURL = 'https://front-test-api.herokuapp.com/api/product'      
 
  try {    
    const response = await fetch(apiURL)
    const data = await response.json()
    return data
      
  } catch (error) {
    console.error(error)
  } 
   

}

