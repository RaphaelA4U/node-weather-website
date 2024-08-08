const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

msg2.textContent = ('')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const msg1 = document.querySelector('#msg1')
    const msg2 = document.querySelector('#msg2')
    const msg3 = document.querySelector('#msg3')
    const msg4 = document.querySelector('#msg4')
    const msg5 = document.querySelector('#msg5')
    const msg6 = document.querySelector('#msg6')

    msg1.textContent = 'Laden...'
    msg2.textContent = ''
    msg3.textContent = ''
    msg4.textContent = ''
    msg5.textContent = ''
    msg6.textContent = ''
    
    fetch('/weather?address=' + search.value).then((response) => {
        return response.json().then((data) => {
            if (data.error) {

                msg1.textContent = (data.error)
                msg2.textContent = ('')
                msg3.textContent = ('')
                msg4.textContent = ('')
                msg5.textContent = ('')
                msg6.textContent = ('')
                
            } else {

                msg1.textContent = ('')

                msg2.textContent = ('Gevonden locatie: ' + data.locatie + '.')
                msg3.textContent = ('Op deze locatie is het nu ' + data.temperatuur + ' graden.')
                msg4.textContent = ('Het weer hier is nu ' + data.weer + ', met een gevoelstemperatuur van ' + data.gevoels_temperatuur + ' graden.')
                msg5.textContent = ('Vandaag is het hier minimaal ' + data.minimum_temperatuur + ' graden, met een maximum van ' + data.maximum_temperatuur + ' graden.')
                
                console.log('Sunrise:', data.sunrise);
                console.log('Sunset:', data.sunset);

                if (data.sunrise && data.sunset) {
                    const sunriseTime = new Date(data.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    const sunsetTime = new Date(data.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    msg6.textContent = ('De zon komt op om ' + sunriseTime + ' en gaat onder om ' + sunsetTime)
                } else {
                    msg6.textContent = ('ERROR: Zonsopkomst en/of zonsondergang niet beschikbaar.')
                }
            }
        })
    })  
})