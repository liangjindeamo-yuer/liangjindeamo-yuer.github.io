// assets/js/publications-filter.js

document.addEventListener('DOMContentLoaded', function () {
  console.log('[pub-filter] DOM loaded (external JS)');

  const categoryFilter = document.getElementById('categoryFilter');
  const typeFilter = document.getElementById('typeFilter');
  const pubList = document.getElementById('pubList');

  console.log('[pub-filter] elements:', {
    categoryFilter,
    typeFilter,
    pubList
  });

  if (!categoryFilter || !typeFilter || !pubList) {
    console.warn('[pub-filter] some elements not found, abort.');
    return;
  }

  const items = Array.prototype.slice.call(
    pubList.querySelectorAll('.pub-item')
  );
  const countVisibleSpan = document.getElementById('pubCountVisible');
  const countTotalSpan = document.getElementById('pubCountTotal');

  const total = items.length;
  if (countTotalSpan) countTotalSpan.textContent = total.toString();

  function updateFilter() {
    const cat = categoryFilter.value.trim().toLowerCase();
    const type = typeFilter.value.trim().toLowerCase();
    console.log('[pub-filter] updateFilter', { cat, type });

    let visibleCount = 0;

    items.forEach(function (item) {
      const itemCat = (item.dataset.category || '').trim().toLowerCase();
      const itemType = (item.dataset.type || '').trim().toLowerCase();

      const matchCat = (cat === 'all') || (itemCat === cat);
      const matchType = (type === 'all') || (itemType === type);

      if (matchCat && matchType) {
        item.style.display = '';
        visibleCount += 1;
      } else {
        item.style.display = 'none';
      }
    });

    if (countVisibleSpan) countVisibleSpan.textContent = visibleCount.toString();
  }

  // 监听下拉框变化
  categoryFilter.addEventListener('change', function () {
    console.log('[pub-filter] category changed to', this.value);
    updateFilter();
  });

  typeFilter.addEventListener('change', function () {
    console.log('[pub-filter] type changed to', this.value);
    updateFilter();
  });

  // 点击 Show citation / Hide citation
  pubList.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('pub-citation-toggle')) {
      const toggle = e.target;
      const citationDiv = toggle.closest('.pub-item').querySelector('.pub-citation');
      if (!citationDiv) return;
      if (citationDiv.style.display === 'none' || citationDiv.style.display === '') {
        citationDiv.style.display = 'block';
        toggle.textContent = 'Hide citation';
      } else {
        citationDiv.style.display = 'none';
        toggle.textContent = 'Show citation';
      }
    }
  });

  // 初始化：页面打开时先算一遍
  updateFilter();
});