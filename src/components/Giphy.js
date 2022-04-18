import React, { useEffect, useState } from "react";
import axios from "axios";

import Loader from "./Loader";
import Paginate from "./Paginate";

const Giphy = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  //page 1 item 1 - item 25
  //page 2 item 26 - item 50
  //page 3 item 51 - item 75

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const results = await axios("https://api.giphy.com/v1/gifs/trending", {
          params: {
            api_key: "hYUo9d4NiVsgT9uh5l278h2pDpu7iFKQ",
            limit: 1000,
          },
        });

        console.log(results);
        setData(results.data.data);
      } catch (err) {
        setIsError(true);
        setTimeout(() => setIsError(false), 4000);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const renderGifs = () => {
    if (isLoading) {
      return <Loader />;
    }
    return currentItems.map((el) => {
      return (
        <div key={el.id} className="gif">
          <img src={el.images.fixed_height.url} />
        </div>
      );
    });
  };
  const renderError = () => {
    if (isError) {
      return (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          Unable to get Gifs, please try again in a few minutes
        </div>
      );
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsError(false);
    setIsLoading(true);

    try {
      const results = await axios("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: "hYUo9d4NiVsgT9uh5l278h2pDpu7iFKQ",
          q: search,
          limit: 1000,
        },
      });
      setData(results.data.data);
    } catch (err) {
      setIsError(true);
      setTimeout(() => setIsError(false), 4000);
    }

    setIsLoading(false);
  };

  const pageSelected = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="m-2">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#abc">
              <img
                className="img_size"
                src="/assets/Tenor_logo.png"
                alt="Tenor"
                height="20"
                width="80"
              />
            </a>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button className="btn btn-primary me-md-2" type="button">
                CREATE
              </button>
              <button className="btn btn-primary" type="button">
                SIGN IN
              </button>
            </div>
          </div>
        </nav>
      </div>
      {renderError()}
      <form className="form-inline justify-content-center m-2">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <input
                value={search}
                onChange={handleSearchChange}
                type="text"
                placeholder="search"
                className="form-control"
              />
              <button
                onClick={handleSubmit}
                type="submit"
                className="btn btn-warning mx-2"
              >
                GO
              </button>
            </div>
          </div>
        </nav>
      </form>
      <Paginate
        pageSelected={pageSelected}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={data.length}
      />
      <div className="container gifs">{renderGifs()}</div>
    </div>
  );
};

export default Giphy;
