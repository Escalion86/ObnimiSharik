import Block from '@components/Block'
import MainLayout from '@components/MainLayout'
import Link from 'next/link'
// const background = require('../public/img/bg.jpg')
import Title from '@components/Title'
import HorizontalSeparator from '@components/HorizontalSeparator'
import Card from '@components/Card'
import BlockOfCards from '@components/BlockOfCards'
import { motion } from 'framer-motion'
import useWindowDimensions from '@helpers/useWindowDimensions'
import Button from '@components/Button'
import SpecialCard from '@components/SpecialCard'
import InfoItem from '@components/InfoItem'
import DeliveryPriceItem from '@components/DeliveryPriceItem'

import TitleBlock2 from '@blocks/TitleBlock2'
import SpecialBlock from '@blocks/SpecialBlock'
import WhyWeBlock from '@blocks/WhyWeBlock'
import DeliveryBlock from '@blocks/DeliveryBlock'
// let csvToJson = require('convert-csv-to-json')
// const csvFilePath='tilda.csv'
// const csv=require('csvtojson')
// const request=require('request')

import { catalogData, setsData } from '@utils/temp_db'

import dbConnect from '@utils/dbConnect'
import Balloons from '@models/Balloons'
import Types from '@models/Types'
import Sets from '@models/Sets'

import { signIn, signOut, useSession } from 'next-auth/client'

// import csv from '../tilda.csv'

// const csvToJsonFunc = () => {
//   csv()
// // .fromFile(csvFilePath)
// .fromStream(request.get('https://store.tilda.cc/store/export/?task=922544378201'))
// .then((jsonObj)=>{
//     console.log(jsonObj);
//     /**
//      * [
//      * 	{a:"1", b:"2", c:"3"},
//      * 	{a:"4", b:"5". c:"6"}
//      * ]
//      */
// })
//   // const json = csvToJson.formatValueByType().getJsonFromCsv('tilda.csv')
//   // console.log(`json`, js`on)
// }

export default function Home({ balloons, sets, types }) {
  const { height, width } = useWindowDimensions()
  const [session, loading] = useSession()

  // if (session) console.log(`session`, session)

  // console.log(`balloons`, balloons)

  return (
    <MainLayout title="Обними шарик - Главная">
      <div
        className="flex flex-col bg-white"
        style={{
          backgroundImage: `url('img/bg.jpg')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top',
          // backgroundSize: 'cover',
          width: '100%',
          height: '1120px',
        }}
      >
        <div className="w-full h-20" />
        <div className="w-full h-40 pt-20">
          <Link href="/new">
            <a>Add Baloon</a>
          </Link>
        </div>
        {/* <div className="absolute bottom-0 w-full bg-white h-80" /> */}
        <div className="z-10 w-full mt-40">
          <TitleBlock2 />
          {/* <SpecialBlock /> */}
          <div className="bg-white">
            <Block>
              <BlockOfCards
                title="Каталог шаров"
                data={catalogData}
                columnsCount={4}
              />
              <BlockOfCards
                title="Готовые наборы"
                data={setsData}
                columnsCount={3}
              />
            </Block>
          </div>
          <WhyWeBlock />
          <DeliveryBlock />
        </div>
      </div>
    </MainLayout>
  )
}

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()

  let result = await Types.find({})
  const types = result.map((doc) => {
    const type = doc.toObject()
    type._id = type._id.toString()
    return type
  })

  result = await Sets.find({})
  const sets = result.map((doc) => {
    const set = doc.toObject()
    set._id = set._id.toString()
    return set
  })

  /* find all the data in our database */
  result = await Balloons.find({})
  const balloons = result.map((doc) => {
    const baloon = doc.toObject()
    baloon._id = baloon._id.toString()
    return baloon
  })

  return { props: { balloons: balloons, types: types, sets: sets } }
}
