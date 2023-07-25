export type UserPayloadObject = {
  name: string
  email: string
  avatar: string
}
 
export type MenuAsideItem = {
  label: string
  icon?: string
  href?: string
  target?: string
  color?: ColorButtonKey
  isLogout?: boolean
  menu?: MenuAsideItem[]
}

export type MenuNavBarItem = {
  label?: string
  icon?: string
  href?: string
  target?: string
  isDivider?: boolean
  isLogout?: boolean
  isDesktopNoLabel?: boolean
  isToggleLightDark?: boolean
  isCurrentUser?: boolean
  menu?: MenuNavBarItem[]
}

export type ColorKey = 'white' | 'light' | 'contrast' | 'success' | 'danger' | 'warning' | 'info'

export type ColorButtonKey =
  | 'white'
  | 'whiteDark'
  | 'lightDark'
  | 'contrast'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'void'

export type BgKey = 'purplePink' | 'pinkRed'

export type TrendType = 'up' | 'down' | 'success' | 'danger' | 'warning' | 'info'

export type TransactionType = 'withdraw' | 'deposit' | 'invoice' | 'payment'

export type Transaction = {
  id: number
  amount: number
  account: string
  name: string 
  date: string
  type: TransactionType
  business: string
}

export type Client = {
  id: number
  content: string
  categoryId: string
  groupId: string
 
  
}
export type Ingredient = {
  id: number
  name: string
  sanskritName: string
  description: string
  quantity: string
 rasa: string
  guna: string
  vipaka: string
}
export type Formulation = {
  id: string
  status: number
  name: string
  shortDescription: string
  longDescription: string
  ingredientIdList: string[]
  metaData: {
    sellerProductId: string
  }
  imageList: string[]
  thumbnailImage: string
  ingredientList: null | any[]
}
export type Yoga={
  id:string
  status:number
  name:string
}

export type Oil = {
  id: string
  status: number
  name: string
  description: string
}

export type Pulses = {
  id: string
  status: number
  name: string
  description: string
  imageUrl: string
  markdown:string
}

export type NonVeg = {
  id: string
  status: number
  name: string
  description: string
  imageUrl: string
  markdown: string
}
export type Fruit = {
  id: string
  status: number
  name: string
  description: string
  imageUrl: string
  markdown: string
}
export type PPG = {
  id: string
  status: number
  name: string
  sanskritName: string
  dietIdList: null | any[]
  yogadList: null | any[]
  formulationIdList: string[]
  lifestyleIdList: null | any[]
  dietList: null | any[]
  formulationList: null | any[]
  lifestyleList: null | any[]
}
export type Vegetable = {
  id: string
  status: number
  name: string
  description: string
  imageUrl: string
  markdown: string
}
export type OtherFood = {
  id: string
  status: number
  name: string
  description: string
  imageUrl: string
  markdown: string
}
export type Dairy = {
  id: string
  status: number
  name: string
  description: string
  imageUrl: string
  markdown: string
}
 export type Spice = {
   id: string
   status: number
   name: string
   description: string
   imageUrl: string
   markdown: string
 }
 export type VeganFood = {
   id: string
   status: number
   name: string
   description: string
   imageUrl: string
   markdown: string
 }
 export type Sweetner = {
   id: string
   status: number
   name: string
   description: string
   imageUrl: string
   markdown: string
 }
 export type Cereal = {
   id: string
   status: number
   name: string
   description: string
   imageUrl: string
   markdown: string
 }
  export type Role = {
    id: string
    status: number
    name: string
    description: string
    permissionList:string[]
  }
  export type Permission = {
    id: string
    status: number
    name: string
    description: string
    
  }
  export type Module = {
    id: string
    status: number
    name: string
    description: string
    moduleType: string
    subModuleList: string[]
  }
  export type User = {
    id: string
    userName: string
    authenticationProvider: string
    authenticationWay: string
    authenticationProviderId: string
  }
  export type Property = {
    id: string
    entityType: string
    entityId: string
    value: string
    description: string
    clientId:string
  }
   export type AnswerOption = {
     id: string
     content: string
    
   }
    export type Category = {
      name: string
      categoryType: string
      imageUrl: string
      description: string
      subCategoryIdList: string[]
    }
     export type Question = {
       id: string
       content: string
       categoryId: string
       groupId: string
       inputType: string
       isSkippable: boolean
       answerOptionList: string
       previousAnsweredOptions: string
       questionWorkflowId: string
       hasWorkflowEnded: string
       canGoBack: boolean
     }
   export type ClientQuestion = {
     id: string
     name: string
     propertyCallbackUrl: string
     method: string
   }
  
 export type WeekDiet = {
   id: string
   status: number
   name: string
   pathophysiologyGoalIdList:string[]
 }

export type Disease = {
  id: string
  status: number
  name: string
  description: string
  pathophysiologicalGoalIdList: null | any[]
  formulationIdList: string[]

  formulationList: null | any[]
}


export type StyleKey = 'white' | 'basic'

export type UserForm = {
  name: string
  email: string
}
