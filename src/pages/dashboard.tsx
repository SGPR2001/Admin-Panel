
// import React, { useState } from 'react'
// import type { ReactElement } from 'react'
// import LayoutAuthenticated from '../layouts/Authenticated'
// import SectionMain from '../components/SectionMain'


// const Dashboard = () => {
  
 
 

//   return (
//     <>
      
//       <SectionMain>
        

       

       
        
//       </SectionMain>
//     </>
//   )
// }

// Dashboard.getLayout = function getLayout(page: ReactElement) {
//   return <LayoutAuthenticated>{page}</LayoutAuthenticated>
// }

// export default Dashboard
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/SectionMain'

const Dashboard = () => {
  
 const router = useRouter()
 const currentPath = router.pathname
//  console.log(currentPath)

  return (
    <>
      <SectionMain>
        {/* Your UI code
        <p>OAuth2 Token: {oauth2Token}</p> */}
      </SectionMain>
    </>
  )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default Dashboard

