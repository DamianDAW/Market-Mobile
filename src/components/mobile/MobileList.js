import { MobileCard } from "./MobileCard"
import "./MobileList.css"

export const MobileList = ({ mobiles }) => {

  return (
    <ul className="mobilesGrid">
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