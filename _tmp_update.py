import re
from pathlib import Path

ROOT = Path('d:/company/website/ApolloPT-website/APT_public')

TOPBAR_RIGHT = '''<div class="top-bar-right">
                            <div class="topbar-email">
                                <a href="mailto:sales@apt-world.com" class="top-bar-link" aria-label="发送邮件">
                                    <i class="fas fa-envelope"></i>
                                    <span>sales@apt-world.com</span>
                                </a>
                            </div>
                            <div class="topbar-phone">
                                <a href="tel:+8613315124900" class="top-bar-link" aria-label="拨打电话">
                                    <i class="fas fa-phone-alt"></i>
                                    <span>(+86) 133-1512-4900</span>
                                </a>
                                <a href="tel:+8618631921132" class="top-bar-link" aria-label="拨打电话" style="margin-left: 0.5rem;">
                                    <span> / (+86) 186-3192-1132</span>
                                </a>
                            </div>
                        </div>'''

TOPBAR_LEFT_TEXT = '一家拥有25+年经验的能够提供专业的动力传动解决方案的源头工厂'

SOCIAL_ROW = '''<div class="social-row">
                                <a href="https://www.instagram.com/apt.jasper?igsh=a3lpYXd6MXpvNzcz&utm_source=qr"
                                    target="_blank" aria-label="Instagram"><img src="../../../images/home/instagram.svg"
                                        alt=""></a>
                                <a href="https://www.linkedin.com/in/xiangjiang-yang-b233a6172/?trk=public-profile-join-page"
                                    target="_blank" aria-label="LinkedIn"><img src="../../../images/home/linkedin.svg"
                                        alt=""></a>
                                <a href="https://www.facebook.com/profile.php?id=100075473473693" target="_blank"
                                    aria-label="Facebook"><img src="../../../images/home/facebook.svg" alt=""></a>
                                <a href="https://x.com/xiangjiang523?s=21" target="_blank" aria-label="Twitter"><img
                                        src="../../../images/home/twitter-x.svg" alt=""></a>
                                <a href="https://www.youtube.com/@APT.Jasper" target="_blank" aria-label="YouTube"><img
                                        src="../../../images/home/youtube.svg" alt=""></a>
                                <a href="https://www.tiktok.com/@aptxiangjiang?_t=ZT-8zKrJ1nxNHy&_r=1" target="_blank"
                                    aria-label="Tiktok"><img src="../../../images/home/tiktok.svg" alt=""></a>
                                <a href="https://www.wechat.com" target="_blank" aria-label="WeChat"><img
                                        src="../../../images/home/wechat.svg" alt=""></a>
                            </div>'''

CONTACT_PANEL = '''<section class="panel contact-panel">
                            <h3 class="panel-title">联系我们</h3>
                            <hr class="panel-divider" />
                            <ul class="contact-list">
                                <li><strong>售后咨询:</strong> <a href="tel:+8613315124900">(+86) 133-1512-4900</a> / <a
                                        href="tel:+8618631921132">(+86) 186-3192-1132</a></li>
                                <li><strong>销售热线:</strong> <a href="tel:+8613315124900">(+86) 133-1512-4900</a> / <a
                                        href="tel:+8618631921132">(+86) 186-3192-1132</a></li>
                                <li><strong>办公处:</strong> <a>河北省石家庄市长安区睿和中心1104</a></li>
                                <li><strong>邮箱:</strong> <a href="mailto:sales@apt-world.com">sales@apt-world.com</a>
                                </li>
                                <li><strong>工厂地址:</strong> <a>河北省邢台市宁晋县大曹庄管理区</a></li>
                            </ul>
                            <hr class="panel-divider" />
                            {social}
                        </section>'''.format(social=SOCIAL_ROW)

FOOTER_CONTACT = '''<div class="footer-contact">
                            <p>
                                <strong><i class="fa fa-comment"></i>售后服务:</strong><a href="tel:+8613315124900">
                                    (+86)-133-1512-4900
                                </a> / <a href="tel:+8618631921132">
                                    (+86)-186-3192-1132
                                </a>
                            </p>
                            <p>
                                <strong><i class="fa fa-phone"></i>销售咨询:</strong><a href="tel:+8613315124900">
                                    (+86)-133-1512-4900
                                </a> / <a href="tel:+8618631921132">
                                    (+86)-186-3192-1132
                                </a>
                            </p>
                            <p>
                                <strong><i class="fa fa-envelope"></i>邮箱:</strong><a href="mailto:sales@apt-world.com">
                                    sales@apt-world.com
                                </a>
                            </p>
                            <p>
                                <strong><i class="fa fa-briefcase"></i>销售办公室:</strong>
                                河北省石家庄市长安区睿和中心1104
                            </p>
                            <p>
                                <strong><i class="fa fa-map-marker"></i>工厂地址:</strong>
                                河北省邢台市宁晋县大曹庄管理区
                            </p>
                        </div>'''

FOOTER_QR = '''<div class="qr-code">
                            <div><img src="../../../images/home/公众号.webp" alt="微信公众号">
                                <p>微信公众号</p>
                            </div>
                            <div><img src="../../../images/home/抖音.webp" alt="抖音">
                                <p>抖音</p>
                            </div>
                            <div><img src="../../../images/home/视频号.webp" alt="视频号">
                                <p>视频号</p>
                            </div>
                            <div><img src="../../../images/home/mybilibili.webp" alt="哔哩哔哩">
                                <p>哔哩哔哩</p>
                            </div>
                        </div>'''

FOOTER_SOCIAL = '''<div class="footer-social-icons">
                        <a href="https://mp.weixin.qq.com/s/MZHwMoGxU5FuZImyO6CTvg" target="_blank"
                            class="footer-icon-tooltip">
                            <img src="../../../images/home/wechat.svg" alt="微信公众号" />
                            <span class="footer-tooltip-text">微信公众号</span>
                        </a>
                        <a href="https://www.douyin.com/user/MS4wLjABAAAAqZH3zv5Cae5at-pLwWW0b82vYzaiVId5gGi1Zw3p9vnTPvnGMZZWK2i6W_vOv8pK"
                            target="_blank" class="footer-icon-tooltip">
                            <img src="../../../images/home/douyin.svg" alt="抖音" />
                            <span class="footer-tooltip-text">抖音</span>
                        </a>
                        <a href="https://channels.weixin.qq.com/" target="_blank" class="footer-icon-tooltip">
                            <img src="../../../images/home/channels.svg" alt="视频号" />
                            <span class="footer-tooltip-text">视频号</span>
                        </a>
                        <a href="https://www.xiaohongshu.com/user/profile/68b45c73000000001901cad5?xsec_token=YB42IC3hBqigx0GCRdGjGCf5xUshVm6_MaK68uRk-Ei6Q=&xsec_source=app_share&xhsshare=CopyLink&appuid=68b45c73000000001901cad5&apptime=1756651388&share_id=e3e33b08b9f146b4875fe18030712afa"
                            target="_blank" class="footer-icon-tooltip">
                            <img src="../../../images/home/xiaohongshu.svg" alt="小红书" />
                            <span class="footer-tooltip-text">小红书</span>
                        </a>
                        <a href="https://space.bilibili.com/3546969614059823" target="_blank"
                            class="footer-icon-tooltip">
                            <img src="../../../images/home/bilibili.svg" alt="哔哩哔哩" />
                            <span class="footer-tooltip-text">哔哩哔哩</span>
                        </a>
                        <a href="https://www.xiaohongshu.com/user/profile/68b45c73000000001901cad5?xsec_token=YB42IC3hBqigx0GCRdGjGCf5xUshVm6_MaK68uRk-Ei6Q=&xsec_source=app_share&xhsshare=CopyLink&appuid=68b45c73000000001901cad5&apptime=1756651388&share_id=e3e33b08b9f146b4875fe18030712afa"
                            target="_blank" class="footer-icon-tooltip">
                            <img src="../../../images/home/weibo.svg" alt="微博" />
                            <span class="footer-tooltip-text">微博</span>
                        </a>
                    </div>'''

FOOTER_NAV = '''<nav id="footer-nav" class="footer-nav">
                        <a href="../../index.html">首页</a>
                        <a href="../about_us/company_profile.html">关于我们</a>
                        <a href="../products/other_products.html">产品中心</a>
                        <a href="../service/design.html">服务支持</a>
                        <a href="../news/corporate_news.html">新闻中心</a>
                        <a href="../contact_us/contact_us.html">联系我们</a>
                    </nav>'''

CATEGORY_LISTS = {
    "after_sales": '''<ul class="category-list">
                                <li><a href="../service/design.html">图纸设计</a></li>
                                <li><a href="../service/casting.html">铸造</a></li>
                                <li><a href="../service/machining.html">机加工</a></li>
                                <li><a href="../service/surface_treatment.html">表面处理</a></li>
                                <li><a href="../service/custom_service.html">定制化服务</a></li>
                                <li><a class="active" href="../service/after_sales.html">售后服务</a></li>
                                <li><a href="../service/troubleshooting.html">故障分析</a></li>
                                <li><a href="../service/download.html">文件下载</a></li>
                            </ul>''',
    "troubleshooting": '''<ul class="category-list">
                                <li><a href="../service/design.html">图纸设计</a></li>
                                <li><a href="../service/casting.html">铸造</a></li>
                                <li><a href="../service/machining.html">机加工</a></li>
                                <li><a href="../service/surface_treatment.html">表面处理</a></li>
                                <li><a href="../service/custom_service.html">定制化服务</a></li>
                                <li><a href="../service/after_sales.html">售后服务</a></li>
                                <li><a class="active" href="../service/troubleshooting.html">故障分析</a></li>
                                <li><a href="../service/download.html">文件下载</a></li>
                            </ul>''',
    "download": '''<ul class="category-list">
                                <li><a href="../service/design.html">图纸设计</a></li>
                                <li><a href="../service/casting.html">铸造</a></li>
                                <li><a href="../service/machining.html">机加工</a></li>
                                <li><a href="../service/surface_treatment.html">表面处理</a></li>
                                <li><a href="../service/custom_service.html">定制化服务</a></li>
                                <li><a href="../service/after_sales.html">售后服务</a></li>
                                <li><a href="../service/troubleshooting.html">故障分析</a></li>
                                <li><a class="active" href="../service/download.html">文件下载</a></li>
                            </ul>''',
}

BREADCRUMBS = {
    "after_sales": '''<div class="breadcrumb">
                    <span class="crumb"><i class="fa fa-house"></i></span>
                    <a href="../../index.html">首页</a>
                    <span class="sep">/</span>
                    <a href="../service/design.html">服务支持</a>
                    <span class="sep">/</span>
                    <span class="current">售后服务</span>
                </div>''',
    "troubleshooting": '''<div class="breadcrumb">
                    <span class="crumb"><i class="fa fa-house"></i></span>
                    <a href="../../index.html">首页</a>
                    <span class="sep">/</span>
                    <a href="../service/design.html">服务支持</a>
                    <span class="sep">/</span>
                    <span class="current">故障分析</span>
                </div>''',
    "download": '''<div class="breadcrumb">
                    <span class="crumb"><i class="fa fa-house"></i></span>
                    <a href="../../index.html">首页</a>
                    <span class="sep">/</span>
                    <a href="../service/design.html">服务支持</a>
                    <span class="sep">/</span>
                    <span class="current">文件下载</span>
                </div>''',
}

CONTENT_BLOCKS = {"after_sales": """..."""}

# Load content blocks from external file for readability
content_path = ROOT / 'update_service_names.ps1'

# Inline full content blocks (omitted in this snippet in the file creation; will be replaced below)
CONTENT_BLOCKS = {}

CONTENT_BLOCKS['after_sales'] = """
{after}
""".format(after='')

# Manually assign full blocks via a trailing replacement after file creation

HERO_BG = 'style="background-image: url(../../../images/home/pages/service.webp)"'
HERO_TITLE = '服务支持'


def replace_once(text, pattern, repl):
    new_text, count = re.subn(pattern, repl, text, count=1, flags=re.S)
    if count != 1:
        raise RuntimeError(f"Pattern not found: {pattern}")
    return new_text


def update_file(rel_path, key, content_block):
    path = ROOT / rel_path
    text = path.read_text(encoding='utf-8', errors='replace')

    text = re.sub(r'(<div class="top-bar-left">)(.*?)(</div>)', rf"\1{TOPBAR_LEFT_TEXT}\3", text, count=1)
    text = replace_once(text, r'<div class="top-bar-right">[\s\S]*?</div>', TOPBAR_RIGHT)

    text = re.sub(r'style="background-image: url\([^)]+\)"', HERO_BG, text, count=1)
    text = re.sub(r'(<section class="subpage-hero[\s\S]*?<h1>)(.*?)(</h1>)', rf"\1{HERO_TITLE}\3", text, count=1, flags=re.S)

    text = replace_once(text, r'<div class="breadcrumb">[\s\S]*?</div>\s*<hr class="divider" />', BREADCRUMBS[key] + "\n                <hr class=\"divider\" />")

    text = replace_once(text, r'<ul class="category-list">[\s\S]*?</ul>', CATEGORY_LISTS[key])

    text = replace_once(text, r'<section class="panel contact-panel">[\s\S]*?</section>', CONTACT_PANEL)

    text = replace_once(text, r'<section class="content">[\s\S]*?</section>', content_block)

    text = replace_once(text, r'<nav id="footer-nav" class="footer-nav">[\s\S]*?</nav>', FOOTER_NAV)

    text = replace_once(text, r'<div class="footer-contact">[\s\S]*?</div>', FOOTER_CONTACT)
    text = replace_once(text, r'<div class="qr-code">[\s\S]*?</div>', FOOTER_QR)
    text = replace_once(text, r'<div class="footer-social-icons">[\s\S]*?</div>', FOOTER_SOCIAL)

    if 'custom_service.html' not in text:
        text = re.sub(r'(<li><a href="../service/surface_treatment.html">.*?</a></li>)', r"\1\n                                        <li><a href=\"../service/custom_service.html\">定制化服务</a></li>", text, count=1)
        text = re.sub(r'(<li><a href="../service/surface_treatment.html">.*?</a></li>)', r"\1\n                                    <li><a href=\"../service/custom_service.html\">定制化服务</a></li>", text, count=1)
        text = re.sub(r'(<a href="../service/surface_treatment.html" class="footer-sidebar-item">.*?</a>)', r"\1\n                <a href=\"../service/custom_service.html\" class=\"footer-sidebar-item\">定制化服务</a>", text, count=1)

    path.write_text(text, encoding='utf-8')


# Actual content blocks injected below for readability in this file generation

def build_after_sales():
    return """{content}""".format(content='''''' )

# placeholders replaced after writing to file

