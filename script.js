// const apiUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"


// // fetching data using .then
// fetch(apiUrl)
//     .then(Response => Response.json())
//     .then(data => renderTable(data))


// //ftech using async/await
// async function fetchData() {
//     try {
//         const response = await fetch(apiUrl)
//         const data = await response.json()
//         renderTable(data);
//     } catch (error) {
//         console.log('Error fteching data', error)
//     }
// }

// async function renderTable(data) {
//     const tableBody = document.getElementById('tableBody')
//     tableBody.innerHTML = ''

//     data.forEach(item => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//         <td>${item.name}</td>
//             <td>${item.symbol}</td>
//             <td>${item.current_price}</td>
//             <td>${item.total_volume}</td>
//             <td>${item.market_cap}</td>
//             <td>${item.price_change_percentage_24h}</td>
//             <td><img src="${item.image}" alt="${item.name}" width="30"></td>
//         `;
//         tableBody.appendChild(row);

//     })
// }
 
// (async ()=>{
// let cryptoData = await fetchData(); // Store fetched data


// if (!Array.isArray(cryptoData) || cryptoData.length === 0) {
//     console.error("No data available.");
//     return; // Exit if no data
// }

//  document.getElementById('Search').addEventListener('input',(event)=>{
//     const searchTerm = event.target.value.toLowerCase();
//     const filteredData = cryptoData.filter(item=> 
//         item.name.toLowerCase().includes(searchTerm) ||
//         item.symbol.toLowerCase().includes(searchTerm)
//     );
//    renderTable(filteredData);
//  })

//  document.getElementById('SortMarketCap').addEventListener('click',()=>{
//     const sortedData = [...cryptoData].sort((a,b)=>b.market_cap - a.market_cap)
//     renderTable(sortedData);
//  })

//  document.getElementById('SortChange').addEventListener('click',()=>{
//     const sortedData = [...cryptoData].sort((a,b)=>b.price_change_percentage_24h - a.price_change_percentage_24h)
//     renderTable(sortedData);
//  });
// })();



const apiUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

// Fetching data using .then
fetch(apiUrl)
    .then(response => response.json())
    .then(data => renderTable(data));

// Fetch using async/await
async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data; // Return the fetched data
    } catch (error) {
        console.log('Error fetching data', error);
        return []; // Return an empty array in case of error
    }
}

async function renderTable(data) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.symbol}</td>
            <td>${item.current_price}</td>
            <td>${item.total_volume}</td>
            <td>${item.market_cap}</td>
            <td>${item.price_change_percentage_24h}</td>
            <td><img src="${item.image}" alt="${item.name}" width="30"></td>
        `;
        tableBody.appendChild(row);
    });
}

// Immediately-invoked async function to fetch data and set up event listeners
(async () => {
    const cryptoData = await fetchData(); // Store fetched data

    // Check if cryptoData has been assigned correctly
    if (!Array.isArray(cryptoData) || cryptoData.length === 0) {
        console.error("No data available.");
        return; // Exit if no data
    }

    // Search functionality
    document.getElementById('search').addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredData = cryptoData.filter(item => 
            item.name.toLowerCase().includes(searchTerm) ||
            item.symbol.toLowerCase().includes(searchTerm)
        );
        renderTable(filteredData);
    });

    // Sort by Market Cap
    document.getElementById('SortMarketCap').addEventListener('click', () => {
        const sortedData = [...cryptoData].sort((a, b) => b.market_cap - a.market_cap);
        renderTable(sortedData);
    });

    // Sort by Percentage Change
    document.getElementById('SortChange').addEventListener('click', () => {
        const sortedData = [...cryptoData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
        renderTable(sortedData);
    });
})();
