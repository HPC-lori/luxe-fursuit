/**
 * LUXE FURSUIT - Main Application Logic
 * Version: 1.0.0
 * * 功能模块：
 * 1. Modal Logic: 弹窗自动注入与交互
 * 2. Login State: 登录状态检查与模拟
 * 3. Cursor FX:   高性能平滑鼠标光圈
 * 4. Animation:   滚动渐显效果
 * 5. i18n:        中英文切换
 */

 document.addEventListener("DOMContentLoaded", function() {
    ensureModalExists();   // 1. 注入弹窗
    ensureCursorExists();  // 2. 注入光标
    checkLoginStatus();    // 3. 检查状态
    initLanguage();        // 4. 初始化语言
    initModalLogic();      // 5. 绑定交互
    initInquiryForm();     // 6. 绑定表单
    initScrollAnimations();// 7. 滚动动画
    initSmoothCursor();    // 8. 启动光标
});

/* ==========================================================================
   DOM Injection (自动注入 HTML 结构)
   ========================================================================== */

// 自动注入鼠标光圈 HTML
function ensureCursorExists() {
    if (document.getElementById('cursor-dot')) return;
    const cursorHTML = '<div id="cursor-dot"></div><div id="cursor-ring"></div>';
    document.body.insertAdjacentHTML('beforeend', cursorHTML);
}

// 自动注入弹窗 HTML (带样式修复)
function ensureModalExists() {
    if (document.getElementById('loginModal')) return; 
    const modalHTML = `
    <div id="loginModal" class="modal-overlay">
        <div class="login-modal" style="color: #333 !important;">
            <button class="close-modal-btn" style="color: #666 !important;">&times;</button>
            
            <div class="login-header">
                <h2 data-en="Welcome Back" style="color: #000000 !important;">欢迎回来</h2>
                <div class="login-tabs">
                    <button class="tab-btn active" data-target="formPhone" data-en="Phone" style="color: #000 !important;">手机验证码</button>
                    <button class="tab-btn" data-target="formEmail" data-en="Password" style="color: #999 !important;">密码登录</button>
                </div>
            </div>

            <div id="formPhone" class="login-form-view">
                <div class="login-form-group">
                    <input type="tel" class="login-input" placeholder="请输入手机号" data-en-ph="Phone Number" style="color: #000 !important; background: #f9f9f9 !important;">
                </div>
                <div class="login-form-group">
                    <input type="text" class="login-input" placeholder="请输入验证码" data-en-ph="Verification Code" style="color: #000 !important; background: #f9f9f9 !important;">
                    <button class="verify-code-btn" data-en="Get Code" style="color: #D4AF37 !important; background: transparent;">获取验证码</button>
                </div>
                <button class="btn-full-login" onclick="performLogin('phone')" data-en="Login / Register" style="background-color: #000 !important; color: #fff !important;">登录 / 注册</button>
            </div>

            <div id="formEmail" class="login-form-view" style="display: none;">
                <div class="login-form-group">
                    <input type="email" class="login-input" placeholder="邮箱 / 账号" data-en-ph="Email / Account" style="color: #000 !important; background: #f9f9f9 !important;">
                </div>
                <div class="login-form-group">
                    <input type="password" class="login-input" placeholder="密码" data-en-ph="Password" style="color: #000 !important; background: #f9f9f9 !important;">
                </div>
                <button class="btn-full-login" onclick="performLogin('email')" data-en="Login" style="background-color: #000 !important; color: #fff !important;">登 录</button>
            </div>

            <div class="agreement-box" style="color: #666 !important;">
                <input type="checkbox" id="agreeTerms">
                <label data-en="I agree to the User Agreement and Privacy Policy" style="color: #666 !important;">
                    我已阅读并同意 
                    <a href="#" onclick="event.stopPropagation(); alert('【模拟】此处将显示《用户协议》的具体内容。'); return false;" style="color: #D4AF37 !important; position: relative; z-index: 10;">用户协议</a> 
                    与 
                    <a href="#" onclick="event.stopPropagation(); alert('【模拟】此处将显示《隐私政策》的具体内容。'); return false;" style="color: #D4AF37 !important; position: relative; z-index: 10;">隐私政策</a>
                </label>
            </div>

            <div class="divider" style="border-bottom-color: #eee;">
                <span data-en="Or login with" style="color: #ccc !important; background: #fff !important;">其他方式登录</span>
            </div>
            
            <div class="social-login-bar">
                <button class="social-btn qq" onclick="socialLogin('qq')" title="QQ登录">
                    <svg viewBox="0 0 1024 1024" width="24" height="24"><path d="M824.8 613.2c-16-51.4-34.4-94.6-62.7-165.3C766.5 262.2 689.3 112 511.5 112 331.7 112 256.2 265.2 261 447.9c-28.4 70.8-46.7 113.7-62.7 165.3-34 109.5-23 154.8-14.6 155.8 18 2.2 70.1-82.4 70.1-82.4 0 49 25.2 112.9 79.8 159-26.4 8.1-85.7 29.9-71.6 53.8 11.4 19.3 196.2 12.3 249.5 6.3 53.3 6 238.1 13 249.5-6.3 14.1-23.8-45.2-45.7-71.6-53.8 54.6-46.2 79.8-110.1 79.8-159 0 0 52.1 84.6 70.1 82.4 8.5-1.1 19.5-46.4-14.5-155.8z" fill="#12B7F5"/></svg>
                </button>
                <button class="social-btn wechat" onclick="socialLogin('wechat')" title="微信登录">
                    <svg viewBox="0 0 1024 1024" width="24" height="24"><path d="M693.6 698.7c20.5 0 39.6-2.9 57.5-7.3 19.2 47.2 78.8 80.7 149.5 80.7 13.1 0 25.7-1.1 37.9-3.2l66.9 37.5-18-56.8c46-31.9 76.8-81.5 76.8-137.6 0-98-91.7-177.5-204.8-177.5-113.1 0-204.8 79.5-204.8 177.5 0 47.6 21.6 90.8 57.4 123.1-10.6 19.3-17.3 41.1-18.4 63.6zM361 674.5c156.6 0 283.5-110.2 283.5-246.1S517.6 182.3 361 182.3 77.5 292.5 77.5 428.4c0 80.2 44.6 151.6 113.4 196.4l-28.8 87.6 103.7-54.5c29.4 9.9 61.3 16.6 95.2 16.6z" fill="#07C160"/></svg>
                </button>
                <button class="social-btn google" onclick="socialLogin('google')" title="Google Login">
                     <svg viewBox="0 0 1024 1024" width="24" height="24"><path d="M881 442.4H519.7v148.5h206.4c-8.9 48-35.9 88.6-76.6 115.8-34.4 23-78.3 36.6-129.9 36.6-99.9 0-184.4-67.5-214.6-158.2-7.6-23-12-47.6-12-72.9s4.3-49.9 12-72.9c30.3-90.6 114.8-158.1 214.7-158.1 56.3 0 106.8 19.4 146.6 57.4l110-110.1c-66.5-62-153.2-100-256.6-100-149.9 0-279.6 86-342.7 211.4-26 51.8-40.8 110.4-40.8 172.4S15.1 533 41.1 584.8C104.2 710.1 233.9 796.1 383.8 796.1c134 0 246.5-44.1 328.8-120 84.8-78.2 111.2-194.3 111.2-263.1 0-18.3-1.6-35.9-4.9-50.6z" fill="#DB4437"/></svg>
                </button>
                <button class="social-btn apple" onclick="socialLogin('apple')" title="Apple Login">
                     <svg viewBox="0 0 1024 1024" width="24" height="24"><path d="M749.9 728.4c-29.6 42.9-60.6 85.6-109.1 86.5-47.7 0.8-63.1-28.4-117.8-28.4-55.2 0-72.2 27.9-117.3 28.9-47.1 1.1-82.8-47.2-112.8-90.4-61.5-88.7-108.5-250.8-45.4-360.4 30.7-53.2 85.7-86.9 145.7-87.7 45.4-0.6 88.3 30.6 116 30.6 27.3 0 78.7-37.8 132.7-32.3 22.6 0.9 86.2 9.2 126.9 68.7-3.1 1.9-75.7 44.2-75 132.1 0.7 104.8 91.6 140.3 92.2 140.7-0.8 2.2-14.3 49.2-46.1 95.3zM668.3 203c24.9-30.1 41.6-71.9 37-113.8-35.8 1.4-79.3 23.8-105.1 53.8-22.4 26-42.1 67.7-36.9 107.6 40.1 3.1 80.6-20.9 105-47.6z" fill="#000"/></svg>
                </button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

/* ==========================================================================
   Logic & Interaction (核心逻辑)
   ========================================================================== */

// 1. 高性能丝滑光标逻辑 (Lerp算法)
function initSmoothCursor() {
    if (window.matchMedia("(max-width: 768px)").matches) return;
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX; mouseY = e.clientY;
        const target = e.target;
        if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
            ring.style.transform = `translate(${ringX}px, ${ringY}px) scale(1.5)`;
            ring.style.borderColor = 'rgba(212, 175, 55, 0.3)';
            ring.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
        } else {
            ring.style.transform = `translate(${ringX}px, ${ringY}px) scale(1)`;
            ring.style.borderColor = '#D4AF37';
            ring.style.backgroundColor = 'transparent';
        }
    });

    function animate() {
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        const currentScale = ring.style.transform.includes('scale(1.5)') ? 1.5 : 1;
        ring.style.transform = `translate(${ringX}px, ${ringY}px) scale(${currentScale})`;
        requestAnimationFrame(animate);
    }
    animate();
}

// 2. 滚动动画控制
function initScrollAnimations() {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('is-visible');
            else entry.target.classList.remove('is-visible');
        });
    }, observerOptions);
    document.querySelectorAll('.fade-in-section').forEach(el => observer.observe(el));
}

// 3. 登录状态检查
function checkLoginStatus() {
    const isLogged = localStorage.getItem('user_login') === 'true';
    const loginType = localStorage.getItem('login_type') || 'account'; 
    const btn = document.getElementById('loginBtn');
    const overlay = document.getElementById('formOverlay');
    
    if (btn) {
        if (isLogged) {
            let userTextZh = "👤 我的账户";
            let userTextEn = "👤 My Account";
            if(loginType === 'qq') { userTextZh = "🐧 QQ用户"; userTextEn = "🐧 QQ User"; }
            if(loginType === 'wechat') { userTextZh = "🟢 微信用户"; userTextEn = "🟢 WeChat User"; }
            if(loginType === 'google') { userTextZh = "🔵 Google"; userTextEn = "🔵 Google"; }
            
            btn.setAttribute('data-zh', userTextZh);
            btn.setAttribute('data-en', userTextEn);
            btn.classList.add('logged-in');
            
            const currentLang = localStorage.getItem('site_lang') || 'zh';
            btn.textContent = currentLang === 'en' ? userTextEn : userTextZh;
        } else {
            btn.setAttribute('data-zh', '登录 / 注册');
            btn.setAttribute('data-en', 'Login / Sign up');
            btn.classList.remove('logged-in');
            btn.textContent = localStorage.getItem('site_lang') === 'en' ? 'Login / Sign up' : '登录 / 注册';
        }
    }
    if (overlay) {
        if (isLogged) overlay.classList.add('hidden');
        else overlay.classList.remove('hidden');
    }
}

// 4. 弹窗交互逻辑
function initModalLogic() {
    const modal = document.getElementById('loginModal');
    if (!modal) return;
    const closeBtn = modal.querySelector('.close-modal-btn');
    const tabBtns = modal.querySelectorAll('.tab-btn');
    const forms = modal.querySelectorAll('.login-form-view');
    const getCodeBtn = modal.querySelector('.verify-code-btn');
    const btn = document.getElementById('loginBtn');

    if(btn) {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const isLogged = localStorage.getItem('user_login') === 'true';
            if (isLogged) {
                if(confirm("确定要退出登录吗？ / Log out?")) {
                    localStorage.removeItem('user_login');
                    localStorage.removeItem('login_type');
                    location.reload();
                }
            } else {
                modal.classList.add('active');
            }
        });
    }
    if(closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            forms.forEach(f => f.style.display = 'none');
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).style.display = 'block';
        });
    });
    if(getCodeBtn) {
        getCodeBtn.addEventListener('click', function() {
            let seconds = 60;
            getCodeBtn.disabled = true;
            getCodeBtn.textContent = `${seconds}s`;
            alert("【模拟】验证码是: 888888"); 
            const timer = setInterval(() => {
                seconds--;
                getCodeBtn.textContent = `${seconds}s`;
                if (seconds <= 0) {
                    clearInterval(timer);
                    getCodeBtn.disabled = false;
                    getCodeBtn.textContent = "获取验证码";
                }
            }, 1000);
        });
    }
}

// 5. 表单提交
function initInquiryForm() {
    const inquiryForm = document.querySelector('.form-wrapper form');
    if (!inquiryForm) return;
    inquiryForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        const submitBtn = inquiryForm.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = "提交中... / Submitting...";
        setTimeout(() => {
            alert("✅ 数据提交成功！\n我们将根据您的尺寸开始初步评估。\n\nSubmission Successful!");
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            inquiryForm.reset();
        }, 1500);
    });
}

// --- 全局工具函数 ---
window.performLogin = function(type) {
    const checkbox = document.getElementById('agreeTerms');
    if (checkbox && !checkbox.checked) {
        alert("请先阅读并同意《用户协议》与《隐私政策》\nPlease agree to the Terms and Privacy Policy.");
        return;
    }
    const btn = event.target;
    btn.textContent = "登录中...";
    btn.disabled = true;
    setTimeout(() => {
        localStorage.setItem('user_login', 'true');
        localStorage.setItem('login_type', type);
        location.reload();
    }, 1000);
};

window.socialLogin = function(provider) {
    const textMap = { 'qq': '正在唤起 QQ ...', 'wechat': '请使用微信扫码...', 'google': 'Connecting to Google...', 'apple': 'Sign in with Apple...' };
    alert(textMap[provider] || 'Loading...');
    setTimeout(() => {
        localStorage.setItem('user_login', 'true');
        localStorage.setItem('login_type', provider);
        location.reload();
    }, 1500);
};

// --- 语言切换 ---
const langBtn = document.getElementById('langBtn');
function initLanguage() {
    let currentLang = localStorage.getItem('site_lang') || 'zh';
    applyLanguage(currentLang);
    if (langBtn) {
        const newLangBtn = langBtn.cloneNode(true);
        langBtn.parentNode.replaceChild(newLangBtn, langBtn);
        newLangBtn.addEventListener('click', function() {
            currentLang = currentLang === 'zh' ? 'en' : 'zh';
            applyLanguage(currentLang);
        });
    }
}

function applyLanguage(lang) {
    const textElements = document.querySelectorAll('[data-en]');
    textElements.forEach(el => {
        if (!el.getAttribute('data-zh')) {
            const originalText = el.textContent.trim();
            if(originalText) el.setAttribute('data-zh', originalText);
        }
        const newText = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-zh');
        if (newText) el.textContent = newText;
    });
    const inputElements = document.querySelectorAll('[data-en-ph]');
    inputElements.forEach(el => {
        if (!el.getAttribute('data-zh-ph')) el.setAttribute('data-zh-ph', el.getAttribute('placeholder'));
        el.setAttribute('placeholder', lang === 'en' ? el.getAttribute('data-en-ph') : el.getAttribute('data-zh-ph'));
    });
    const btn = document.getElementById('langBtn');
    if (btn) btn.textContent = lang === 'en' ? 'CN' : 'EN';
    localStorage.setItem('site_lang', lang);
}