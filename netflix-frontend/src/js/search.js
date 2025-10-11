export function initSearch() {
  const searchButton = document.querySelector('.search_button');
  const searchInput = document.querySelector('.search_input');

  searchButton.addEventListener('click', (event) => {
    // 이벤트 버블링을 막아 document의 클릭 이벤트에 영향을 주지 않도록 함
    event.stopPropagation(); 
    searchInput.classList.toggle('active');
    
    // 검색창이 활성화되면 포커스를 줌
    if (searchInput.classList.contains('active')) {
      searchInput.focus();
    }
  });

  // 검색창 외부를 클릭하면 검색창을 닫음
  document.addEventListener('click', (event) => {
    if (searchInput.classList.contains('active') && event.target !== searchInput) {
      searchInput.classList.remove('active');
    }
  });
}