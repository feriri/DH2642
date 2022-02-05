function usePromise(promise) { //from tw2_3
    const [data, setData]= React.useState(null);
    const [error, setError] =React.useState(null);
    React.useEffect(function(){
      setData(null);
      setError(null);
      if(promise != null){ 
        //console.log("usePromise => promise != null");                  
        promise.then(data=>setData(data)).catch(error => setError(error));
      }
    }, [promise]);
    return [data,error];
  }