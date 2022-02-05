const REF = "DrinkModel" + 14;

function persistModel(model) {
    let loadingFirebase = true;

    model.addObserver(() => {
        if (!loadingFirebase)
        firebase.database().ref(REF).set({
            drinkID: model.getDrinkID(),
            drinks: model.getDrinks(),
            inventory: model.getInventory()

        });
    });
    firebase.database().ref(REF).on('value', (data) => {
            loadingFirebase = true;
            try {
                if (data.val()) {
                    model.setDrinkID(data.val().drinkID || 11118);
                    model.setDrink(data.val().drinks || []);
                    model.setInventory(data.val().inventory || []);
                }
            } catch (e) {
                console.log(e);
            } finally {
                loadingFirebase = false;
            }
        });
}