function SearchRecipeView(props){
    return (
        <div>
            <input className="buttonplaceholder" onChange={e=> props.onText(e.target.value)} type= "text" placeholder="Type here...">
            </input>
            <button className="buttonsearch" onClick={()=>props.onRecipeSearch()}>Search Drink</button>
            <button className="buttonrandom" onClick={()=>props.onRecipeRandom()}>Click here to generate random cocktail drinks!</button>
        </div>
    )
}

function RecipeResultsView(props){
    let ingrlist = [];
    let checkSomeorAll = [];
    let checkAll = [];
    let inInventory = [];
    let notInInventory = [];
    let inv = [];
   // let temp_inventory = ["Tequila", "Apple cider","Applejack", "Triple sec", "Apple juice", "Lemon juice"];

    //console.log(props.searchResults)
    if(props.searchResults.drinks !== null){
    return(
        <div className="search">
            {(props.searchResults.drinks).map(id => {return <div onClick={()=>{props.drinkChosen(id.idDrink)}} key={id.idDrink}>
                <img className="pic" src = {id.strDrinkThumb} height ={100}></img>
                <div className="font"> {id.strDrink}</div>
                <script>{ingrlist = getIngredients(id)}</script>
                <script>{inv = props.invList}</script>
                <script>{checkSomeorAll = checkInventorySomeOrAll(ingrlist, inv)}</script>
                <script>{checkAll = checkInventoryAll(ingrlist, inv)}</script>
                <script>{inInventory = exitsInInventory(ingrlist, inv)}</script>
                <script>{notInInventory = notFoundInInventory(ingrlist, inv)}</script>
                <div>{checkAll}</div>
                <div>{/*ingrlist.join(", ")*/}</div>
                <div>{/*checkSomeorAll*/}</div>
                <div>{/*inInventory.join(", ")*/}</div>
                <div>{/*notInInventory.join(", ")*/}</div>
                </div>
            })}
        </div>
    )}
    else
        return <div className="noResult"><p>No results</p></div>;
}

function checkInventorySomeOrAll(ingredientsList, inventoryList) {
    let arrAll = ingredientsList.concat(inventoryList).sort();
    // filter(name => name.includes(""))

    //console.log(arrAll);
    let map = {};
    let res = false;
    for(let i = 0; i < arrAll.length; i++) {
        if(map[arrAll[i]]) {
            res = true;
            break;
        }
        map[arrAll[i]] = true;
    }
    if(res) {
        return "Yes";
    } else {
        return "No";
    }
}

function checkInventoryAll(ingredientsList, inventoryList) {
    let g_sorted = ingredientsList.sort();
    let v_sorted = inventoryList.sort();
    let hasAllIngredients = true;
    for (let i = 0; i < g_sorted.length; i++){
        if (v_sorted.indexOf(g_sorted[i]) === -1) {
            hasAllIngredients = false;
            break;
        }
    }
    if(hasAllIngredients) {
        return <div className="mouseover"><button className="green"></button>
            <span className="text">You have all the ingredients that you need in your bar</span></div>;
    } else {
        return <div className="mouseover"><button className="red"></button>
            <span className="text">some or all the ingredients are missing in your bar</span></div>;
    }
}

function exitsInInventory(ingredientsList, inventoryList) {
    let g_sorted = ingredientsList.sort();
    let v_sorted = inventoryList.sort();
    let inInv = [];
    for (let i = 0; i < g_sorted.length; i++ ) {
        for ( let e = 0; e < v_sorted.length; e++ ) {
            if ( g_sorted[i] === v_sorted[e] ) inInv.push( g_sorted[i]);
        }
    }
    return inInv;
}

function notFoundInInventory(ingredientsList, inventoryList) {
    let g_sorted = ingredientsList.sort();
    let v_sorted = inventoryList.sort();
    let notInv = [];
    let inInv = false;
    for (let i = 0; i < g_sorted.length; i++ ) {
        inInv = false;
        for ( let e = 0; e < v_sorted.length; e++ ) {
            if ( g_sorted[i] === v_sorted[e] ) inInv = true;
        }
        if (!inInv) notInv.push( g_sorted[i]);
    }
    return notInv;
}

function getIngredients(id){
    let ingrList = [];
    for (let i=1; i<16; i++){
        if (id["strIngredient"+i]!=null){
            ingrList = [...ingrList, id["strIngredient"+i]]
        }
    }
    return ingrList;
}
