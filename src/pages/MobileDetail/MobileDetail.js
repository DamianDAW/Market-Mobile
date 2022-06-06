import { useParams, useNavigate, Link } from "react-router-dom";
import { useSingleMobile } from "./hooks/useSingleMobile";
import { useFavoriteMobile } from "../../hooks/useFavoriteMobile";
import { Spinner } from "./components/Spinner/Spinner";
import "./MobileDetail.css";
import { useContext } from "react";
import AppContext from "../../context/AppContext";

export const MobileDetail = () => {
  const { userInfo } = useContext(AppContext);
  const params = useParams();
  const navigate = useNavigate();
  const handleReturn = () => {
    navigate(-1);
  };

  const [mobile, notFoundMobile] = useSingleMobile(params.id); // Hook sustituye a getmobile con el useEffect
  const [isFavorite, changeFav] = useFavoriteMobile(mobile);
  const { id, brand, model, price, imgUrl } = mobile;

  const handleClickVolver = () => {
    navigate(-1);
  };

  if (notFoundMobile) {
    return navigate("/");
  }

  if (mobile.length === 0) {
    return (
      <div className="center">
        <Spinner />
      </div>
    );
  } else {
    return (
      <>
        <div className="redirect" onClick={handleClickVolver}>
          <div className={`volver`}></div>
          <div className="redirect-text">Volver</div>
        </div>

        <div className="infoRow">
          <div className="col-left">
            <img
              src={imgUrl}
              alt={model}
              className="img-thumbnail animate__animated animate__fadeInLeft"
            />
          </div>
          {userInfo.isLogged && (
            <div className="favorite-icon-detail">
              <button onClick={changeFav}>
                {isFavorite ? "Remove from wishlist" : "Add to wishlist"}
              </button>
            </div>
          )}

          <div className="col-right">
            <section className="mobileInfo">
              <header className="mobileInfo-header">
                <h3>{model}</h3>
              </header>
              <ul className="mobileInfo-list">
                <li>
                  <b>Brand:</b> <span>{brand}</span>
                </li>
                <li>
                  <b>Id:</b> {id}
                </li>
                <li>
                  <b>Price:</b> {price}€
                </li>
              </ul>
            </section>
            {userInfo.isLogged && (
              <button className="button" onClick={handleReturn}>
                Añadir al carrito
              </button>
            )}
          </div>
        </div>
      </>
    );
  }
};
