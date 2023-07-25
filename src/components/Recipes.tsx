function Recipes({ item }) {
  return (
    <>
      <h2 className="text-lg font-medium">
        <span className="font-bold ">Name:</span> {item.name}
      </h2>
      <h2 className="text-lg font-medium">
        <span className="font-bold ">Preparation Time:</span> {item.preparationTime}
      </h2>
      <h2 className="text-lg font-medium">
        <span className="font-bold ">Cooking Time:</span> {item.CookingTime}
      </h2>
    </>
  )
}
export default Recipes
