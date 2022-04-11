import React, { useRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import logo from '../assets/images/Logo-2.png';
import PopUp from '../components/popup/PopUp';
import Login from '../components/login/Login';
import user_menus from '../assets/JsonData/user_menus.json';
import DropDown from '../components/dropdown/dropdown';
import { logout } from '../redux/ducks/auth';
import { useDispatch } from 'react-redux';
import './header.css';
import callAPI from '../utils/apiCaller';

const renderUserToggle = (user) => (
  <div className="top-nav__right-user">
    <div className="top-nav__right-user__image">
      <img src={user?.image} alt="User Image" />
    </div>
  </div>
);

const mainNav = [
  {
    display: 'Trang chủ',
    path: '/',
  },
  {
    display: 'Sản phẩm',
    path: '/catalog',
  },
  {
    display: 'Phụ kiện',
    path: '/accessories',
  },
  {
    display: 'Liên hệ',
    path: '/contact',
  },
];

const Header = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const dispatch = useDispatch();
  const [openPopup, setOpenPopup] = useState(false);
  const { pathname } = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [token, setToken] = useState(user?.access_jwt_token);
  // const [token, setToken] = useState('ok');

  useEffect(async () => {
    let profile = localStorage.getItem('profile');
    let access_jwt_token = JSON.parse(profile)?.access_jwt_token;
    await callAPI('api/account/info', 'get', null, {
      authorization: access_jwt_token,
    }).then((res) => {
      console.log(res);
      setCurrentUser({
        display_name: res.data.username,
        image: res.data.photo
          ? res.data.photo
          : 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
      });
    });
    // console.log('abcd', currentUser);
  }, [token]);

  const activeNav = mainNav.findIndex((e) => e.path === pathname);

  const headerRef = useRef(null);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add('shrink');
      } else {
        headerRef.current.classList.remove('shrink');
      }
    });
    return () => {
      window.removeEventListener('scroll');
    };
  }, []);

  const menuLeft = useRef(null);

  const menuToggle = () => menuLeft.current.classList.toggle('active');

  const handleLogOut = () => {
    dispatch(logout());
    setToken(null);
    // props.setToken(null);
    // history.push('/');
  };

  const displayUserData = (object, index) => {
    return (
      <Link
        key={index}
        to={object.url}
        onClick={() => {
          if (index === 3) {
            handleLogOut();
          }
        }}
      >
        <div className="notification-item">
          <i className={object.icon}></i>
          <div>{object.content}</div>
        </div>
      </Link>
    );
  };

  return (
    <div className="header" ref={headerRef}>
      <div className="container">
        <div className="header__logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="header__menu">
          <div className="header__menu__mobile-toggle" onClick={menuToggle}>
            <i className="bx bx-menu-alt-left"></i>
          </div>
          <div className="header__menu__left" ref={menuLeft}>
            <div className="header__menu__left__close" onClick={menuToggle}>
              <i className="bx bx-chevron-left"></i>
            </div>
            {mainNav.map((item, index) => (
              <div
                key={index}
                className={`header__menu__item header__menu__left__item ${
                  index === activeNav ? 'active' : ''
                }`}
                onClick={menuToggle}
              >
                <Link to={item.path}>
                  <span>{item.display}</span>
                </Link>
              </div>
            ))}
          </div>
          <div className="header__menu__right">
            <div className="header__menu__item header__menu__right__item">
              <i className="bx bx-search"></i>
            </div>
            <div className="header__menu__item header__menu__right__item">
              <Link to="/cart">
                <i className="bx bx-shopping-bag"></i>
              </Link>
            </div>
            <div className="header__menu__item header__menu__right__item">
              {token ? (
                <div className="top-nav__right">
                  <div className="top-nav__right-item">
                    <DropDown
                      customToggle={() => renderUserToggle(currentUser)}
                      dataContent={user_menus}
                      renderItems={(object, index) =>
                        displayUserData(object, index)
                      }
                    />
                  </div>
                </div>
              ) : (
                <button
                  style={{ all: 'unset', cursor: 'pointer' }}
                  onClick={() => {
                    setOpenPopup(true);
                  }}
                >
                  <i className="bx bx-user"></i>
                </button>
              )}

              <PopUp
                // title="Đăng nhập"
                isTitle="false"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
              >
                <Login setToken={setToken} setOpenPopup={setOpenPopup} />
              </PopUp>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
