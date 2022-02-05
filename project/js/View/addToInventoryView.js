function AddToInventoryView (props){
	return (
		<div>
			<div className="instructionInv">
				<span className="instructionsInvTitle">YOUR BAR</span>
				<span className="instructionsInvTextLast">Here you can add and remove ingredients from your bar.</span>
				<span className="instructionsInvTitle">HOW TO ADD INGREDIENT</span>
				<span className="instructionsInvText">1. Choose category, enter ingredient, enter amount and choose unit.</span>
				<span className="instructionsInvText">2. Click "Add to bar".</span>
				<span className="instructionsInvTextLast">OBS! If the button is disabled you have not entered all information or you are trying to add a non-drink ingredient</span>
				<span className="instructionsInvTitle">HOW TO REMOVE INGREDIENT</span>
				<span className="instructionsInvText">1. Click on the x next to the ingredient you want to remove.</span>
				<span className="instructionsInvTextLast">OBS! You can only remove whole ingredients and not parts of it!</span>
			</div>
			<div className = "searchInv">
			<span className="instructionsInvTitle">ADD INGREDIENT</span>
				<select onChange={e=> {props.onCategoryChoice(e.target.value)}}>
					{props.categories.map(cat => {return <option key={cat}>{cat}</option>})}
				</select>

				<input onChange={e=> {props.onProduceInput(e.target.value)}} placeholder="Ingredient ... "/>
				
				<input onChange={e=> {props.onAmountInput(parseFloat(e.target.value))}} placeholder="Amount ... "/>
				<select onChange={e=> {props.onUnitChoice(e.target.value)}}>
					{props.units.map(mea => {return <option key={mea}>{mea}</option>})}
				</select>

				<button
						disabled={(!(props.okIngredient&&props.informationComplete))||props.wrongChoice}
						onClick={()=>{props.onAddInventory()}}> + Add to bar </button>
			</div>
		</div>
	)
}
 /*
<span class="d-inline-block" tabindex="0" data-toggle="tooltip"
              data-placement="right" title="This button is disabled">
                <button class="btn btn-outline-warning" 
                        style="pointer-events: none;"type="button" disabled>
                  Button wrapped in span tag
                </button>
        </span>


$('input').click(function (event) {
    if ($(this).hasClass('disabled')) {
        alert('CLICKED, BUT DISABLED!!');
    } else {
        alert('Not disabled. =)');
    }
});
*/