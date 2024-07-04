import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Input, message } from 'antd'
import { SearchOutlined, ClockCircleFilled, StarFilled } from '@ant-design/icons';
import { MENU_SEARCH, MENU_RANDOM } from '../../utils/constant'
import { useLocalStorage } from '../../components/useLocalStorage';
import Nav from '../../components/Nav';
import FooterBy from '../../components/FooterBy';
import CategoryList from '../../components/CategoryList';
import axios from 'axios';


function Homepage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [randomResults, setRandomResults] = useState([])
  const [selection, setSelection] = useState("")
  const [filteredData, setFilteredData] = useState(searchResults)
  const navigate = useNavigate() // for error page


  // Warning messege when input is empty
  const [messageApi, contextHolder] = message.useMessage();
  const warning = () => {
    messageApi.open({
      type: 'warning',
      content: 'Search box is empty',
    });
  };
  
  // API Call for Search Function
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    if (!searchTerm) {
      warning()
    } else {
      menuSearch(searchTerm)
      setRandomResults([])
      setSelection("")
    }
  }

  const menuSearch = async (term) => {
    try {
      const responseSearch = await axios.get(`${MENU_SEARCH}${term}`)
      const menuSearchResults = responseSearch.data.meals
      console.log(menuSearchResults);
      if (menuSearchResults === null) {
        navigate('/error')
      } else {
        setSearchResults(menuSearchResults)
      }
    } catch (error) {
      console.error("Error from Search! ", error)
      navigate('/error')
    }
  }

  // API Call for Random Function
  const handleRandomClick = () => {
    menuRandom()
    setSearchTerm("")
    setSearchResults([])
  }

  const menuRandom = async () => {
    try {
      const responseRandom = await axios.get(MENU_RANDOM)
      const randomResults = responseRandom.data.meals
      console.log(randomResults);
      setRandomResults(randomResults)
    } catch (error) {
      console.error("Error from Random! ", error)
    }
  }

  // Value from selction sending to filter
  const handleSelection = (select) => {
    setSelection(select)
  }

  // Filter searchResults by category
  useEffect(() => {
    const filteredSearchResults = searchResults.filter((result) => 
      result.strCategory.includes(selection)
    )
    setFilteredData(filteredSearchResults)
    console.log(filteredSearchResults);
  }, [selection, searchResults])

  // Marked the heart button as favorite
  const { favorite } = useLocalStorage('favorite')

  return (
    <div className='homepage relative flex flex-col min-h-screen'>
      <Nav />
      <div className='mainPage flex flex-col justify-center items-center background bg-[url("/images/homeBG.jpeg")] bg-cover bg-no-repeat bg-center w-full min-h-[550px] bg-black/60 bg-blend-overlay text-white'>
        <div className='aboutUS mt-[10px] m-[20px]'>
          <div className='topic leading-tight text-[70px] font-bold text-center'>DishCovery Guide</div>
          <div className='text-[30px] text-center'>Let your taste buds lead the way!</div>
        </div>
        <form onSubmit={handleFormSubmit} className='searchForm flex w-[60%] h-[50px] m-[20px]'>
          <Input onChange={handleInputChange} value={ searchTerm } style={{ fontSize: '20px' }} className='rounded-r-[0px]' placeholder="find your favorite dish here..." allowClear />
          {contextHolder}<button type='submit' className='flex justify-center items-center p-[8px] w-[70px] h-[50px] bg-[#00843C] rounded-l-[0px] rounded-r-[6px] text-white'><SearchOutlined /></button>
        </form>
        <div className='randomMenu flex w-[70%] flex-col items-center justify-center'>
          <div className='text-[30px] mb-[20px] text-center'>No idea ? Get our random menu</div>
          <button onClick={handleRandomClick} className='px-[30px] h-[50px] bg-[#00843C] rounded-[6px]'>RANDOM</button>
        </div>
      </div>


{/* Element for searchResults */}
    {searchResults.length > 0 && (
    <>
      <div className='flex'>
        <CategoryList onSelect={handleSelection} value={selection} />
        <span className='flex mt-[30px] ml-[60px] text-[#BFBFBF]'>{filteredData.length} Results for "{searchTerm}"</span>
      </div>
      <ul className='searchResults grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 m-[10px] p-[50px] justify-between align-stretch mb-[50px]'>
        { filteredData.map((searchItem) => (
          <li className='hover:shadow-[5px_5px_0px_0px_#00843C] hover:scale-105' key={ searchItem.idMeal }>
            <Link to={`/detail/${searchItem.idMeal}`} className='card'>
              <div className="relative flex max-w-[25rem] xl:max-w-[18rem] md:max-w-[20rem] flex-col overflow-hidden rounded-xl hover:rounded-none bg-clip-border text-gray-700 shadow-md hover:shadow-none">
              <div className="cardHeader relative m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border">
                <img
                  src={ searchItem.strMealThumb }
                  alt={ searchItem.strMeal } />
                <button className="heart-btn !absolute top-4 right-4 h-8 w-8 rounded-full scale-125 active:bg-red-500/30 text-[#f43f5e]">
                    <span class={`material-symbols-outlined ${favorite.some(favItem => favItem.idMeal === searchItem.idMeal) ? 'heart-fill' : ''}`}>favorite</span>
                </button>
              </div>
              <div className="cardContent p-6 pb-3">
                <h4 className="cardCategory block text-[15px] text-[#B5460F] uppercase antialiased font-extrabold leading-snug">
                  { searchItem.strCategory }
                </h4>
                <p className="cardName block mt-3 font-serif text-[30px] antialiased font-normal leading-relaxed text-gray-700">
                  { searchItem.strMeal }
                </p>
              </div>
              <div className="cardFooter flex items-center justify-between p-6">
                <p className='flex gap-1.5 leading-relaxed'><ClockCircleFilled style={{ color: "#00843C" }} /> {Math.floor(Math.random() * 100)} mins</p>
                <p className="flex gap-1.5 leading-relaxed"><StarFilled style={{ color: "#FEC445" }} />{(Math.random() * 10).toFixed(1)}</p>
              </div>
            </div> 
            </Link>
          </li>
        ))}
      </ul>
    </>
    )}

{/* Element for Random */}
    {randomResults.length > 0 && (
      <ul className='searchResults grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 m-[10px] p-[50px] justify-between align-stretch mb-[50px]'>
        { randomResults.map((randomItem) => (
          <li className='hover:shadow-[5px_5px_0px_0px_#00843C] hover:scale-105' key={ randomItem.idMeal }>
            <Link to={`/detail/${randomItem.idMeal}`} className='card'>
              <div className="relative flex max-w-[25rem] xl:max-w-[18rem] md:max-w-[20rem] flex-col overflow-hidden rounded-xl hover:rounded-none bg-clip-border text-gray-700 shadow-md hover:shadow-none">
              <div className="cardHeader relative m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border">
                <img
                  src={ randomItem.strMealThumb }
                  alt={ randomItem.strMeal } />
                <button className="heart-btn !absolute top-4 right-4 h-8 w-8 rounded-full scale-125 active:bg-red-500/30 text-[#f43f5e]">
                    <span class={`material-symbols-outlined ${favorite.some(favItem => favItem.idMeal === randomItem.idMeal) ? 'heart-fill' : ''}`}>favorite</span>
                </button>
              </div>
              <div className="cardContent p-6 pb-3">
                <h4 className="cardCategory block text-[15px] text-[#B5460F] uppercase antialiased font-extrabold leading-snug">
                  { randomItem.strCategory }
                </h4>
                <p className="cardName block mt-3 font-serif text-[30px] antialiased font-normal leading-relaxed text-gray-700">
                  { randomItem.strMeal }
                </p>
              </div>
              <div className="cardFooter flex items-center justify-between p-6">
                <p className='flex gap-1.5 leading-relaxed'><ClockCircleFilled style={{ color: "#00843C" }} /> {Math.floor(Math.random() * 100)} mins</p>
                <p className="flex gap-1.5 leading-relaxed"><StarFilled style={{ color: "#FEC445" }} />{(Math.random() * 10).toFixed(1)}</p>
              </div>
            </div> 
            </Link>
          </li>
        ))}
      </ul>
    )}

      <FooterBy />

    </div>
  )
}

export default Homepage