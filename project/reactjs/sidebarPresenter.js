function SidebarPresenter(props) {
    const [drinks, setDrinks] = React.useState(props.model.drinks);

    React.useEffect(() => {
        const cb = () => setDrinks(props.model.drinks);
        props.model.addObserver(cb);

        return () => {
            props.model.removeObserver(cb);
        };
    }, []);

    return <SidebarView
        removeDrink={id => props.model.removeDrink(id)}
        drinks={props.model.drinks}
    />
}
