
const selector = document.querySelector('#currencyValue')
//get uf data
tpmData = async () => {
    try {
        const res = await fetch("https://mindicador.cl/api/tpm")
        const data = await res.json()
        const currencyDate = data.serie
        const currencyValue = data.serie
        let tpmPastDates = currencyDate.map((value) => {
            const dates = new Date(value.fecha).toDateString()
            return dates
        })
        let tpmPastValues = currencyValue.map((value) => {
            const pastValue = value.valor
            return pastValue
        })
        return { tpmPastDates, tpmPastValues }
    } catch (error) {
        console.log(error)
    }
}

libraData = async () => {
    try {
        const res = await fetch("https://mindicador.cl/api/libra")
        const data = await res.json()
        const currencyDate = data.serie
        const currencyValue = data.serie
        let libraPastDates = currencyDate.map((value) => {
            const dates = new Date(value.fecha).toDateString()
            return dates
        })
        let libraPastValues = currencyValue.map((value) => {
            const pastValue = value.valor
            return pastValue
        })
        return { libraPastDates, libraPastValues }
    } catch (error) {
        console.log(error)
    }
}

//config graph and values
async function configGraphAndRender() {
    const grafica = document.querySelector('#myChart')
    try {
        tpm = await tpmData()
        libra = await libraData()
    } catch (error) {
    }
    const labels = tpm.tpmPastDates
    const data = {
        labels: labels,
        datasets: [{
            label: 'Elige una moneda de conversión',
            backgroundColor: '#21277a',
            data: ''
        }]
    };
    const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                x: {
                    ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 8,
                    }
                }
            }
        }
    };


    const graphicmap = new Chart(grafica, config)
    graphicmap.render()

    selector.addEventListener('change', updateChart = () => {
        if (selector.value === 'tpm') {
            graphicmap.data.datasets[0].label = 'Valor tpm en el tiempo'
            graphicmap.data.datasets[0].data = tpm.tpmPastDates
            graphicmap.update();
            //console.log(selector.value)
        } else if (selector.value === 'libra') {
            graphicmap.data.datasets[0].label = 'Valor libra en el tiempo'
            graphicmap.data.datasets[0].data = libra.libraPastValues
            graphicmap.update();
            //console.log(selector.value)
        } else {
            graphicmap.data.datasets[0].label = ''
            graphicmap.data.datasets[0].data = ''
            graphicmap.update()
        }
    })
}

//call graph
document.addEventListener('DOMContentLoaded', (event) => {
    configGraphAndRender();
});


