import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { MENU_CATEGORY } from '../utils/constant'
import axios from 'axios';


const CategoryList = ({ onSelect }) => {

  const [cats, setCats] = useState([])

  // API Call for Category
  const menuCategory = async () => {
    try {
      const responseCat = await axios.get(MENU_CATEGORY)
      const categories = responseCat.data.categories
      console.log(categories);
      setCats(categories)
    } catch (error) {
      console.error("Error finding Category! ", error)
    }
  }
  
  useEffect(() => {
    menuCategory()
  }, [])

  // Value from selction sending to filter
  const handleSelection = (value) => {
    onSelect(value)
  }

  return (
    <div className='pl-[50px] mt-[30px]'>
      <span className='uppercase'>Filter by: </span>
      <Select onSelect={handleSelection} placeholder="Food Category" dropdownStyle={{ backgroundColor: '#00843C' }} clearbg= "#00843C" selectorbg='#00843C'  style={{ selectorbg: '#00843C', width: "250px" }} >
        {cats.map((cat) => {
          return <Select.Option value={cat.strCategory} key={cat.idCategory} label={cat.strCategory}>{cat.strCategory}</Select.Option>
        })}
      </Select>

    </div>
  )
}

export default CategoryList