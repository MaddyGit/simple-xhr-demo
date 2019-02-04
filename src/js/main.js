document.onreadystatechange = function(rscEvent){
    if (document.readyState === 'complete') {
        let PicButton = document.querySelector('a#show-pic')
        let QuoteOneBtn = document.querySelector('a#show-direct-quote')
        let QuoteTwoBtn = document.querySelector('a#show-indirect-quote')
        let CalcBtn = document.querySelector('a#show-calc')
        let VideoBtn = document.querySelector('a#video')

        if (PicButton) {
            PicButton.addEventListener('click', function(event){
                event.preventDefault()
                fillPicture(String(Math.ceil(Math.random() * 20)))
                return false
            })
        }

        if (QuoteOneBtn) {
            QuoteOneBtn.addEventListener('click', function(event){
                event.preventDefault()
                fillQuote(undefined, String(Math.ceil(Math.random() * 100)))
                return false
            })
        }

        if (QuoteTwoBtn) {
            QuoteTwoBtn.addEventListener('click', function(event){
                event.preventDefault()
                fillQuote('quote_indirect', String(Math.ceil(Math.random() * 20)))
                return false
            })
        }

        if (CalcBtn) {
            CalcBtn.addEventListener('click', function(event){
                event.preventDefault()
                fillCalcForm()
                return false
            })
        }

        if (VideoBtn) {
            VideoBtn.addEventListener('click', function(event){
                event.preventDefault()
                embedVideo()
                return false
            })
        }

        function fillQuote(quoteType = 'quote', number) {
            fetchPost(quoteType, number)
            .then(res => res.text())
            .then(res => putResult('div#result-box', res))
        }

        function fillPicture(number) {
            let ResultDiv = document.querySelector('div#result-box')
            if (ResultDiv) {
                while (ResultDiv.lastChild) ResultDiv.removeChild(ResultDiv.lastChild)
                let Image = document.createElement('img')
                Image.setAttribute('style', 'width: 100%; height: 100%;')
                fetchPost('image', number)
                .then(res => res.blob())
                .then(res => !!(Image.src = URL.createObjectURL(res)))
                ResultDiv.appendChild(Image)
            }
            else console.log('result div not found')
        }

        async function fillCalcForm() {
            await fetchPost('calcform')
            .then(res => res.text())
            .then(res => putResult('div#result-box',res))
            let CalcForm = document.querySelector('form#calc')
            if (CalcForm) {
                CalcForm.addEventListener('submit', function(event){
                    event.preventDefault()
                    fetchPost('calcformcalc', 0, new FormData(CalcForm))
                    .then(res => res.text())
                    .then(res => putResult('div#calc-res', res))
                    
                    return false
                })
            }
            else console.error('Form Not Found!')
        }

        function embedVideo() {
            fetchPost('embedvideo')
            .then(res => res.text())
            .then(res => putResult('div#result-box', res))
        }

        function putResult(selector, content){
            let ResultDiv = document.querySelector(selector)
            if (ResultDiv) {
                while (ResultDiv.lastChild) ResultDiv.removeChild(ResultDiv.lastChild)
                ResultDiv.innerHTML = content
            }
            else console.log('result div not found')
        }

        function fetchPost(what, number, formData) {
            let contentType

            switch (what) {
                case 'quote': case 'quote_indirect':
                    contentType = 'text/plain'
                    break

                case 'image':
                    contentType = 'image/jpeg'
                    break

                case 'calcform': case 'embedvideo':
                    contentType = 'text/html'
                    break

                case 'calcformcalc':
                    contentType = undefined
                    break
            
                default:
                    return
            }

            return fetch('/echosome/index.php', {
                method: 'POST'
                , headers: contentType ? {
                    'Content-Type': contentType
                    , 'requesting': what
                    , 'number': number
                } : {
                    'requesting': what 
                    , 'number': number 
                }
                , body: formData
            })
        }
    }
}