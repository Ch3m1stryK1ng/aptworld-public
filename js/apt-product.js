document.addEventListener('DOMContentLoaded', function() {
    // 找到所有内含子菜单的列表项 li
    const listItemsWithSubmenu = document.querySelectorAll('.category-list li');

    listItemsWithSubmenu.forEach(item => {
        // 确认这个 li 确实有子菜单 .sub
        const subMenu = item.querySelector(':scope > .sub');
        if (subMenu) {
            // 找到触发器，即 li 的直接子元素 a
            const triggerLink = item.querySelector(':scope > a');

            triggerLink.addEventListener('click', function(event) {
                // 阻止链接的默认跳转行为
                event.preventDefault();

                const isCurrentlyOpen = item.classList.contains('is-open');

                // --- 核心修改：只关闭同级菜单 ---
                // 1. 找到父级 ul
                const parentUl = item.parentElement;
                // 2. 在父级 ul 中找到所有直接子元素 li
                parentUl.querySelectorAll(':scope > li.is-open').forEach(siblingLi => {
                    // 3. 关闭所有兄弟 li，除了当前点击的这一个
                    if (siblingLi !== item) {
                        siblingLi.classList.remove('is-open');
                    }
                });

                // 开关当前点击的菜单
                if (isCurrentlyOpen) {
                    item.classList.remove('is-open');
                } else {
                    item.classList.add('is-open');
                }
            });
        }
    });

    // 移动端：处理侧边栏面板的折叠/展开
    function setupPanelToggle() {
        const panelHeaders = document.querySelectorAll('.sidebar .panel-header');
        panelHeaders.forEach(header => {
            const panel = header.closest('.panel');
            if (!panel) return;

            // 移除可能存在的旧事件监听器
            const newHeader = header.cloneNode(true);
            header.parentNode.replaceChild(newHeader, header);
            const freshHeader = panel.querySelector('.panel-header');
            if (!freshHeader) return;

            // 检查是否是移动端（使用992px与侧边栏控制保持一致）
            const isMobile = window.matchMedia('(max-width: 992px)').matches;
            
            if (isMobile) {
                freshHeader.style.cursor = 'pointer';
                freshHeader.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation(); // 阻止事件冒泡，避免触发遮罩层关闭
                    const currentPanel = freshHeader.closest('.panel');
                    if (currentPanel) {
                        currentPanel.classList.toggle('open');
                    }
                });
            }

            // 监听窗口大小变化
            window.addEventListener('resize', function() {
                const isMobileNow = window.matchMedia('(max-width: 992px)').matches;
                if (isMobileNow) {
                    freshHeader.style.cursor = 'pointer';
                } else {
                    freshHeader.style.cursor = '';
                }
            });
        });
    }
    
    // 初始化面板切换功能
    setupPanelToggle();
    
    // 当侧边栏打开时，重新设置面板切换功能（确保事件绑定正确）
    const categoriesSidebar = document.getElementById('categories-sidebar');
    if (categoriesSidebar) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (categoriesSidebar.classList.contains('open')) {
                        // 侧边栏打开后，确保面板切换功能正常
                        setTimeout(setupPanelToggle, 100);
                    }
                }
            });
        });
        observer.observe(categoriesSidebar, { attributes: true });
    }

    // 移动端 Categories 按钮控制侧边栏
    const mobileCategoriesToggle = document.getElementById('mobile-categories-toggle');
    const categoriesSidebar = document.getElementById('categories-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    if (mobileCategoriesToggle && categoriesSidebar) {
        function toggleSidebar() {
            categoriesSidebar.classList.toggle('open');
            if (sidebarOverlay) {
                sidebarOverlay.classList.toggle('active');
            }
            // 防止背景滚动
            if (categoriesSidebar.classList.contains('open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }

        function closeSidebar() {
            categoriesSidebar.classList.remove('open');
            if (sidebarOverlay) {
                sidebarOverlay.classList.remove('active');
            }
            document.body.style.overflow = '';
        }

        mobileCategoriesToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleSidebar();
        });

        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', function(e) {
                e.stopPropagation();
                closeSidebar();
            });
        }
        
        // 点击侧边栏外部区域关闭侧边栏
        // 注意：不在侧边栏上直接添加stopPropagation，让panel-header的点击事件可以正常工作
        document.addEventListener('click', function(e) {
            if (window.matchMedia('(max-width: 992px)').matches) {
                const isClickInsideSidebar = categoriesSidebar.contains(e.target);
                const isClickOnToggle = mobileCategoriesToggle && mobileCategoriesToggle.contains(e.target);
                const isClickOnOverlay = sidebarOverlay && sidebarOverlay.contains(e.target);
                const isClickOnPanelHeader = e.target.closest('.panel-header');
                
                // 如果点击在遮罩层上，或者点击在侧边栏外部（且不在toggle按钮上，且不在panel-header上），则关闭
                if (categoriesSidebar.classList.contains('open')) {
                    if (isClickOnOverlay || (!isClickInsideSidebar && !isClickOnToggle && !isClickOnPanelHeader)) {
                        closeSidebar();
                    }
                }
            }
        });

        // 点击侧边栏内的链接后关闭侧边栏（移动端）
        const categoryLinks = categoriesSidebar.querySelectorAll('.category-list a');
        categoryLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.matchMedia('(max-width: 992px)').matches) {
                    setTimeout(closeSidebar, 300); // 延迟关闭，让用户看到点击效果
                }
            });
        });

        // 注意：不再通过点击Categories标题关闭侧边栏，以保持展开/折叠功能正常

        // 窗口大小变化时，如果是桌面端，确保侧边栏关闭
        window.addEventListener('resize', function() {
            const isMobile = window.matchMedia('(max-width: 992px)').matches;
            if (!isMobile) {
                closeSidebar();
            }
        });
    }
});