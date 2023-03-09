export const fetchData = (endpoint, acessToken) => {

    const headers = new Headers();
    const bearer = `Bearer ${acessToken}`;
    headers.append('Authorization', bearer);
    
    const options = {
        method: 'GET',
        headers: headers
    };

    return fetch(endpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));

}