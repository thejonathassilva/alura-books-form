async function searchAddress(cep) {
    let errorMessage = document.querySelector('#erro');
    errorMessage.innerHTML = "";
    try {
        let searchCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        let convertedAddress = await searchCEP.json();
        if (convertedAddress.erro) {
            throw Error('CEP não existe!');
        }

        let city = document.querySelector('#cidade');
        let address = document.querySelector('#endereco');
        let state = document.querySelector('#estado');
        let district = document.querySelector('#bairro');

        city.value = convertedAddress.localidade;
        address.value = convertedAddress.logradouro;
        state.value = convertedAddress.uf;
        district.value = convertedAddress.bairro;

        console.log(convertedAddress)
        return convertedAddress;
    } catch (e) {
        errorMessage.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
        console.log(e)
        return e;
    }
}

let cep = document.querySelector('#cep');
cep.addEventListener('focusout', () => searchAddress(cep.value));

// let ceps = ['01001000', '01001001'];
// let allCeps = ceps.map(values => searchAddress(values))
// Promise.all(allCeps).then(response => console.log(response))