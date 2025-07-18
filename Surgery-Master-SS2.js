  // Replace with your Web App URL
    const webAppUrlTH = 'https://script.google.com/macros/s/AKfycbzGJPpJGBSxU46EHUuON6LEhBHZPTXvkn5lp6S_exF4jHsYK0HcifAtoevjUpZyGE-T/exec';
    const webAppUrlEN = 'https://script.google.com/macros/s/AKfycbyeq_rIrjbGh0pCLVbpTSfEuSy0FJ1ybIzSI7Ch4iUldx7e4NrVS-XkISNmtBUxVlfbBw/exec';

    // Global object to store cell data
    let cellData = {};

    function loadData(cells, webAppUrl) {
      fetch(`${webAppUrl}?cells=${cells.join(',')}`)
        .then(response => response.json())
        .then(data => {
          cellData = data;

          // Update all elements dynamically
          document.querySelectorAll('[data-cell]').forEach(el => {
            const cell = el.getAttribute('data-cell');
            const value = fetchData(cell);

            if (el.tagName === 'IMG') {
              el.src = value || 'https://static.bangkokhospital.com/uploads/2025/02/default-image.png';
            } else if (el.tagName === 'A') {
              el.href = value || '#';
              //el.textContent = value || 'click'; // Display URL or fallback text
            } else {
              el.textContent = value;
            }
          });
        })
        .catch(error => console.error('Error fetching data:', error));
    }

    // Function to retrieve data from stored object
    function fetchData(cell) {
      return cellData[cell] || 'Loading...';
    }

    // Fetch the data once when the page loads
    window.onload = () => {
      const cellsToFetch = Array.from(document.querySelectorAll('[data-cell]')).map(el => el.getAttribute('data-cell'));
      const pathSegments = window.location.pathname.split('/').filter(Boolean);
      const firstPath = pathSegments.length > 0 ? `/${pathSegments[0]}/` : '/';
         console.log(firstPath);

      if (cellsToFetch.length > 0) {
          if (firstPath == '/en/'){
             loadData(cellsToFetch, webAppUrlEN);
          }else{
             loadData(cellsToFetch, webAppUrlTH);
          }
      }
    };