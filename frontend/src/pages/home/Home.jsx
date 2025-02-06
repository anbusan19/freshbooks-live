import React from 'react'
import Banner from './Banner'
import TopSellers from './TopSellers'
import Features from './Features'
import BannerCarousel from './BannerCarousel'

const Home = () => {
  return (
    <>
        <Banner/>
        <TopSellers/>
        <BannerCarousel />
        <Features/>
    </>
  )
}

export default Home