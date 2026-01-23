// Category Listing Page JavaScript
// Filter accordion, price slider, sorting

// ============================================
// FILTER ACCORDION
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const filterToggles = document.querySelectorAll('.filter-toggle');

    filterToggles.forEach((toggle) => {
        toggle.addEventListener('click', function () {
            const filterId = this.getAttribute('data-filter');
            const content = document.getElementById(`filter-${filterId}`);

            this.classList.toggle('active');
            content.classList.toggle('active');
        });
    });
});

// ============================================
// PRICE SLIDER
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const sliderMin = document.querySelector('.slider-min');
    const sliderMax = document.querySelector('.slider-max');
    const sliderRange = document.querySelector('.slider-range');
    const priceInputs = document.querySelectorAll('.price-inputs input');

    if (sliderMin && sliderMax && sliderRange) {
        function updateSlider() {
            const min = parseInt(sliderMin.value);
            const max = parseInt(sliderMax.value);
            const rangeMax = parseInt(sliderMax.max);

            if (min > max - 10000) {
                sliderMin.value = max - 10000;
            }
            if (max < min + 10000) {
                sliderMax.value = min + 10000;
            }

            const percentMin = (sliderMin.value / rangeMax) * 100;
            const percentMax = (sliderMax.value / rangeMax) * 100;

            sliderRange.style.left = percentMin + '%';
            sliderRange.style.right = 100 - percentMax + '%';

            // Update inputs
            priceInputs[0].value = sliderMin.value;
            priceInputs[1].value = sliderMax.value;
        }

        sliderMin.addEventListener('input', updateSlider);
        sliderMax.addEventListener('input', updateSlider);

        // Update slider from input
        priceInputs.forEach((input, index) => {
            input.addEventListener('change', function () {
                if (index === 0) {
                    sliderMin.value = this.value;
                } else {
                    sliderMax.value = this.value;
                }
                updateSlider();
            });
        });

        updateSlider();
    }
});

// ============================================
// CLEAR FILTERS
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const clearBtn = document.querySelector('.clear-filters');

    if (clearBtn) {
        clearBtn.addEventListener('click', function () {
            // Reset checkboxes
            document
                .querySelectorAll('.checkbox-item input[type="checkbox"]')
                .forEach((cb) => (cb.checked = false));

            // Reset radio buttons
            document
                .querySelectorAll('.rating-item input[type="radio"]')
                .forEach((rb) => (rb.checked = false));

            // Reset stock toggle
            document
                .querySelectorAll('.toggle-checkbox')
                .forEach((toggle) => (toggle.checked = false));

            // Reset price range
            const sliderMin = document.querySelector('.slider-min');
            const sliderMax = document.querySelector('.slider-max');
            if (sliderMin && sliderMax) {
                sliderMin.value = 0;
                sliderMax.value = 1000000;
                sliderMin.dispatchEvent(new Event('input'));
            }

            // Reset select
            document.querySelectorAll('.filter-select').forEach((select) => {
                select.selectedIndex = 0;
            });

            console.log('Filters cleared');
        });
    }
});

// ============================================
// SORTING
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const sortSelect = document.querySelector('.sort-select');

    if (sortSelect) {
        sortSelect.addEventListener('change', function () {
            const sortValue = this.value;
            console.log('Sorting by:', sortValue);

            // Here you would typically:
            // 1. Update URL params
            // 2. Fetch sorted data from API
            // 3. Re-render product grid
        });
    }
});

// ============================================
// FILTER SEARCH (Author)
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const filterSearch = document.querySelector('.filter-search input');

    if (filterSearch) {
        filterSearch.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();
            const checkboxItems = document.querySelectorAll('.checkbox-item');

            checkboxItems.forEach((item) => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
});

// ============================================
// SHOW MORE AUTHORS
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const showMoreBtn = document.querySelector('.show-more');

    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', function () {
            const checkboxList = this.previousElementSibling;

            if (checkboxList.style.maxHeight === 'none') {
                checkboxList.style.maxHeight = '200px';
                this.textContent = 'Xem thêm';
            } else {
                checkboxList.style.maxHeight = 'none';
                this.textContent = 'Thu gọn';
            }
        });
    }
});

// ============================================
// PAGINATION
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const paginationBtns = document.querySelectorAll('.pagination-btn');

    paginationBtns.forEach((btn) => {
        btn.addEventListener('click', function () {
            if (this.disabled) return;

            // Remove active from all
            paginationBtns.forEach((b) => b.classList.remove('active'));

            // Add active to clicked (if it's a number button)
            if (!this.querySelector('svg')) {
                this.classList.add('active');
            }

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });

            console.log('Navigate to page');
        });
    });
});

// ============================================
// FILTER CHANGE TRACKING
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    // Track checkbox changes
    document
        .querySelectorAll('.checkbox-item input[type="checkbox"]')
        .forEach((cb) => {
            cb.addEventListener('change', function () {
                console.log(
                    'Checkbox changed:',
                    this.parentElement.textContent.trim(),
                    this.checked
                );
                // Apply filters
                applyFilters();
            });
        });

    // Track rating changes
    document
        .querySelectorAll('.rating-item input[type="radio"]')
        .forEach((rb) => {
            rb.addEventListener('change', function () {
                console.log('Rating filter:', this.value);
                applyFilters();
            });
        });

    // Track stock toggle
    document.querySelectorAll('.toggle-checkbox').forEach((toggle) => {
        toggle.addEventListener('change', function () {
            console.log('Stock filter:', this.checked);
            applyFilters();
        });
    });

    function applyFilters() {
        // Here you would typically:
        // 1. Collect all active filters
        // 2. Update URL params
        // 3. Fetch filtered data from API
        // 4. Re-render product grid
        console.log('Applying filters...');
    }
});
