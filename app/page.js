"use client"

import Reviews from '@/components/Reviews'
import { Hero, Gallery, FeaturedProducts} from '../components/index'

export default function Home() {
const user = 'John'
const age = 7

  return (
    <section className="md:w-[100vw] max-sm:w-screen">
      <Hero />
      <Reviews />
      <Gallery />
      <FeaturedProducts />
    </section>
  )
}