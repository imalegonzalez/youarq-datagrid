'use client'
import GridDatos from "@components/GridDatos"
import {NextUIProvider} from '@nextui-org/react'


const Home = () => {
  return (
    <NextUIProvider>
      <section className="w-full flex-center flex-col">
        <GridDatos />
      </section>
    </NextUIProvider>
  )
}

export default Home
