import React, { useState } from 'react';
import '../Styles/Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {Link} from 'react-router-dom'
import { useStateValue } from './StateProvider';
import { auth } from '../firebase'

function Header() {
    const {searchValue, setSearchValue} = useState([]);
    const [{basket, user}] = useStateValue();

    const handleAuthentication = () => {
        if (user) {
            auth.signOut();
        }
    }

    const handleSearchChange = e => {
        setSearchValue(e.target.value)
    }

    return (
        <div className='Header'>
            <div className="Header__image">
                <Link to="/" style={{textDecoration: "none"}}>
                    <h1>my<span>Shop</span></h1>
                    {/* <img className='Header__logo' src="https://pngimg.com/uploads/amazon/amazon_PNG25.png" alt="" /> */}
                </Link>
            </div>

            <div className="Header__search">
                <input 
                className='Header__searchInput' 
                type="text"  
                onChange={handleSearchChange} 
                value={searchValue}
                />
                {/* <img className='Header__searchIcon' src="src/Images/icons8-search-50.png" alt="" /> */}
                <SearchIcon className='Header__searchIcon'/>

            </div>

            <div className="Header__item">
                <Link to={!user && '/login'}>
                    <div onClick={handleAuthentication} className="Header__option">
                        <span className='Header__optionOne'>Hello {!user ? 'Guest' : user.email}</span>
                        <span className='Header__optionTwo'>{user ? 'Sign-out' : 'Sign-in'}</span>
                    </div>
                </Link>
                <div className="Header__option">
                    <span className='Header__optionOne'>Returns</span>
                    <span className='Header__optionTwo'>& Orders</span>
                </div>
                <div className="Header__option">
                    <span className='Header__optionOne'>Your</span>
                    <span className='Header__optionTwo'>Prime</span>
                </div>
                <Link to='/checkout'>
                    <div className="Header__shoppingBasket">
                        {/* <img className="Header__basketImage" src="Images/icons8-shopping-basket-24.png" alt="" /> */}
                        <ShoppingBasketIcon className="Header__basketImage"/>
                        <span className='Header__optionTwo Header__basketCount' >{basket?.length}</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header
