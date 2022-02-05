function SidebarView(props) {
    const cocktails = getCocktailDetails(props.drinks);
    return (
        <div className="sidebar">
            <table className="table1">
                <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th>Name:</th>
                    <th>Category:</th>
                    <th>Served in:</th>
                </tr>
                </thead>
                <tbody>{cocktails.map((drink) => (
                        <tr key={drink.id}>
                            <td><button className="button1" onClick={()=>props.removeDrink(drink.id)}>x</button></td>
                            <td>{drink.nrDrinks}x</td>
                            <td>{drink.name}</td>
                            <td>{drink.category}</td>
                            <td>{drink.glass}</td>
                        </tr>
                ))}
                </tbody>
            </table>
            <div className="buttonclass">
            <button className="buttontobuy"><a href = "#shoppinglist" color = "white"> Create shopping list!</a></button></div>
        </div>
    );
}

function getCocktailDetails(drinkArr) {
    const cocktails = {};
    drinkArr.forEach(({ idDrink, strDrink, strCategory, strGlass, nrDrinks}) => {
        if (!cocktails[idDrink]) {
            cocktails[idDrink] = { id: idDrink, name: strDrink, category: strCategory, glass: strGlass, nrDrinks: nrDrinks};
        }
    });
    return Object.values(cocktails);
}
