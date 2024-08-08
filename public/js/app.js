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

    msg1.textContent = 'Laden...'
    msg2.textContent = ''
    msg3.textContent = ''
    msg4.textContent = ''
    msg5.textContent = ''
    
    fetch('/weather?address=' + search.value).then((response) => {
        return response.json().then((data) => {
            if (data.error) {

                msg1.textContent = (data.error)
                msg2.textContent = ('')
                msg3.textContent = ('')
                msg4.textContent = ('')
                msg5.textContent = ('')
                
            } else {

                msg1.textContent = ('')

                msg2.textContent = ('Gevonden locatie: ' + data.locatie + '.')
                msg3.textContent = ('Op deze locatie is het nu ' + data.temperatuur + ' graden.')
                msg4.textContent = ('Het weer hier is nu ' + data.weer + ', met een gevoelstemperatuur van ' + data.gevoels_temperatuur + ' graden.')
                msg5.textContent = ('Vandaag is het hier minimaal ' + data.minimum_temperatuur + ' graden, met een maximum van ' + data.maximum_temperatuur + ' graden.')
            }
        })
    })  
})