import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore, {Autoplay, Pagination, Navigation} from 'swiper'
import styles from '../styles/pages/index.module.scss'
import Card from '../components/Card';
import { GetStaticProps } from 'next';
import api from '../services/api';
import { useState } from 'react';
import useWindowDimensions from '../hook/useDimensions';

type Product = {
  productName: string,
  imageUrl: string,
  stars: number,
  listPrice: number,
  price: number,
  installments: {
    quantity: number,
    value: number,
  },
}

type HomeProps = {
  products: Product[],
}

SwiperCore.use([Pagination, Autoplay, Navigation]);

export default function Home({products}: HomeProps) {

  const {width} = useWindowDimensions()

  return (
    <div className={styles.container}>
      <section>
        <Swiper
          slidesPerView={1}   
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}  
          pagination={{ clickable: true }}
          >
          <SwiperSlide>
            <div className={styles.bannerContainer}>
              <span>
                <div className={styles.desktop}>
                  <img src="/banner-black.svg" alt="" />
                </div>
                <img src="/banner1.png" alt="" />
              </span>
              <div className={styles.contentBanner}>
                <p>Olá, oque você está buscando?</p>
                <h3>Criar ou migrar seu e-commerce?</h3>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.bannerContainer}>
              <span>
                <div className={styles.desktop}>
                  <img src="/banner-black.svg" alt="" />
                </div>
                <img src="/banner1.png" alt="" />
              </span>
              <div className={styles.contentBanner}>
                <p>Olá, oque você está buscando?</p>
                <h3>Criar ou migrar seu e-commerce?</h3>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      <section className={styles.productContainer}>
          <h2>Mais Vendidos</h2>
          <hr />

          <Swiper
            slidesPerView={width < 1024 ? 2 : 4}
            spaceBetween={18}
            navigation={width > 1024}
            pagination={{ clickable: true }}
            className={styles.swiperProduct}
          >
            {products.map(product => {
              return (
                <SwiperSlide>
                  <Card data={product} />
                </SwiperSlide>
              )
            })}
          </Swiper>
      </section>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {

  const {data} = await api.get('/products')

  function handleCurrentValue(value) {
    if (!value) {
      return null
    }

    return [value.toString().slice(0, -2), value.toString().slice(-2)].join(',')
  }

  const products = data.map(item=> {
    return {
      productName: item.productName,
      imageUrl: item.imageUrl,
      stars: item.stars,
      listPrice: handleCurrentValue(item.listPrice),
      price: handleCurrentValue(item.price),
      installments: item.installments.map(installment => {
        return {
          quantity: installment.quantity,
          value: handleCurrentValue(installment.value),
        }
      })
    }
  }) 
  return {
    props: {
      products: products
    }
  }
}
