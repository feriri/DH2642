const HOME_HASH = '#home';
const INVENTORY_HASH = '#inventory';
const SHOPPINGLIST_HASH = '#shoppinglist';
const DETAILS_HASH = '#details';
const ROUTES = [HOME_HASH, INVENTORY_HASH, SHOPPINGLIST_HASH, DETAILS_HASH];

function defaultRoute() {
    if (!ROUTES.includes(window.location.hash)) window.location.hash = HOME_HASH;
}
function App(props) {
    React.useEffect(() => {
        defaultRoute();
        window.addEventListener('hashchange', defaultRoute);

        return () => {
            window.removeEventListener('hashchange', defaultRoute);
        };
    }, []);

    //apicall for inventory list
    const [data, setData]= React.useState(null);
    const [error, setError]= React.useState(null);
    const [promise, setPromise]= React.useState(null);
    React.useEffect(()=> setPromise((RecipeAPI.listIngredients()).then(data=>setData(data)).catch(e=>setError(e))), []);

        return (
        <div className="flexParent">
            <div className="sidebar">
                <SidebarPresenter model={props.model}/> </div>
                <div className="container">
                    <div className="topnav">
                        <a href="#home">Search Drinks</a>
                        <a href="#inventory">Your Bar</a>
                        <a href="#shoppinglist">Shopping List</a>
                    </div>
                    <div className="searchDetails">
                    <Show hash="#home">
                        <DetailsPresenter model={props.model}/>
                        <SearchPresenter model={props.model}/>
                    </Show> </div>
                    <div>
                    <Show hash="#shoppinglist">
                        <ShoppingListPresenter model={props.model}/>
                    </Show> </div>
                    <div>
                    <Show hash="#inventory">
                        {promiseNoData(promise,data,error) || <InventoryPresenter model={props.model} data = {data}/>}
                    </Show> </div>
            </div>
        </div>
    );
}
//
