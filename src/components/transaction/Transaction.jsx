import React, { useState, useEffect } from 'react';
import './transaction.css';
import apiCaller from '../../utils/apiCaller';
import numberWithCommas from '../../utils/numberWithCommas';

const Transaction = () => {
  const [transactions, setTransactions] = useState(null);
  useEffect(async () => {
    let profile = localStorage.getItem('profile');
    let access_jwt_token = JSON.parse(profile)?.access_jwt_token;
    await apiCaller('api/transaction/history', 'get', null, {
      authorization: access_jwt_token,
    }).then((res) => {
      // console.log('data transaction', res.data);
      setTransactions(res.data);
    });
  }, []);

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
            <div className="transaction__all-order">Tất cả đơn</div>
            <div className="transaction__shipping-order">Chưa giao</div>
            <div className="transaction__shipped-order">Đã giao</div>
          </div>
          {transactions.map((transaction, index) => {
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
                      <div className="item-layout__product-image">
                        <span class="item-layout__product-quantity">
                          x{item.quantity}
                        </span>
                      </div>
                      <div class="product-info">
                        <p class="product-name">Không xác định</p>
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
                    <div class="transaction__item-footer__title">
                      Tổng tiền:
                    </div>
                    <div class="transaction__item-footer__total">
                      {numberWithCommas(transaction.price_total)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default Transaction;
