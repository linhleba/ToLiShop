import React, { useState, useEffect } from 'react';
import './payment.css';
import { useSelector } from 'react-redux';
import productData from '../../assets/fake-data/products';
import numberWithCommas from '../../utils/numberWithCommas';
import apiCaller from '../../utils/apiCaller';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../../redux/ducks/snackbar';
import { Link, useHistory } from 'react-router-dom';
import { API_URL } from '../../constants/Config';

const Payment = () => {
  let history = useHistory();

  const [info, setInfo] = useState([]);
  const [paymentOption, setPaymentOption] = useState('cash');
  useEffect(async () => {
    let profile = localStorage.getItem('profile');
    let access_jwt_token = JSON.parse(profile)?.access_jwt_token;
    await apiCaller('api/account/info', 'get', null, {
      authorization: access_jwt_token,
    }).then((res) => {
      console.log('ket qua tra ve', res);
      if (res) {
        setInfo({
          name: res.data.name ? res.data.name : 'Chưa xác định',
          address: res.data.address ? res.data.address : 'Chưa xác định',
          phone: res.data.telephone ? res.data.telephone : 'Chưa xác định',
        });
      }
    });
    // console.log('info is', info);
  }, []);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems.value);
  const [cartProducts, setCartProducts] = useState(
    productData.getCartItemsInfo(cartItems),
  );
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setCartProducts(productData.getCartItemsInfo(cartItems));
    setTotalPrice(
      cartItems.reduce(
        (total, item) => total + Number(item.quantity) * Number(item.price),
        0,
      ),
    );
    // setTotalProducts(
    //   cartItems.reduce((total, item) => total + Number(item.quantity), 0),
    // );
  }, [cartItems]);

  const handleSubmit = async () => {
    // check method payment
    let data = {
      price_total: totalPrice,
      details: [],
    };

    if (paymentOption == 'cash') {
      await cartItems.forEach((book, index) => {
        data.details.push({
          book_id: book.slug,
          quantity: book.quantity,
          price_total: book.price * book.quantity,
        });
      });
      let profile = localStorage.getItem('profile');
      let access_jwt_token = JSON.parse(profile)?.access_jwt_token;

      await apiCaller('api/transaction', 'post', data, {
        authorization: access_jwt_token,
      }).then((res) => {
        console.log(res);
        if (res.data) {
          console.log('vao day');
          dispatch(setSnackbar(true, 'success', 'Đặt hàng thành công'));
        } else {
          dispatch(setSnackbar(true, 'error', 'Đã có lỗi xảy ra'));
        }
      });
      history.push('/transaction');
    } else {
      // alert(paymentOption);
      // history.push('/order/momo');

      const dataRequest = {
        orderInfo: 'Giao dịch đặt hàng sách qua ToLiShop',
        redirectUrl: 'http://tolishop.herokuapp.com/transaction',
        amount: totalPrice,
      };

      // let transactionId;
      await apiCaller('api/momo', 'post', dataRequest).then((res) => {
        window.location.href = res.data.url;
        console.log('res is', res);

        // Transaction id momo
        data.id = res.data.orderId;
      });

      await cartItems.forEach((book, index) => {
        data.details.push({
          book_id: book.slug,
          quantity: book.quantity,
          price_total: book.price * book.quantity,
        });
      });
      let profile = localStorage.getItem('profile');
      let access_jwt_token = JSON.parse(profile)?.access_jwt_token;

      await apiCaller('api/transaction/createMomo', 'post', data, {
        authorization: access_jwt_token,
      }).then((res) => {
        console.log(res);
        if (res.data) {
          console.log('vao day');
          dispatch(setSnackbar(true, 'success', 'Đặt hàng thành công'));
        } else {
          dispatch(setSnackbar(true, 'error', 'Đã có lỗi xảy ra'));
        }
      });

      //  await apiCaller('api/transaction', 'post', data, {
      //    authorization: access_jwt_token,
      //  }).then((res) => {
      //    console.log(res);
      //    if (res.data) {
      //      console.log('vao day');
      //      dispatch(setSnackbar(true, 'success', 'Đặt hàng thành công'));
      //    } else {
      //      dispatch(setSnackbar(true, 'error', 'Đã có lỗi xảy ra'));
      //    }
      //  });
    }
  };
  return (
    <div className="payment-container">
      <div className="left-container">
        <div className="ship-method">
          <h2 className="payment__header"> 1.Hình thức giao hàng</h2>
          <div className="border-box">
            <div className="method-inner">
              <div>
                <label class="styles__StyledRadio-sc-1y2j2ih-0 jsTqCl">
                  <input
                    type="radio"
                    data-view-id="checkout.shipping_method_select"
                    data-view-index="11"
                    readonly=""
                    name="shipping-methods"
                    value="11"
                    checked="true"
                  />
                  {/* <span class="radio-fake"></span> */}
                  <span class="label">
                    <div>
                      {/* <span class="method-name">
                        <img
                          src="https://salt.tikicdn.com/ts/upload/2a/47/46/0e038f5927f3af308b4500e5b243bcf6.png"
                          width="56"
                          alt="TikiFast"
                        />
                        <span> Giao Tiết Kiệm </span>
                      </span> */}
                      <span class="shipping-badge-option">
                        {/* -86K */}
                        <img
                          class="info-banner__freeship-icon"
                          width="76"
                          height="12"
                          alt="icon"
                          src="https://salt.tikicdn.com/ts/upload/3d/e3/de/2c71b5485f7335d41cb3c06198035fe3.png"
                        />
                      </span>
                      <div class="method-description">
                        Có {cartItems.length} sản phẩm hỗ trợ hình thức này
                      </div>
                    </div>
                  </span>
                </label>
              </div>
              {/* <img
                class="method-inner__arrow"
                src="https://salt.tikicdn.com/ts/upload/05/9e/d8/f13e86df128f19d197397e44924f9616.png"
                width="32"
                height="12"
              ></img> */}
            </div>
            <div className="list-item border-box">
              <div className="list-item-left">
                <div className="item-cart__list">
                  <ul className="cart__list-product">
                    {cartProducts.map((item, index) => (
                      <div className="cart__list-product-container">
                        <li className="cart__list-product-item">
                          <div className="cart__list-proudct__wrap">
                            <img
                              className="product__image"
                              src={item.image_url}
                            />
                          </div>
                          <div className="cart__list-product__inner">
                            <p className="cart__list-product__name">
                              {item.name}
                            </p>
                            <div className="cart__list-product__action">
                              <span className="product__qty">
                                Số lượng: {item.quantity}
                              </span>
                              <span className="product__price">
                                {numberWithCommas(item.price * item.quantity)}
                              </span>
                            </div>
                          </div>
                        </li>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="list-item-right">
                <div className="list-item-right__heading">
                  <div className="list-item-right__heading__sub">
                    <span class="heading__est-time">
                      Giao vào Thứ Bảy, 23/04
                    </span>

                    <span class="heading__fulfil">
                      Được giao bởi ToLiShop (Hồ Chí Minh)
                    </span>
                  </div>
                  <div class="heading__shipping-fee">
                    <div class="heading__shipping-fee--no-fee">Miễn phí</div>
                    <div class="heading__shipping-fee--has-strike">21.000₫</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="payment-method">
          <h2 className="payment__header">2. Phương thức thanh toán</h2>
          <div className="border-box">
            <ul>
              <li class="styles__StyledMethod-sc-1u5r3pb-2 cHcpqx">
                <label class="styles__StyledRadio-sc-1y2j2ih-0 jsTqCl">
                  <input
                    type="radio"
                    data-view-id="checkout.payment_method_select"
                    data-view-index="cod"
                    readonly=""
                    name="payment-methods"
                    value="cash"
                    checked={paymentOption === 'cash'}
                    onChange={(e) => setPaymentOption(e.currentTarget.value)}
                  ></input>
                  {/* <span class="radio-fake"></span> */}
                  {/* <input type="radio" value="Male" name="gender" /> Male */}
                  <span class="label">
                    <div class="styles__StyledMethodLabel-sc-1u5r3pb-1 gkKrcB">
                      <img
                        class="method-icon"
                        width="32"
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-cod.svg"
                        alt="cod"
                      />
                      <div class="method-content">
                        <div class="method-content__name">
                          <span>Thanh toán tiền mặt khi nhận hàng</span>
                        </div>
                      </div>
                    </div>
                  </span>
                </label>
              </li>
              <li class="styles__StyledMethod-sc-1u5r3pb-2 cHcpqx">
                <label class="styles__StyledRadio-sc-1y2j2ih-0 jsTqCl">
                  <input
                    type="radio"
                    data-view-id="checkout.payment_method_select"
                    data-view-index="cod"
                    readonly=""
                    name="payment-methods"
                    value="momo"
                    checked={paymentOption === 'momo'}
                    onChange={(e) => setPaymentOption(e.currentTarget.value)}
                    // checked=""
                  ></input>
                  {/* <span class="radio-fake"></span> */}
                  <span class="label">
                    <div class="styles__StyledMethodLabel-sc-1u5r3pb-1 gkKrcB">
                      <img
                        class="method-icon"
                        width="32"
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-momo.svg"
                        alt="cod"
                      />
                      <div class="method-content">
                        <div class="method-content__name">
                          <span>Thanh toán bằng Momo</span>
                        </div>
                      </div>
                    </div>
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <button className="order-button" type="submit" onClick={handleSubmit}>
          ĐẶT MUA
        </button>
      </div>
      <div className="right-container">
        <div className="address">
          <h2 className="payment__header"> Địa chỉ giao hàng</h2>
          <div className="border-box">
            <div className="address-title">Thông tin giao hàng</div>
            <div className="address-info">
              <span className="address-info__name">{info.name}</span>
              <span className="address-info__street">{info.address}</span>
              <span className="address-info__phone">
                Điện thoại: +84{info.phone}
              </span>
            </div>
          </div>
        </div>
        <div className="cart-info">
          <h2 className="payment__header"> Đơn hàng</h2>
          <div className="border-box">
            <div className="address-title">
              Đơn hàng hiện có {cartProducts.length} sản phẩm
            </div>
            <div className="payment__header-cart">
              <div className="payment__cart cart__price-summary">
                <span className="total-price__cart">Tổng tiền</span>
                <span className="display-total-price__cart">
                  {numberWithCommas(Number(totalPrice))}
                </span>
              </div>
              <div className="payment__cart cart__fee-summary">
                <span className="total-price__cart">Phí vận chuyển</span>
                <span className="display-total-price__cart">Miễn phí </span>
              </div>
              <div className="payment__cart cart__discount-summary">
                <span className="total-price__cart">Giảm giá</span>
                <span className="display-total-price__cart">0 </span>
              </div>
              <div class="divide"></div>
              <div class="payment__total">
                <div class="name">Tổng tiền:</div>
                <div class="payment__total-value">
                  {numberWithCommas(Number(totalPrice))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
