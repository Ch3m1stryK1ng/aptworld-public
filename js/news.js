document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('news-container');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');

    if (!container) return;

    const MAX_NEWS_ITEMS = 10;
    const isFileProtocol = window.location.protocol === 'file:';

    // ==== 1. 判断语言 ====
    function detectLang() {
        let lang = (document.documentElement.lang || '').toLowerCase();

        if (!lang) {
            const path = window.location.pathname.toLowerCase();
            if (path.includes('/zh/') || path.startsWith('/zh')) lang = 'zh';
            else if (path.includes('/en/') || path.startsWith('/en')) lang = 'en';
        }

        if (lang.startsWith('zh')) return 'zh';
        if (lang.startsWith('en')) return 'en';
        return 'en';
    }

    const currentLang = detectLang();

    if (isFileProtocol) {
        console.warn('[News] Running under file://, using LOCAL_NEWS_DATA fallback if provided.');

        const raw = window.LOCAL_NEWS_DATA || [];
        renderNews(raw);
        return; // 不再执行 fetch 分支
    }

    // ==== 3. http/https 模式：正常从 data/news-xx.json 加载 ====
    function getNewsJsonUrl(lang) {
        return 'data/news-' + lang + '.json';
    }

    function loadNewsData() {
        const primaryUrl = getNewsJsonUrl(currentLang);
        const fallbackUrl = getNewsJsonUrl('en');

        return fetch(primaryUrl)
            .then(function (res) {
                if (!res.ok) {
                    if (currentLang !== 'en') {
                        return fetch(fallbackUrl).then(function (res2) {
                            if (!res2.ok) throw new Error('Failed to load fallback news-en.json');
                            return res2.json();
                        });
                    }
                    throw new Error('Failed to load ' + primaryUrl);
                }
                return res.json();
            })
            .catch(function (err) {
                console.error('[News] load error:', err);
                return [];
            });
    }

    loadNewsData().then(renderNews);

    // ==== 4. 渲染核心逻辑（file:// & http 都共用这块） ====
    function renderNews(items) {
        if (!Array.isArray(items) || items.length === 0) return;

        // 排序：按 date 新到旧
        items.sort(function (a, b) {
            const da = new Date(a.date);
            const db = new Date(b.date);
            return db - da;
        });

        const sliced = items.slice(0, MAX_NEWS_ITEMS);

        container.innerHTML = '';

        sliced.forEach(function (item) {
            const card = createNewsCard(item, currentLang);
            container.appendChild(card);
        });

        initLoopScroll(container, scrollLeftBtn, scrollRightBtn);
    }

    function createNewsCard(item, lang) {
        const article = document.createElement('article');
        article.className = 'news-card-flow';

        const mediaWrapper = document.createElement('div');
        mediaWrapper.className = 'flow-card-image';

        if (item.mediaType === 'iframe' && item.mediaUrl) {
            const iframe = document.createElement('iframe');
            iframe.src = item.mediaUrl;
            iframe.frameBorder = '0';
            iframe.allowFullscreen = true;
            iframe.title = item.title || 'Embedded post';
            mediaWrapper.appendChild(iframe);
        } else if (item.mediaType === 'image' && item.mediaUrl) {
            const img = document.createElement('img');
            img.src = item.mediaUrl;
            img.alt = item.title || 'News image';
            mediaWrapper.appendChild(img);
        } else if (item.mediaType === 'tweet' && item.tweetEmbedUrl) {
            const blockquote = document.createElement('blockquote');
            blockquote.className = 'twitter-tweet';
            const a = document.createElement('a');
            a.href = item.tweetEmbedUrl;
            a.textContent = 'View on Twitter';
            blockquote.appendChild(a);
            mediaWrapper.appendChild(blockquote);
        }

        const content = document.createElement('div');
        content.className = 'flow-card-content';

        const main = document.createElement('div');
        main.className = 'content-main';

        if (item.category) {
            const spanCat = document.createElement('span');
            spanCat.className = 'news-category ' + (item.categoryTagClass || '');
            spanCat.textContent = item.category;
            main.appendChild(spanCat);
        }

        const h3 = document.createElement('h3');
        h3.className = 'flow-card-title';
        h3.textContent = item.title || '';
        main.appendChild(h3);

        if (item.date) {
            const time = document.createElement('time');
            time.className = 'flow-card-date';
            time.dateTime = item.date;
            time.textContent = formatDateDisplay(item.date, lang);
            main.appendChild(time);
        }

        if (item.excerpt) {
            const p = document.createElement('p');
            p.className = 'card-excerpt';
            p.textContent = item.excerpt;
            main.appendChild(p);
        }

        content.appendChild(main);

        const footer = document.createElement('div');
        footer.className = 'flow-card-footer';

        const learnMoreLink = document.createElement('a');
        learnMoreLink.className = 'learn-more-link';
        learnMoreLink.textContent = lang === 'zh' ? '查看详情 ...' : 'Learn More ...';

        let detailUrl = item.detailUrl || 'subpage/news/corporate_news.html';
        if (detailUrl.includes('corporate_news.html') && item.id) {
            const separator = detailUrl.includes('?') ? '&' : '?';
            detailUrl += separator + 'id=' + encodeURIComponent(item.id);
        }
        learnMoreLink.href = detailUrl;

        footer.appendChild(learnMoreLink);

        const socialWrap = document.createElement('div');
        socialWrap.className = 'social-share';

        if (Array.isArray(item.socialLinks)) {
            item.socialLinks.forEach(function (s) {
                if (!s.url) return;
                const a = document.createElement('a');
                a.href = s.url;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.className = 'social-link';
                const i = document.createElement('i');
                i.className = getSocialIconClass(s.platform);
                a.appendChild(i);
                socialWrap.appendChild(a);
            });
        }

        footer.appendChild(socialWrap);
        content.appendChild(footer);

        article.appendChild(mediaWrapper);
        article.appendChild(content);

        return article;
    }

    function formatDateDisplay(isoDate, lang) {
        const d = new Date(isoDate);
        if (isNaN(d.getTime())) return isoDate;

        const y = d.getFullYear();
        const m = d.getMonth() + 1;
        const day = d.getDate();

        if (lang === 'zh') {
            return y + '年' + m + '月' + day + '日';
        }

        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return monthNames[d.getMonth()] + ' ' + day + ', ' + y;
    }

    function getSocialIconClass(platform) {
        if (!platform) return 'fab fa-share-alt';
        const p = platform.toLowerCase();
        if (p === 'linkedin') return 'fab fa-linkedin-in';
        if (p === 'twitter' || p === 'x') return 'fab fa-twitter';
        if (p === 'facebook') return 'fab fa-facebook-f';
        if (p === 'tiktok') return 'fab fa-tiktok';
        if (p === 'instagram') return 'fab fa-instagram';
        if (p === 'youtube') return 'fab fa-youtube';
        if (p === 'website') return 'fa-solid fa-globe';
        if (p === 'whatsapp') return 'fab fa-whatsapp';
        if (p === 'vk') return 'fab fa-vk';
        if (p === 'telegram') return 'fab fa-telegram';
        if (p === 'wechat') return 'fab fa-weixin';
        if (p === 'weibo') return 'fab fa-weibo';
        if (p === 'bilibili') return 'fab fa-bilibili';
        if (p === 'channel') return 'ri-wechat-channels-fill';
        return 'fab fa-share-alt';
    }

    (function injectSocialIconStyles() {
        const css = `
            .news-card-flow .social-share .social-link,
            .news-card-flow .social-share .social-link:hover {
                text-decoration: none !important;
            }

            .news-card-flow .social-share .social-link i {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                line-height: 1;
            }
        `;
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    })();

    // 循环滚动
    function initLoopScroll(container, scrollLeftBtn, scrollRightBtn) {
        if (!scrollLeftBtn || !scrollRightBtn) return;

        const getScrollAmount = () => container.clientWidth * 0.8;

        scrollRightBtn.addEventListener('click', () => {
            const atEnd =
                container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;
            if (atEnd) {
                container.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                container.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
            }
        });

        scrollLeftBtn.addEventListener('click', () => {
            const atStart = container.scrollLeft <= 0;
            if (atStart) {
                container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
            } else {
                container.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
            }
        });
    }
});


