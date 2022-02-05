function DetailsPresenter({model}){
    const nrDrinks = useModelProp(model,"nrOfDrinks");
    const id = useModelProp(model, "drinkID");
    const [promise, setPromise] = React.useState(null);
    React.useEffect( 
        () => setPromise(RecipeAPI.searchDrinkId(id)),[id]
        );
    const [data, error] = usePromise(promise);

    return promiseNoData(promise, data, error) || h(DetailsView, {
        addToMenu: aDrink => model.addToMenu(aDrink),
        nrDrinks: nrDrinks,
        setNrDrinks: port => model.setNrOfDrinks(port),
        drink: data.drinks[0] //temporary
    });
}

function ingredientLines(drink){
    let ingrLines =[];
    for(let j = 1; j <16; j++){
        if(drink[`strIngredient`+j] !== null && drink[`strIngredient`+j] !== ""){
            ingrLines.push({
                ingredient: drink[`strIngredient`+j],
                measure: MeasurementSplit(drink[`strMeasure`+j]) //split measure and unit
            });
        }

    };
    return ingrLines;
}
function MeasurementSplit(measure){ //for later
    /*before first space " " is a number or letter corresponding to one*/
    let measureAmount = 0;
    let measureUnit = "";
    let measuresList = {};
    if(measure!==null && measure !== undefined){
            if((measure.includes(" "))){
               measureAmount =measure.slice(0, measure.indexOf(" ")); // measure: '1.5 cl'
               measure = measure.slice(measureAmount.length+1);
               measureUnit = measure.slice(0, measure.indexOf(" "));
            }
            else{
                measureUnit = measure;
            }

        }
        else
            measure = "";
        
        if(measureUnit.length > 2 && !isNaN(measureUnit.slice(0,1))){ //if measureUnit is also a number EX. 1 1/2 oz
            // 1/2  
            measure = measure.slice(measureUnit.length+1);   
            measureAmount=parseFloat(measureAmount)+parseFraction(measureUnit);
            measureUnit = measure.slice(measureAmount.length+1, measure.length);   
        }
        else
            measureUnit = " " + measure;
    if(isNaN(measureAmount)){ //not a number
        if(measureAmount === 'a' || measureAmount === 'one' || measureAmount === 'an')
            measuresList={
                amount: 1,
                unit: measureUnit};
        else if(measureAmount === 'two')
            measuresList={
                amount: 2,
                unit: measureUnit};
        else if(measureAmount === 'three')
            measuresList={
                amount: 3,
                unit: measureUnit};
        else if(measureAmount === 'four')
            measuresList={
                amount: 4,
                unit: measureUnit};
        else if(measureAmount === 'five')
            measuresList={
                amount: 5,
                unit: measureUnit};
        else if(measureAmount === 'dozen')
            measuresList={
                amount: 12,
                unit: measureUnit};
        else if((measureAmount.indexOf('/')) !== -1){ //is it a fraction?
            measuresList={
                amount: parseFraction(measureAmount),
                unit: measureUnit};
        }
        else
        {//no number
            measuresList={
                amount: 0,
                unit: measureAmount+measureUnit};
            //view -> if 0 dont write out anything

        }
    }
    else{
        measuresList={
            amount: parseFloat(measureAmount),
            unit: measureUnit
        }
    }

    return measuresList;
}
function parseFraction(x){
    const fractionNum = x.split('/');
    if(!isNaN(fractionNum[0] && fractionNum[1])) //if both are numbers
        return parseFloat(fractionNum[0]/fractionNum[1]);
    else
        return 0;
}
function printAmount(amount){
    if(!isNaN(amount) && amount > 0){
        return parseFloat(amount.toFixed(2));
    }
    else
        return "";
}