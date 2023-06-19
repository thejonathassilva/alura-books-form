async function searchAddress(cep) {
    try {
        let searchCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        let convertedAddress = await searchCEP.json();
        if (convertedAddress.erro) {
            throw Error('CEP não existe!');
        }
        return convertedAddress;
    } catch (e) {
        return e;
    }
}

let ceps = ['01001000', '01001001'];
let allCeps = ceps.map(values => searchAddress(values))
Promise.all(allCeps).then(response => console.log(response))