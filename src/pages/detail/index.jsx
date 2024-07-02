import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Rate, Tooltip, message } from 'antd';
import { ClockCircleFilled, StarFilled, ArrowLeftOutlined } from '@ant-design/icons';
import { MENU_DETAIL_BY_ID } from '../../utils/constant'
import Nav from '../../components/Nav';
import FooterBy from '../../components/FooterBy';
import axios from 'axios'
import { useLocalStorage } from '../../components/useLocalStorage';


function DetailPage() {

  const [recipeDetail, setRecipeDetail] = useState([])
  const param = useParams()

  const menuDetail = async (id) => {
    try {
      const responseDetail = await axios.get(`${MENU_DETAIL_BY_ID}${id}`)
      const menuDetail = responseDetail.data.meals
      console.log("menuDetail = ",menuDetail);
      setRecipeDetail(menuDetail)
    } catch (error) {
      console.error("Error from Detail mapping! ", error)
    }
  }

  useEffect(() => {
    if (param.menuId) {
      menuDetail(param.menuId)
    }
    console.log("param.menuId = ",param.menuId);
  }, [param.menuId])


  // Message popover when click "Save to my favorite"
  const [messageApi, contextHolder] = message.useMessage()
  const key = 'updatable';
  const openMessage = () => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Saving...',
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: 'success',
        content: 'Saved to favorite!',
        duration: 2,
      });
    }, 1000);
  };

  // Message popover when click "Rate the menu"
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Thank you for rating this menu!',
    })
  }

  // useLocalStorage() for save to favorite
  const { setItem, favorite } = useLocalStorage('favorite')

  const handleClickSaveFavorite = (r) => { // r is the recipe in .map below
    console.log(r);
    if (favorite.find((item) => {
      return item.idMeal == r.idMeal
    })) {
      return
    }
    setItem(r)
    openMessage()
  }

  return (
    <div className='detailPage relative flex flex-col min-h-screen bg-[#F6F6F6]'>
      <Nav />
      { recipeDetail.map((recipe) => (
        <div className='container flex flex-col justify-center items-stretch mx-auto mb-[50px]' key={ recipe.idMeal }>
          <Link to={"/"} className='flex justify-center items-center w-[160px] h-[40px] mt-[30px] ml-[50px] sm:ml-[0px] rounded-[4px] bg-[#00843C] text-white'><ArrowLeftOutlined />&nbsp; BACK HOME</Link>
          <div className='intro flex flex-col md:flex-row justify-between px-[50px] sm:px-[0px] py-[50px]'>
            <img src={ recipe.strMealThumb } className='max-w-[450px] md:min-w-[40%] rounded-[15px]' />
            <div className='flex flex-col menuIntro w-[100%] md:w-[60%] mt-[15px] md:ml-[50px] justify-between'>
              <div className=' mb-[30px]'>
                <h1 className='text-[40px] font-black font-sans mb-[30px] pb-[15px] border-2 border-transparent border-b-black'>{ recipe.strMeal }</h1>
                <div className="flex flex-wrap items-center gap-[20px] mb-[30px]">
                  <p className="font-sans font-extrabold text-nowrap text-[#B5460F] uppercase">{ recipe.strCategory }</p>
                  <p className='font-sans font-semibold'>|</p>
                  <p className='flex gap-1.5 font-sans font-semibold text-nowrap'><ClockCircleFilled style={{ color: "#00843C" }} />Cooking time: {Math.floor(Math.random() * 100)} mins</p>
                  <p className='font-sans font-semibold'>|</p>
                  <p className="flex gap-1.5 font-sans font-semibold text-nowrap"><StarFilled style={{ color: "#FEC445" }} />Rating: {(Math.random() * 10).toFixed(1)}</p>
                  <p className='font-sans font-semibold'>|</p>
                  <Tooltip title="Rate this menu"><Rate onClick={success} defaultValue="3" /></Tooltip>
                </div>
                <p>This { recipe.strCategory } recipe is a traditional food from { recipe.strArea }.</p>
              </div>
              {contextHolder}
              <button onClick={() => handleClickSaveFavorite(recipe)} className='w-full flex gap-1.5 px-[18px] p-[8px] rounded-[4px] justify-center items-center uppercase text-[#f43f5e] font-bold border-2 border-[#f43f5e] focus:bg-[#f43f5e] focus:text-[#fff]' 
                style={{ backgroundColor: `${favorite.some(favItem => favItem.idMeal === recipe.idMeal) ? '#f43f5e' : '' }`, color: `${favorite.some(favItem => favItem.idMeal === recipe.idMeal) ? '#fff' : '' }` }}>
                  <span class="material-symbols-outlined heart-fill">favorite</span>SAVE TO MY FAVORITE</button>
            </div>
          </div>
          <div className='content bg-[#FFFFFF] flex flex-col md:flex-row justify-between px-[50px] sm:px-[0px] py-[50px]'>
            <div className='ingredientsBox text-nowrap px-[50px]'>
              <h2 className='text-[20px] font-black font-sans mb-[30px]'>Ingredients</h2>
              <table className='border-2 border-x-transparent border-y-gray-200 max-w-[450px] md:min-w-[40%] text-sm text-left rtl:text-right text-gray-500'>
                <tbody>
                  <tr className='odd:bg-white even:bg-gray-50 border-b'>
                    <td className='px-6 py-4'>{ recipe.strMeasure1 } { recipe.strIngredient1 }</td>
                  </tr>
                  <tr className='odd:bg-white even:bg-gray-50 border-b'>
                    <td className='px-6 py-4'>{ recipe.strMeasure2 } { recipe.strIngredient2 }</td>
                  </tr>
                  <tr className='odd:bg-white even:bg-gray-50 border-b'>
                    <td className='px-6 py-4'>{ recipe.strMeasure3 } { recipe.strIngredient3 }</td>
                  </tr>
                  <tr className='odd:bg-white even:bg-gray-50 border-b'>
                    <td className='px-6 py-4'>{ recipe.strMeasure4 } { recipe.strIngredient4 }</td>
                  </tr>
                  <tr className='odd:bg-white even:bg-gray-50 border-b'>
                    <td className='px-6 py-4'>{ recipe.strMeasure5 } { recipe.strIngredient5 }</td>
                  </tr>
                  <tr className='odd:bg-white even:bg-gray-50 border-b'>
                    <td className='px-6 py-4'>{ recipe.strMeasure6 } { recipe.strIngredient6 }</td>
                  </tr>
                  <tr className='odd:bg-white even:bg-gray-50 border-b'>
                    <td className='px-6 py-4'>{ recipe.strMeasure7 } { recipe.strIngredient7 }</td>
                  </tr>
                  <tr className='odd:bg-white even:bg-gray-50 border-b'>
                    <td className='px-6 py-4'>{ recipe.strMeasure8 } { recipe.strIngredient8 }</td>
                  </tr>
                  <tr className='odd:bg-white even:bg-gray-50 border-b'>
                    <td className='px-6 py-4'>{ recipe.strMeasure9 } { recipe.strIngredient9 }</td>
                  </tr>
                  <tr className='odd:bg-white even:bg-gray-50 border-b'>
                    <td className='px-6 py-4'>{ recipe.strMeasure10 } { recipe.strIngredient10 }</td>
                  </tr>
                  <tr className='odd:bg-white even:bg-gray-50 border-b'>
                    <td className='px-6 py-4'>{ recipe.strMeasure11 } { recipe.strIngredient11 }</td>
                  </tr>
                  <tr className='odd:bg-white even:bg-gray-50 border-b'>
                    <td className='px-6 py-4'>{ recipe.strMeasure12 } { recipe.strIngredient12 }</td>
                  </tr>
                  <tr className='odd:bg-white even:bg-gray-50 border-b'>
                    <td className='px-6 py-4'>{ recipe.strMeasure13 } { recipe.strIngredient13 }</td>
                  </tr>
                  <tr className='odd:bg-white even:bg-gray-50 border-b'>
                    <td className='px-6 py-4'>{ recipe.strMeasure14 } { recipe.strIngredient14 }</td>
                  </tr>
                  <tr className='odd:bg-white even:bg-gray-50 border-b'>
                    <td className='px-6 py-4'>{ recipe.strMeasure15 } { recipe.strIngredient15 }</td>
                  </tr>
                  <tr className='odd:bg-white even:bg-gray-50 border-b'>
                    <td className='px-6 py-4'>{ recipe.strMeasure16 } { recipe.strIngredient16 }</td>
                  </tr>
                  <tr className='odd:bg-white even:bg-gray-50 border-b'>
                    <td className='px-6 py-4'>{ recipe.strMeasure17 } { recipe.strIngredient17 }</td>
                  </tr>
                  <tr className='odd:bg-white even:bg-gray-50 border-b'>
                    <td className='px-6 py-4'>{ recipe.strMeasure18 } { recipe.strIngredient18 }</td>
                  </tr>
                  <tr className='odd:bg-white even:bg-gray-50 border-b'>
                    <td className='px-6 py-4'>{ recipe.strMeasure19 } { recipe.strIngredient19 }</td>
                  </tr>
                  <tr className='odd:bg-white even:bg-gray-50 border-b'>
                    <td className='px-6 py-4'>{ recipe.strMeasure20 } { recipe.strIngredient20 }</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='howTo w-[100%] md:w-[60%] px-[50px]'>
              <h2 className='text-[20px] font-black font-sans mb-[30px]'>How to</h2>
              <div className="aspect-w-16 aspect-h-9 mb-[30px]">
                <iframe className='rounded-[15px]' src={`https://www.youtube.com/embed/${ (recipe.strYoutube).replace("https://www.youtube.com/watch?v=","") }`} width="640" height="360"  frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
              <p>{ recipe.strInstructions }</p>
            </div>
          </div>
        </div>
        ))}

      <FooterBy />

    </div>
  )
}

export default DetailPage
