import React, { useState, useEffect } from 'react';
import styled from 'styled-components'


function useGiphy(query) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=UgZiSKVzEPG0qHj2kXWRw2H0s0pi02jT&q=${query}&limit=10&offset=0&rating=g&lang=en`
        );
        const json = await response.json();

        setResults(
          json.data.map(item => {
            return item.images.preview.mp4;
          })
        );
      } finally {
        setLoading(false);
      }
    }

    if (query !== '') {
      fetchData();
    }
  }, [query]);

  return [results, loading];
}

function AsyncHooks() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [results, loading] = useGiphy(query);

  return (
    <div>
      <h1>GENERATE GIFS</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          setQuery(search);
        }}
      >
        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search for Gifs!"
        />
        <Button type="submit">Search</Button>
      </form>
      <br />
      {loading ? (
        <h1>GIVE ME GIFS</h1>
      ) : (
        results.map(item => <video autoPlay loop key={item} src={item} />)
      )}
    </div>
  );
      }

      // STYLES

const Button = styled.button`
background-color: blue;
color: #fff;
padding: 10px 20px;
border-color: blue;
cursor: pointer;
border-radius: 20px;
margin-left: 10px


`;

const Input  = styled.input`
padding: 15px

`
//End of styles

  export default  AsyncHooks