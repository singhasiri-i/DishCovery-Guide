import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeftOutlined, ClockCircleFilled, StarFilled } from '@ant-design/icons';
import { MENU_BY_CATEGORY } from '../../utils/constant'
import { useLocalStorage } from '../../components/useLocalStorage';
import Nav from '../../components/Nav'
import FooterBy from '../../components/FooterBy';
import axios from 'axios'

function CategoryPage() {

  const [menusInCat, setMenusInCat] = useState([])
  const param = useParams()

  const menuByCategory = async (catName) => {
      try {
          const responseMenuByCat = await axios.get(`${MENU_BY_CATEGORY}${catName}`)
          const menuByCategory = responseMenuByCat.data.meals
          console.log("menuByCategory = ",menuByCategory);
          setMenusInCat(menuByCategory)
      } catch (error) {
          console.error("Error from Dropdown Category! ", error)
      }
  }

  useEffect(() => {
      if (param.catName) {
          menuByCategory(param.catName)
      }
      console.log("param.catName = ",param.catName);
  }, [param.catName])

  // Marked the heart button as favorite
  const { favorite } = useLocalStorage('favorite')

  return (
    <div className='categoryPage relative flex flex-col min-h-screen bg-[#F6F6F6]'>
        <Nav />
        <div className='flex items-center'>
            <Link to={"/"} className='flex justify-center items-center w-[160px] h-[40px] mt-[30px] ml-[60px] rounded-[4px] bg-[#00843C] text-white'><ArrowLeftOutlined />&nbsp; BACK HOME</Link>
            <span className='flex mt-[30px] ml-[60px] text-[#BFBFBF]'>{menusInCat.length} Results for "{param.catName}"</span>
        </div>

        <ul className='searchResults grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 m-[10px] mt-[0px] p-[50px] justify-between align-stretch mb-[50px]'>
        { menusInCat.map((menuInCat) => (
          <li className='hover:shadow-[5px_5px_0px_0px_#00843C] hover:scale-105' key={ menuInCat.idMeal }>
            <Link to={`/detail/${menuInCat.idMeal}`} className='card'>
              <div className="relative flex max-w-[25rem] xl:max-w-[18rem] md:max-w-[20rem] flex-col overflow-hidden rounded-xl hover:rounded-none bg-clip-border text-gray-700 shadow-md">
              <div className="cardHeader relative m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border">
                <img
                  src={ menuInCat.strMealThumb }
                  alt={ menuInCat.strMeal } />
                <button className="heart-btn !absolute top-4 right-4 h-8 w-8 rounded-full scale-125 active:bg-red-500/30 text-[#f43f5e]">
                    <span class={`material-symbols-outlined ${favorite.some(favItem => favItem.idMeal === menuInCat.idMeal) ? 'heart-fill' : ''}`}>favorite</span>
                </button>
              </div>
              <div className="cardContent p-6 pb-3">
                <h4 className="cardCategory block text-[15px] text-[#B5460F] uppercase antialiased font-extrabold leading-snug">
                  { param.catName }
                </h4>
                <p className="cardName block mt-3 font-serif text-[30px] antialiased font-normal leading-relaxed text-gray-700">
                  { menuInCat.strMeal }
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

      <FooterBy />

    </div>
  )
}

export default CategoryPage