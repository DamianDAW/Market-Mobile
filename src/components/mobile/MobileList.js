import { MobileCard } from "./MobileCard"

export const MobileList = ({ data }) => {

  console.log(data);

  return (
    <div className="row">      
        {
          // Optional Chaining ?.
           data?.map((mobile) => (
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