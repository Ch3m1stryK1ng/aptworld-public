// // function toggleFooterNav() {
// //     const nav = document.getElementById('footer-nav');
// //     nav.classList.toggle('active');
// // }

// function toggleFooterMenu() {
//     const menu = document.getElementById('footerSideMenu');
//     const overlay = document.getElementById('footerOverlay');
//     menu.classList.add('open');
//     overlay.classList.add('show');
//     // document.body.style.overflow = 'hidden'; 
// }

// function closeFooterMenu() {
//     const menu = document.getElementById('footerSideMenu');
//     const overlay = document.getElementById('footerOverlay');
//     menu.classList.remove('open');
//     overlay.classList.remove('show');
//     // document.body.style.overflow = 'hidden'; 
// }

// function toggleSubMenu(el) {
//     const submenu = el.nextElementSibling;
//     const isOpen = submenu.classList.contains('open');

//     // Close all submenus
//     document.querySelectorAll('.footer-submenu').forEach(s => s.classList.remove('open'));
//     document.querySelectorAll('.footer-menu-item').forEach(m => m.classList.remove('active'));

//     if (!isOpen) {
//         submenu.classList.add('open');
//         el.classList.add('active');
//     }
// }

document.addEventListener('DOMContentLoaded', function () {

    // --- Push Sidebar Logic ---
    const body = document.body;
    const wrapper = document.getElementById('footerpageWrapper');
    const openMenuBtn = document.getElementById('footerMenuToggle'); // 使用 ID 獲取按鈕
    const overlay = document.getElementById('footerOverlay');
    const sideMenu = document.getElementById('footerSideMenu');

    let savedScrollY; // 新增：用於儲存滾動位置的變數

    function openPushMenu() {
        savedScrollY = window.scrollY;

        wrapper.style.position = 'fixed';
        wrapper.style.top = `-${savedScrollY}px`;
        // wrapper.style.width = '100%';

        body.classList.add('menu-open');
        overlay.style.visibility = 'visible';
        overlay.style.opacity = 1;
        // html.style.overflow = 'hidden';
        // body.style.overflow = 'hidden';
    }

    function closePushMenu() {
        const afterTransition = () => {
            wrapper.style.position = '';
            wrapper.style.top = '';
            wrapper.style.width = '';

            window.scrollTo({ top: savedScrollY, behavior: 'instant' });
            wrapper.removeEventListener('transitionend', afterTransition);
        };

        wrapper.addEventListener('transitionend', afterTransition);

        body.classList.remove('menu-open');
        overlay.style.visibility = 'hidden';
        overlay.style.opacity = 0;
        // html.style.overflow = '';
        // body.style.overflow = '';
    }

    // 綁定事件
    if (openMenuBtn) {
        openMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // 防止事件冒泡
            openPushMenu();
        });
    }
    if (overlay) {
        overlay.addEventListener('click', closePushMenu);
    }

    // 點擊側邊欄的連結後，也應該關閉菜單
    if (sideMenu) {
        sideMenu.addEventListener('click', function (event) {
            // 確保點擊的是一個連結 <a>
            if (event.target.tagName === 'A') {
                closePushMenu();
            }
        });
    }

    const submenuTriggers = document.querySelectorAll('.has-footer-submenu');
    submenuTriggers.forEach(trigger => {
        trigger.addEventListener('click', function () {
            toggleSubMenu(this);
        });
    });


    // 將 toggleSubMenu 放在全局作用域或上述事件監聽器內
    function toggleSubMenu(element) {
        const submenu = element.nextElementSibling;
        const wasActive = element.classList.contains('active');

        // 先關閉所有已打開的
        document.querySelectorAll('.footer-menu-item.active').forEach(item => {
            item.classList.remove('active');
            item.nextElementSibling.style.maxHeight = null;
        });

        // 如果點擊的不是剛才已打開的，則打開它
        if (!wasActive) {
            element.classList.add('active');
            submenu.style.maxHeight = submenu.scrollHeight + "px"; // 關鍵：設置為內容的實際高度
        }
    }
});


