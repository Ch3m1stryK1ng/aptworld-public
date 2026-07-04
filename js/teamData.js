const teamData = [
    {
        id: 'jian-zhao',
        name: 'Jian Zhao',
        altName: 'Jian Zhao',
        title: 'CEO',
        titleFull: 'Chief Executive Officer',
        image1: 'images/home/staff/jianzhao-1.webp',
        image1_webp: 'images/home/staff/jianzhao-1.webp',
        image2_webp: 'images/home/staff/jianzhao-2.webp',
        quote: '“Strive for excellence.”',
        email: 'jay@hbzhpt.com',
        socials: [
            { type: 'whatapp', url: '(+86) 186‑3192‑2605' },
        ]
    },
    {
        id: 'zhaoxiang-wang',
        name: 'Zhaoxiang Wang',
        altName: 'Zhaoxiang Wang',
        title: 'General Manager',
        titleFull: 'General Manager',
        image1: 'images/home/staff/zhaoxiangwang.webp',
        image1_webp: 'images/home/staff/zhaoxiangwang.webp',
        image2_webp: 'images/home/staff/zhaoxiangwang.webp', // image2 uses the same as image1_webp in the original code
        quote: '“Constant Improvement, Quality is the Result.”',
        email: 'apollo@apollopt.com.cn',
        socials: [
            { type: '#', url: '#' } // Original link was "#"
        ]
    },
    {
        id: 'jianxiu-jia',
        name: 'Jianxiu Jia',
        altName: 'Jianxiu Jia',
        title: 'Vice President',
        titleFull: 'Vice President',
        image1: 'images/home/staff/jianxiujia-3.webp',
        image1_webp: 'images/home/staff/jianxiujia-3.webp',
        image2_webp: 'images/home/staff/jianxiujia-3.webp',
        quote: '“Integrity as our Foundation, Cooperation for Mutual Success.”',
        email: 'sale@apollopt.com.cn',
        socials: [
            { type: 'linkedin', url: 'https://www.linkedin.com/in/jianxiu-jia-173820129?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' }, // Original link was "#"
            { type: 'instagram', url: 'https://www.instagram.com/jiajessjia?igsh=MXBvMDh2ODk5bXRzeA%3D%3D&utm_source=qr' },
            { type: 'facebook', url: 'https://www.facebook.com/share/1AbJkhiYP3/?mibextid=wwXIfr' },
            { type: 'whatapp', url: '+8619720335158' }
        ]
    },
    {
        id: 'guang-li',
        name: 'Guang Li',
        altName: 'Guang Li',
        title: 'Production Manager',
        titleFull: 'Production Manager',
        image1: 'images/home/staff/guangli.webp',
        image1_webp: 'images/home/staff/guangli.webp',
        image2_webp: 'images/home/staff/guangli.webp',
        quote: '“Reimagine the Future with Technology.”',
        email: '1010045224@qq.com',
        socials: [

        ]
    },
    {
        id: 'minling-yang',
        name: 'Minling Yang',
        altName: 'Minling Yang',
        title: 'Administrative Assistant',
        titleFull: 'Administrative Assistant',
        image1: 'images/home/staff/minlingyang.webp',
        image1_webp: 'images/home/staff/minlingyang.webp',
        image2_webp: 'images/home/staff/minlingyang.webp', // image2 uses the same as image1_webp
        quote: '“The devil is in the details.”',
        email: 'apollo@apollopt.com.cn',
        socials: [
            { type: '#', url: '#' } // Original link was "#"
        ]
    },
    {
        id: 'puda-zhao',
        name: 'Puda Zhao',
        altName: 'Puda Zhao',
        title: 'Sales Director',
        titleFull: 'Sales Director',
        image1: 'images/home/staff/pudazhao-1.webp',
        image1_webp: 'images/home/staff/pudazhao-1.webp',
        image2_webp: 'images/home/staff/pudazhao-2.webp',
        quote: '“Customers First, Service Our Priority.”',
        email: 'pzhao@apollopt.com.cn',
        socials: [
            { type: 'facebook', url: 'https://www.facebook.com/share/19Zb1nwSzU/?mibextid=wwXIfr' },
            { type: 'linkedin', url: 'https://www.linkedin.com/in/puda-zhao-282730361/' },
            { type: 'whatapp', url: 'https://wa.me/19298440050?text=Hello%20Apollo%20Power%2C%20I%E2%80%99m%20interested%20in%20V-belt%20pulleys.%20%E6%88%91%E6%83%B3%E4%BA%86%E8%A7%A3%E4%BD%A0%E4%BB%AC%E7%9A%84%E4%BA%A7%E5%93%81%E4%B8%8E%E4%BB%B7%E6%A0%BC%E3%80%82 ' },
        ]
    },
    {
        // Note: The HTML shows "Xiangjiang Yang" on the card but "Jasper Yang" in the tooltip. I've used both.
        id: 'xiangjiang-yang',
        name: 'Xiangjiang Yang', // Using tooltip name as primary name
        altName: 'Jasper Yang', // Keeping original card name as alt
        title: 'Deputy Sales Director',
        titleFull: 'Deputy Sales Director',
        image1: 'images/home/staff/xiangjiangyang-1.webp',
        image1_webp: 'images/home/staff/xiangjiangyang-1.webp',
        image2_webp: 'images/home/staff/xiangjiangyang-1.webp', // image2 uses the same as image1_webp
        quote: '“Actions over words, Client-Centric, Service-Driven.”',
        email: 'xjyang@apollopt.com.cn',
        socials: [
            { type: 'linkedin', url: 'https://www.linkedin.com/in/xiangjiang-yang-b233a6172/?trk=public-profile-join-page' },
            { type: 'facebook', url: 'https://www.facebook.com/profile.php?id=100075473473693' },
            { type: 'twitter', url: 'https://x.com/Xiangjiang523' },
            { type: 'instagram', url: 'https://www.instagram.com/apt.jasper?igsh=a3lpYXd6MXpvNzcz&utm_source=qr' },
            { type: 'whatapp', url: '+86133‑1512‑4900' }
        ]
    },
    {
        id: 'wentao-zhu',
        name: 'Wentao Zhu',
        altName: 'Wentao Zhu',
        title: 'Consulting Manager',
        titleFull: 'Consulting General Manager',
        image1: 'images/home/staff/wentaozhu.webp',
        image1_webp: 'images/home/staff/wentaozhu.webp',
        image2_webp: 'images/home/staff/wentaozhu.webp', // image2 uses the same as image1_webp
        quote: '“Innovation Drives the Future.”',
        email: 'wentao.zhu@apollopt.com.cn',
        socials: [
            { type: 'instagram', url: 'https://www.instagram.com/wentao199?igsh=bm1tOGpjYWJpdGhw' },
            { type: 'linkedin', url: 'linkedin.com/in/wentao-zhu-b3a47220b' }
        ]
    },
    {
        id: 'pengfei-zhao',
        name: 'Pengfei Zhao',
        altName: 'Pengfei Zhao',
        title: 'Sales Manager',
        titleFull: 'Sales Manager',
        image1: 'images/home/staff/pengfeizhao.webp',
        image1_webp: 'images/home/staff/pengfeizhao.webp',
        image2_webp: 'images/home/staff/pengfeizhao.webp', // image2 uses the same as image1_webp
        quote: '“Passionate, Professional, Proficient.”',
        email: 'zpf@apollopt.com.cn',
        socials: [] // No social links in the original code
    },
    {
        id: 'yifan-li',
        name: 'Yifan Li',
        altName: 'Yifan Li',
        title: 'Sales Manager',
        titleFull: 'Sales Manager',
        image1: 'images/home/staff/yifanli.webp',
        image1_webp: 'images/home/staff/yifanli.webp',
        image2_webp: 'images/home/staff/yifanli.webp', // image2 uses the same as image1_webp
        quote: '“Professional Services”',
        email: 'liyifan@apollopt.com.cn',
        socials: [
            { type: 'linkedin', url: 'https://www.linkedin.com/in/pulleys-summer?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' },
            { type: 'instagram', url: 'https://www.instagram.com/li.summerli?igsh=MXJocGtpZjZiMzEweA%3D%3D&utm_source=qr' },
            { type: 'facebook', url: 'https://www.facebook.com/share/167J6wtuaY/?mibextid=wwXIfr' }
        ]
    },
    {
        id: 'jingqian-wang',
        name: 'Jingqian Wang',
        altName: 'Jingqian Wang',
        title: 'Sales Manager',
        titleFull: 'Sales Manager',
        image1: 'images/home/staff/jingqianwang.webp',
        image1_webp: 'images/home/staff/jingqianwang.webp',
        image2_webp: 'images/home/staff/jingqianwang.webp', // image2 uses the same as image1_webp
        quote: '“Service. Genuine. Every Day.”',
        email: 'wangjingqian0717@gmail.com',
        socials: [
            { type: 'instagram', url: 'https://www.instagram.com/wjq.wendy?igsh=MXBjN3Nod2MzZTVuYg==' },
            { type: 'facebook', url: 'https://www.facebook.com/profile.php?id=61577654625831&mibextid=ZbWKwL' }
        ]
    },
    {
        id: 'lehang-chen',
        name: 'Lehang Chen',
        altName: 'Lehang Chen',
        title: 'Sales Manager',
        titleFull: 'Sales Manager',
        image1: 'images/home/staff/lehangchen.webp',
        image1_webp: 'images/home/staff/lehangchen.webp',
        image2_webp: 'images/home/staff/lehangchen.webp', // image2 uses the same as image1_webp
        quote: '“Communication Drives Success.”',
        email: 'chlh123@126.com',
        socials: [
            { type: 'instagram', url: 'https://www.instagram.com/klay__chen?igsh=N25kMmU0NTBjYThx' },
            { type: 'facebook', url: 'https://www.facebook.com/share/1EJuK6wuqe/' },
            { type: 'linkedin', url: 'https://www.linkedin.com/in/lehang-chen-363921373' }
        ]
    }
];

// =================================================================
//                      辅助函数 (建议一起复制)
// =================================================================

/**
 * 根据社交媒体类型返回对应的 Font Awesome 图标类名
 * @param {string} type - 社交媒体类型 (e.g., 'linkedin', 'facebook')
 * @returns {string} - Font Awesome 的 class
 */
function getSocialIconClass(type) {
    switch (type) {
        case 'linkedin': return 'fab fa-linkedin';
        case 'twitter': return 'fab fa-twitter';
        case 'instagram': return 'fab fa-instagram';
        case 'facebook': return 'fab fa-facebook';
        case 'whatapp': return 'fab fa-whatsapp';
        default: return 'fas fa-link'; // 默认图标
    }
}