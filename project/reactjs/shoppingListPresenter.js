function ShoppingListPresenter(props){
    const drinksInMenu = useModelProp(props.model, "drinks");
    const inventory = useModelProp(props.model, "inventory");

    const ingr_dict = getIngredientsFromDrinks(drinksInMenu);
    //console.log("DICT: " + JSON.stringify(ingr_dict));
    let [shoppinglist, inventorylist] = createShoppingList(ingr_dict, inventory);

    return(
        <div>
            <ShoppingListView inventorylist = {inventorylist}
                            shoppinglist = {shoppinglist}
                            areUSure = {areUSure}
                            updateBarButton ={()=> updateBar(inventorylist, props.model)}/>
        </div>
    )
}

// Adds ingredients from drinks into dictionary
// key:ingredient
// value: {amount:2, unit:"oz"}
function getIngredientsFromDrinks(drinkList){
    let ingr_dict = {};
    drinkList.forEach((drink) => {
        for(let j = 1; j <16; j++){
            if(drink[`strIngredient`+j]!==undefined && drink[`strIngredient`+j]!==""){
                if (ingr_dict[drink[`strIngredient`+j]]!==undefined && drink[`strIngredient`+j]!==""){
                ingr_dict[drink[`strIngredient`+j]].amount = ingr_dict[drink[`strIngredient`+j]].amount+parseFloat(MeasurementSplit(drink[`strMeasure`+j]).amount*drink.nrDrinks)
                }
                else{
                    ingr_dict[drink[`strIngredient`+j]] = {label: drink[`strIngredient`+j], amount:parseFloat(MeasurementSplit(drink[`strMeasure`+j]).amount*drink.nrDrinks), unit: MeasurementSplit(drink[`strMeasure`+j]).unit}
                }
            }
        };
    });
    return (ingr_dict);
}

// Compares inventory with ingredients from drinks
function createShoppingList(ingr_dict, inventory){
    let inventoryList = [];
    inventory.forEach(ingr => {
        if (ingr_dict[ingr.label]){
            if(ingr.amount < ingr_dict[ingr.label].amount){
                inventoryList = [...inventoryList, {label: ingr.label, amount: ingr.amount, unit: ingr.unit}] 
                ingr_dict[ingr.label].amount = ingr_dict[ingr.label].amount - ingr.amount
            }
            else{
                inventoryList = [...inventoryList, {label: ingr.label, amount: ingr.amount, unit: ingr.unit}]
                delete ingr_dict[ingr.label]
            }
        }
    })
    return [ingr_dict, inventoryList];

}
function updateBar(inventorylist, model){
    //console.log("you want to remove your inventory: " + JSON.stringify(inventorylist))
        inventorylist.forEach(ingr =>{
            model.removeFromInventory(ingr, ingr.amount)})
        model.emptyMenu();
    }
