// 검색 및 필터링 기능
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cardLinks = document.querySelectorAll('.card-link');

    let currentFilter = 'all';
    let currentSearch = '';

    // 검색 입력 이벤트
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.toLowerCase();
        filterCards();
    });

    // 필터 버튼 이벤트
    filterButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            // 이전 활성 버튼 제거
            filterButtons.forEach((b) => b.classList.remove('active'));
            // 현재 버튼 활성화
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            filterCards();
        });
    });

    // 카드 필터링 함수
    function filterCards() {
        let visibleCount = 0;

        cardLinks.forEach((card) => {
            const category = card.dataset.category;
            const title = card.dataset.title.toLowerCase();

            // 카테고리 필터 확인
            const categoryMatch =
                currentFilter === 'all' || category === currentFilter;

            // 검색어 필터 확인
            const searchMatch =
                currentSearch === '' || title.includes(currentSearch);

            // 두 조건 모두 만족하면 표시
            if (categoryMatch && searchMatch) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease-in';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // 검색 결과 없을 때 메시지 표시 (선택사항)
        const grid = document.querySelector('.cards-grid');
        let noResultMsg = grid.querySelector('.no-result');
        
        if (visibleCount === 0) {
            if (!noResultMsg) {
                noResultMsg = document.createElement('div');
                noResultMsg.className = 'no-result';
                noResultMsg.textContent = '검색 결과가 없습니다.';
                grid.appendChild(noResultMsg);
            }
        } else {
            if (noResultMsg) {
                noResultMsg.remove();
            }
        }
    }
});

// 페이드인 애니메이션
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .no-result {
        grid-column: 1 / -1;
        text-align: center;
        padding: 40px 20px;
        color: #666;
        font-size: 1.1rem;
    }
`;
document.head.appendChild(style);

console.log('Card News App loaded with search & filter functionality!');
