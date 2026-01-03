import React from 'react'
import Header from '../components/Header'
import Staps from '../components/Staps'
import Description from '../components/Description'
import Testimonials from '../components/Testimonials'
import GeneratorBtn from '../components/GeneratorBtn'

const Home = () => {
  return (
    <div>
      <Header/>
      <Staps/>
      <Description/>
      <Testimonials/>
      <GeneratorBtn/>
    </div>
  )
}

export default Home
