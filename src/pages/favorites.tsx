import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../lib/store";
import { removeFavorite, selectFavorites } from "../lib/fav-slice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => selectFavorites(state));

  const handleRemoveFavorite = (url: string) => {
    dispatch(removeFavorite(url));
    toast.success("Remove from Favorites");
  };

  const goback = () => {
    navigate(-1);
  };

  const placeholderImage =
    "https://www.sifigroup.com/s/sfsites/c/resource/cs_images15/NEWS.png";

  return (
    <div className="w-full h-full px-5">
      <h1 className="text-2xl font-medium mb-4 text-gray-800 mt-10">
        Favorite Articles
      </h1>
      {favorites.length === 0 ? (
        <p className="text-gray-500">No favorite articles found.</p>
      ) : (
        <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {favorites.map((fav) => (
            <div
              key={fav.url}
              className="w-full max-w-md mx-auto bg-white shadow-md overflow-hidden rounded-lg my-4"
            >
              <a href={fav.url} target="_blank" rel="noopener noreferrer">
                <img
                  src={fav.urlToImage || placeholderImage}
                  loading="lazy"
                  alt={fav.title}
                  className="w-full h-60 object-cover"
                />
              </a>
              <section className="px-1 py-4">
                <a
                  href={fav.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 font-semibold text-lg mb-2 line-clamp-3"
                >
                  {fav.title}
                </a>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {fav.description}
                </p>
                <div className="flex items-center justify-between text-gray-500 text-xs">
                  <span>By {fav.author ? fav.author : "Unknown"}</span>
                  <span>{new Date(fav.publishedAt).toLocaleDateString()}</span>
                </div>
                <button
                  onClick={() => handleRemoveFavorite(fav.url)}
                  className="mt-4 block bg-red-500 hover:bg-red-600 transition p-2 text-white text-sm rounded"
                >
                  Remove from Favorites
                </button>
              </section>
            </div>
          ))}
        </section>
      )}
      <button
        onClick={goback}
        className="mt-10 bg-red-500 rounded p-2 hover:bg-red-600 transition"
      >
        Go Back
      </button>
    </div>
  );
};

export default Favorites;
