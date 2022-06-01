import { MobileCard } from "./MobileCard"
import "./MobileList.css"

export const MobileList = ({ mobiles }) => {

  return (
    <ul className="mobilesGrid  animate__animated animate__fadeIn">
      {
        // Optional Chaining ?.
        mobiles?.map((mobile) => (
          <li key={ mobile.id }>
            <MobileCard mobile={mobile} />
          </li>
        ))           
      }       
    </ul>    
  )
}