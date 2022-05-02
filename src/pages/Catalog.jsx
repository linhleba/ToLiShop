import React, { useCallback, useState, useEffect, useRef } from 'react';

import Helmet from '../components/Helmet';
import CheckBox from '../components/CheckBox';

import productData from '../assets/fake-data/products';
// import category from '../assets/fake-data/category';
import colors from '../assets/fake-data/product-color';
import size from '../assets/fake-data/product-size';
import Button from '../components/Button';
import InfinityList from '../components/InfinityList';
import * as api from '../api/index';
import apiCaller from '../utils/apiCaller';

const Catalog = () => {
  const initFilter = {
    category: [],
    author: [],
  };
  const [category, setCategory] = useState([]);
  const [author, setAuthor] = useState([]);

  const [limitCategory, setLimitCategory] = useState(5);

  const [limitAuthor, setLimitAuthor] = useState(5);
  useEffect(() => {
    apiCaller('api/category').then((res) => {
      setCategory(res.data);
    });
    apiCaller('api/author').then((res) => {
      setAuthor(res.data);
    });
  }, []);

  // const productList = productData.getAllProducts();

  const [products, setProducts] = useState(null);

  const [filter, setFilter] = useState(initFilter);

  useEffect(async () => {
    const res = await api.getBook();
    setProducts(res.data);
  }, []);

  const filterSelect = (type, checked, item) => {
    console.log('item la', item);
    if (checked) {
      switch (type) {
        case 'CATEGORY':
          setFilter({
            ...filter,
            category: [...filter.category, item],
          });
          break;

        case 'AUTHOR':
          setFilter({
            ...filter,
            author: [...filter.author, item],
          });
          break;
        default:
      }
    } else {
      switch (type) {
        case 'CATEGORY':
          const newCategory = filter.category.filter((e) => e !== item);
          setFilter({ ...filter, category: newCategory });
          break;
        case 'AUTHOR':
          const newAuthor = filter.author.filter((e) => e !== item);
          setFilter({ ...filter, author: newAuthor });
          break;
        default:
      }
    }
  };

  const clearFilter = () => setFilter(initFilter);

  const updateProducts = useCallback(async () => {
    // let temp = productList;

    // if (filter.category.length > 0) {
    //   temp = temp.filter((e) => filter.category.includes(e.categorySlug));
    // }

    // if (filter.color.length > 0) {
    //   temp = temp.filter((e) => {
    //     const check = e.colors.find((color) => filter.color.includes(color));
    //     return check !== undefined;
    //   });
    // }

    // if (filter.size.length > 0) {
    //   temp = temp.filter((e) => {
    //     const check = e.size.find((size) => filter.size.includes(size));
    //     return check !== undefined;
    //   });
    // }

    if (filter.category.length > 0) {
      // console.log(filter.category[0]);
      let temp = [];

      console.log('filter', filter.category);

      // setProducts([]);
      await Promise.all(
        filter.category.map(async (item) => {
          // console.log('item id la:', item);
          await apiCaller(`api/book/filterCategory/${item.id}`).then((res) => {
            console.log(res);
            // temp.push(res?.data);
            setProducts(res?.data);
          });
        }),
      ).catch((err) => console.error(err));

      console.log('temp la:', temp);

      // setProducts(temp);
      console.log('update product', products);
    } else {
      console.log('vao day');
      const res = await api.getBook();
      setProducts(res.data);
    }

    // setProducts(temp);
  }, [filter]);

  useEffect(() => {
    updateProducts();
  }, [updateProducts]);

  const filterRef = useRef(null);

  const showHideFilter = () => filterRef.current.classList.toggle('active');

  return (
    <Helmet title="Sản phẩm">
      <div className="catalog">
        <div className="catalog__filter" ref={filterRef}>
          <div
            className="catalog__filter__close"
            onClick={() => showHideFilter()}
          >
            <i className="bx bx-left-arrow-alt"></i>
          </div>
          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">
              danh mục sản phẩm
            </div>
            <div className="catalog__filter__widget__content">
              {category.slice(0, limitCategory).map((item, index) => (
                <div
                  key={index}
                  className="catalog__filter__widget__content__item"
                >
                  <CheckBox
                    label={item.name}
                    onChange={(input) =>
                      filterSelect('CATEGORY', input.checked, item)
                    }
                    checked={filter.category.includes(item)}
                  />
                </div>
              ))}
            </div>
            <Button
              size="sm"
              onClick={() => {
                setLimitCategory((prevLimit) => prevLimit + 5);
              }}
            >
              Xem thêm
            </Button>
          </div>

          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">
              Danh mục tác giả
            </div>
            <div className="catalog__filter__widget__content">
              {author.slice(0, limitAuthor).map((item, index) => (
                <div
                  key={index}
                  className="catalog__filter__widget__content__item"
                >
                  <CheckBox
                    label={item.name}
                    onChange={(input) =>
                      filterSelect('AUTHOR', input.checked, item)
                    }
                    checked={filter.author.includes(item)}
                  />
                </div>
              ))}
            </div>
            <Button
              size="sm"
              onClick={() => {
                setLimitAuthor((prevLimit) => prevLimit + 5);
              }}
            >
              Xem thêm
            </Button>
          </div>

          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__content">
              <Button size="sm" onClick={clearFilter}>
                xóa bộ lọc
              </Button>
            </div>
          </div>
        </div>
        <div className="catalog__filter__toggle">
          <Button size="sm" onClick={() => showHideFilter()}>
            bộ lọc
          </Button>
        </div>
        <div className="catalog__content">
          {products && <InfinityList data={products} />}
        </div>
      </div>
    </Helmet>
  );
};

export default Catalog;
