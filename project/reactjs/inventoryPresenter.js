function InventoryPresenter (props){

	const [produce_input, setProduce]= React.useState("");
	const [category_choice, setCategory]= React.useState("");
	const [unit_choice, setUnit]= React.useState("");
	const [amount_input, setAmount]= React.useState(0.0);
	const ingr_list = getIngrList(props.data);
	const inventoryList = useModelProp(props.model, "inventory");


	//const [data, setData]= React.useState(null);
    //const [error, setError]= React.useState(null);
    //const [promise, setPromise]= React.useState(null);
	//const [ingr_list, setIngrlist] = React.useState([]);

    //React.useEffect(()=> setPromise((RecipeAPI.listIngredients()).then(data=>setData(data)).catch(e=>setError(e))), []);
	//React.useEffect(()=> setIngrlist(getIngrList(data, ingr_list)), []);

	//console.log(props.data);

	//create ingredient_list
	//console.log(ingr_list);
	//{promiseNoData(promise,data,error) || (ingr_list = getIngrList(props.data, ingr_list))}

	return(
		<div> 
			<AddToInventoryView categories = {["Category:","Alcohol","Non-alcohol"]}
								units = {["Unit:","gram","oz","cl","pcs", "bottle"]}
								okIngredient = {ingr_list.includes(produce_input)}
								informationComplete = {(produce_input&&category_choice&&parseFloat(amount_input)&&unit_choice)&&(parseFloat(amount_input)>0.0)}
								wrongChoice = {unit_choice==="Unit:"||category_choice==="Category:"}
								onProduceInput = {chosen_produce => {setProduce(chosen_produce.charAt(0).toUpperCase() + chosen_produce.slice(1).toLowerCase())}}
								onCategoryChoice = {chosen_category => setCategory(chosen_category)}
								onAmountInput = {chosen_amount => setAmount(parseFloat(chosen_amount))}
								onUnitChoice = {chosen_unit => setUnit(chosen_unit)}
								onAddInventory = {()=> {if (produce_input&&category_choice&&parseFloat(amount_input)&&unit_choice&&(ingr_list.includes(produce_input)&&(category_choice!=="Category:")&&(unit_choice!=="Unit:")&&(parseFloat(amount_input)>0.0)))
												{props.model.addToInventory(new InventoryPiece(category_choice,produce_input,amount_input,unit_choice))}}}
			/>
			<InventoryView 		my_inventory = {inventoryList}
								categories = {["Alcohol","Dairy","Fruits","Produce","Other"]}
								onRemoveIngredient = {ingr => props.model.removeFromInventory(ingr, ingr.amount)}
			/>
		</div>
	)
}

class InventoryPiece{
	constructor(category, label, amount, unit){
        this.category = category;
        this.label = label;
        this.amount = amount;
        this.unit = unit;
    }
}

function getIngrList(data){
	let ingr_list = []
	data.drinks.forEach(element => {ingr_list = [...ingr_list, element.strIngredient1.charAt(0).toUpperCase() + element.strIngredient1.slice(1).toLowerCase()]})
	return ingr_list;	
}

/*
TO-DO
- kunna ta bort en viss mängd och inte hela
- söka på ingredienser
- bara kunna lägga till de ingredienser som finns i APIet
- stylea
- olika kategorier i olika "boxar"
*/
