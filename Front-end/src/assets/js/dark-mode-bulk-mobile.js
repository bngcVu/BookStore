/**
 * Dark Mode & Theme Management
 * Handles theme switching and persistence
 */

class ThemeManager {
    constructor() {
        this.currentTheme = this.getSavedTheme() || 'light';
        this.init();
    }

    init() {
        // Apply saved theme
        this.applyTheme(this.currentTheme);

        // Create toggle button
        this.createToggleButton();

        // Listen for system preference changes
        this.watchSystemPreference();
    }

    createToggleButton() {
        // Check if button already exists
        if (document.querySelector('.dark-mode-toggle')) return;

        const button = document.createElement('button');
        button.className = 'dark-mode-toggle';
        button.setAttribute('aria-label', 'Toggle dark mode');
        button.innerHTML = `
            <svg class="icon-sun" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg class="icon-moon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
        `;

        button.addEventListener('click', () => this.toggleTheme());
        document.body.appendChild(button);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        this.saveTheme(newTheme);
    }

    applyTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);

        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('themechange', {
            detail: { theme }
        }));
    }

    saveTheme(theme) {
        localStorage.setItem('admin-theme', theme);
    }

    getSavedTheme() {
        return localStorage.getItem('admin-theme');
    }

    watchSystemPreference() {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

        darkModeQuery.addEventListener('change', (e) => {
            // Only auto-switch if user hasn't set a preference
            if (!this.getSavedTheme()) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    // Get current theme
    getTheme() {
        return this.currentTheme;
    }
}

/**
 * Bulk Actions Manager
 * Handles bulk selection and actions on table rows
 */

class BulkActionsManager {
    constructor(tableSelector) {
        this.table = document.querySelector(tableSelector);
        if (!this.table) return;

        this.selectedRows = new Set();
        this.init();
    }

    init() {
        // Add checkboxes to table
        this.addCheckboxes();

        // Create toolbar
        this.createToolbar();

        // Setup event listeners
        this.setupListeners();
    }

    addCheckboxes() {
        const thead = this.table.querySelector('thead tr');
        const tbody = this.table.querySelector('tbody');

        // Add header checkbox
        const thCheckbox = document.createElement('th');
        thCheckbox.className = 'checkbox-col';
        thCheckbox.innerHTML = '<input type="checkbox" class="select-all-checkbox" aria-label="Select all">';
        thead.insertBefore(thCheckbox, thead.firstChild);

        // Add row checkboxes
        tbody.querySelectorAll('tr').forEach((row, index) => {
            const tdCheckbox = document.createElement('td');
            tdCheckbox.className = 'checkbox-col';
            tdCheckbox.innerHTML = `<input type="checkbox" class="row-checkbox" data-row-id="${index}" aria-label="Select row">`;
            row.insertBefore(tdCheckbox, row.firstChild);
        });
    }

    createToolbar() {
        const toolbar = document.createElement('div');
        toolbar.className = 'bulk-actions-toolbar';
        toolbar.innerHTML = `
            <div class="bulk-actions-info">
                <span class="bulk-actions-count">0 selected</span>
                <button class="bulk-action-btn" onclick="bulkActions.deselectAll()">Clear Selection</button>
            </div>
            <div class="bulk-actions-buttons">
                <button class="bulk-action-btn" onclick="bulkActions.exportSelected()">
                    Export
                </button>
                <button class="bulk-action-btn danger" onclick="bulkActions.deleteSelected()">
                    Delete
                </button>
            </div>
        `;

        // Insert before table
        this.table.parentNode.insertBefore(toolbar, this.table);
        this.toolbar = toolbar;
    }

    setupListeners() {
        // Select all checkbox
        const selectAll = this.table.querySelector('.select-all-checkbox');
        selectAll?.addEventListener('change', (e) => {
            this.toggleAll(e.target.checked);
        });

        // Row checkboxes
        this.table.querySelectorAll('.row-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.toggleRow(e.target);
            });
        });
    }

    toggleAll(checked) {
        this.table.querySelectorAll('.row-checkbox').forEach(checkbox => {
            checkbox.checked = checked;
            const row = checkbox.closest('tr');

            if (checked) {
                this.selectedRows.add(checkbox.dataset.rowId);
                row.classList.add('selected');
            } else {
                this.selectedRows.delete(checkbox.dataset.rowId);
                row.classList.remove('selected');
            }
        });

        this.updateToolbar();
    }

    toggleRow(checkbox) {
        const row = checkbox.closest('tr');
        const rowId = checkbox.dataset.rowId;

        if (checkbox.checked) {
            this.selectedRows.add(rowId);
            row.classList.add('selected');
        } else {
            this.selectedRows.delete(rowId);
            row.classList.remove('selected');
        }

        // Update select-all checkbox
        const selectAll = this.table.querySelector('.select-all-checkbox');
        const allCheckboxes = this.table.querySelectorAll('.row-checkbox');
        const checkedCount = Array.from(allCheckboxes).filter(cb => cb.checked).length;

        selectAll.checked = checkedCount === allCheckboxes.length;
        selectAll.indeterminate = checkedCount > 0 && checkedCount < allCheckboxes.length;

        this.updateToolbar();
    }

    updateToolbar() {
        const count = this.selectedRows.size;

        if (count > 0) {
            this.toolbar.classList.add('active');
            this.toolbar.querySelector('.bulk-actions-count').textContent =
                `${count} selected`;
        } else {
            this.toolbar.classList.remove('active');
        }
    }

    deselectAll() {
        this.toggleAll(false);
    }

    async deleteSelected() {
        if (this.selectedRows.size === 0) return;

        const confirmed = await confirmDelete(`${this.selectedRows.size} items`);
        if (!confirmed) return;

        // Get selected row data
        const selectedData = Array.from(this.selectedRows).map(rowId => {
            const checkbox = this.table.querySelector(`[data-row-id="${rowId}"]`);
            return checkbox.closest('tr');
        });

        // TODO: Implement actual delete logic with API
        console.log('Deleting rows:', selectedData);

        // Remove rows from DOM (demo)
        selectedData.forEach(row => row.remove());

        // Clear selection
        this.selectedRows.clear();
        this.updateToolbar();

        toast.success(`Deleted ${selectedData.length} items successfully!`);
    }

    async exportSelected() {
        if (this.selectedRows.size === 0) return;

        // TODO: Implement export logic
        toast.info(`Exporting ${this.selectedRows.size} items...`);
    }

    getSelectedRows() {
        return Array.from(this.selectedRows);
    }
}

/**
 * Mobile Menu Manager
 * Handles mobile sidebar toggle
 */

class MobileMenuManager {
    constructor() {
        this.init();
    }

    init() {
        // Create hamburger button
        this.createHamburgerButton();

        // Create backdrop
        this.createBackdrop();

        // Setup listeners
        this.setupListeners();
    }

    createHamburgerButton() {
        const button = document.createElement('button');
        button.className = 'mobile-menu-toggle';
        button.setAttribute('aria-label', 'Toggle menu');
        button.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;

        document.body.appendChild(button);
        this.button = button;
    }

    createBackdrop() {
        const backdrop = document.createElement('div');
        backdrop.className = 'mobile-sidebar-backdrop';
        document.body.appendChild(backdrop);
        this.backdrop = backdrop;
    }

    setupListeners() {
        this.button.addEventListener('click', () => this.toggleMenu());
        this.backdrop.addEventListener('click', () => this.closeMenu());
    }

    toggleMenu() {
        const sidebar = document.querySelector('.admin-sidebar');

        this.button.classList.toggle('active');
        sidebar?.classList.toggle('mobile-open');
        this.backdrop.classList.toggle('active');

        // Prevent body scroll when menu is open
        document.body.style.overflow =
            sidebar?.classList.contains('mobile-open') ? 'hidden' : '';
    }

    closeMenu() {
        const sidebar = document.querySelector('.admin-sidebar');

        this.button.classList.remove('active');
        sidebar?.classList.remove('mobile-open');
        this.backdrop.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Initialize on DOM ready
let themeManager, mobileMenu;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initP3Features);
} else {
    initP3Features();
}

function initP3Features() {
    // Initialize theme manager
    themeManager = new ThemeManager();

    // Initialize mobile menu
    mobileMenu = new MobileMenuManager();

    console.log('[P3] Dark mode, bulk actions, and mobile menu loaded ✓');
}

// Global instances
window.themeManager = themeManager;
window.mobileMenu = mobileMenu;

// Bulk actions will be initialized per-page
window.BulkActionsManager = BulkActionsManager;

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ThemeManager, BulkActionsManager, MobileMenuManager };
}
