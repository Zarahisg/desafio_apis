let monedas = document.querySelector ("#selectMoneda")


async function Monedas() {

    try {
        const currencyEndPoint = "https://mindicador.cl/api"
        const res = await fetch(currencyEndPoint)
        const fromJson = await res.json()

        let valueTpm = fromJson.tpm.valor;
        let valueLibra = fromJson.libra_cobre.valor;

        let selectMoneda = ''
        selectMoneda += `<option selected id="optionValue">Selecciona la moneda a convertir</option>
                        <option value=${valueTpm}>Tasa Política Monetaria</option>
                        <option value=${valueLibra}>Libra de Cobre</option>`
        
        const printMoneda = document.querySelector(".selectMoneda")
        printMoneda.innerHTML = selectMoneda
    }
    catch (err) {
        console.log(err)
    }
}


function Calcular() {
    let clp = document.getElementById("clpValue").value
    let currency = document.getElementById("currencyValue").value
    let option = document.getElementById("optionValue").innerText

    let convertion = (clp / currency).toFixed(2)

    let resultado = ''
    resultado += `<h5 class="card-text m-3">Resultado: $ ${convertion} ${option}</h5>`
    
    const printResult = document.querySelector("#resultado")
    printResult.innerHTML = resultado
}

