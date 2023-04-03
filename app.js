$(function () {
   $(document).scroll(function () {
      var $nav = $(".navbar");
      $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
   });
});

const navLinks = document.querySelectorAll('navbar a');

navLinks.forEach(link => {
   link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
   });
});






const options = {
   method: 'GET',
   url: 'https://api.coingecko.com/api/v3/coins/markets',
   params: { vs_currency: 'gbp', order: 'market_cap_desc', per_page: '50', page: '1' }
};

axios.request(options).then(function (response) {
   console.log(response.data);


   const firstFourObjects = response.data.slice(0, 4);

   for (let i = 0; i < firstFourObjects.length; i++) {
      const object = firstFourObjects[i];

      // create HTML elements
      const container = document.createElement('div');
      const nameElement = document.createElement('p');
      const ageElement = document.createElement('p');
      const imgElement = document.createElement('img');
      const div = document.getElementById('div');

      // set properties of HTML elements
      nameElement.innerHTML = `${object.name}`;
      ageElement.innerHTML = ` ${object.market_cap_change_percentage_24h
         }`;
      imgElement.src = object.image;

      // append HTML elements to container element
      container.appendChild(nameElement);
      container.appendChild(ageElement);
      container.appendChild(imgElement);

      div.appendChild(container); // or append to a container element
   }


   // JavaScript code to display the data in a table


   const table = document.getElementById('table');
   const tbody = table.getElementsByTagName('tbody')[0];



   // Use .map() to create an array of table rows
   const rows = response.data.map(({ id, name, price_change_percentage_24h, market_cap, image, current_price
   }) => {
      const tdImage = document.createElement('td');
      const img = document.createElement('img');
      img.src = image;
      const tr = document.createElement('tr');
      const tdId = document.createElement('td');
      tdId.textContent = id;
      const tdName = document.createElement('td');
      tdName.textContent = name;
      const tdPrice = document.createElement('td');
      tdPrice.textContent = '$' + current_price.toFixed(2);
      const tdValue = document.createElement('td');
      tdValue.textContent = price_change_percentage_24h.toFixed(2) + ' ' + '%'

         ;
      const tdMarketVal = document.createElement('td');
      tdMarketVal.textContent = '$' + market_cap;
      let tdNew = tdMarketVal.toString();
      console.log(tdNew)
         ;

      tdImage.appendChild(img);
      tr.appendChild(tdImage);

      tr.appendChild(tdName);
      tr.appendChild(tdPrice);
      tr.appendChild(tdValue);
      tr.appendChild(tdMarketVal);



      return tr;
   });

   // Add each row to the table body
   rows.forEach(row => {
      tbody.appendChild(row);
   });

   const table1 = document.querySelector('table');
   const cells = table1.querySelectorAll('td');

   cells.forEach((cell) => {
      if (cell.textContent.startsWith('-')) {
         cell.style.color = 'red';
      }
   });



}).catch(function (error) {
   console.error(error);
});






