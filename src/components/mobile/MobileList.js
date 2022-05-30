import { MobileCard } from "./MobileCard"
import "./MobileList.css"

export const MobileList = ({ mobile }) => {


  return (

    <ul className="mobilesGrid">
      {
        // Optional Chaining ?.
        mobile?.map((mobile) => (
          <li key={ mobile.id }>
            <MobileCard 
              key={ mobile.id }
              id={ mobile.id }
              brand={ mobile.brand}
              model={ mobile.model }
              price={ mobile.price }
              img={ mobile.imgUrl }
            />               

          </li>
        ))           
      }       
    </ul>
    
  )
}