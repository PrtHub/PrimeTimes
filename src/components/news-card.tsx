import { useDispatch, useSelector } from "react-redux";
import { NEWSTYPES } from "../utils/types";
import { addFavorite, removeFavorite, selectFavorites } from "../lib/fav-slice";
import { RootState } from "../lib/store";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const NewsCard = ({
  title,
  description,
  author,
  url,
  urlToImage,
  publishedAt,
}: NEWSTYPES) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => selectFavorites(state));

  console.log('favorites', favorites);

  const isFavorited = favorites.some((fav) => fav.url === url);

  const handleFavoriteClick = () => {
    if (isFavorited) {
      dispatch(removeFavorite(url));
      toast.success("Remove from Favorites");
    } else {
      dispatch(
        addFavorite({
          title,
          description,
          author,
          url,
          urlToImage,
          publishedAt,
        })
      );
      toast.success("Add to Favorites");
    }
  };

  const placeholderImage =
    "https://www.sifigroup.com/s/sfsites/c/resource/cs_images15/NEWS.png";

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-md overflow-hidden rounded-lg my-4">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img
          src={urlToImage || placeholderImage}
          loading="lazy"
          alt={title}
          className="w-full h-60 object-cover"
        />
      </a>
      <section className="px-1 py-4">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-900 font-semibold text-lg mb-2 line-clamp-3"
        >
          {title}
        </a>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>
        <div className="flex items-center justify-between text-gray-500 text-xs">
          <span>By {author ? author : "Unknown"}</span>
          <span>{new Date(publishedAt).toLocaleDateString()}</span>
        </div>
        <div className=" mt-4 flex items-center justify-between gap-5">
          <button
            onClick={handleFavoriteClick}
            className="block bg-red-500 hover:bg-red-600 transition p-2 text-white text-sm rounded"
          >
            {isFavorited ? "Remove from Favorites" : "Add to Favorites"}
          </button>
          {isFavorited && (
            <Link
              to="/favorites"
              className="block p-2 text-sm text-white bg-green-600 hover:bg-green-700 transition rounded"
            >
              Go to Fav
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default NewsCard;
