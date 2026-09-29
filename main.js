const trade = document.querySelector('#trade')
const zip = document.querySelector('#zip')
document.querySelector('button').addEventListener('click', getQuote);



function getQuote(){
    const tradeVal = trade.value
    const zipVal = zip.value
    const url = `https://estimationpro.ai/api/v1/costs?trade=${tradeVal}&zip=${zipVal}`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const items = data.data.items
            const filteredItems = items.filter((item) => item.regionallyAdjusted === true)

            const container = document.querySelector('#services-container');

            container.innerHTML = ''

            //create a card for each service
            filteredItems.forEach(item => {
                
                const card = document.createElement('section');
                card.classList.add('service-card');

                const title = document.createElement('h2');
                title.classList.add('service-title');
                title.innerText = item.id.replaceAll('-', ' ');

                const description = document.createElement('p');
                description.classList.add('service-description');
                description.innerText = item.description;

                const prices = document.createElement('section')
                prices.classList.add('service-prices');

                const low = document.createElement('span');
                low.classList.add('low');
                low.innerText = `Low: $${item.low.toFixed(2)}`

                const typical = document.createElement('span');
                typical.classList.add('typical');
                typical.innerText = `Typical: $${item.typical.toFixed(2)}`;

                const high = document.createElement('span');
                high.classList.add('high');
                high.innerText = `High: $${item.high.toFixed(2)}`;

                const unit = document.createElement('p');
                unit.classList.add('service-unit');
                unit.innerText = `Per ${item.unit}`


                prices.appendChild(low);
                prices.appendChild(typical);
                prices.appendChild(high);


                card.appendChild(title);
                card.appendChild(description);
                card.appendChild(prices);
                card.appendChild(unit);


                container.appendChild(card);

            });
        })
}

trade.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevents unintended form submission behavior
    getQuote();
  }
});

zip.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevents unintended form submission behavior
    getQuote();
  }
});