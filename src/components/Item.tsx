import NutritionItem from "./NutritionItem"
import Recipes from "./Recipes"
function Item({item}){
   return (
     <>
       <h2 className="text-lg font-medium">
         <span className="font-bold ">Name:</span> {item.name}
       </h2> 
       <h2 className="text-lg font-medium">
         <span className="font-bold ">Total Servings:</span> {item.totalServings}
       </h2>
       <h2 className="text-lg font-medium">
         <span className="font-bold ">Nutrition Info:</span>
         <div className="pl-10">
           {item.nutritionInfo.map((item) => (
             <NutritionItem key={item.name} item={item} />
           ))}
         </div>
       </h2>
       <h2 className="text-lg font-medium">
         <span className="font-bold ">Media Id List:</span>
         {item.mediaIdList}
       </h2>
       {/* <h2 className="text-lg font-medium">
         <span className="font-bold ">Recipes:</span>
         <div className="pl-10">
          
             <Recipes key={item.name} item={item.recipes} />
         
         </div>
       </h2> */}
     </>
   )
}
export default Item