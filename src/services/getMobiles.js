export const getMobiles = () => {
  const apiURL = 'https://front-test-api.herokuapp.com/api/product' 
     
  return fetch(apiURL)
     .then(res => res.json())
     .then(response => {
       const data = response
       if(Array.isArray(data)){
         const mobiles = data.map(mobile => mobile) 
          return mobiles
       }
       return []
     })
     .catch((e) => console.error(e))

}




// export  const getMobiles = async() => {
//   const apiURL = 'https://front-test-api.herokuapp.com/api/product'      
 
//   try {    
//     const response = await fetch(apiURL)
//     const data = await response.json()
//     return data
      
//   } catch (error) {
//     console.error(error)
//   } 
   

// }

