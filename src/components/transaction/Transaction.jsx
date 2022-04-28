import React, { useState, useEffect } from 'react';
import './transaction.css';
import apiCaller from '../../utils/apiCaller';
import numberWithCommas from '../../utils/numberWithCommas';

const Transaction = () => {
  const [transactions, setTransactions] = useState(null);
  const [books, setBooks] = useState([]);
  const [tab, setTab] = useState(1);
  useEffect(async () => {
    let profile = localStorage.getItem('profile');
    let access_jwt_token = JSON.parse(profile)?.access_jwt_token;
    await apiCaller('api/transaction/history', 'get', null, {
      authorization: access_jwt_token,
    }).then(async (res) => {
      console.log('data transaction', res.data);
      setTransactions(res.data);
      // let transaction = new Promise(function (resolve, reject) {
      //   resolve(res.data.transaction_detail);
      // });
      // const detailBooks = await transaction;
      // console.log(detailBooks);
      res.data.map(async (item, index) => {
        item.transaction_detail.map(async (detail, index) => {
          await apiCaller(`api/book/${detail.book_id}`, 'get', null).then(
            (res) => {
              setBooks((prevBook) => ({
                ...prevBook,
                [res.data.id]: {
                  name: res.data.name,
                  image_url: res.data.image_url,
                },
              }));
            },
          );
        });
      });
    });
  }, []);

  const handleActiveClass = (e) => {
    var elems = document.querySelectorAll('.active-transaction');
    [].forEach.call(elems, function (el) {
      el.classList.remove('active-transaction');
    });
    e.target.className = 'active-transaction';
  };

  const handleDisplayTransaction = (type) => {
    return transactions
      .filter((item) => item.status == type)
      .map((transaction, index) => {
        console.log('index');
        return (
          <div className="transaction__item-layout">
            <div className="item-layout__header">
              <span className="item-layout__header-tittle">
                {transaction.status == 1 ? 'Đã giao' : 'Chưa giao'}
              </span>
              <br></br>
              <span>Mã đơn: {transaction.id}</span>
            </div>
            {transaction.transaction_detail.map((item, index) => (
              <div className="transaction__item-details">
                <div className="item-layout__body-detail">
                  <div
                    className="item-layout__product-image"
                    style={{
                      backgroundImage: `url("${
                        books[item.book_id]?.image_url
                      }")`,
                    }}
                  >
                    <span class="item-layout__product-quantity">
                      x{item.quantity}
                    </span>
                  </div>
                  <div class="product-info">
                    <p class="product-name">{books[item.book_id]?.name}</p>
                    <div class="store">
                      <span class="store-info__name">ToLiShop</span>
                    </div>
                  </div>
                </div>
                <div class="transaction__item-price">
                  <span>{numberWithCommas(item.price_total)}</span>
                </div>
              </div>
            ))}

            <div className="transaction__item-footer">
              <div class="transaction__item-footer__total-money">
                <div class="transaction__item-footer__title">Tổng tiền:</div>
                <div class="transaction__item-footer__total">
                  {numberWithCommas(transaction.price_total)}
                </div>
              </div>
            </div>
          </div>
        );
      });
  };

  const handleDisplayTab = () => {
    switch (tab) {
      case 1:
        return transactions.map((transaction, index) => {
          console.log('index');
          return (
            <div className="transaction__item-layout">
              <div className="item-layout__header">
                <span className="item-layout__header-tittle">
                  {transaction.status == 1 ? 'Đã giao' : 'Chưa giao'}
                </span>
                <br></br>
                <span>Mã đơn: {transaction.id}</span>
              </div>
              {transaction.transaction_detail.map((item, index) => (
                <div className="transaction__item-details">
                  <div className="item-layout__body-detail">
                    <div
                      className="item-layout__product-image"
                      style={{
                        backgroundImage: `url("${
                          books[item.book_id]?.image_url
                        }")`,
                      }}
                    >
                      <span class="item-layout__product-quantity">
                        x{item.quantity}
                      </span>
                    </div>
                    <div class="product-info">
                      <p class="product-name">{books[item.book_id]?.name}</p>
                      <div class="store">
                        <span class="store-info__name">ToLiShop</span>
                      </div>
                    </div>
                  </div>
                  <div class="transaction__item-price">
                    <span>{numberWithCommas(item.price_total)}</span>
                  </div>
                </div>
              ))}

              <div className="transaction__item-footer">
                <div class="transaction__item-footer__total-money">
                  <div class="transaction__item-footer__title">Tổng tiền:</div>
                  <div class="transaction__item-footer__total">
                    {numberWithCommas(transaction.price_total)}
                  </div>
                </div>
              </div>
            </div>
          );
        });
        break;
      case 2:
        return handleDisplayTransaction(0);
        break;

      case 3:
        return handleDisplayTransaction(1);
        break;
    }
  };

  const testTabAgain = () => {
    return 'hello';
  };

  // useEffect(() => {
  //   console.log('bookk is', books);
  // }, [books]);

  //   const getBookName = async (id) => {
  //     let name = 'abc';
  //     await apiCaller(`api/book/${id}`, 'get', null).then((res) => {
  //       name = res.data.name;
  //       console.log('res data name', res.data.name);
  //     });
  //     return name;

  //     // return 'abc';
  //   };
  return (
    transactions && (
      <div>
        <div className="transaction-container">
          <h3 className="tittle__heading">Đơn hàng của tôi</h3>
          <div className="transaction-container__tab">
            <div
              className="transaction__all-order active-transaction"
              onClick={(e) => {
                setTab(1);
                handleActiveClass(e);
              }}
            >
              Tất cả đơn
            </div>
            <div
              className="transaction__shipping-order"
              onClick={(e) => {
                setTab(2);
                handleActiveClass(e);
              }}
            >
              Chưa giao
            </div>
            <div
              className="transaction__shipped-order"
              onClick={(e) => {
                setTab(3);
                handleActiveClass(e);
              }}
            >
              Đã giao
            </div>
          </div>
          {handleDisplayTab()}
        </div>
      </div>
    )
  );
};

export default Transaction;
