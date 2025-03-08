import React, { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import axios from 'axios'
import config from '../../config/config';
import MealCard from '../../components/MealCard/MealCard'
import './SearchResult.css'

function SearchResult() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [result, setResult] = useState([]);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
        if(!query) return;
        try{
            const response = await axios.get(`${config.BASE_URL}/api/meals/search?query=${query}`)
            setResult(response.data.meals)
        } catch (error) {
            setError('Error searching meals')
        }
        finally{
            setLoading(false)
        }
    }

    fetchResults();
  }, [query])

  if (!query){
    return <div>No Result for Empty search query</div>
  }

  return (
    <div className='search-result-page'>
      <h1>Search result for '{query}'</h1>
      <Link to="/" className='back-home-link'>Back to Home page</Link>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      {!loading && result.length===0 && <p>No Meal Found</p>}
      {result.length > 0 && 
        <div className='card-container'>
          {result.map((meal) => (<div className='meal-card-wrapper'>
            <MealCard key={meal.id} meal={meal}/>
          </div>))}
        </div>
      }
    </div>
  )
}

export default SearchResult
