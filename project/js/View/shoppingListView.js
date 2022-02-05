function ShoppingListView(props){
    return(
        <div className="row">
            <div className="column">
                <div className="instructionInv">
                    <span className="instructionsInvTitle">IN YOUR BAR</span>
                    <span className="instructionsInvTextLast">Here you can see what ingredients you have in your bar that is needed for your chosen drinks!</span>
                </div>
                <table className="styled-tableInv">
                    <thead>
                    <tr><td>In your bar</td></tr>
                    </thead>
                    <tbody>
                    {(props.inventorylist).map(ingr => {return <tr key={ingr.label}>
                        <td>{ingr.label}</td>
                        {print_amount(ingr.amount)}
                        <td> {ingr.unit}</td>
                    </tr>})}
                    </tbody>
                </table>
            </div>
            <div className="column">
                <div className="instructionInv">
                    <span className="instructionsInvTitle">SHOPPING LIST</span>
                    <span className="instructionsInvTextLast">Here you can see what you need to buy to make your chosen drinks!</span>
                </div>
                <table className="styled-tableInv">
                    <thead>
                    <tr><td>Shopping list</td></tr>
                    </thead>
                    <tbody>
                    {(Object.values(props.shoppinglist)).map(ingr => {return <tr key={ingr.label}>
                        <td>{ingr.label}</td>
                        {print_amount(ingr.amount)}
                        <td> {ingr.unit}</td>
                    </tr>})}
                    </tbody>
                </table>
            </div>

            <div>
                <div className = "popup" onClick = {()=>areUSure()}>Click here when you have made your drinks to update you bar!
                    <span className ="popuptext" id= "myPopup"> If you click OK your menu will disapear and the ingredients you have used will be removed from your bar
                        <button onClick = {()=>props.updateBarButton()}> OK </button>
                        <button> cancel </button>
                    </span>
                </div>
            </div>
        </div>
    )
}

function print_amount(amount){
    if (amount === 0){
        return(
            <td> to garnish</td>
        )
    }
    else{
        return(
            <td>{amount}</td>
        )
    }
}

function areUSure(){
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}
