import React, { useEffect, useState } from 'react'

const App = () => {

  const [news,setNews] = useState([])
  const [search,setSearch] = useState("react");
  const [loading,setLoading] = useState(false);

  const fetchNews = () => {
    setLoading(true);
    fetch(`https://hn.algolia.com/api/v1/search?query=react`)
    .then(result => result.json())
    .then(data => {
      setNews(data.hits)
      setLoading(false);   
    })
    .catch(err => {
      console.log(err);
    })
  }

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true);
    fetch(`https://hn.algolia.com/api/v1/search?query=${search}`)
    .then(result => result.json())
    .then(data => {
      setNews(data.hits)
      setLoading(false);   
    })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {fetchNews()},[]);
  return (
    <div>
      <h1>News</h1>
      {loading? <h2>Loading...</h2>: ""}
      <form onSubmit={handleSubmit}>
        <input type="text" value={search} onChange={handleChange} placeholder='Search'/>
        <button type='submit'>Search</button>
      </form>

      {news.map((article,id) => {
        return <div>
          <a href={article.url} rel="noreferrer" target="_blank"><h3 key={id}>{article.title}</h3></a>
        </div>
      })}
    </div>
  )
}

export default App
