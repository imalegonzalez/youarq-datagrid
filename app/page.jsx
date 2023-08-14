'use client'
import GridDatos from "@components/GridDatos"
import {NextUIProvider} from '@nextui-org/react'


const Home = () => {
  return (
    <NextUIProvider>
      <section className="lg:w-full lg:flex-center lg:flex-col">
        <GridDatos />
      </section>
    </NextUIProvider>
  )
}

export default Home
