import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Select, { SingleValue } from "react-select";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

import NewsCard from "../components/news-card";
import { CategoryOption, NEWSTYPES } from "../utils/types";
import { categories } from "../utils/category";
import SearchInput from "../components/search-input";

const News = () => {
  const [news, setNews] = useState<NEWSTYPES[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("general");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const url = searchQuery
          ? `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${
              import.meta.env.VITE_NEWS_API_KEY
            }`
          : `https://newsapi.org/v2/top-headlines?country=in&category=${selectedCategory}&apiKey=${
              import.meta.env.VITE_NEWS_API_KEY
            }`;
        const res = await axios.get(url);
        setNews(res.data.articles);
      } catch (error) {
        toast.error("Failed to fetch news articles.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [selectedCategory, currentPage, searchQuery]);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected + 1);
  };

  const handleCategoryChange = (
    selectedOption: SingleValue<CategoryOption>
  ) => {
    if (selectedOption) {
      setSelectedCategory(selectedOption.value);
    }
    setSearchQuery("");
    setCurrentPage(1);
  };

  const offset = (currentPage - 1) * itemsPerPage;
  const currentItems = news.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(news.length / itemsPerPage);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <section className="w-full h-full flex items-center justify-start flex-col gap-10 px-4 py-10">
      <SearchInput onSearch={handleSearch} />
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-800 mt-10">
        <h1 className="text-2xl font-medium">
          {searchQuery ? `Search results for ${searchQuery}` : "Top Headlines"}
        </h1>
        <span className="w-full max-w-lg sm:w-48">
          <Select
            placeholder="Select a category"
            options={categories}
            onChange={handleCategoryChange}
            defaultValue={categories.find(
              (cat) => cat.value === selectedCategory
            )}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary25: "#FFCCCC",
                primary: "red",
              },
            })}
          />
        </span>
      </div>
      {loading ? (
        <div className="my-20">
          <Loader2 className="animate-spin text-5xl text-gray-800" />{" "}
        </div>
      ) : (
        <section className="h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {currentItems?.map((news: NEWSTYPES) => (
            <NewsCard
              key={news.title}
              title={news.title}
              description={news.description}
              content={news.content}
              author={news.author}
              url={news.url}
              urlToImage={news.urlToImage}
              publishedAt={news.publishedAt}
            />
          ))}
        </section>
      )}
      {!loading && (
        <ReactPaginate
          previousLabel={"←"}
          nextLabel={"→"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={
            "flex list-none gap-2 justify-center text-black py-4"
          }
          pageClassName={"px-3 py-1 border border-gray-300  rounded"}
          activeClassName={"bg-red-700 text-white border-red-500"}
          previousClassName={"px-3 py-1 border border-gray-300 rounded"}
          nextClassName={"px-3 py-1 border border-gray-300 rounded"}
          breakClassName={"px-3 py-1 border border-gray-300 rounded"}
          disabledClassName={"opacity-50 cursor-not-allowed"}
          forcePage={currentPage - 1}
        />
      )}
    </section>
  );
};

export default News;
