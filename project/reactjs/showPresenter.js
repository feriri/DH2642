function Show({ children, hash }) {
    const stateHash = useLocationHash();

    return stateHash === hash && children;
}

function useLocationHash() {
    const [hash, setHash] = React.useState(window.location.hash);

    React.useEffect(() => {
        window.addEventListener("hashchange", () => setHash(window.location.hash));

        return () => {
            window.removeEventListener("hashchange", () => setHash(window.location.hash));
        };
    }, []);

    return hash;
}
