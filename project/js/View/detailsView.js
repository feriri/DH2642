const DetailsView=({addToMenu, nrDrinks, setNrDrinks, drink}) =>
    <div className="detailsView">

        <div className="leftSide">
            <div className="drinkLabel">
                <h3>{drink.strDrink}</h3>
                <p className="recGlass"> Recommended glass: {drink.strGlass}</p>
            <ul className="drinkList">
                <h1 className="listHeader">Ingredients</h1>
                {ingredientLines(drink).map((line,index ) => <li key={index}>{printAmount(line.measure.amount*nrDrinks)}&nbsp;
                    {line.measure.unit} {line.ingredient} </li>)}
            </ul>
            </div>
                    <div className="drinksAdd">
                        <div className="drinkIngredients"> <button onClick={()=> setNrDrinks(nrDrinks-1)}>-</button>&nbsp;Drinks&nbsp;
                              <button onClick={()=> setNrDrinks(nrDrinks+1)}>+</button> &nbsp; {nrDrinks}</div>
                              <div className="buttonup"><button onClick={()=> addToMenu(drink)}> Add drink </button></div>
                    </div>
        </div>
<div className="rightSide">
           <div><img className="imageDetails" src={drink.strDrinkThumb} alt={drink.strDrink}></img></div> 

            <div><ul className="drinkInstructions">

                <h3>Instructions</h3>
                <p>{drink.strInstructions}</p>

            </ul>
            </div> 
            </div>
    </div>;
