/**
 * People Dictionary Rendering Script
 * Depends on: teamData.js (must be loaded first)
 */

document.addEventListener('DOMContentLoaded', () => {
    renderPeopleDictionary();
});

function renderPeopleDictionary() {
    if (typeof teamData === 'undefined') {
        console.error('teamData is not defined. Make sure teamData.js is loaded.');
        return;
    }

    // Configuration: Mapping Container IDs to Person IDs (in order)
    const departments = {
        'administrative': ['jian-zhao', 'jianxiu-jia', 'minling-yang'],
        'engineering': ['zhaoxiang-wang', 'guang-li'],
        'sales': ['puda-zhao', 'xiangjiang-yang', 'wentao-zhu', 'yifan-li', 'jiayu-ma'],
        'purchase': ['pengfei-zhao', 'lehang-chen'],
        'logistics': ['jingqian-wang']
    };

    // Iterate through each department and render
    for (const [containerId, personIds] of Object.entries(departments)) {
        const container = document.querySelector(`#${containerId} .people-container`);
        if (!container) {
            console.warn(`Container #${containerId} .people-container not found.`);
            continue;
        }

        // Clear existing static content
        container.innerHTML = '';

        personIds.forEach(id => {
            const persons = teamData.filter(p => p.id === id);

            // Handle duplicate IDs if any (though usually one), or just find
            const person = teamData.find(p => p.id === id);

            if (!person) {
                console.warn(`Person with ID ${id} not found in teamData.`);
                return;
            }

            const cardHTML = createPersonCard(person);
            container.insertAdjacentHTML('beforeend', cardHTML);
        });
    }
}

function createPersonCard(person) {
    // Correct path relative from subpage/about_us/ to root images
    // teamData paths are like "images/home/staff/..."
    // We need "../../images/home/staff/..."
    const imagePath = `../../${person.image1_webp || person.image1}`;

    // Generate Social Links HTML
    let socialLinksHTML = '';
    if (person.socials && person.socials.length > 0) {
        socialLinksHTML = person.socials.map(social => {
            // Helper from teamData.js to get icon class
            // If getSocialIconClass is strictly global, use it. 
            // Fallback map if needed:
            let iconClass = 'fas fa-link';
            if (typeof getSocialIconClass === 'function') {
                iconClass = getSocialIconClass(social.type);
            } else {
                // Fallback simple map if function missing
                const map = {
                    linkedin: 'fab fa-linkedin',
                    twitter: 'fab fa-twitter',
                    instagram: 'fab fa-instagram',
                    facebook: 'fab fa-facebook',
                    whatapp: 'fab fa-whatsapp'
                };
                iconClass = map[social.type] || iconClass;
            }

            return `<a href="${social.url}" target="_blank" aria-label="${social.type}"><i class="${iconClass}"></i></a>`;
        }).join('');
    }

    return `
    <div class="people-column" id="${person.id}">
        <div class="person-card">
            <img src="${imagePath}" alt="${person.altName || person.name}" loading="lazy">
            <div class="person-info">
                <p class="person-name"><strong>${person.name}</strong></p>
                <p><i class="fa-regular fa-comment"></i>Position: <span class="position">${person.titleFull || person.title}</span></p>
                <p><i class="fa-regular fa-envelope"></i>Email: <a href="mailto:${person.email}">${person.email}</a></p>
                <div class="people-social-links social-icon">
                    ${socialLinksHTML}
                </div>
            </div>
        </div>
    </div>
    `;
}
