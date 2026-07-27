/* =========================================================
   SYOK SYABU SYABU — Site logic
   Sections:
   1. PRODUCTS   — add/edit menu items here
   2. I18N       — add new translatable text here (see README)
   3. ICONS      — shared line-art icons for product categories
   4. STATE + INIT
   5. Rendering (products, cart, translations)
   6. Event bindings (nav, language, filters, cart, scroll)
   ========================================================= */

(function () {
  'use strict';

  /* =========================================================
     1. PRODUCTS
     Add a new item by copying an object below. `category` must
     be one of: 'meats', 'sauces', 'condiments'. `icon` must be
     one of the keys defined in ICONS further down.
     ========================================================= */
  const PRODUCTS = [
    {
      id: 'wagyu-beef', category: 'meats', icon: 'meat', price: 38.90,
      name: { en: 'Signature Beef Hotpot Slices', ms: 'Hirisan Daging Lembu Istimewa' },
      desc: { en: 'Marbled beef, shaved paper-thin for the perfect 3-second swirl.', ms: 'Daging berjalur lemak, dihiris nipis untuk kelunjuran 3 saat yang sempurna.' }
    },
    {
      id: 'chicken-thigh', category: 'meats', icon: 'meat', price: 18.90,
      name: { en: 'Sliced Chicken Thigh', ms: 'Hirisan Peha Ayam' },
      desc: { en: 'Juicy thigh meat, trimmed and sliced for quick, even cooking.', ms: 'Daging peha yang berair, dikemas dan dihiris untuk masakan pantas dan sekata.' }
    },
    {
      id: 'lamb-shoulder', category: 'meats', icon: 'meat', price: 32.90,
      name: { en: 'Halal Lamb Shoulder Slices', ms: 'Hirisan Bahu Kambing Halal' },
      desc: { en: 'Tender shoulder cuts with a mild, rich flavour that holds up in broth.', ms: 'Hirisan bahu yang lembut dengan rasa kaya yang sederhana, sesuai dengan kuah.' }
    },
    {
      id: 'sesame-peanut', category: 'sauces', icon: 'sauce', price: 12.90,
      name: { en: 'Signature Sesame Peanut Dip', ms: 'Sos Celupan Kacang Bijan Istimewa' },
      desc: { en: 'Our most-requested dip — nutty, savoury, and just a little sweet.', ms: 'Sos paling digemari — berperisa kacang, sedap, dan sedikit manis.' }
    },
    {
      id: 'chili-oil', category: 'sauces', icon: 'sauce', price: 10.90,
      name: { en: 'Spicy Chili Oil Dip', ms: 'Sos Minyak Cili Pedas' },
      desc: { en: 'Toasted chili and garlic oil, built for heat-seekers.', ms: 'Minyak cili dan bawang putih dipanggang, untuk peminat pedas.' }
    },
    {
      id: 'tomyum-paste', category: 'sauces', icon: 'sauce', price: 15.90,
      name: { en: 'Tom Yum Broth Paste', ms: 'Pes Kuah Tom Yum' },
      desc: { en: 'Turn plain water into a fragrant, sour-spicy hotpot base in minutes.', ms: 'Tukarkan air kosong kepada kuah steamboat masam-pedas yang wangi dalam beberapa minit.' }
    },
    {
      id: 'garlic-crisps', category: 'condiments', icon: 'condiment', price: 8.90,
      name: { en: 'Golden Garlic Crisps', ms: 'Kerepek Bawang Putih Keemasan' },
      desc: { en: 'Crunchy fried garlic for topping every dip and bowl.', ms: 'Bawang putih goreng rangup untuk taburan setiap sos dan mangkuk.' }
    },
    {
      id: 'pickled-chili', category: 'condiments', icon: 'condiment', price: 7.90,
      name: { en: 'Pickled Chili Padi', ms: 'Cili Padi Jeruk' },
      desc: { en: 'Sharp, tangy heat that cuts through rich broths.', ms: 'Rasa pedas masam yang tajam, mengimbangi kuah yang kaya.' }
    },
    {
      id: 'scallion-mix', category: 'condiments', icon: 'condiment', price: 6.90,
      name: { en: 'Scallion & Coriander Mix', ms: 'Campuran Daun Bawang & Daun Ketumbar' },
      desc: { en: 'Fresh-cut herbs to finish every bowl with a bright lift.', ms: 'Herba segar untuk melengkapkan setiap mangkuk dengan sentuhan segar.' }
    }
  ];

  /* =========================================================
     2. I18N — translation dictionary
     Add new text anywhere on the site by:
       a) giving the element a `data-i18n="section.key"` attribute
       b) adding "section.key" to BOTH the en and ms objects below
     Static HTML text is applied automatically on load and on
     every language switch — no other code needs to change.
     ========================================================= */
  const I18N = {
    en: {
      'nav.home': 'Home', 'nav.about': 'About Us', 'nav.products': 'Menu',
      'nav.payment': 'Payment', 'nav.contact': 'Contact',

      'hero.eyebrow': 'Halal-Certified Hotpot Specialist',
      'hero.title': 'Sedap. Steaming. Syok.',
      'hero.subtitle': 'Premium shabu shabu meats, signature sauces, and condiments — Halal-certified, prepped fresh, and delivered ready for your pot.',
      'hero.ctaPrimary': 'Explore Our Menu',
      'hero.ctaSecondary': 'Our Halal Promise',

      'about.eyebrow': 'Our Story', 'about.title': "Why We're Syok",
      'about.body': "Syok Syabu Syabu started with one simple idea: hotpot night should feel effortless and always Syok. Every cut of meat, every sauce, and every condiment we sell is sourced exclusively from Halal-certified suppliers, prepped in small batches, and packed the same day it ships — so your pot tastes like it came straight from a proper steamboat restaurant, at home.",
      'about.step1Title': 'Sourced from Halal Farms', 'about.step1Body': 'Every supplier is certified and audited before we work with them.',
      'about.step2Title': 'Prepped Fresh Daily', 'about.step2Body': 'Sliced, portioned, and packed in small batches — never frozen for months.',
      'about.step3Title': 'Delivered to Your Pot', 'about.step3Body': 'Chilled delivery straight to your door, ready when hotpot night is.',

      'products.eyebrow': 'Fresh & Ready', 'products.title': 'Our Menu',
      'products.subtitle': 'Everything you need for the perfect pot, priced per pack.',
      'products.filterAll': 'All', 'products.filterMeats': 'Meats', 'products.filterSauces': 'Sauces', 'products.filterCondiments': 'Condiments',
      'products.addToCart': 'Add to Cart',

      'payment.eyebrow': 'Checkout', 'payment.title': 'Easy, Secure Payment',
      'payment.subtitle': 'Pay however suits you — every order is protected.',
      'payment.fpxTitle': 'FPX Online Banking', 'payment.fpxBody': 'Pay directly from any Malaysian bank account.',
      'payment.qrTitle': 'DuitNow QR', 'payment.qrBody': 'Scan and pay in seconds with your e-wallet.',
      'payment.cardTitle': 'Credit / Debit Card', 'payment.cardBody': 'Visa, Mastercard, and all major cards accepted.',

      'footer.tagline': 'Halal-certified hotpot meats, sauces & condiments, delivered.',
      'footer.linksTitle': 'Quick Links', 'footer.contactTitle': 'Get In Touch',
      'footer.address': 'Kuantan, Pahang, Malaysia', 'footer.phone': '+60 12-345 6789',
      'footer.email': 'order@syoksyabusyabu.com', 'footer.hours': 'Every day, 9:00 AM – 9:00 PM',
      'footer.copyright': '© 2026 Syok Syabu Syabu. All rights reserved.',
      'footer.disclaimer': 'Menu items and prices shown are for illustration purposes.',

      'cart.title': 'Your Order', 'cart.total': 'Total', 'cart.checkout': 'Proceed to Payment',
      'cart.empty': 'Your pot is empty. Add something Syok!', 'cart.remove': 'Remove',
      'toast.added': 'Added to cart'
    },
    ms: {
      'nav.home': 'Utama', 'nav.about': 'Tentang Kami', 'nav.products': 'Menu',
      'nav.payment': 'Pembayaran', 'nav.contact': 'Hubungi',

      'hero.eyebrow': 'Pakar Steamboat Bersijil Halal',
      'hero.title': 'Sedap. Menggelegak. Syok.',
      'hero.subtitle': 'Daging shabu shabu premium, sos istimewa, dan bahan pelengkap — bersijil Halal, disediakan segar, terus ke periuk anda.',
      'hero.ctaPrimary': 'Terokai Menu Kami',
      'hero.ctaSecondary': 'Jaminan Halal Kami',

      'about.eyebrow': 'Kisah Kami', 'about.title': 'Kenapa Kami Syok',
      'about.body': 'Syok Syabu Syabu bermula dengan satu idea mudah: malam steamboat patut terasa mudah dan sentiasa Syok. Setiap hirisan daging, setiap sos, dan setiap bahan pelengkap yang kami jual diperoleh khusus daripada pembekal bersijil Halal, disediakan dalam kuantiti kecil, dan dibungkus pada hari yang sama ia dihantar — supaya periuk anda terasa seperti steamboat sebenar, di rumah anda sendiri.',
      'about.step1Title': 'Diperoleh Daripada Ladang Halal', 'about.step1Body': 'Setiap pembekal disahkan dan diaudit sebelum kami bekerjasama.',
      'about.step2Title': 'Disediakan Segar Setiap Hari', 'about.step2Body': 'Dihiris, diasingkan, dan dibungkus dalam kuantiti kecil — bukan beku berbulan-bulan.',
      'about.step3Title': 'Dihantar Terus Ke Periuk Anda', 'about.step3Body': 'Penghantaran sejuk terus ke depan pintu anda, sedia untuk malam steamboat.',

      'products.eyebrow': 'Segar & Sedia', 'products.title': 'Menu Kami',
      'products.subtitle': 'Semua yang anda perlukan untuk periuk yang sempurna, harga per paket.',
      'products.filterAll': 'Semua', 'products.filterMeats': 'Daging', 'products.filterSauces': 'Sos', 'products.filterCondiments': 'Pelengkap',
      'products.addToCart': 'Tambah ke Troli',

      'payment.eyebrow': 'Pembayaran', 'payment.title': 'Pembayaran Mudah & Selamat',
      'payment.subtitle': 'Bayar mengikut cara anda — setiap pesanan dilindungi.',
      'payment.fpxTitle': 'Perbankan Online FPX', 'payment.fpxBody': 'Bayar terus daripada mana-mana akaun bank Malaysia.',
      'payment.qrTitle': 'QR DuitNow', 'payment.qrBody': 'Imbas dan bayar dalam beberapa saat dengan e-dompet anda.',
      'payment.cardTitle': 'Kad Kredit / Debit', 'payment.cardBody': 'Visa, Mastercard, dan semua kad utama diterima.',

      'footer.tagline': 'Daging, sos & bahan pelengkap steamboat bersijil Halal, dihantar terus.',
      'footer.linksTitle': 'Pautan Pantas', 'footer.contactTitle': 'Hubungi Kami',
      'footer.address': 'Kuantan, Pahang, Malaysia', 'footer.phone': '+60 12-345 6789',
      'footer.email': 'order@syoksyabusyabu.com', 'footer.hours': 'Setiap hari, 9:00 Pagi – 9:00 Malam',
      'footer.copyright': '© 2026 Syok Syabu Syabu. Hak cipta terpelihara.',
      'footer.disclaimer': 'Item menu dan harga yang dipaparkan adalah untuk tujuan ilustrasi.',

      'cart.title': 'Pesanan Anda', 'cart.total': 'Jumlah', 'cart.checkout': 'Teruskan ke Pembayaran',
      'cart.empty': 'Periuk anda kosong. Tambah sesuatu yang Syok!', 'cart.remove': 'Buang',
      'toast.added': 'Ditambah ke troli'
    }
  };

  /* =========================================================
     3. ICONS — shared line-art per product category
     ========================================================= */
  const ICONS = {
    meat: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 30 Q10 14 24 14 Q38 14 38 30 Q38 36 24 36 Q10 36 10 30Z"/><path d="M10 30 Q24 24 38 30"/><path d="M14 22 Q24 17 34 22"/></svg>',
    sauce: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6h8v6l4 4v24a2 2 0 0 1-2 2H18a2 2 0 0 1-2-2V16l4-4Z"/><path d="M17 22h14"/></svg>',
    condiment: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 22h32a16 14 0 0 1-32 0Z"/><path d="M8 22c0-2 2-3 4-3h24c2 0 4 1 4 3"/><path d="M18 14c0-3 2-5 2-5M28 14c0-3 2-5 2-5"/></svg>'
  };

  /* =========================================================
     4. STATE
     ========================================================= */
  let currentLang = 'en';
  let currentFilter = 'all';
  const cart = {}; // { productId: quantity }

  /* =========================================================
     5. RENDERING
     ========================================================= */
  function applyTranslations() {
    const dict = I18N[currentLang];
    document.documentElement.lang = currentLang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.innerHTML = dict[key];
    });
    document.getElementById('langLabel').textContent = currentLang.toUpperCase();
    document.querySelectorAll('#langMenu li').forEach(function (li) {
      li.setAttribute('aria-selected', li.dataset.lang === currentLang ? 'true' : 'false');
    });
  }

  function money(amount) {
    return 'RM ' + amount.toFixed(2);
  }

  function renderProducts() {
    const grid = document.getElementById('productGrid');
    const dict = I18N[currentLang];
    const items = PRODUCTS.filter(function (p) {
      return currentFilter === 'all' || p.category === currentFilter;
    });

    grid.innerHTML = items.map(function (p) {
      return (
        '<article class="product-card product-card--' + p.category + '" data-id="' + p.id + '">' +
          '<div class="product-card__icon-wrap">' + ICONS[p.icon] + '</div>' +
          '<h3>' + p.name[currentLang] + '</h3>' +
          '<p>' + p.desc[currentLang] + '</p>' +
          '<div class="product-card__foot">' +
            '<span class="product-card__price">' + money(p.price) + '</span>' +
            '<button class="product-card__add" data-add="' + p.id + '">' + dict['products.addToCart'] + '</button>' +
          '</div>' +
        '</article>'
      );
    }).join('');

    grid.querySelectorAll('[data-add]').forEach(function (btn) {
      btn.addEventListener('click', function () { addToCart(btn.dataset.add); });
    });
  }

  function renderCart() {
    const dict = I18N[currentLang];
    const wrap = document.getElementById('cartItems');
    const ids = Object.keys(cart).filter(function (id) { return cart[id] > 0; });

    if (ids.length === 0) {
      wrap.innerHTML = '<p class="cart-empty">' + dict['cart.empty'] + '</p>';
    } else {
      wrap.innerHTML = ids.map(function (id) {
        const p = PRODUCTS.find(function (x) { return x.id === id; });
        return (
          '<div class="cart-item">' +
            '<div class="cart-item__icon product-card--' + p.category + '" style="background:transparent;color:inherit">' + ICONS[p.icon] + '</div>' +
            '<div class="cart-item__body">' +
              '<h4>' + p.name[currentLang] + '</h4>' +
              '<span class="cart-item__price">' + money(p.price) + '</span>' +
              '<div class="cart-item__qty">' +
                '<button data-qty-minus="' + id + '" aria-label="Decrease quantity">−</button>' +
                '<span>' + cart[id] + '</span>' +
                '<button data-qty-plus="' + id + '" aria-label="Increase quantity">+</button>' +
              '</div>' +
            '</div>' +
          '</div>'
        );
      }).join('');

      wrap.querySelectorAll('[data-qty-plus]').forEach(function (b) {
        b.addEventListener('click', function () { changeQty(b.dataset.qtyPlus, 1); });
      });
      wrap.querySelectorAll('[data-qty-minus]').forEach(function (b) {
        b.addEventListener('click', function () { changeQty(b.dataset.qtyMinus, -1); });
      });
    }

    const total = ids.reduce(function (sum, id) {
      const p = PRODUCTS.find(function (x) { return x.id === id; });
      return sum + p.price * cart[id];
    }, 0);
    document.getElementById('cartTotal').textContent = money(total);

    const count = ids.reduce(function (sum, id) { return sum + cart[id]; }, 0);
    document.getElementById('cartCount').textContent = count;
  }

  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () { toast.classList.remove('is-visible'); }, 2200);
  }

  /* =========================================================
     6. CART ACTIONS
     ========================================================= */
  function addToCart(id) {
    cart[id] = (cart[id] || 0) + 1;
    renderCart();
    showToast(I18N[currentLang]['toast.added']);
  }

  function changeQty(id, delta) {
    cart[id] = (cart[id] || 0) + delta;
    if (cart[id] <= 0) delete cart[id];
    renderCart();
  }

  function openCart() {
    document.getElementById('cartDrawer').classList.add('is-open');
    document.getElementById('cartOverlay').classList.add('is-open');
    document.getElementById('cartDrawer').setAttribute('aria-hidden', 'false');
    document.getElementById('cartClose').focus();
  }

  function closeCart() {
    document.getElementById('cartDrawer').classList.remove('is-open');
    document.getElementById('cartOverlay').classList.remove('is-open');
    document.getElementById('cartDrawer').setAttribute('aria-hidden', 'true');
    document.getElementById('cartBtn').focus();
  }

  /* =========================================================
     7. EVENT BINDINGS
     ========================================================= */
  function bindNavbarScrollShadow() {
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', function () {
      nav.classList.toggle('is-scrolled', window.scrollY > 40);
    });
  }

  function bindHamburger() {
    const burger = document.getElementById('hamburger');
    const links = document.getElementById('navLinks');
    burger.addEventListener('click', function () {
      const open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      links.classList.toggle('is-open', !open);
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        burger.setAttribute('aria-expanded', 'false');
        links.classList.remove('is-open');
      });
    });
  }

  function bindLangSwitch() {
    const btn = document.getElementById('langBtn');
    const menu = document.getElementById('langMenu');
    btn.addEventListener('click', function () {
      const open = menu.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
    menu.querySelectorAll('li').forEach(function (li) {
      li.addEventListener('click', function () {
        currentLang = li.dataset.lang;
        applyTranslations();
        renderProducts();
        renderCart();
        menu.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.lang-switch')) {
        menu.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function bindFilterTabs() {
    const tabs = document.getElementById('filterTabs');
    tabs.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        currentFilter = btn.dataset.filter;
        tabs.querySelectorAll('button').forEach(function (b) {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');
        renderProducts();
      });
    });
  }

  function bindCart() {
    document.getElementById('cartBtn').addEventListener('click', openCart);
    document.getElementById('cartClose').addEventListener('click', closeCart);
    document.getElementById('cartOverlay').addEventListener('click', closeCart);
    document.getElementById('cartCheckout').addEventListener('click', closeCart);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeCart();
    });
  }

  function bindScrollReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach(function (el) { observer.observe(el); });
  }

  /* =========================================================
     INIT
     ========================================================= */
  document.addEventListener('DOMContentLoaded', function () {
    applyTranslations();
    renderProducts();
    renderCart();
    bindNavbarScrollShadow();
    bindHamburger();
    bindLangSwitch();
    bindFilterTabs();
    bindCart();
    bindScrollReveal();
  });
})();
