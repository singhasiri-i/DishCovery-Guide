import React, { useState, useEffect } from 'react'
import { DownOutlined } from '@ant-design/icons';
import { Button, Drawer, Form, Dropdown, Tooltip, Input, message } from 'antd'
import { MENU_CATEGORY } from '../utils/constant'
import axios from 'axios';
import { Link } from 'react-router-dom';


function Nav() {

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

  // Mapping for Category Dropdown
  const items = cats.map((cat) => {
    return (
      { 
        key: cat.idCategory, 
        label: (
          <Link to={`/category/${cat.strCategory}`}>{cat.strCategory}</Link>
        )
      })
    })

  // Subscription email
  const [open, setOpen] = useState(false);
  const showDrawer = () => { setOpen(true) };
  const hideDrawer = () => { setOpen(false) };
  const [form] = Form.useForm();

  return (
    <div className='navBar bg-[#00843C] w-full h-[100px] flex justify-between items-center p-[50px] uppercase'>
        <div className='flex gap-[10px] sm:gap-[30px] items-center'>
            <Link to={"/"} ><img className='logo h-[80px] cursor-pointer' src="/images/logo.png" alt="logo" /></Link>
            <Dropdown menu={{items,}} trigger={['hover']} className='dropdownFoodCat flex text-white hover:bg-[#d4d4d477] rounded-[4px] p-[8px] cursor-pointer'>
                <Link onClick={(e) => e.preventDefault()} className='text-xs sm:text-base'>Food Category &nbsp; <DownOutlined /></Link>
            </Dropdown>
        </div>
        <div className='navBtn flex gap-[10px] sm:gap-[30px] items-center'>
          <Button onClick={ showDrawer } className='sm:min-h-[43px] uppercase rounded-[4px] bg-white text-[#00843C] '><span className='text-xs sm:text-base'>Subscribe</span></Button>
          <Drawer onClose={ hideDrawer } open={ open } title="Don't miss out, subscribe us now!">
            <Form layout='vertical' autoComplete='off' form={form} onFinish={() => { message.success('Thank you for your subscription! Please check your inbox.') }} onFinishFailed={() => { message.error('Submit failed!') }}>
              <Form.Item name="email" label="Email" rules={[{
                required: true,
                message: "Please enter your email",
              }, {
                type: 'email',
                warningOnly: true,
              }, {
                type: 'string'
              }
              ]}>
                <Input placeholder="Please enter your email"/>
              </Form.Item>
              <Form.Item>
                <button onClick={ hideDrawer } className='p-[8px] rounded-[4px] bg-[#00843C] text-white text-[14px]' htmlType='submit'>Submit</button>
              </Form.Item>
            </Form>
          </Drawer>
          <Tooltip title="See my favourite"><Link to={'/favorite'} className='heartBtn flex items-center p-[8px] uppercase text-[#f43f5e] sm:scale-125'><span class="material-symbols-outlined heart-fill">favorite</span></Link></Tooltip>
        </div>
    </div>
  )
}

export default Nav
