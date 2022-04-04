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
  console.log('slug is', props.match.params.slug);

  useEffect(() => {
    apiCaller(`api/book/${props.match.params.slug}`, 'get').then((res) => {
      setProducts(res.data);
    });
  }, []);
  //   console.log(result);

  const relatedProducts = productData.getProducts(8);

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
        <SectionTitle>Khám phá thêm</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {relatedProducts.map((item, index) => (
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
