function promiseNoData(promise=null, data=null, error=null){
    if ((!promise)&&(!data)&&(!error)){
    	return (<span>no data</span>);
    } else if (promise&&(!data)&&(!error)){
    	return (<img src="http://www.csc.kth.se/~cristi/loading.gif"/>);
    } else if (promise&&(!data)&&error){
    	return (<span>some error</span>);
    } else {
    	return null;
    }
}