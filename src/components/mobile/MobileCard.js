import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import FavoriteContext from "../../context/FavoriteContext";
import "./MobileCard.css";
import starEnabled from "../../images/star-enabled.svg";
import starDisabled from "../../images/star-disabled.svg";

export const MobileCard = ({ brand, model, price, img, id }) => {
  const navigate = useNavigate();
  const redirectClickOnCard = () => {
    navigate(`/mobiles/${id}`);
  };

  const { favorites, setFavorites } = useContext(FavoriteContext);

  const handleAddFavoriteButtonClick = (event) => {
    event.stopPropagation();
    const newFavorites = [...favorites, { brand, model, price, img, id }];
    setFavorites(newFavorites);
  };

  const handleDeleteFavoriteButtonClick = (event) => {
    event.stopPropagation();
    const newFavorites = favorites.filter((favorite) => favorite.id !== id);
    setFavorites(newFavorites);
  };

  const isFavorite = () => {
    const indexFavorite = favorites.findIndex((fav) => fav.id === id);
    return indexFavorite !== -1;
  };

  return (
    <div
      onClick={redirectClickOnCard}
      className={`mobileCard ${
        isFavorite() ? "favorite-container__enabled" : ""
      }`}
    >
      <div className="mobileCard-img">
        <img src={img} alt={model} />
      </div>
      <h5 className="mobileCard-title">{brand}</h5>
      <div className="elipsis">
        <h4 className="mobileCard-model">{model}</h4>
      </div>
      <Link className="mobileCard-link" to={`/mobiles/${id}`}>
        <span className="mobileCard-span">More info...</span>
      </Link>
      {isFavorite() ? (
        <div onClick={handleDeleteFavoriteButtonClick}>
          <img
            className="favorite-icon"
            src={starEnabled}
            alt="Estrella habilitada"
          />
        </div>
      ) : (
        <div onClick={handleAddFavoriteButtonClick}>
          <img
            className="favorite-icon"
            src={starDisabled}
            alt="Estrella deshabilitada"
          />
        </div>
      )}
    </div>
  );
};
