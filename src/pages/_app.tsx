import  Head  from 'next/head'
import Layout from '../components/Layout'
import { CartProvider } from '../context/CartContext'

import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return(
    <CartProvider>
      <Head>
        <title>Corebiz</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  ) 
}

export default MyApp
