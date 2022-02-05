const RecipeAPI={   // JS object creation literal
     apiCallCocktail(params) {
        return fetch("https://the-cocktail-db.p.rapidapi.com/" +params, {
            "method": "GET",              // HTTP method
            "headers": {                  // HTTP headers
                'X-Mashape-Key' : API_KEY,
                "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
            }
        })
            .then((response) => {
                if (response.ok) return response;
                else throw new Error(response.statusText);
            })
            .then((response) => response.json()); // from HTTP response headers to HTTP response data
    },
    searchDrinkName(params){ return RecipeAPI.apiCallCocktail("search.php?s="+params);},
    searchDrinkIngridient(params){ return RecipeAPI.apiCallCocktail("filter.php?i="+params);},
    searchDrinkId(params){ return RecipeAPI.apiCallCocktail("lookup.php?i="+params);},
    searchMultIngr(params){ return RecipeAPI.apiCallCocktail("filter.php?i="+params);},
    getRandomDrink(){ return RecipeAPI.apiCallCocktail("/random.php");},
    listIngredients(){ return RecipeAPI.apiCallCocktail("/list.php?i=list");}
};
