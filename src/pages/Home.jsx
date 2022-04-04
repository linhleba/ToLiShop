import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Helmet from '../components/Helmet';
import HeroSlider from '../components/HeroSlider';
import Section, { SectionTitle, SectionBody } from '../components/Section';
import PolicyCard from '../components/PolicyCard';
import Grid from '../components/Grid';
import ProductCard from '../components/ProductCard';

import heroSliderData from '../assets/fake-data/hero-slider';
import policy from '../assets/fake-data/policy';
import productData from '../assets/fake-data/products';

import banner from '../assets/images/banner.png';
import * as api from '../api/index';

const Home = () => {
  const getProducts = (products, count) => {
    const max = products.length - count;
    const min = 0;
    const start = Math.floor(Math.random() * (max - min) + min);
    return products.slice(start, start + count);
  };
  const [books, setBooks] = useState([]);
  useEffect(async () => {
    const res = await api.getBook();
    // console.log(res);
    setBooks(res.data);
    console.log('books is', books);
  }, []);
  return (
    <Helmet title="Trang chủ">
      {/* hero slider */}
      <HeroSlider
        data={heroSliderData}
        control={true}
        auto={false}
        timeOut={5000}
      />
      {/* end hero slider */}

      {/* policy section */}
      <Section>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {policy.map((item, index) => (
              <Link key={index} to="/policy">
                <PolicyCard
                  name={item.name}
                  description={item.description}
                  icon={item.icon}
                />
              </Link>
            ))}
          </Grid>
        </SectionBody>
      </Section>
      {/* end policy section */}

      {/* best selling section */}
      <Section>
        <SectionTitle>top sản phẩm bán chạy trong tuần</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {getProducts(books, 4).map((item, index) => (
              <ProductCard
                key={index}
                img01={item.image_url}
                img02={item.image_url}
                name={item.name}
                price={Number(item.price)}
                slug={item.id}
              />
            ))}
          </Grid>
        </SectionBody>
      </Section>
      {/* end best selling section */}

      {/* new arrival section */}
      <Section>
        <SectionTitle>sản phẩm mới</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {getProducts(books, 8).map((item, index) => (
              <ProductCard
                key={index}
                img01={item.image_url}
                img02={item.image_url}
                name={item.name}
                price={Number(item.price)}
                slug={item.id}
              />
            ))}
          </Grid>
        </SectionBody>
      </Section>
      {/* end new arrival section */}

      {/* banner */}
      {/* <Section>
        <SectionBody>
          <Link to="/catalog">
            <img src={banner} alt="" />
          </Link>
        </SectionBody>
      </Section> */}
      {/* end banner */}

      {/* popular product section */}
      <Section>
        <SectionTitle>phổ biến</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {getProducts(books, 12).map((item, index) => (
              <ProductCard
                key={index}
                img01={item.image_url}
                img02={item.image_url}
                name={item.name}
                price={Number(item.price)}
                slug={item.id}
              />
            ))}
          </Grid>
        </SectionBody>
      </Section>
      {/* end popular product section */}
    </Helmet>
  );
};

export default Home;
