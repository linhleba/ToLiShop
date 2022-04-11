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
    color: [],
    size: [],
  };
  const [category, setCategory] = useState([]);
  useEffect(() => {
    apiCaller('api/category').then((res) => {
      setCategory(res.data);
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
        // case 'COLOR':
        //   setFilter({ ...filter, color: [...filter.color, item.color] });
        //   break;
        // case 'SIZE':
        //   setFilter({ ...filter, size: [...filter.size, item.size] });
        //   break;
        default:
      }
    } else {
      switch (type) {
        case 'CATEGORY':
          const newCategory = filter.category.filter((e) => e !== item);
          setFilter({ ...filter, category: newCategory });
          break;
        // case 'COLOR':
        //   const newColor = filter.color.filter((e) => e !== item.color);
        //   setFilter({ ...filter, color: newColor });
        //   break;
        // case 'SIZE':
        //   const newSize = filter.size.filter((e) => e !== item.size);
        //   setFilter({ ...filter, size: newSize });
        //   break;
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
              {category.map((item, index) => (
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
          </div>

          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">màu sắc</div>
            <div className="catalog__filter__widget__content">
              {colors.map((item, index) => (
                <div
                  key={index}
                  className="catalog__filter__widget__content__item"
                >
                  <CheckBox
                    label={item.display}
                    onChange={(input) =>
                      filterSelect('COLOR', input.checked, item)
                    }
                    checked={filter.color.includes(item.color)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">kích cỡ</div>
            <div className="catalog__filter__widget__content">
              {size.map((item, index) => (
                <div
                  key={index}
                  className="catalog__filter__widget__content__item"
                >
                  <CheckBox
                    label={item.display}
                    onChange={(input) =>
                      filterSelect('SIZE', input.checked, item)
                    }
                    checked={filter.size.includes(item.size)}
                  />
                </div>
              ))}
            </div>
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
