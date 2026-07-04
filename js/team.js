// init AOS animations
// AOS.init({ duration: 800, once: true });

document.addEventListener('DOMContentLoaded', () => {
  const swiperWrapper = document.querySelector('.team-section .swiper-wrapper');

  if (swiperWrapper && typeof teamData !== 'undefined') {
    teamData.forEach(member => {

      const socialLinksHTML = member.socials.map(social => `
                <a href="${social.url}" target="_blank" aria-label="${social.type}">
                    <i class="${getSocialIconClass(social.type)}"></i>
                </a>
            `).join('');

      const memberHTML = `
                <div class="swiper-slide">
                    <div class="card-hover-wrapper">
                        <div class="avatar flip-card" data-animate="zoomIn" data-delay="0.1s">
                            <div class="flip-inner">
                                <div class="flip-front">
                                    <picture>
                                        <source srcset="${member.image1_webp}" type="image/webp" />
                                        <img src="${member.image1}" alt="${member.name}"/>
                                    </picture>
                                    <div class="overlay">
                                        <span class="name">${member.name || ''}</span>
                                        <span class="title">${member.title || ''}</span>
                                    </div>
                                </div>
                                <div class="flip-back">
                                    <div class="flip-back-content">
                                        <h3>${member.name}</h3>
                                        <div class="socials">
                                            ${socialLinksHTML}
                                        </div>
                                        <a href="team-full.html#${member.id}" class="more-info-button">More Information</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-tooltip">
                            <div class="card-bg" style="background-image: url('${member.image2_webp}');"></div>
                            <div class="card-content">
                                <div class="title-row">
                                    <h3><a href="team-full.html#${member.id}">${member.name}</a></h3>
                                    <span class="position">${member.titleFull}</span>
                                </div>
                                <p class="quote">${member.quote}</p>
                                <p>Email: <a href="mailto:${member.email}">${member.email}</a></p>
                                <div class="socials">
                                    ${socialLinksHTML}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
      swiperWrapper.insertAdjacentHTML('beforeend', memberHTML);
    });
  }

  const teamSwiper = new Swiper(".team-swiper", {
    slidesPerView: 5,
    spaceBetween: 10,
    loop: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '#teamPagination',
      clickable: true,
    },
    breakpoints: {
      1280: { slidesPerView: 6, spaceBetween: 25 },
      1024: { slidesPerView: 5, spaceBetween: 20 },
      768: { slidesPerView: 3, spaceBetween: 15 },
      480: { slidesPerView: 2, spaceBetween: 10 },
      0: { slidesPerView: 2, spaceBetween: 10 },
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

  // document.querySelectorAll('.card-hover-wrapper').forEach(wrapper => {
  //   let hideTimer;

  //   // 鼠标进入头像或 tooltip 区域时，显示 tooltip
  //   wrapper.addEventListener('mouseenter', () => {
  //     clearTimeout(hideTimer);
  //     wrapper.classList.add('tooltip-visible');
  //   });

  //   // 鼠标离开整个 wrapper 区域时，延迟隐藏
  //   wrapper.addEventListener('mouseleave', () => {
  //     hideTimer = setTimeout(() => {
  //       wrapper.classList.remove('tooltip-visible');
  //     }, 200); // 这里设置延迟时间（单位毫秒），比如 300ms
  //   });
  // });

  if (window.innerWidth <= 768) {
    document.querySelectorAll('.flip-card').forEach(card => {
      card.addEventListener('click', () => {
        card.classList.toggle('flipped');
      });
    });
  }

  const wrappers = document.querySelectorAll('.card-hover-wrapper');

  wrappers.forEach(currentWrapper => {
    const tooltip = currentWrapper.querySelector('.card-tooltip');
    let hideTimer;

    currentWrapper.addEventListener('mouseenter', () => {
      clearTimeout(hideTimer);

      // 隐藏其他 wrapper 的 tooltip
      wrappers.forEach(otherWrapper => {
        if (otherWrapper !== currentWrapper) {
          otherWrapper.classList.remove('tooltip-visible');
        }
      });

      currentWrapper.classList.add('tooltip-visible');
    });

    currentWrapper.addEventListener('mouseleave', () => {
      hideTimer = setTimeout(() => {
        currentWrapper.classList.remove('tooltip-visible');
      }, 250); // 可调延迟时间
    });
  });
});

