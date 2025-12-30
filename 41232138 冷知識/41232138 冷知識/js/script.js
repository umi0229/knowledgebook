document.addEventListener('DOMContentLoaded', function() {
    // 獲取所有需要操作的元素
    const filterTags = document.querySelectorAll('.filter-tag'); // 所有篩選按鈕
    const knowledgeCards = document.querySelectorAll('.knowledge-card'); // 所有知識卡片
    const searchInput = document.getElementById('search-input'); // 搜尋輸入框
    const gridContainer = document.querySelector('.knowledge-grid'); // 卡片容器

    // --- 1. 篩選功能 ---
    
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // 獲取點擊按鈕的分類值 (例如: 'animal'
            const filterValue = this.getAttribute('data-filter');
            
            // 移除所有按鈕的 'active' 狀態
            filterTags.forEach(t => t.classList.remove('active'));
            
            // 將當前點擊的按鈕設為 'active' 狀態
            this.classList.add('active');
            
            // 執行篩選邏輯
            filterCards(filterValue, searchInput.value);
        });
    });

    // --- 2. 即時搜尋功能 (Live Search) ---

    searchInput.addEventListener('input', function() {
        // 獲取當前選中的篩選標籤
        const activeTag = document.querySelector('.filter-tag.active');
        const filterValue = activeTag ? activeTag.getAttribute('data-filter') : 'all';
        
        // 執行篩選邏輯
        filterCards(filterValue, this.value);
    });


    // --- 3. 主要篩選函數 (整合 Tag 篩選和即時搜尋) ---

    function filterCards(category, searchTerm) {
        const normalizedSearchTerm = searchTerm.trim().toLowerCase(); // 處理搜尋文字
        let visibleCount = 0; // 計算可見卡片數
        
        knowledgeCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category'); // 卡片的分類
            const cardTitle = card.querySelector('.card-snippet').textContent.toLowerCase(); // 卡片的摘要內容
            
            // 步驟 A: 檢查是否符合分類
            const categoryMatch = (category === 'all' || cardCategory === category);
            
            // 步驟 B: 檢查是否符合搜尋關鍵字
            const searchMatch = cardTitle.includes(normalizedSearchTerm);
            
            // 最終判斷：必須同時符合分類和搜尋
            if (categoryMatch && searchMatch) {
                // 顯示卡片 (利用 CSS 的 fade-in/fade-out 效果)
                card.classList.remove('hidden-card');
                // 讓卡片自己跑到最前面
                gridContainer.prepend(card);
                visibleCount++;
            } else {
                // 隱藏卡片
                card.classList.add('hidden-card');
            }
        });

        // 可選：當沒有卡片時，顯示提示訊息
        if (visibleCount === 0) {
             // 這裡可以插入程式碼來顯示 "查無結果" 訊息
        }
    }

    // 初始化：確保頁面載入時所有卡片都是可見的
    filterCards('all', '');
});