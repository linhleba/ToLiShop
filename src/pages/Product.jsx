import React, { useState, useEffect } from 'react';

import Helmet from '../components/Helmet';
import Section, { SectionBody, SectionTitle } from '../components/Section';
import Grid from '../components/Grid';
import ProductCard from '../components/ProductCard';
import ProductView from '../components/ProductView';

import productData from '../assets/fake-data/products';
import * as api from '../api/index';
import apiCaller from '../utils/apiCaller';

const Product = (props) => {
  const [product, setProducts] = useState(null);
  //   const product = productData.getProductBySlug(props.match.params.slug);

  const [userId, setUserId] = useState(null);
  console.log('slug is', props.match.params.slug);

  const [recommendProductIds, setRecommendProductIds] = useState(null);

  const [recommendProducts, setRecommendProducts] = useState(null);

  useEffect(() => {
    apiCaller(`api/book/${props.match.params.slug}`, 'get').then((res) => {
      setProducts(res.data);
    });

    let profile = localStorage.getItem('profile');
    let access_jwt_token = JSON.parse(profile)?.access_jwt_token;
    apiCaller('api/account/info', 'get', null, {
      authorization: access_jwt_token,
    }).then((res) => {
      // console.log('user id is:', res.data);
      setUserId(res.data?.user_id);
    });
  }, []);

  useEffect(() => {
    apiCaller(`api/MLData/${userId}`).then((res) => {
      // console.log('data recommdnd:', res.data?.yourData?.bookIds);
      setRecommendProductIds(res.data?.yourData?.bookIds);
    });
  }, [userId]);

  useEffect(async () => {
    console.log('recommedn product:', recommendProductIds);
    if (recommendProductIds) {
      let tempArray = [];
      Promise.all(
        recommendProductIds.map(async (item) => {
          await apiCaller(`api/book/${item}`, 'get').then(async (res) => {
            console.log('gia tri cua recomend', res);
            // let dataProduct = res.data;
            await tempArray.push(res.data);
          });
        }),
      ).then(() => {
        setRecommendProducts(tempArray);
        console.log('data temparray proudct', tempArray);
      });
    }
    // console.log('data recommend proudct', recommendProducts);
  }, [recommendProductIds]);

  //   console.log(result);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet title="title of books">
      <Section>
        <SectionBody>
          {product && <ProductView product={product} />}
        </SectionBody>
      </Section>
      <Section>
        <SectionTitle>Gợi ý riêng cho bạn</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {recommendProducts &&
              recommendProducts.map((item, index) => (
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
    </Helmet>
  );
};

export default Product;
