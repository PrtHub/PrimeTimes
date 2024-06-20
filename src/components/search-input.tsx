import { useState } from "react";
import { useDebounce } from "use-debounce";
import { Loader2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

interface SearchInputProps {
  onSearch: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [debouncedQuery] = useDebounce(query, 500);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const searchNews = async () => {
    setLoading(true);
    try {
      await axios.get(
        `https://newsapi.org/v2/everything?q=${debouncedQuery}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
      );
      onSearch(debouncedQuery);
    } catch (error) {
      toast.error("Failed to search news articles.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchNews();
    setQuery('')
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <div className="flex items-center border-b-2 border-red-500 py-2">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search news..."
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        />
        <button
          type="submit"
          className="flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded focus:outline-none"
        >
          {loading ? (
            <Loader2 className="animate-spin text-white" size="24" />
          ) : (
            "Search"
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchInput;
