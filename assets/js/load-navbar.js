/**
 * =========================================================================
 * شركة المختار لنقل العفش بجدة - شريط التنقل الموحد (Unified Navbar)
 * =========================================================================
 * 
 * هذا الملف هو المصدر المركزي لجميع روابط وقوائم النافبار في الموقع بالكامل.
 * لإضافة أي خدمة جديدة، فقط أضفها في مصفوفة (siteServices) أدناه:
 * وستظهر تلقائياً في القائمة المنسدلة للكمبيوتر والجوال في كل صفحات الموقع (60+ صفحة)!
 */

// 1. قائمة جميع خدمات الموقع (الرابط المركزي للخدمات)
const siteServices = [
    { title: "نقل عفش داخل جدة", url: "/furniture-moving-within-jeddah/", icon: "fas fa-truck-moving" },
    { title: "نقل عفش شقق بجدة", url: "/apartment-furniture-moving-jeddah/", icon: "fas fa-door-open" },
    { title: "نقل عفش منازل بجدة", url: "/household-furniture-moving-in-jeddah/", icon: "fas fa-couch" },
    { title: "نقل أثاث الفلل بجدة", url: "/villa-moving-in-jeddah/", icon: "fas fa-home" },
    { title: "نقل عفش المكاتب والشركات", url: "/office-and-company-relocation-in-jeddah/", icon: "fas fa-building" },
    { title: "فك وتركيب العفش والأثاث", url: "/furniture-dismantling-and-assembly-in-jeddah/", icon: "fas fa-tools" },
    { title: "فك وتركيب غرف النوم", url: "/services/bedroom-disassembly-installation/", icon: "fas fa-bed" },
    { title: "نقل وفك وتركيب المطابخ", url: "/moving-kitchens-in-jeddah/", icon: "fas fa-sink" },
    { title: "نقل المجالس العربية والكنب", url: "/moving-the-arab-councils-jeddah/", icon: "fas fa-chair" },
    { title: "فك ونقل وتركيب المكيفات", url: "/air-conditioner-relocation-in-jeddah/", icon: "fas fa-snowflake" },
    { title: "ونش رفع أثاث بجدة", url: "/furniture-lifting-crane-jeddah/", icon: "fas fa-truck-loading" },
    { title: "دينا نقل عفش جدة", url: "/furniture-moving-truck-jeddah/", icon: "fas fa-truck" },
    { title: "عمالة نقل عفش بجدة", url: "/furniture-moving-labor-jeddah/", icon: "fas fa-users-cog" },
    { title: "مستودعات تخزين الأثاث", url: "/furniture-storage-warehouses-in-jeddah/", icon: "fas fa-warehouse" },
    { title: "نقل عفش مع الضمان", url: "/guaranteed-furniture-moving-company-jeddah/", icon: "fas fa-shield-alt" }
];

// إتاحة القائمة عامة للموقع
if (typeof window !== 'undefined') {
    window.siteServices = siteServices;
}

function buildNavbarHTML() {
    // عناصر القائمة المنسدلة للكمبيوتر (Desktop Dropdown Items)
    const desktopServicesHTML = siteServices.map(service => `
        <a href="${service.url}" class="services-menu-item">
            <div class="item-icon">
                <i class="${service.icon}"></i>
            </div>
            <span class="item-title">${service.title}</span>
        </a>
    `).join('');

    // عناصر القائمة المنسدلة للجوال (Mobile Dropdown Items)
    const mobileServicesHTML = siteServices.map(service => `
        <a href="${service.url}" class="mobile-sub-item">
            <span class="flex-item-text">
                <i class="${service.icon} text-blue-600"></i>
                ${service.title}
            </span>
            <i class="fas fa-angle-left arrow-indicator"></i>
        </a>
    `).join('');

    return `
<header id="navbar" class="fixed top-0 w-full z-50 transition-all duration-300 py-3 lg:py-4 bg-white/95 backdrop-blur-sm shadow-md">
    <div class="container mx-auto px-4 xl:px-6">
        <div class="flex justify-between items-center">
            
            <!-- Logo واسم الشركة -->
            <div class="flex items-center space-x-reverse space-x-3 rtl:space-x-reverse">
                <div class="flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-xl shadow-lg">
                    <img src="/assets/img/logo.webp" alt="شركة المختار لنقل العفش بجدة" width="56" height="56" data-no-lazy class="rounded-xl">
                </div>
                <div class="flex flex-col">
                    <a href="/" class="flex flex-col">
                        <span class="text-lg lg:text-xl font-extrabold text-gray-800 leading-tight">
                            شركة المختار
                        </span>
                        <span class="text-xs lg:text-sm font-semibold bg-gradient-to-l from-blue-600 to-orange-500 bg-clip-text text-transparent">
                            لنقل العفش بجدة
                        </span>
                    </a>
                </div>
            </div>

            <!-- Desktop Navigation -->
            <nav class="hidden lg:flex items-center nav-desktop-list">
                <a href="/" class="nav-link-item">الرئيسية</a>
                <a href="/about/" class="nav-link-item">من نحن</a>

                <!-- قائمة خدماتنا المنسدلة (Desktop Mega Dropdown) -->
                <div class="services-dropdown-container">
                    <a href="/services/" class="nav-link-item services-drop-trigger">
                        <span>خدماتنا</span>
                        <i class="fas fa-chevron-down drop-arrow"></i>
                    </a>

                    <!-- Dropdown Box -->
                    <div class="services-dropdown-menu">
                        <div class="dropdown-header-bar">
                            <div class="dropdown-header-title">
                                <span class="dropdown-header-dot"></span>
                                <span>خدمات نقل العفش بجدة (${siteServices.length} خدمة متكاملة)</span>
                            </div>
                            <a href="/services/" class="dropdown-all-link">
                                استعراض جميع الخدمات <i class="fas fa-arrow-left"></i>
                            </a>
                        </div>

                        <!-- 2-Column Grid -->
                        <div class="services-menu-grid">
                            ${desktopServicesHTML}
                        </div>

                        <!-- Footer -->
                        <div class="dropdown-footer-bar">
                            <span class="footer-guarantee">
                                <i class="fas fa-shield-alt text-green-600 ml-1"></i> سيارات مجهزة وضمان سلامة العفش
                            </span>
                            <a href="tel:0561110020" class="footer-phone">
                                <i class="fas fa-phone-alt ml-1"></i> 0561110020
                            </a>
                        </div>
                    </div>
                </div>

                <a href="/faq/" class="nav-link-item">الأسئلة الشائعة</a>
                <a href="/blog/" class="nav-link-item">المدونة</a>
                <a href="/cities/" class="nav-link-item">المدن</a>
                <a href="/areas/" class="nav-link-item">الأحياء</a>
                <a href="/contact/" class="nav-link-item">تواصل معنا</a>
            </nav>

            <!-- Buttons -->
            <div class="flex items-center space-x-reverse space-x-3 rtl:space-x-reverse">
                <a href="https://wa.me/966561110020" aria-label="تواصل عبر واتساب"
                    class="bg-gradient-to-l from-green-500 to-green-600 text-white px-3 sm:px-4 py-2 rounded-full font-bold hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm">
                    <i class="fab fa-whatsapp ml-1 sm:ml-2 text-sm sm:text-base" aria-hidden="true"></i>
                    <span class="hidden sm:inline text-xs sm:text-sm">واتساب</span>
                </a>

                <a href="tel:0561110020"
                    class="hidden md:flex bg-gradient-to-l from-blue-600 to-blue-700 text-white px-3 sm:px-4 py-2 rounded-full font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm">
                    <i class="fas fa-phone ml-1 sm:ml-2 text-sm sm:text-base"></i>
                    <span class="text-xs sm:text-sm">اتصل الآن</span>
                </a>

                <button class="lg:hidden text-gray-700 text-2xl focus:outline-none hover:text-blue-600 transition-colors duration-300 p-1"
                    id="mobile-menu-btn" aria-label="فتح القائمة">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
        </div>
    </div>

    <!-- Mobile Menu -->
    <div id="mobile-menu" class="mobile-menu-closed lg:hidden bg-white/95 backdrop-blur-sm border-t border-gray-100 shadow-xl overflow-hidden transition-all duration-300">
        <div class="container mx-auto px-4 py-4 max-h-[85vh] overflow-y-auto">
            <div class="flex flex-col space-y-1">
                <a href="/" class="mobile-main-link">
                    <i class="fas fa-home ml-3 text-blue-600 w-5"></i> الرئيسية
                </a>
                <a href="/about/" class="mobile-main-link">
                    <i class="fas fa-info-circle ml-3 text-blue-600 w-5"></i> من نحن
                </a>

                <!-- خدماتنا في الجوال مع قائمة منسدلة قابلة للطي -->
                <div class="mobile-services-wrapper">
                    <div class="mobile-services-header">
                        <a href="/services/" class="mobile-services-text">
                            <i class="fas fa-concierge-bell ml-3 text-blue-600 w-5"></i> خدماتنا
                        </a>
                        <button type="button" id="mobile-services-toggle" class="mobile-services-arrow-btn" aria-label="عرض الخدمات">
                            <i id="mobile-services-arrow" class="fas fa-chevron-down text-xs transition-transform duration-300"></i>
                        </button>
                    </div>
                    <div id="mobile-services-submenu" class="hidden mobile-submenu-container">
                        <a href="/services/" class="mobile-all-services-link">
                            <span><i class="fas fa-th-large ml-2 text-blue-600"></i> عرض صفحة جميع الخدمات</span>
                            <i class="fas fa-arrow-left text-[10px]"></i>
                        </a>
                        ${mobileServicesHTML}
                    </div>
                </div>

                <a href="/faq/" class="mobile-main-link">
                    <i class="fas fa-question-circle ml-3 text-blue-600 w-5"></i> الأسئلة الشائعة
                </a>
                <a href="/blog/" class="mobile-main-link">
                    <i class="fas fa-newspaper ml-3 text-blue-600 w-5"></i> المدونة
                </a>
                <a href="/cities/" class="mobile-main-link">
                    <i class="fas fa-city ml-3 text-blue-600 w-5"></i> المدن
                </a>
                <a href="/areas/" class="mobile-main-link">
                    <i class="fas fa-map-marker-alt ml-3 text-blue-600 w-5"></i> الأحياء
                </a>
                <a href="/contact/" class="mobile-main-link">
                    <i class="fas fa-phone-alt ml-3 text-blue-600 w-5"></i> تواصل معنا
                </a>

                <!-- أزرار الاتصال في قائمة الجوال -->
                <div class="flex flex-col sm:flex-row gap-3 mt-4 pt-4 border-t border-gray-100">
                    <a href="tel:0561110020" class="bg-gradient-to-l from-blue-600 to-blue-700 text-white px-4 py-3 rounded-lg font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center shadow-md text-sm">
                        <i class="fas fa-phone ml-2"></i> اتصل الآن
                    </a>
                    <a href="https://wa.me/966561110020" class="bg-gradient-to-l from-green-500 to-green-600 text-white px-4 py-3 rounded-lg font-bold hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center shadow-md text-sm">
                        <i class="fab fa-whatsapp ml-2"></i> واتساب
                    </a>
                </div>
            </div>
        </div>
    </div>
</header>
    `;
}

function injectNavbarStyles() {
    if (document.getElementById('site-navbar-custom-css')) return;
    const style = document.createElement('style');
    style.id = 'site-navbar-custom-css';
    style.textContent = `
        /* Desktop Navigation Links */
        .nav-desktop-list {
            display: flex !important;
            align-items: center !important;
            gap: 1.5rem !important;
            margin: 0 !important;
            padding: 0 !important;
        }
        .nav-link-item {
            color: #374151 !important;
            font-size: 0.95rem !important;
            font-weight: 600 !important;
            text-decoration: none !important;
            transition: color 0.2s ease !important;
            display: inline-flex !important;
            align-items: center !important;
            white-space: nowrap !important;
            padding: 6px 4px !important;
            margin: 0 !important;
        }
        .nav-link-item:hover {
            color: #2563eb !important;
        }

        /* Desktop Services Dropdown Container */
        .services-dropdown-container {
            position: relative;
            display: inline-flex;
            align-items: center;
            padding: 6px 0;
        }
        .services-drop-trigger {
            gap: 5px;
            cursor: pointer;
        }
        .drop-arrow {
            font-size: 10px;
            transition: transform 0.25s ease;
            color: #9ca3af;
        }
        .services-dropdown-container:hover .drop-arrow,
        .services-dropdown-container.is-active .drop-arrow {
            transform: rotate(180deg);
            color: #2563eb;
        }

        /* Invisible bridge to prevent hover loss */
        .services-dropdown-container::after {
            content: '';
            position: absolute;
            top: 100%;
            right: 0;
            width: 100%;
            height: 16px;
            background: transparent;
        }

        /* Dropdown Box */
        .services-dropdown-menu {
            display: none;
            position: absolute;
            top: calc(100% + 10px);
            right: 0;
            width: 580px;
            max-width: 92vw;
            background: #ffffff;
            border-radius: 18px;
            box-shadow: 0 20px 45px -10px rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.06);
            padding: 16px;
            z-index: 99999;
            opacity: 0;
            transform: translateY(8px);
            transition: opacity 0.2s ease, transform 0.2s ease;
            pointer-events: none;
        }

        /* Show Dropdown on Hover or Active */
        .services-dropdown-container:hover .services-dropdown-menu,
        .services-dropdown-container.is-active .services-dropdown-menu {
            display: block !important;
            opacity: 1 !important;
            transform: translateY(0) !important;
            pointer-events: auto !important;
        }

        /* Dropdown Header */
        .dropdown-header-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 10px;
            margin-bottom: 8px;
            border-bottom: 1px solid #f1f5f9;
        }
        .dropdown-header-title {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 12px;
            font-weight: 700;
            color: #1e293b;
        }
        .dropdown-header-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #2563eb;
            display: inline-block;
        }
        .dropdown-all-link {
            font-size: 11px;
            font-weight: 700;
            color: #2563eb;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 4px;
        }
        .dropdown-all-link:hover {
            color: #1d4ed8;
            text-decoration: underline;
        }

        /* 2-Column Grid */
        .services-menu-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 5px 8px;
            max-height: 350px;
            overflow-y: auto;
            padding: 2px;
        }
        .services-menu-grid::-webkit-scrollbar {
            width: 5px;
        }
        .services-menu-grid::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
        }

        .services-menu-item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 7px 9px;
            border-radius: 10px;
            color: #374151;
            text-decoration: none;
            transition: all 0.2s ease;
            font-size: 12.5px;
            font-weight: 500;
        }
        .services-menu-item:hover {
            background: #eff6ff;
            color: #1d4ed8;
            transform: translateX(-3px);
        }
        .services-menu-item .item-icon {
            width: 28px;
            height: 28px;
            border-radius: 7px;
            background: #dbeafe;
            color: #2563eb;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            flex-shrink: 0;
            transition: all 0.2s ease;
        }
        .services-menu-item:hover .item-icon {
            background: #2563eb;
            color: #ffffff;
        }
        .services-menu-item .item-title {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        /* Dropdown Footer */
        .dropdown-footer-bar {
            margin: 10px -16px -16px -16px;
            padding: 10px 16px;
            background: #f8fafc;
            border-top: 1px solid #f1f5f9;
            border-radius: 0 0 18px 18px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 11.5px;
        }
        .footer-guarantee {
            color: #4b5563;
            display: inline-flex;
            align-items: center;
        }
        .footer-phone {
            color: #1d4ed8;
            font-weight: 700;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
        }
        .footer-phone:hover {
            text-decoration: underline;
        }

        /* Mobile Menu Styles */
        .mobile-menu-open {
            max-height: 85vh !important;
            opacity: 1 !important;
            visibility: visible !important;
        }
        .mobile-menu-closed {
            max-height: 0 !important;
            opacity: 0 !important;
            visibility: hidden !important;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
        }
        .mobile-main-link {
            padding: 10px 14px;
            border-radius: 10px;
            color: #374151;
            font-weight: 600;
            font-size: 14px;
            display: flex;
            align-items: center;
            text-decoration: none;
            transition: background 0.2s;
        }
        .mobile-main-link:hover {
            background: #eff6ff;
            color: #2563eb;
        }
        .mobile-services-wrapper {
            border-radius: 12px;
            border: 1px solid #f1f5f9;
            background: #f8fafc;
            overflow: hidden;
            margin: 4px 0;
        }
        .mobile-services-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .mobile-services-text {
            padding: 10px 14px;
            color: #374151;
            font-weight: 600;
            font-size: 14px;
            display: flex;
            align-items: center;
            flex-grow: 1;
            text-decoration: none;
        }
        .mobile-services-arrow-btn {
            padding: 10px 16px;
            color: #6b7280;
            background: transparent;
            border: none;
            cursor: pointer;
        }
        .mobile-services-arrow-btn:hover {
            color: #2563eb;
        }
        .mobile-submenu-container {
            padding: 4px 10px 10px 10px;
            background: #ffffff;
            border-top: 1px solid #f1f5f9;
            max-height: 280px;
            overflow-y: auto;
        }
        .mobile-all-services-link {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 10px;
            border-radius: 8px;
            color: #2563eb;
            background: #eff6ff;
            font-weight: 700;
            font-size: 12px;
            margin-bottom: 6px;
            text-decoration: none;
        }
        .mobile-sub-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 10px;
            border-radius: 8px;
            color: #4b5563;
            font-size: 12px;
            font-weight: 500;
            text-decoration: none;
            transition: background 0.15s;
        }
        .mobile-sub-item:hover {
            background: #f1f5f9;
            color: #2563eb;
        }
        .flex-item-text {
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }
        .arrow-indicator {
            font-size: 10px;
            color: #cbd5e1;
        }
    `;
    document.head.appendChild(style);
}

function setupNavbarInteractions() {
    injectNavbarStyles();

    // تفاعل القائمة المنسدلة للكمبيوتر بالماوس واللمس
    const dropdownContainers = document.querySelectorAll('.services-dropdown-container');
    dropdownContainers.forEach(container => {
        let timeoutId;
        container.addEventListener('mouseenter', () => {
            clearTimeout(timeoutId);
            container.classList.add('is-active');
        });
        container.addEventListener('mouseleave', () => {
            timeoutId = setTimeout(() => {
                container.classList.remove('is-active');
            }, 100);
        });
        // للأجهزة اللوحية والمحمولة
        const trigger = container.querySelector('.services-drop-trigger');
        if (trigger) {
            trigger.addEventListener('click', (e) => {
                if (window.innerWidth >= 1024) {
                    // إذا كان مؤشر ماوس عادي، اترك الرابط ينقل أو افتح القائمة
                    if (!container.classList.contains('is-active')) {
                        e.preventDefault();
                        container.classList.add('is-active');
                    }
                }
            });
        }
    });

    // التحكم في قائمة الجوال (الهامبرغر)
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu && !mobileMenuBtn.dataset.bound) {
        mobileMenuBtn.dataset.bound = "true";
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = mobileMenu.classList.contains('mobile-menu-open');
            if (isOpen) {
                mobileMenu.classList.remove('mobile-menu-open');
                mobileMenu.classList.add('mobile-menu-closed');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            } else {
                mobileMenu.classList.remove('mobile-menu-closed');
                mobileMenu.classList.add('mobile-menu-open');
                mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
            }
        });
    }

    // التحكم في قائمة الخدمات في الجوال (Accordion)
    const mobileServicesToggle = document.getElementById('mobile-services-toggle');
    const mobileServicesSubmenu = document.getElementById('mobile-services-submenu');
    const mobileServicesArrow = document.getElementById('mobile-services-arrow');

    if (mobileServicesToggle && mobileServicesSubmenu && !mobileServicesToggle.dataset.bound) {
        mobileServicesToggle.dataset.bound = "true";
        mobileServicesToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const isHidden = mobileServicesSubmenu.classList.contains('hidden');
            if (isHidden) {
                mobileServicesSubmenu.classList.remove('hidden');
                if (mobileServicesArrow) mobileServicesArrow.classList.add('rotate-180');
            } else {
                mobileServicesSubmenu.classList.add('hidden');
                if (mobileServicesArrow) mobileServicesArrow.classList.remove('rotate-180');
            }
        });
    }

    // إغلاق القوائم عند النقر خارجها
    document.addEventListener('click', function(e) {
        dropdownContainers.forEach(container => {
            if (!container.contains(e.target)) {
                container.classList.remove('is-active');
            }
        });
        if (mobileMenu && mobileMenu.classList.contains('mobile-menu-open')) {
            const header = document.getElementById('navbar');
            if (header && !header.contains(e.target)) {
                mobileMenu.classList.remove('mobile-menu-open');
                mobileMenu.classList.add('mobile-menu-closed');
                if (mobileMenuBtn) mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });

    // تأثير التمرير
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 30) {
                navbar.classList.add('shadow-lg');
            } else {
                navbar.classList.remove('shadow-lg');
            }
        }
    }, { passive: true });
}

function initNavbar() {
    const container = document.getElementById('site-navbar');
    if (container) {
        container.innerHTML = buildNavbarHTML();
        setupNavbarInteractions();
    }
    document.dispatchEvent(new Event('navbarLoaded'));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavbar);
} else {
    initNavbar();
}
