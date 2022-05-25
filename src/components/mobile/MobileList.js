import { MobileCard } from "./MobileCard"

export const MobileList = ({ data: mobile }) => {


  return (
    <div className="row">      
        {
          // Optional Chaining ?.
           mobile?.map((mobile) => (
             <MobileCard 
               key={ mobile.id }
               id={ mobile.id }
               brand={ mobile.brand}
               model={ mobile.model }
               price={ mobile.price }
               img={ mobile.imgUrl }
             />               
           ))           
        }
    </div>
  )
}