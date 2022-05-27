import React, { useContext } from "react";
import FavoriteContext from "../../context/FavoriteContext";
import deleteIconUrl from "../../images/delete.svg";
import "./FavoriteMobile.css";

const FavoritesMobile = () => {
  const { favorites, setFavorites } = useContext(FavoriteContext);
  if (favorites.length < 1) {
    return <>No existen favoritos</>;
  }

  const handleDeleteFavoriteButtonClick = (id) => {
    const newFavorites = favorites.filter((favorito) => favorito.id !== id);
    setFavorites(newFavorites);
  };

  return (
    <>
      <h1>Favoritos</h1>
      <ul>
        {favorites.map((favoriteMobile) => {
          const { img, brand, model, id } = favoriteMobile;
          return (
            <li key={id}>
              <div className="li--container">
                <div>
                  <div>
                    <img src={img} alt={model} />
                  </div>
                  <h5>{brand}</h5>
                  <div>
                    <h4>{model}</h4>
                  </div>
                  <button onClick={() => handleDeleteFavoriteButtonClick(id)}>
                    <div className="button-container">
                      <span>Eliminar </span>
                      <img className="delete-icon" src={deleteIconUrl} />
                    </div>
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default FavoritesMobile;
