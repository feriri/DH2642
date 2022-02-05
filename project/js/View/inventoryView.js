function InventoryView (props){
	return (
		<div {...()=>{if(props.my_inventory.length===0)return(className = "hiddenInv")}}>
			<table className="styled-tableInv">
				<thead>
				<tr>
						<th></th>
	                    <th>Category</th>
	                    <th>Product</th>
	                    <th>Amount</th>
	                    <th>Unit</th>
	                </tr>
                </thead>
				<tbody>
					{props.my_inventory.map(product => {return <tr key={product.label} className="tableInv">
						<td><button onClick = {()=>props.onRemoveIngredient(product)}> x </button></td>
						<td>{product.category}</td>
						<td>{product.label.charAt(0).toUpperCase() + product.label.slice(1)}</td>
						<td>{product.amount}</td>
						<td>{product.unit}</td>
						</tr>})}
				</tbody>
			</table>
		</div>
	)
}
