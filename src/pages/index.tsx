// import Head from 'next/head'
// import Image from 'next/image'
// import { useRouter } from 'next/router'
// import React, { ReactElement } from 'react'
// import CardBox from '../components/CardBox'
// import LayoutGuest from '../layouts/Guest'
// import SectionMain from '../components/SectionMain'
// import { StyleKey } from '../interfaces'
// import { gradientBgPurplePink } from '../colors' 
// import { appTitle } from '../config'
// import { useAppDispatch } from '../stores/hooks'
// import { setDarkMode, setStyle } from '../stores/styleSlice'

// const StyleSelect = () => {
//   const dispatch = useAppDispatch()

//   dispatch(setDarkMode(false))

//   const styles: StyleKey[] = ['white', 'basic']
 
//   const router = useRouter()

//   const handleStylePick = (e: React.MouseEvent, style: StyleKey) => {
//     e.preventDefault()

//     dispatch(setStyle(style))

//     // router.push('http://3.13.92.74:30006/authentication/login')
//     router.push('/login')
//   }

//   return (
//     <>
      
//       <Head>
//         <title>{appTitle}</title>
//       </Head>
//       <div className={`flex min-h-screen items-center justify-center ${gradientBgPurplePink}`}>
//         <SectionMain>
//           <h1 className="text-4xl md:text-5xl text-center text-white font-bold mt-12 mb-3 lg:mt-0">
//             Pick a style&hellip;
//           </h1>
//           <h2 className="text-xl md:text-xl text-center text-white mb-12">
//             Style switching with a single{' '}
//             <code className="px-1.5 py-0.5 rounded bg-white bg-opacity-20">action()</code>
//           </h2>
//           <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 px-6 max-w-6xl mx-auto">
//             {styles.map((style) => (
//               <CardBox
//                 key={style}
//                 className="cursor-pointer bg-gray-50"
//                 isHoverable
//                 onClick={(e) => handleStylePick(e, style)}
//               >
//                 <div className="mb-3 md:mb-6">
//                   <Image
//                     src={`https://static.justboil.me/templates/one/small/${style}-v3.png`}
//                     width={1280}
//                     height={720}
//                     alt={style}
//                   />
//                 </div>
//                 <h1 className="text-xl md:text-2xl font-black capitalize">{style}</h1>
//                 <h2 className="text-lg md:text-xl">& Dark mode</h2>
//               </CardBox>
//             ))}
//           </div>
//         </SectionMain>
//       </div>
//     </>
//   )
// }

// StyleSelect.getLayout = function getLayout(page: ReactElement) {
//   return <LayoutGuest>{page}</LayoutGuest>
// }

// export default StyleSelect
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import LayoutGuest from '../layouts/Guest'

import { useAppDispatch } from '../stores/hooks'
import { setDarkMode } from '../stores/styleSlice'

import pic from '../logo.png'
const StyleSelect = () => {
  const dispatch = useAppDispatch()

  dispatch(setDarkMode(false))

  const router = useRouter()

  function handleClick() {
    //  router.push('https://api-stage.lybl.com/gateway/authentication/user/login?client=ADMIN_PORTAL')

    router.push('/dashboard')
  }
  

   

 

  return (
    <>
     
      <div className="flex h-screen">
        <div className="w-full bg-green-300">
          <Image
            src={pic}
            alt="Your Image"
            style={{ paddingTop: '100px', paddingLeft: '200px', height: '550px', width: '800px' }}
          />
        </div>
        <div
          className="w-1/2 flex items-center "
          style={{ flexDirection: 'column', background: 'lightgray' }}
        >
          <h1
            style={{ paddingTop: '340px', paddingBottom: '20px', fontSize: '30px', color: 'green' }}
          >
            Welcome To Admin Portal
          </h1>
          <button
            onClick={handleClick}
            className="px-4 py-2 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600"
          >
            Login
          </button>
        </div>
      </div>

      
    </>
  )
}

StyleSelect.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>
}

export default StyleSelect
