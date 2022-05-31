import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router';

import { useDispatch } from 'react-redux';

import { addItem } from '../redux/shopping-cart/cartItemsSlide';
import { remove } from '../redux/product-modal/productModalSlice';
import { FaStar } from 'react-icons/fa';

import Button from './Button';
import numberWithCommas from '../utils/numberWithCommas';
import PopUp from '../components/popup/PopUp';
import Login from '../components/login/Login';
import { useLocation } from 'react-router-dom';
import { setSnackbar } from '../redux/ducks/snackbar';

const ProductView = (props) => {
  const location = useLocation();
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopup2, setOpenPopup2] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [token, setToken] = useState(user?.access_jwt_token);
  const stars = Array(5).fill(0);
  const [currentStarValue, setCurrentStarValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const handleClickRating = (value) => {
    setCurrentStarValue(value);
    dispatch(setSnackbar(true, 'success', 'Đánh giá thành công'));
  };
  const handleMouseHover = (value) => {
    setHoverValue(value);
  };
  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const dispatch = useDispatch();

  const colors = {
    orange: '#FFBA5A',
    grey: '#a9a9a9',
  };
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    stars: {
      marginTop: '10px',
    },
  };
  let product = props.product;

  if (product === undefined) {
    console.log('product is', product);
    product = {
      name: '',
      price: '',
      image_url: null,
      image02: null,
      categorySlug: '',
      colors: [],
      slug: '',
      size: [],
      description: '',
    };
  }

  const [previewImg, setPreviewImg] = useState(product.image_url);

  const [descriptionExpand, setDescriptionExpand] = useState(false);

  //   const [color, setColor] = useState(undefined);

  //   const [size, setSize] = useState(undefined);

  const [quantity, setQuantity] = useState(1);

  const updateQuantity = (type) => {
    if (type === 'plus') {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    }
  };

  useEffect(() => {
    setPreviewImg(product.image_url);
    setQuantity(1);
    // setColor(undefined);
    // setSize(undefined);
  }, [product]);

  const check = () => {
    // if (color === undefined) {
    //   alert('Vui lòng chọn màu sắc!');
    //   return false;
    // }

    // if (size === undefined) {
    //   alert('Vui lòng chọn kích cỡ!');
    //   return false;
    // }
    if (!token) {
      return false;
    }

    return true;
  };

  const addToCart = () => {
    if (check()) {
      let newItem = {
        slug: product.id,
        // color: color,
        // size: size,
        price: product.price,
        quantity: quantity,
        name: product.name,
        image_url: product.image_url,
      };
      dispatch(addItem(newItem));
      // if (dispatch(addItem(newItem))) {
      //   alert('Success');
      // } else {
      //   alert('Fail');
      // }
    } else {
      setOpenPopup2(true);
    }
    console.log(location.pathname);
  };

  const goToCart = () => {
    // if (check()) {
    let newItem = {
      slug: product.id,
      // color: color,
      // size: size,
      price: product.price,
      quantity: quantity,
      name: product.name,
      image_url: product.image_url,
    };

    if (dispatch(addItem(newItem))) {
      dispatch(remove());
      if (check()) {
        props.history.push('/cart');
      } else {
        setOpenPopup(true);
      }
    } else {
      alert('Fail');
    }
    // }
  };

  return (
    <div className="product">
      <div className="product__images">
        <div className="product__images__list">
          <div
            className="product__images__list__item"
            onClick={() => setPreviewImg(product.image_url)}
          >
            <img src={product.image_url} alt="" />
          </div>
          <div
            className="product__images__list__item"
            onClick={() => setPreviewImg(product?.img02)}
          >
            <img src={product?.img02} alt="" />
          </div>
        </div>
        <div className="product__images__main">
          <img src={previewImg} alt="" />
        </div>
        <div
          className={`product-description ${descriptionExpand ? 'expand' : ''}`}
        >
          <div className="product-description__title">Chi tiết sản phẩm</div>
          <div
            className="product-description__content"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></div>
          <div className="product-description__toggle">
            <Button
              size="sm"
              onClick={() => setDescriptionExpand(!descriptionExpand)}
            >
              {descriptionExpand ? 'Thu gọn' : 'Xem thêm'}
            </Button>
          </div>
        </div>
      </div>
      <div className="product__info">
        <h1 className="product__info__title">{product.name}</h1>
        <div className="product__info__item">
          <span className="product__info__item__price">
            {product.price.toLocaleString()}
          </span>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Số lượng</div>
          <div className="product__info__item__quantity">
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity('minus')}
            >
              <i className="bx bx-minus"></i>
            </div>
            <div className="product__info__item__quantity__input">
              {quantity}
            </div>
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity('plus')}
            >
              <i className="bx bx-plus"></i>
            </div>
          </div>
        </div>
        <div className="product__info__item">
          <Button onClick={() => addToCart()}>thêm vào giỏ</Button>
          <Button onClick={() => goToCart()}>mua ngay</Button>
          <div className="rating__info__item__title">
            <h2>Đánh giá </h2>
            <div style={styles.stars}>
              {stars.map((_, index) => {
                return (
                  <FaStar
                    key={index}
                    size={24}
                    style={{
                      marginRight: 10,
                      cursor: 'pointer',
                    }}
                    color={
                      (hoverValue || currentStarValue) > index
                        ? colors.orange
                        : colors.grey
                    }
                    onClick={() => handleClickRating(index + 1)}
                    onMouseOver={() => handleMouseHover(index + 1)}
                    onMouseLeave={() => handleMouseLeave()}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`product-description mobile ${
          descriptionExpand ? 'expand' : ''
        }`}
      >
        <div className="product-description__title">Chi tiết sản phẩm</div>
        <div
          className="product-description__content"
          dangerouslySetInnerHTML={{ __html: product.description }}
        ></div>
        <div className="product-description__toggle">
          <Button
            size="sm"
            onClick={() => setDescriptionExpand(!descriptionExpand)}
          >
            {descriptionExpand ? 'Thu gọn' : 'Xem thêm'}
          </Button>
        </div>
      </div>
      <PopUp
        // title="Đăng nhập"
        isTitle="false"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <Login
          setToken={setToken}
          setOpenPopup={setOpenPopup}
          urlDestination="/cart"
        />
      </PopUp>

      <PopUp
        // title="Đăng nhập"
        isTitle="false"
        openPopup={openPopup2}
        setOpenPopup={setOpenPopup2}
      >
        <Login
          setToken={setToken}
          setOpenPopup={setOpenPopup}
          urlDestination={location.pathname}
        />
      </PopUp>
    </div>
  );
};

ProductView.propTypes = {
  product: PropTypes.object,
};

export default withRouter(ProductView);
