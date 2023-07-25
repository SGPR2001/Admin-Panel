function NutritionItem({item}){
   return (
     <>
       <h2 className="text-lg font-medium">
         <span className="font-bold ">Name:</span> {item.name}
       </h2>
       <h2 className="text-lg font-medium">
         <span className="font-bold ">Amount:</span> {item.amount}
       </h2>
       <h2 className="text-lg font-medium">
         <span className="font-bold ">Required Amount:</span> {item.requiredAmount}
       </h2>
     </>
   )
}
export default NutritionItem