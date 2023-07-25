import React, { ReactElement, useState } from 'react'
import CardBox from '../components/CardBox'
import BaseButton from '../components/BaseButton'

import BaseButtons from '../components/BaseButtons'
import { mdiTrashCan, mdiNoteEdit, mdiUpdate } from '@mdi/js'


const TableSampleIngredients=()=>{
    type Ingredient = {
      name: string
      sanskritName: string
      description: string
      quantity: number
      rasa: string
      guna: string
    }
    const initialData: Ingredient[] = [
      {
       
        name: 'Test 1',
        sanskritName: 'Test Sanskrit 1',
        description: 'Test Description 1',
        quantity: 1,
        rasa: 'Test Rasa 1',
        guna: 'Test Guna 1',
       
      },
      {
       
        name: 'Test 2',
        sanskritName: 'Test Sanskrit 2',
        description: 'Test Description 2',
        quantity: 2,
        rasa: 'Test Rasa 2',
        guna: 'Test Guna 2',
        
      },
    ]
  const [data, setData] = useState(initialData)
  const [editIndex, setEditIndex] = useState(-1)
  const [name, setName] = useState('')
  const [sanskritName, setSanskritName] = useState('')
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [rasa, setRasa] = useState('')
  const [guna, setGuna] = useState('')

   const handleEdit = (index: number) => {
     setEditIndex(index)
     setName(data[index].name)
     setSanskritName(data[index].sanskritName)
     setDescription(data[index].description)
     setQuantity(data[index].quantity)
     setRasa(data[index].rasa)
     setGuna(data[index].guna)
   }

   const handleUpdate = () => {
     const newData = [...data]
     newData[editIndex] = {
        
       name,
       sanskritName,
       description,
       quantity,
       rasa,
       guna,
     }
     setData(newData)
     setEditIndex(-1)
   }

   const handleCancel = () => {
     setEditIndex(-1)
   }

   const handleDelete = (index: number) => {
     const newData = [...data]
     newData.splice(index, 1)
     setData(newData)
   }

    return (
      <>
        <CardBox>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>SanskritName</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Rasa</th>
                <th>Guna</th>
              </tr>
            </thead>
            <tbody>
              {data.map((ingredient: Ingredient, index: number) => (
                <tr key={index}>
                  <td>
                    {index === editIndex ? (
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    ) : (
                      ingredient.name
                    )}
                  </td>
                  <td>
                    {index === editIndex ? (
                      <input
                        type="text"
                        value={sanskritName}
                        onChange={(e) => setSanskritName(e.target.value)}
                      />
                    ) : (
                      ingredient.sanskritName
                    )}
                  </td>
                  <td>
                    {index === editIndex ? (
                      <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    ) : (
                      ingredient.description
                    )}
                  </td>
                  <td>
                    {index === editIndex ? (
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                      />
                    ) : (
                      ingredient.quantity
                    )}
                  </td>
                  <td>
                    {index === editIndex ? (
                      <input type="text" value={rasa} onChange={(e) => setRasa(e.target.value)} />
                    ) : (
                      ingredient.rasa
                    )}
                  </td>
                  <td>
                    {index === editIndex ? (
                      <input type="text" value={guna} onChange={(e) => setGuna(e.target.value)} />
                    ) : (
                      ingredient.guna
                    )}
                  </td>
                  <td className="before:hidden lg:w-1 whitespace-nowrap">
                    {index === editIndex ? (
                      <BaseButtons type="justify-start lg:justify-end" noWrap>
                        <BaseButton
                          icon={mdiUpdate}
                          onClick={handleUpdate}
                          className="bg-green-500 text-white "
                          small
                        />
                        <BaseButton
                          color="danger"
                          icon={mdiTrashCan}
                          onClick={handleCancel}
                          small
                        />
                      </BaseButtons>
                    ) : (
                      <BaseButtons type="justify-start lg:justify-end" noWrap>
                        <BaseButton
                          color="info"
                          icon={mdiNoteEdit}
                          onClick={() => handleEdit(index)}
                          small
                        />
                       
                        <BaseButton
                          color="danger"
                          icon={mdiTrashCan}
                          onClick={() => handleDelete(index)}
                          small
                        />
                      </BaseButtons>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBox>
      </>
    )
}
export default TableSampleIngredients