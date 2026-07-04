document.addEventListener('DOMContentLoaded', () => {
    const swiperWrapper = document.querySelector('.team-section .swiper-wrapper');
    const modalOverlay = document.getElementById('teamModalOverlay');
    const modalCloseBtn = document.getElementById('teamModalClose');

    if (!swiperWrapper || !modalOverlay || !modalCloseBtn || typeof teamData === 'undefined') {
        console.error('Error: Required elements or teamData for the team section are missing.');
        return;
    }

    // 1. 生成卡片HTML
    // teamData.forEach((member, index) => {
    //     // --- 生成 Tooltip 内部的详细信息HTML ---
    //     const tooltipContentHTML = `
    //         <div class="card-content">
    //             <div class="title-row">
    //                 <h3>${member.name || ''}</h3>
    //                 <span class="position">${member.titleFull || ''}</span>
    //             </div>
    //             <p class="quote">${member.quote || ''}</p>
    //             <p>Email: <a href="mailto:${member.email}">${member.email || ''}</a></p>
    //             <div class="socials">
    //                 ${generateSocialLinks(member.socials)}
    //             </div>
    //         </div>`;

    //     // --- 生成卡片上显示的遮罩层HTML ---
    //     const cardOverlayHTML = `
    //         <img src="${member.image1}" alt="${member.name || ''}" class="team-card-photo">
    //         <div class="team-card-overlay">
    //         <div class="team-card-overlay">
    //             <h3 class="team-card-name">${member.name || ''}</h3>
    //             <span class="team-card-title">${member.title || ''}</span>
    //         </div>`;

    //     // --- 组合成最终的HTML结构 ---
    //     const memberHTML = `
    //         <div class="swiper-slide">
    //             <div class="team-card-wrapper">
    //                 <a href="#" class="team-card" data-index="${index}" style="background-image: url('${member.image1}')">
    //                     ${cardOverlayHTML}
    //                 </a>
    //                 <div class="card-tooltip">
    //                     <div class="card-tooltip-bg" style="background-image: url('${member.image1}')"></div>
    //                     ${tooltipContentHTML}
    //                 </div>
    //             </div>
    //         </div>`;

    //     // 将生成的HTML插入到swiper容器中
    //     swiperWrapper.insertAdjacentHTML('beforeend', memberHTML);
    // });

    teamData.forEach((member, index) => {
        const cardContentHTML = `
            <img src="${member.image1}" alt="${member.name || ''}" class="team-card-photo">
            <div class="team-card-overlay">
                <h3 class="team-card-name">${member.name || ''}</h3>
                <span class="team-card-title">${member.title || ''}</span>
            </div>
        `;

        const tooltipContentHTML = `
            <div class="card-content">
                <div class="title-row">
                    <h3>${member.altName || ""}</h3>
                    <span class="position">${member.titleFull || ""}</span>
                </div>
                <p class="quote">${member.quote || ""}</p>
                <p>Email: <a href="mailto:${member.email}">${member.email || ""}</a></p>
                <div class="socials">${generateSocialLinks(member.socials)}</div>
            </div>
        `;
        const memberHTML = `
            <div class="swiper-slide">
                <div class="team-card-wrapper">
                    <div class="team-card" data-index="${index}">${cardContentHTML}</div>
                    <div class="card-tooltip">
                        <div class="card-tooltip-bg" style="background-image: url('${member.image1_webp}')">
                        </div>${tooltipContentHTML}
                    </div>
                </div>
            </div>
        `;

        swiperWrapper.insertAdjacentHTML('beforeend', memberHTML);
    });

    // if (!window.AOSInitialized) {
    //     AOS.init({
    //         duration: 800, // 动画持续时间
    //         once: true     // 动画只播放一次
    //     });
    //     window.AOSInitialized = true;
    // }

    // 2. 初始化 Swiper (带导航箭头)
    new Swiper('.team-swiper', {
        loop: false, // 建议在有明确起点和终点时关闭loop
        grabCursor: true,
        slidesPerView: 4,
        spaceBetween: 40,

        observer: true,
        observeParents: true,
        autoplay: {
            delay: 5000,                      // 每3秒切换一次
            disableOnInteraction: false,      // 用户操作（如拖动）后，自动播放不会停止
            pauseOnMouseEnter: true,          // 鼠标悬停在滑块上时暂停自动播放
        },

        // 绑定新的导航按钮
        navigation: {
            nextEl: '.team-nav-next',
            prevEl: '.team-nav-prev',
        },

        // 绑定分页器
        pagination: {
            el: '.team-pagination',
            clickable: true,
        },

        breakpoints: {
            320: { slidesPerView: 1, spaceBetween: 20 },
            480: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1024: { slidesPerView: 4, spaceBetween: 30 },
            1280: { slidesPerView: 4, spaceBetween: 40 },
            1500: { slidesPerView: 5, spaceBetween: 40 },
            1800: { slidesPerView: 6, spaceBetween: 50 },
        },
    });
    
    const els = document.querySelectorAll('[data-animate]');
    const animatedClass = 'is-animated';

    els.forEach((el, i) => {
        el.dataset.delay = el.dataset.delay || `${i * 0.1}s`;
    });

    const io = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const name = el.dataset.animate || 'zoomIn';
                const delay = el.dataset.delay || '0.2s';

                el.style.animationDelay = delay;
                el.classList.add('animate__animated', `animate__${name}`, animatedClass);
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.1 });

    els.forEach(el => io.observe(el));


    // 检查是否已经绑定事件，避免重复绑定
    if (!modalCloseBtn.hasListener) {
        modalCloseBtn.addEventListener('click', closeModal);
        modalCloseBtn.hasListener = true;
    }

    // 3. 模态框逻辑 (与之前相同)
    const cardLinks = swiperWrapper.querySelectorAll('.team-card');
    cardLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            if (window.innerWidth <= 768) {
                const memberIndex = e.currentTarget.dataset.index;
                const memberData = teamData[memberIndex];
                // const modalFunction = window.populateAndShowAuroraModal || window.populateAndShowModal;
                if (memberData) {
                    populateAndShowModal(memberData);
                }
            }
        });
    });

    const cardWrappers = document.querySelectorAll('.team-card-wrapper');
    let hideTooltipTimer;
    cardWrappers.forEach(wrapper => {
        const tooltip = wrapper.querySelector('.card-tooltip');

        const showTooltip = () => {
            clearTimeout(hideTooltipTimer);
            cardWrappers.forEach(otherWrapper => {
                if (otherWrapper !== wrapper) {
                    otherWrapper.classList.remove('tooltip-visible');
                }
            });
            wrapper.classList.add('tooltip-visible');
        };

        const hideTooltip = () => {
            hideTooltipTimer = setTimeout(() => {
                wrapper.classList.remove('tooltip-visible');
            }, 200);
        };

        // 鼠标进入卡片时，显示Tooltip
        wrapper.addEventListener('mouseenter', showTooltip);
        // 鼠标离开卡片时，准备隐藏Tooltip
        wrapper.addEventListener('mouseleave', hideTooltip);

        // 如果tooltip元素存在
        if (tooltip) {
            // 当鼠标进入Tooltip本身时，取消隐藏
            tooltip.addEventListener('mouseenter', () => {
                clearTimeout(hideTooltipTimer);
            });
            // 当鼠标离开Tooltip时，执行隐藏
            tooltip.addEventListener('mouseleave', hideTooltip);
        }
    })

    function populateAndShowModal(data) {
        if (modalOverlay.classList.contains('is-visible')) return;

        document.getElementById('modalAvatar').src = data.image1;
        document.getElementById('modalAvatar').alt = data.name;
        document.getElementById('modalName').textContent = data.name;
        document.getElementById('modalPosition').textContent = data.titleFull;
        document.getElementById('modalQuote').textContent = data.quote;
        document.getElementById('modalEmail').textContent = data.email;
        document.getElementById('modalEmail').href = `mailto:${data.email}`;
        document.getElementById('modalSocials').innerHTML = generateSocialLinks(data.socials);

        modalOverlay.classList.add('is-visible');

        // modalAvatar.src = data.image1;
        // modalAvatar.alt = data.name;
        // modalName.textContent = data.name;
        // modalPosition.textContent = data.titleFull;
        // modalQuote.textContent = data.quote;
        // modalEmail.textContent = data.email;
        // modalEmail.href = `mailto:${data.email}`;
        // modalSocials.innerHTML = generateSocialLinks(data.socials);

        // modalOverlay.classList.add('is-visible');
    }

    // function closeModal() {
    //     modalOverlay.classList.remove('is-visible');
    // }
    function closeModal() {
        if (modalOverlay.classList.contains('is-visible')) {
            modalOverlay.classList.remove('is-visible');
        }
    }

    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    function generateSocialLinks(socialsArray) {
        if (!socialsArray) return '';
        return socialsArray.map(social => `
        <a href="${social.url}" target="_blank" aria-label="${social.type}">
            <i class="${getSocialIconClass(social.type)}"></i>
        </a>
    `).join('');
    }

    function getSocialIconClass(type) {
        switch (type) {
            case 'linkedin': return 'fab fa-linkedin';
            case 'twitter': return 'fab fa-twitter';
            case 'instagram': return 'fab fa-instagram';
            case 'facebook': return 'fab fa-facebook';
            case 'whatapp': return 'fab fa-whatsapp';
            default: return 'fas fa-link';
        }
    }
});

// function refreshAOS() {
//     AOS.refresh();
// }
