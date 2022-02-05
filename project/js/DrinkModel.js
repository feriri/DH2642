class DrinkModel{
    constructor(nrDrinks=1,drinks=[], id="11410", inventory=[]){

        this.drinkID =id; 
        this.nrOfDrinks = nrDrinks;
        this.drinks=drinks; 
        this.subscribers=[];
        this.inventory=inventory;
    }
    setNrOfDrinks(nr){
        if(nr<=0)
            throw "Can't be negative or zero portions.";
        else{
            this.nrOfDrinks = nr;
            this.notifyObservers();
                 }
    }
    getNrOfDrinks(){
        return this.nrOfDrinks;
    }
    setDrinkID(id){ 
        this.drinkID = id;

        this.notifyObservers();
    }
    getDrinkID(){
        return this.drinkID;
    }
    getDrinks(){
        return [...this.drinks];
    }
    setDrink(drinks){ //firebasemodel
        this.drinks =[ ...drinks];
        this.notifyObservers();
    }

    emptyMenu(){
        this.drinks = []
    }
    
    addToMenu(drink) {
        if (this.drinks.find(d=>drink.idDrink === d.idDrink)){ 
            this.drinks.forEach(dr => {
                if(dr.idDrink === drink.idDrink){
                    if(!(dr.nrDrinks+this.nrOfDrinks<100))
                        return;
                    dr.nrDrinks = dr.nrDrinks+this.nrOfDrinks;
                    this.setNrOfDrinks(1);
                    this.notifyObservers();
                }
        })
            }
        else{
        drink["nrDrinks"] = this.getNrOfDrinks();
        this.drinks = [...this.drinks, drink];
        this.setNrOfDrinks(1);
        this.notifyObservers();
        }
    }
    removeDrink(id) {
        const lengthPreFilter = this.drinks.length;
        this.drinks = this.drinks.filter(({ idDrink }) => idDrink !== id);
        if (this.drinks.length !== lengthPreFilter) this.notifyObservers();
    }

    addToInventory(inv_object){
        if (!(this.inventory.some(e => e.label === inv_object.label))){ //det finns inte redan i inventory
            if (parseFloat(inv_object.amount) > 0){
                inv_object.amount = parseFloat(inv_object.amount);
                this.inventory = [...this.inventory, inv_object];
                this.notifyObservers();
                if (!this.inventory){
                    this.inventory = [];
                }
            }
        } else {
            let i = true;
            while (i){
                let current_amount = 0;
                this.inventory.forEach(inv => {
                    if (inv.label === inv_object.label){
                        current_amount = parseFloat(inv.amount); //TODO: convertera mängderna
                        i = false;
                    }
                })
                this.inventory = this.inventory.filter(e => e.label !== inv_object.label);
                inv_object.amount = parseFloat(inv_object.amount) + current_amount;
                this.inventory = [...this.inventory, inv_object];
            }
            this.notifyObservers();
        }
    }
    removeFromInventory(inv_object, amount){
        if (this.inventory.some(e => e.label === inv_object.label)){ //den finns att ta bort
            this.inventory.forEach(inv => {
                if (inv.label === inv_object.label && inv.amount - amount > 0) {
                    inv.amount = inv.amount - amount;
                    this.notifyObservers();
                } else if (inv.label === inv_object.label && inv.amount - amount == 0){
                    this.inventory = this.inventory.filter(e => e.label !== inv_object.label);
                    this.notifyObservers();
                }
            })
        } else {
            throw Error("Ingredient is not in your inventory");
        }
    }
    setInventory(inv){ //firebaseModel
        this.inventory=[...inv];
        this.notifyObservers();
    }
    getInventory(){
        return [...this.inventory];
    }
    getInventoryLabel() {
        let invLabel = [];
        this.inventory.forEach(ingr => invLabel=[...invLabel, ingr.label]);
        return invLabel;
    }
    addObserver(callback){
        this.subscribers=[...this.subscribers, callback];
        return () => this.removeObserver(callback);
    }
    notifyObservers(){
        this.subscribers.forEach(function(callback){
            callback();
        });
    }
    removeObserver(obs){
        this.subscribers=this.subscribers.filter(o => o !== obs);
    }
    
}
