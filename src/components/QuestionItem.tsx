import React, { useState } from 'react'

function QuestionItem({ question }) {
  const [editing, setEditing] = useState(false)
 const [id, setId] = useState(question.id)
  const [content, setContent] = useState(question.content)
  const [categoryId, setCategoryId] = useState(question.categoryId)
  const [groupId, setGroupId] = useState(question.groupId)
  const [inputType, setInputType] = useState(question.inputType)
  const [aIdList, setAnswerOptionIdList] = useState(question.aIdList)
  const [isSkippable, setIsSkippable] = useState(question.isSkippable)
  const [paoptions, setPAO] = useState(question.paoptions)
  const [qwId, setQwId] = useState(question.qwId)
  const [hwended, setHwended] = useState(question.hwended)
  const [cgback, setCgback] = useState(question.cgback)
  const [showDetails, setShowDetails] = useState(false)
  const handleEditClick = () => {
    setEditing(true)
  }
  const handleCancelClick = () => {
    setEditing(false)
  }
  const handleUpdateClick = async () => {
    const answerOptionIdList = aIdList.split(',')
    try {
      const response = await fetch(
        `http://3.13.92.74:30005/questionnaire/admin/question/id/${question.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-USER-ID': '1',
          },
          body: JSON.stringify({
            content,
            categoryId,
            groupId,
            inputType,
            answerOptionIdList,
            isSkippable,
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
                <span className="font-bold">Id:</span>{' '}
                <p className="border border-gray-400 p-1 rounded-sm">
                  <input
                    className="outline-0"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    style={{ width: '850px' }}
                  />
                </p>
              </h2>
              <h2 className="text-lg font-medium">
                <span className="font-bold"> Content:</span>{' '}
                <p className="border border-gray-400 p-1 rounded-sm">
                  <input
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{ width: '850px' }}
                  />
                </p>
              </h2>
              <h2 className="text-lg font-medium">
                <span className="font-bold">Category Id:</span>{' '}
                <p className="border border-gray-400 p-1 rounded-sm">
                  <input
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    style={{ width: '850px' }}
                  />
                </p>
              </h2>
              <h2 className="text-lg font-medium">
                <span className="font-bold">Group Id:</span>{' '}
                <p className="border border-gray-400 p-1 rounded-sm">
                  <input
                    value={groupId}
                    onChange={(e) => setGroupId(e.target.value)}
                    style={{ width: '850px' }}
                  />
                </p>
              </h2>
              <h2 className="text-lg font-medium">
                <span className="font-bold">InputType:</span>{' '}
                <p className="border border-gray-400 p-1 rounded-sm">
                  <input
                    value={inputType}
                    onChange={(e) => setInputType(e.target.value)}
                    style={{ width: '850px' }}
                  />
                </p>
              </h2>
              <h2 className="text-lg font-medium">
                <span className="font-bold">IsSkippable:</span>{' '}
                <p className="border border-gray-400 p-1 rounded-sm">
                  <input
                    value={isSkippable}
                    onChange={(e) => setIsSkippable(e.target.value)}
                    style={{ width: '850px' }}
                  />
                </p>
              </h2>
              <h2 className="text-lg font-medium">
                <span className="font-bold">AnswerOptionList:</span>{' '}
                <p className="border border-gray-400 p-1 rounded-sm">
                  <input
                    value={aIdList}
                    onChange={(e) => setAnswerOptionIdList(e.target.value)}
                    style={{ width: '850px' }}
                  />
                </p>
              </h2>
              <h2 className="text-lg font-medium">
                <span className="font-bold">PreviousAnswerOptions:</span>{' '}
                <p className="border border-gray-400 p-1 rounded-sm">
                  <input
                    value={paoptions}
                    onChange={(e) => setPAO(e.target.value)}
                    style={{ width: '850px' }}
                  />
                </p>
              </h2>
              <h2 className="text-lg font-medium">
                <span className="font-bold">QuestionWorkflowId:</span>{' '}
                <p className="border border-gray-400 p-1 rounded-sm">
                  <input
                    value={qwId}
                    onChange={(e) => setQwId(e.target.value)}
                    style={{ width: '850px' }}
                  />
                </p>
              </h2>
              <h2 className="text-lg font-medium">
                <span className="font-bold">HasWorkFlowEnded:</span>{' '}
                <p className="border border-gray-400 p-1 rounded-sm">
                  <input
                    value={hwended}
                    onChange={(e) => setHwended(e.target.value)}
                    style={{ width: '850px' }}
                  />
                </p>
              </h2>
              <h2 className="text-lg font-medium">
                <span className="font-bold">CanGoBack:</span>{' '}
                <p className="border border-gray-400 p-1 rounded-sm">
                  <input
                    value={cgback}
                    onChange={(e) => setCgback(e.target.value)}
                    style={{ width: '850px' }}
                  />
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
                className="bg-green-500 text-white py-2 px-4 rounded-md mb-4"
                onClick={handleUpdateClick}
              >
                Update
              </button>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-md"
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
                <span className="font-bold">Id:</span>
                <p className=" h-10 border border-gray-400 p-1 rounded-sm">{id}</p>
              </h2>
              <h2 className="text-lg font-medium">
                <span className="font-bold"> Content:</span>
                <p className=" h-10 border border-gray-400 p-1 rounded-sm">{content}</p>
              </h2>
              <h2 className="text-lg font-medium">
                <span className="font-bold">CategoryId:</span>
                <p className="h-10 border border-gray-400 p-1 rounded-sm">{categoryId}</p>
              </h2>
              <h2 className="text-lg font-medium">
                <span className="font-bold">GroupId:</span>
                <p className="h-10 border border-gray-400 p-1 rounded-sm">{groupId}</p>
              </h2>
              <h2 className="text-lg font-medium">
                <span className="font-bold">InputType:</span>
                <p className="h-10 border border-gray-400 p-1 rounded-sm">{inputType}</p>
              </h2>
              {showDetails && (
                <>
                  <h2 className="text-lg font-medium">
                    <span className="font-bold">IsSkippable:</span>
                    <p className="h-10 border border-gray-400 p-1 rounded-sm">{isSkippable}</p>
                  </h2>
                  <h2 className="text-lg font-medium">
                    <span className="font-bold">AnswerOptionList:</span>
                    <p className="h-10 border border-gray-400 p-1 rounded-sm">{aIdList}</p>
                  </h2>
                  <h2 className="text-lg font-medium">
                    <span className="font-bold">PreviousAnsweredOptions:</span>
                    <p className="h-10 border border-gray-400 p-1 rounded-sm">{paoptions}</p>
                  </h2>
                  <h2 className="text-lg font-medium">
                    <span className="font-bold">QuestionWorkFlowId:</span>
                    <p className="h-10 border border-gray-400 p-1 rounded-sm">{qwId}</p>
                  </h2>
                  <h2 className="text-lg font-medium">
                    <span className="font-bold">HasWorkFlowEnded:</span>
                    <p className="h-10 border border-gray-400 p-1 rounded-sm">{hwended}</p>
                  </h2>
                  <h2 className="text-lg font-medium">
                    <span className="font-bold">CanGoBack:</span>
                    <p className="h-10 border border-gray-400 p-1 rounded-sm">{cgback}</p>
                  </h2>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <a onClick={() => setShowDetails(false)}>
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/2926/2926319.png"
                        alt="Show less"
                        className="py-2 px-4 rounded-md cursor-pointer mb-4"
                        style={{
                          width: 80,
                          height: 50,
                          justifyContent: 'center',
                        }}
                      />
                    </a>
                  </div>
                </>
              )}
              {!showDetails && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <a onClick={() => setShowDetails(true)}>
                    <img
                      src="https://www.kindpng.com/picc/m/134-1344553_double-chevron-down-down-arrow-icon-png-transparent.png"
                      alt="Show more"
                      className="py-2 px-4 rounded-md cursor-pointer mb-4"
                      style={{ width: 70, height: 50, justifyContent: 'center' }}
                    />
                  </a>
                </div>
              )}
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
                className="bg-green-500 text-white py-2 px-4 rounded-md mb-4"
                onClick={handleEditClick}
              >
                Edit
              </button>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-md"
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

export default QuestionItem
