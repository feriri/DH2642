const initialPromise1 = RecipeAPI.searchDrinkName("apple");
//const initialPromise2 = RecipeAPI.searchDrinkName("gin");

function SearchPresenter (props){
    /*
    const [data, error] = usePromise(searchPromise)
    const [promise, setPromise]= React.useState(null);
    */
    const [data, setData]= React.useState(null);
    const [error, setError]= React.useState(null);
    const [promise, setPromise]= React.useState(null);
    const [searchQuery, setQuery] = React.useState("");

    //let searchQuery = ""

    //const [values, setValues] = React.useState(null);


    //React.useEffect(()=> setValues(Promise.all([initialPromise1,initialPromise2]).then(values=>console.log(values)).catch(e=>setError(e))), []);
    React.useEffect(()=> setPromise((initialPromise1).then(data=>setData(data)).catch(e=>setError(e))), []);
 // fixa let

    //let promise1 = RecipeAPI.searchDrinkIngridient(searchQuery)
    //let promise2 = RecipeAPI.searchDrinkName(searchQuery)


    return(
        <div>
            <SearchRecipeView onRecipeSearch={()=> setPromise(RecipeAPI.searchDrinkName(searchQuery).then(data => setData(data)).catch(error=> setError(error)),[promise])}
                //promise = (Promise.all([promise1, promise2]).then(values => setValues(values)).then(data => setData(data)).catch(error=> setError(error)),[promise])}
                //data=>props.model.createTempSearchList(data)

                              onText={txt=>setQuery(txt)}
                              onRecipeRandom={()=> setPromise(RecipeAPI.getRandomDrink().then(data => setData(data)).catch(error=> setError(error)),[promise])}
            />
            {promiseNoData(promise,data,error) || <RecipeResultsView searchResults = {data}

                              invList = {props.model.getInventoryLabel()}
                              drinkChosen = {id=>model.setDrinkID(id)}/>}
        </div>
    )
    /*{promiseNoData(promise,data,error) || ..}*/

}
