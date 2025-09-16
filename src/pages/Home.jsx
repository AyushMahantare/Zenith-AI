import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AiTools from '../components/AiTools'
import Testimonial from '../components/Testimonial'
import FeatureShowcase from '../components/FeatureShowcase'
import Plan from '../components/Plan'
import Footer from '../components/Footer'

const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <AiTools />
            <Testimonial />
            <FeatureShowcase />
            <Plan />
            <Footer />
        </>
    )
}

export default Home