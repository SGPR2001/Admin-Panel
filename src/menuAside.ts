
import { mdiMonitor, mdiLock, mdiTable,mdiLeaf,mdiFood,mdiMedication,mdiOil,mdiFoodDrumstick,mdiLeafCircle,mdiYoga,mdiHospital,mdiHospitalBox,mdiCow } from '@mdi/js'
import { MenuAsideItem } from './interfaces'

let menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: mdiMonitor,
    label: 'Dashboard',
  },
  {
    label: 'Questionnaire',
    icon: mdiTable,
    menu: [
      // { href: '/property', label: 'Property' },
      { href: '/client', label: 'Client' },
      { href: '/question', label: 'Question' },
      { href: '/answeroption', label: 'AnswerOption' },
      // { href: '/category', label: 'Category' },
      { href: '/questionworkflow', label: 'QuestionWorkflow' },
    ],
  },
  {
    label: 'Booking',
    icon: mdiTable,
    menu: [{ href: '/appointment', label: 'Appointment' }],
  },
  {
    label: 'ACL',
    icon: mdiTable,
    menu: [
      // { href: '/user', label: 'User' },
      // { href: '/module', label: 'Module' },
      { href: '/role', label: 'Role' },
      { href: '/permission', label: 'Permission' },
      { href: '/rolepermission', label: 'Role-Permission' },
      { href: '/usermodule', label: 'User-Module' },
      { href: '/userentityrole', label: 'User-Role' },
    ],
  },
  {
    label: 'Masterdata',
    icon: mdiTable,
    menu: [
      { href: '/ingredient', label: 'Ingredient', icon: mdiLeaf },
      { href: '/formulation', label: 'Formulation', icon: mdiMedication },
      { href: '/diet', label: 'Diet', icon: mdiFood },
      { href: '/oil', label: 'Oil', icon: mdiOil },
      { href: '/disease', label: 'Disease', icon: mdiMedication },
      { href: '/pulses', label: 'Pulses', icon: mdiFood },
      { href: '/pathophysiologicalgoal', label: 'PathophysiologicalGoal', icon: mdiFood },
      { href: '/nonveg', label: 'Meat', icon: mdiFoodDrumstick },
      { href: '/fruit', label: 'Fruit', icon: mdiFood },
      // { href: '/yoga', label: 'Yoga', icon: mdiYoga },
      { href: '/vegetable', label: 'Vegetable', icon: mdiLeafCircle },
      { href: '/otherfood', label: 'OtherFood', icon: mdiFood },
      { href: '/dairy', label: 'Dairy', icon: mdiCow },
      { href: '/spice', label: 'Spice', icon: mdiFood },
      { href: '/veganfood', label: 'VeganFood', icon: mdiFood },

      { href: '/sweetner', label: 'Sweetner', icon: mdiFood },
      { href: '/cereal', label: 'Cereal', icon: mdiFood },
      { href: '/weekdiet', label: 'WeekDiet', icon: mdiFood },
    ],
  },

  // {
  //   href: '/login',
  //   label: 'Login',
  //   icon: mdiLock,
  // },
]

//  fetch('http://3.13.92.74:30001/acl/user/module',{headers:{'X-USER-ID': '1'}}) // Replace with your API endpoint
//    .then((response) => response.json())
//    .then((data) => {
    
     
    
//     const apiLabelNames = data.response.moduleList.map((module) => module.name)

   
//     const filteredMenuAside = menuAside.filter((item) => apiLabelNames.includes(item.label))
    
//     menuAside.splice(0, menuAside.length, ...filteredMenuAside)
   
//    console.log(menuAside)
  
    
//    })
//    .catch((error) => {
//      console.error('Error', error)
//    })
// const fetchData = async () => {
//   try {
//     const response = await fetch('http://3.13.92.74:30001/acl/user/module', {
//       headers: { 'X-USER-ID': '1' },
//     })
//     const data = await response.json()

//     const apiLabelNames = data.response.moduleList.map((module: any) => module.name)
//     const filteredMenuAside = menuAside.filter((item) => apiLabelNames.includes(item.label))
//     menuAside.splice(0, menuAside.length, ...filteredMenuAside)

//     console.log(menuAside)
//   } catch (error) {
//     console.error('Error', error)
//   }
// }

// fetchData()
// const getMenuAside = async () => {
//   await fetchData()
//   return menuAside
// }

// export default getMenuAside
export default menuAside


