import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import Gif from './Gif';

const Gifs = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const results = await axios('https://api.giphy.com/v1/gifs/trending', {
          params: {
            api_key: '3ll3pwsHyQmnGSaid9b2I6E5pCHuesuf',
            limit: 100,
          },
        });

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
    return data.map(gif => {
      return <Gif gif={gif} />;
    });
  };
  const renderError = () => {
    if (isError) {
      return (
        <div className="error">
          There was an error, please try again later.
        </div>
      );
    }
  };

  const handleSearchChange = event => {
    setSearch(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (search) {
      setIsError(false);
      setIsLoading(true);

      try {
        const results = await axios('https://api.giphy.com/v1/gifs/search', {
          params: {
            api_key: '3ll3pwsHyQmnGSaid9b2I6E5pCHuesuf',
            q: search,
            limit: 100,
          },
        });

        setData(results.data.data);
      } catch (err) {
        setIsError(true);
        setTimeout(() => setIsError(false), 4000);
      }

      setIsLoading(false);
    }
    return;
  };

  return (
    <div>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          value={search}
          onChange={handleSearchChange}
          type="text"
          placeholder="search"
          className="form-input"
        />
        <button onClick={handleSubmit} type="submit" className="btn">
          Search
        </button>
        {renderError()}
      </form>
      <div className="gif-container">{renderGifs()}</div>
    </div>
  );
};

export default Gifs;
