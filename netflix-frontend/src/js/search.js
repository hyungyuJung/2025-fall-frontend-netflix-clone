// Debounce function
function debounce(func, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Perform search by querying the backend API - print results to console for now
async function performSearch(query) {
  // end early if query is empty
  if (!query || query.trim() === '') {
    console.log('검색어가 없습니다.');
    return;
  }

  // Express Server API URL
  const searchUrl = `http://localhost:3000/search?q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(searchUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const results = await response.json();

    // check results in console for now
    console.log('검색 결과:', results);

  } catch (error) {
    console.error('검색 중 오류가 발생했습니다:', error);
  }
}


/* Setup Search */
export function initSearch() {
  const searchButton = document.querySelector('.search_button');
  const searchInput = document.querySelector('.search_input');

  // 300ms debounced search function
  const debouncedSearch = debounce(performSearch, 300);

  // toggle search input visibility on button click
  searchButton.addEventListener('click', (event) => {
    event.stopPropagation();
    searchInput.classList.toggle('active');
    
    if (searchInput.classList.contains('active')) {
      searchInput.focus();
    }
  });

  // perfom debounced search on input
  searchInput.addEventListener('input', () => {
    debouncedSearch(searchInput.value);
  });

  // close search input when clicking outside
  document.addEventListener('click', (event) => {
    if (searchInput.classList.contains('active') && event.target !== searchInput) {
      searchInput.classList.remove('active');
    }
  });
}