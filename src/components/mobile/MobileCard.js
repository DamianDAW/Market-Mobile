import { Link } from 'react-router-dom'

export const MobileCard = ({brand, model, price, img, id}) => {
  return (
    <div className="col mb-3">   
      <div className="card h-100">
        <div className="row no-gutters">
          <div className="col-10">
            <img src={img} className="card-img" alt ={model} />
          </div>
          <div className="col-12">
            <div className="card-body">
              <h5 className="card-title">{brand}</h5>
              <p className="card-text">{model}</p>
            
              <Link to={`/mobiles/${id}`}>
                More info...
                </Link>
            </div>
          </div>
        </div>
      </div>    
    </div> 
  )
}
