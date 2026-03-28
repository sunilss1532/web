// Utility to handle modal toggling
function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.toggle('active');
    }
}

// Close modals when clicking completely outside
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.classList.remove('active');
    }
});

// Simple Auth Handling for Prototype
function handleLogin(event) {
    event.preventDefault();
    const role = document.getElementById('roleType').value;
    
    // Simulate authentication processing
    const btn = event.submitter;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="animate-spin">↻</span> Authenticating...';
    btn.disabled = true;

    setTimeout(() => {
        if (role === 'admin') {
            window.location.href = './admin/dashboard.html';
        } else {
            window.location.href = './guardian/dashboard.html';
        }
    }, 800);
}

// Setup active navigation link highlight & Dynamic Mobile Menus
document.addEventListener('DOMContentLoaded', () => {
    // Inject mobile menu toggle into public navbar
    const publicNav = document.querySelector('nav');
    if (publicNav && publicNav.querySelector('.nav-logo')) {
        const btn = document.createElement('button');
        btn.className = 'mobile-menu-btn';
        btn.style.cssText = 'background:none; border:none; font-size:2rem; color:#1A3A5C; cursor:pointer; display:none; padding: 0.5rem; margin-left: auto;';
        btn.innerHTML = '☰';
        btn.onclick = () => {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) navLinks.classList.toggle('active');
        };
        publicNav.appendChild(btn);
    }

    // Inject mobile menu toggle into dashboard sidebars
    const sidebarHeader = document.querySelector('.sidebar-header');
    if (sidebarHeader) {
        const btn = document.createElement('button');
        btn.className = 'mobile-menu-btn md-visible';
        btn.innerHTML = '<i class="ph ph-list"></i>';
        btn.onclick = () => {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                sidebar.classList.toggle('active');
                document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : 'auto';
            }
        };
        sidebarHeader.appendChild(btn);
    }

    // Auto-close public mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Auto-close admin mobile menu on link click
    document.querySelectorAll('.sidebar-link, .dropdown-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            // Ignore click if it's the CMS dropdown trigger div
            if (link.tagName.toLowerCase() !== 'a' && link.classList.contains('sidebar-link')) {
                return;
            }
            const sidebar = document.querySelector('.sidebar');
            if (sidebar && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.sidebar-link, .nav-links a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        // Simple check to match current path
        if (currentPath.includes(linkPath.replace('./', '')) && linkPath !== '#') {
            link.classList.add('active');
        }
    });

    // Initialize CMS Simulation Layer
    initCMS();
});

// --- CMS SIMULATION LOGIC (LocalStorage Database) ---
const CMS_DEFAULTS = {
    hero_title: 'Where Every Senior<br>Finds <em>Peace, Dignity</em><br>& Belonging',
    hero_subtitle: 'Tranquil Retreat Elder Care Centre offers compassionate, professional, and personalised elder care — from assisted living and memory care to home nursing and day programs — tailored for every stage of life.',
    contact_phone: '📞 +91 98765 43210',
    contact_email: '✉ care@tranquilretreat.in'
};

function initCMS() {
    const cmsForm = document.getElementById('cmsForm');
    if (cmsForm) {
        loadCMS(); // Populate admin forms if we are on cms.html
    }
    
    applyCMS(); // Apply DOM manipulation if we are on the public site
}

function loadCMS() {
    document.getElementById('cms_hero_title').value = localStorage.getItem('cms_hero_title') || CMS_DEFAULTS.hero_title;
    document.getElementById('cms_hero_subtitle').value = localStorage.getItem('cms_hero_subtitle') || CMS_DEFAULTS.hero_subtitle;
    document.getElementById('cms_contact_phone').value = localStorage.getItem('cms_contact_phone') || CMS_DEFAULTS.contact_phone;
    document.getElementById('cms_contact_email').value = localStorage.getItem('cms_contact_email') || CMS_DEFAULTS.contact_email;
}

function saveCMS(event) {
    event.preventDefault();
    localStorage.setItem('cms_hero_title', document.getElementById('cms_hero_title').value);
    localStorage.setItem('cms_hero_subtitle', document.getElementById('cms_hero_subtitle').value);
    localStorage.setItem('cms_contact_phone', document.getElementById('cms_contact_phone').value);
    localStorage.setItem('cms_contact_email', document.getElementById('cms_contact_email').value);
    
    alert('Changes instantly published to live site via LocalStorage!');
}

function applyCMS() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) heroTitle.innerHTML = localStorage.getItem('cms_hero_title') || CMS_DEFAULTS.hero_title;

    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) heroSubtitle.innerHTML = localStorage.getItem('cms_hero_subtitle') || CMS_DEFAULTS.hero_subtitle;

    const topbarPhone = document.querySelector('.topbar-left span:nth-child(1)');
    if (topbarPhone) topbarPhone.innerHTML = localStorage.getItem('cms_contact_phone') || CMS_DEFAULTS.contact_phone;

    const topbarEmail = document.querySelector('.topbar-left span:nth-child(2)');
    if (topbarEmail) topbarEmail.innerHTML = localStorage.getItem('cms_contact_email') || CMS_DEFAULTS.contact_email;

    const footerLinks = document.querySelectorAll('.footer-col ul li a');
    footerLinks.forEach(a => {
        if (a.href.startsWith('tel:')) {
            a.innerHTML = localStorage.getItem('cms_contact_phone') || CMS_DEFAULTS.contact_phone;
            a.href = 'tel:' + (localStorage.getItem('cms_contact_phone') || CMS_DEFAULTS.contact_phone).replace(/[^\d+]/g, '');
        }
        if (a.href.startsWith('mailto:')) {
            a.innerHTML = localStorage.getItem('cms_contact_email') || CMS_DEFAULTS.contact_email;
            a.href = 'mailto:' + (localStorage.getItem('cms_contact_email') || CMS_DEFAULTS.contact_email).replace('✉ ', '');
        }
    });
}
