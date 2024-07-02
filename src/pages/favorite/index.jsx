import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftOutlined, ClockCircleFilled, StarFilled } from "@ant-design/icons"
import Nav from '../../components/Nav'
import FooterBy from '../../components/FooterBy'
import { useLocalStorage } from '../../components/useLocalStorage'


const Favorite = () => {

    const { favorite, removeFromFavorite } = useLocalStorage('favorite')

    const handleRemoveFavorite = (idMeal) => {
      removeFromFavorite(idMeal)
    }

  return (
    <div className='favoritePage relative flex flex-col min-h-screen bg-[#F6F6F6]'>
        <Nav />
        <div className='flex items-center'>
            <Link to={"/"} className='flex justify-center items-center w-[160px] h-[40px] mt-[30px] ml-[60px] rounded-[4px] bg-[#00843C] text-white'><ArrowLeftOutlined />&nbsp; BACK HOME</Link>
            <span className='flex mt-[30px] ml-[60px] text-[#BFBFBF]'>{ favorite.length } favorites found</span>
        </div>

        <ul className='searchResults grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 m-[10px] mt-[0px] p-[50px] justify-between align-stretch mb-[50px]'>
        { favorite.map((fav) => (
          <li className='hover:shadow-[5px_5px_0px_0px_#00843C] hover:scale-105' key={ fav.idMeal }>
              <div className="relative flex max-w-[25rem] xl:max-w-[18rem] md:max-w-[20rem] flex-col overflow-hidden rounded-xl hover:rounded-none bg-clip-border text-gray-700 shadow-md">
              <div className="cardHeader relative m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border">
                <img
                  src={ fav.strMealThumb }
                  alt={ fav.strMeal } />
                <button onClick={() => handleRemoveFavorite(fav.idMeal)} className="heart-btn !absolute top-4 right-4 h-8 w-8 rounded-full scale-125 active:bg-red-500/30 text-[#f43f5e]">
                  <span class="material-symbols-outlined heart-fill">delete_forever</span>
                </button>
              </div>
            <Link to={`/detail/${fav.idMeal}`} className='card'>
              <div className="cardContent p-6 pb-3">
                <h4 className="cardCategory block text-[15px] text-[#B5460F] uppercase antialiased font-extrabold leading-snug">
                  { fav.strCategory }
                </h4>
                <p className="cardName block mt-3 font-serif text-[30px] antialiased font-normal leading-relaxed text-gray-700">
                  { fav.strMeal }
                </p>
              </div>
            </Link>
              <div className="cardFooter flex items-center justify-between p-6">
                <p className='flex gap-1.5 leading-relaxed'><ClockCircleFilled style={{ color: "#00843C" }} /> {Math.floor(Math.random() * 100)} mins</p>
                <p className="flex gap-1.5 leading-relaxed"><StarFilled style={{ color: "#FEC445" }} />{(Math.random() * 10).toFixed(1)}</p>
              </div>
            </div> 
          </li>
        ))}
      </ul>

        <FooterBy />
    </div>
  )
}

export default Favorite