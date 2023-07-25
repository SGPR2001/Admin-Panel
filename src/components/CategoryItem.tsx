import React, { useState } from 'react'

function CategoryItem({ category }) {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(category.name)
  const [categoryType, setCategoryType] = useState(category.categoryType)
  const [imageUrl, setImageUrl] = useState(category.imageUrl)
  const [description, setDescription] = useState(category.description)
  const [sIdList, setSubCategoryIdList] = useState(category.sIdList)
  const handleEditClick = () => {
    setEditing(true)
  }
  const handleCancelClick = () => {
    setEditing(false)
  }
  const handleUpdateClick = async () => {
    const subCategoryIdList = sIdList.split(',')
    try {
      const response = await fetch(
        `http://3.13.92.74:30005/questionnaire/admin/category/id/${category.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-USER-ID': '1',
          },
          body: JSON.stringify({
            name,
            categoryType,
            imageUrl,
            description,
            subCategoryIdList,
          }),
        }
      )

      if (!response.ok) {
        throw new Error('Failed to update the data')
      }

      setEditing(false)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteClick = () => {
    // call an API to delete the medicine here
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {editing ? (
        <>
          <div className="flex justify-between mt-6">
            <div
              style={{
                width: '80%',
              }}
            >
              <h2 className="text-lg font-medium">
                <span className="font-bold"> Name:</span>{' '}
                <p className="border border-gray-400 p-1 rounded-sm">
                  <input value={name} onChange={(e) => setName(e.target.value)} />
                </p>
              </h2>
              <h2 className="text-lg font-medium">
                <span className="font-bold">Category Type:</span>{' '}
                <p className="border border-gray-400 p-1 rounded-sm">
                  <input value={categoryType} onChange={(e) => setCategoryType(e.target.value)} />
                </p>
              </h2>
              <h2 className="text-lg font-medium">
                <span className="font-bold">ImageUrl:</span>{' '}
                <p className="border border-gray-400 p-1 rounded-sm">
                  <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                </p>
              </h2>
              <h2 className="text-lg font-medium">
                <span className="font-bold">Description:</span>{' '}
                <p className="border border-gray-400 p-1 rounded-sm">
                  <input value={description} onChange={(e) => setDescription(e.target.value)} />
                </p>
              </h2>
              <h2 className="text-lg font-medium">
                <span className="font-bold">SubCategoryId List:</span>{' '}
                <p className="border border-gray-400 p-1 rounded-sm">
                  <input value={sIdList} onChange={(e) => setSubCategoryIdList(e.target.value)} />
                </p>
              </h2>
            </div>
            <div
              style={{
                width: '10%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
              className="flex flex-col mt-4"
            >
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4"
                onClick={handleUpdateClick}
              >
                Update
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between mt-6">
            <div
              style={{
                width: '80%',
              }}
            >
              <h2 className="text-lg font-medium">
                <span className="font-bold"> Name:</span>
                <p className=" h-10 border border-gray-400 p-1 rounded-sm">{name}</p>
              </h2>
              <h2 className="text-lg font-medium">
                <span className="font-bold">CategoryType:</span>
                <p className="h-10 border border-gray-400 p-1 rounded-sm">{categoryType}</p>
              </h2>
              <h2 className="text-lg font-medium">
                <span className="font-bold">Imageurl:</span>
                <p className="h-10 border border-gray-400 p-1 rounded-sm">{imageUrl}</p>
              </h2>
              <h2 className="text-lg font-medium">
                <span className="font-bold">Description:</span>
                <p className="h-10 border border-gray-400 p-1 rounded-sm">{description}</p>
              </h2>
              <h2 className="text-lg font-medium">
                <span className="font-bold">SubCategoryId List:</span>
                <p className="h-10 border border-gray-400 p-1 rounded-sm">{sIdList}</p>
              </h2>
            </div>

            <div
              style={{
                width: '10%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
              className="flex flex-col mt-4"
            >
              {/* <a onClick={handleEditClick}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY4vn7vnrC96nFLCCYoUsLnNB94zoi-ivlID2iT7TO0-_cCtxR9_MezQU5c25ENYD0Zoo&usqp=CAU"
                  alt="Edit"
                  className="cursor-pointer mb-4"
                  style={{ width: 50, height: 50 }}
                />
              </a>
              <a onClick={handleDeleteClick}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFlZGyD2OLJFRjXfAe2xpw6KzhjBmyiz9CjIjrzZDVWxKCz9YoFeYkoOdEsqapNMDESi4&usqp=CAU"
                  alt="Delete"
                  className="cursor-pointer mb-4"
                  style={{ width: 50, height: 50 }}
                />
              </a> */}
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4"
                onClick={handleEditClick}
              >
                Edit
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
                onClick={handleDeleteClick}
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CategoryItem
