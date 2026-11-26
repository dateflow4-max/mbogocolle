// Mbogo College School Management System
// Main Application Logic

// ===== State Management =====
let appState = {
    currentUser: null,
    currentView: 'home',
    theme: 'light',
    data: null
};

// ===== Initialize App =====
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    loadState();
    setupTheme();
    setupCursorLight();
    setupSplashScreen();
    setupPullToRefresh();
    setupScrollHeader();
    
    // Initial render after splash
    setTimeout(() => {
        if (appState.currentUser) {
            renderPortal(appState.currentUser);
        } else {
            renderHome();
        }
    }, 3000);
}

// ===== Local Storage =====
function loadState() {
    const saved = localStorage.getItem('mbogoCollege');
    if (saved) {
        try {
            appState.data = JSON.parse(saved);
        } catch (e) {
            appState.data = { ...SEED };
            saveState();
        }
    } else {
        appState.data = { ...SEED };
        saveState();
    }
    
    // Load theme
    const savedTheme = localStorage.getItem('mbogoTheme');
    if (savedTheme) {
        appState.theme = savedTheme;
    }
    
    // Load current user
    const savedUser = localStorage.getItem('mbogoCurrentUser');
    if (savedUser) {
        try {
            appState.currentUser = JSON.parse(savedUser);
        } catch (e) {
            appState.currentUser = null;
        }
    }
}

function saveState() {
    localStorage.setItem('mbogoCollege', JSON.stringify(appState.data));
}

function saveCurrentUser() {
    if (appState.currentUser) {
        localStorage.setItem('mbogoCurrentUser', JSON.stringify(appState.currentUser));
    } else {
        localStorage.removeItem('mbogoCurrentUser');
    }
}

// ===== Theme Management =====
function setupTheme() {
    document.documentElement.setAttribute('data-theme', appState.theme);
    const toggle = document.querySelector('.theme-toggle-text');
    if (toggle) {
        toggle.textContent = appState.theme === 'light' ? 'Dark' : 'Light';
    }
    
    document.querySelector('.theme-toggle')?.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    appState.theme = appState.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', appState.theme);
    localStorage.setItem('mbogoTheme', appState.theme);
    
    const toggle = document.querySelector('.theme-toggle-text');
    if (toggle) {
        toggle.textContent = appState.theme === 'light' ? 'Dark' : 'Light';
    }
}

// ===== Cursor Light Effect =====
function setupCursorLight() {
    const light = document.querySelector('.cursor-light');
    
    // Desktop cursor follow
    document.addEventListener('mousemove', (e) => {
        light.style.left = e.clientX + 'px';
        light.style.top = e.clientY + 'px';
        light.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        light.style.opacity = '0';
    });
    
    // Touch flash
    document.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        light.style.left = touch.clientX + 'px';
        light.style.top = touch.clientY + 'px';
        light.style.opacity = '1';
        
        setTimeout(() => {
            light.style.opacity = '0';
        }, 300);
    });
}

// ===== Splash Screen =====
function setupSplashScreen() {
    setTimeout(() => {
        const splash = document.querySelector('.splash-screen');
        splash.classList.add('hiding');
        setTimeout(() => {
            splash.style.display = 'none';
        }, 500);
    }, 2800);
}

// ===== Pull to Refresh =====
function setupPullToRefresh() {
    let startY = 0;
    let currentY = 0;
    let pulling = false;
    
    document.addEventListener('touchstart', (e) => {
        if (window.scrollY === 0) {
            startY = e.touches[0].clientY;
            pulling = true;
        }
    });
    
    document.addEventListener('touchmove', (e) => {
        if (pulling) {
            currentY = e.touches[0].clientY;
            const diff = currentY - startY;
            
            if (diff > 0 && diff < 150) {
                e.preventDefault();
                document.querySelector('.main-content').style.transform = `translateY(${diff * 0.5}px)`;
            }
        }
    });
    
    document.addEventListener('touchend', () => {
        if (pulling) {
            const diff = currentY - startY;
            if (diff > 100) {
                location.reload();
            } else {
                document.querySelector('.main-content').style.transform = '';
            }
            pulling = false;
        }
    });
}

// ===== Scroll Header =====
function setupScrollHeader() {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        const header = document.querySelector('.header');
        
        if (currentScroll > 100) {
            header.classList.add('shrunk');
        } else {
            header.classList.remove('shrunk');
        }
        
        lastScroll = currentScroll;
    });
}

// ===== Button Ripple Effect =====
function addRipple(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.className = 'btn-ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    button.appendChild(ripple);
    
    // Haptic feedback
    if ('vibrate' in navigator) {
        navigator.vibrate(10);
    }
    
    setTimeout(() => ripple.remove(), 600);
}

// ===== Navigation =====
function navigateTo(view, data = null) {
    appState.currentView = view;
    
    const main = document.querySelector('.main-content');
    main.innerHTML = '';
    
    switch(view) {
        case 'home':
            renderHome();
            break;
        case 'signin':
            renderSignIn();
            break;
        case 'signup':
            renderSignUp();
            break;
        case 'parent':
            renderParentPortal(data);
            break;
        case 'teacher':
            renderTeacherPortal(data);
            break;
        case 'office':
            renderOfficePortal(data);
            break;
    }
    
    window.scrollTo(0, 0);
}

// ===== Home Page =====
function renderHome() {
    const main = document.querySelector('.main-content');
    main.innerHTML = `
        <div class="home-page">
            <img src="assets/logo.svg" alt="Mbogo College Crest" class="home-crest">
            <h1 class="home-title">Mbogo College</h1>
            <div class="home-actions">
                <button class="btn btn-primary" onclick="navigateTo('signup')">Sign up</button>
                <button class="btn btn-secondary" onclick="navigateTo('signin')">Sign in</button>
            </div>
        </div>
    `;
    
    // Add ripple to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', addRipple);
    });
    
    // Animate title color based on blob position
    animateHomeTitle();
}

function animateHomeTitle() {
    // This would detect blob position - simplified for now
    const title = document.querySelector('.home-title');
    if (!title) return;
    
    setInterval(() => {
        const shouldBeWhite = Math.random() > 0.7;
        if (shouldBeWhite) {
            title.classList.add('dark-behind');
        } else {
            title.classList.remove('dark-behind');
        }
    }, 3000);
}

// ===== Sign In =====
function renderSignIn() {
    const main = document.querySelector('.main-content');
    main.innerHTML = `
        <div class="auth-page">
            <div class="auth-card glass-card">
                <div class="role-selector">
                    <div class="role-pill parent"></div>
                    <button class="role-option active" data-role="parent">Parent</button>
                    <button class="role-option" data-role="teacher">Teacher</button>
                    <button class="role-option" data-role="office">Office</button>
                </div>
                
                <div class="mascot-container">
                    <div class="mascot hidden">
                        <div class="mascot-eyes">
                            <div class="mascot-eye"></div>
                            <div class="mascot-eye"></div>
                        </div>
                    </div>
                    <div class="privacy-shield"></div>
                </div>
                
                <div id="error-container"></div>
                
                <form id="signin-form">
                    <div class="form-group">
                        <label class="form-label">Phone Number</label>
                        <input type="tel" name="phone" class="form-input" placeholder="+256 700 000 000" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Password</label>
                        <div class="password-wrapper">
                            <input type="password" name="password" class="form-input" placeholder="Enter your password" required>
                            <button type="button" class="password-toggle">Show</button>
                        </div>
                    </div>
                    
                    <button type="submit" class="btn btn-primary" style="width: 100%;">Sign in</button>
                </form>
                
                <div class="auth-toggle" id="auth-toggle">
                    Don't have an account? <span class="auth-link" onclick="navigateTo('signup')">Create one</span>
                </div>
            </div>
        </div>
    `;
    
    setupAuthPage();
}

// ===== Sign Up =====
function renderSignUp() {
    const main = document.querySelector('.main-content');
    main.innerHTML = `
        <div class="auth-page">
            <div class="auth-card glass-card">
                <div class="role-selector">
                    <div class="role-pill parent"></div>
                    <button class="role-option active" data-role="parent">Parent</button>
                    <button class="role-option" data-role="teacher">Teacher</button>
                </div>
                
                <div class="mascot-container">
                    <div class="mascot hidden">
                        <div class="mascot-eyes">
                            <div class="mascot-eye"></div>
                            <div class="mascot-eye"></div>
                        </div>
                    </div>
                    <div class="privacy-shield"></div>
                </div>
                
                <div id="error-container"></div>
                
                <form id="signup-form">
                    <div class="form-group">
                        <label class="form-label">Full Name</label>
                        <input type="text" name="name" class="form-input" placeholder="Enter your full name" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Phone Number</label>
                        <input type="tel" name="phone" class="form-input" placeholder="+256 700 000 000" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Password</label>
                        <div class="password-wrapper">
                            <input type="password" name="password" class="form-input" placeholder="Create a password" required>
                            <button type="button" class="password-toggle">Show</button>
                        </div>
                    </div>
                    
                    <div id="parent-fields">
                        <div class="form-group">
                            <label class="form-label">Parent Code</label>
                            <input type="text" name="parentCode" class="form-input" placeholder="e.g., PAR001" required>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Student Code</label>
                            <input type="text" name="studentCode" class="form-input" placeholder="e.g., STU001" required>
                        </div>
                    </div>
                    
                    <div id="teacher-fields" class="hidden">
                        <div class="form-group">
                            <label class="form-label">Teacher Code</label>
                            <input type="text" name="teacherCode" class="form-input" placeholder="Enter code from school">
                        </div>
                    </div>
                    
                    <button type="submit" class="btn btn-primary" style="width: 100%;">Sign up</button>
                </form>
                
                <div class="auth-toggle">
                    Already have an account? <span class="auth-link" onclick="navigateTo('signin')">Sign in</span>
                </div>
            </div>
        </div>
    `;
    
    setupAuthPage();
}

// ===== Auth Page Setup =====
function setupAuthPage() {
    // Role selector
    const roleOptions = document.querySelectorAll('.role-option');
    const rolePill = document.querySelector('.role-pill');
    const authToggle = document.getElementById('auth-toggle');
    
    let currentRole = 'parent';
    
    roleOptions.forEach((option, index) => {
        option.addEventListener('click', () => {
            const role = option.dataset.role;
            currentRole = role;
            
            // Update active state
            roleOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            // Move pill
            const width = 100 / roleOptions.length;
            rolePill.style.left = `${index * width}%`;
            rolePill.style.width = `${width}%`;
            rolePill.className = `role-pill ${role}`;
            
            // Update active class for office
            if (role === 'office') {
                option.classList.add('office');
            }
            
            // Hide "Create account" for office in sign-in
            if (authToggle && role === 'office') {
                authToggle.classList.add('hidden');
            } else if (authToggle) {
                authToggle.classList.remove('hidden');
            }
            
            // Show/hide fields for sign-up
            const parentFields = document.getElementById('parent-fields');
            const teacherFields = document.getElementById('teacher-fields');
            
            if (parentFields && teacherFields) {
                if (role === 'parent') {
                    parentFields.classList.remove('hidden');
                    teacherFields.classList.add('hidden');
                    parentFields.querySelectorAll('input').forEach(inp => inp.required = true);
                    teacherFields.querySelectorAll('input').forEach(inp => inp.required = false);
                } else if (role === 'teacher') {
                    parentFields.classList.add('hidden');
                    teacherFields.classList.remove('hidden');
                    parentFields.querySelectorAll('input').forEach(inp => inp.required = false);
                    teacherFields.querySelectorAll('input').forEach(inp => inp.required = true);
                }
            }
        });
    });
    
    // Password toggle
    const passwordToggle = document.querySelector('.password-toggle');
    const passwordInput = document.querySelector('input[name="password"]');
    const mascot = document.querySelector('.mascot');
    const shield = document.querySelector('.privacy-shield');
    
    passwordToggle?.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        passwordToggle.textContent = isPassword ? 'Hide' : 'Show';
        
        if (isPassword) {
            mascot?.classList.remove('hidden');
            shield?.classList.add('lifted');
        } else {
            mascot?.classList.add('hidden');
            shield?.classList.remove('lifted');
        }
    });
    
    // Form submission
    const form = document.getElementById('signin-form') || document.getElementById('signup-form');
    const isSignIn = form?.id === 'signin-form';
    
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (isSignIn) {
            handleSignIn(form, currentRole);
        } else {
            handleSignUp(form, currentRole);
        }
    });
    
    // Button ripples
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', addRipple);
    });
}

// ===== Sign In Handler =====
function handleSignIn(form, role) {
    clearErrors();
    
    const formData = new FormData(form);
    const phone = formData.get('phone').trim();
    const password = formData.get('password').trim();
    
    // Validation
    if (!phone || !password) {
        showError('Please enter your phone number and password.');
        return;
    }
    
    // Show loading
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Signing in';
    
    // Simulate async
    setTimeout(() => {
        // Check accounts
        if (!appState.data.accounts) {
            appState.data.accounts = [];
        }
        
        const account = appState.data.accounts.find(acc => acc.phone === phone && acc.password === password);
        
        if (!account) {
            btn.disabled = false;
            btn.textContent = originalText;
            showError('Phone number or password is incorrect.');
            shakeCard();
            return;
        }
        
        if (account.role !== role) {
            btn.disabled = false;
            btn.textContent = originalText;
            showError(`This phone number belongs to a ${account.role} account.`);
            shakeCard();
            return;
        }
        
        // Success
        appState.currentUser = account;
        saveCurrentUser();
        
        const card = document.querySelector('.auth-card');
        card.classList.add('success');
        
        setTimeout(() => {
            renderPortal(account);
        }, 500);
    }, 1000);
}

// ===== Sign Up Handler =====
function handleSignUp(form, role) {
    clearErrors();
    
    const formData = new FormData(form);
    const name = formData.get('name')?.trim();
    const phone = formData.get('phone')?.trim();
    const password = formData.get('password')?.trim();
    
    // Validation
    const errors = [];
    const errorFields = [];
    
    if (!name) {
        errors.push('name');
        errorFields.push('name');
    }
    if (!phone) {
        errors.push('phone number');
        errorFields.push('phone');
    }
    if (!password) {
        errors.push('password');
        errorFields.push('password');
    }
    
    if (role === 'parent') {
        const parentCode = formData.get('parentCode')?.trim();
        const studentCode = formData.get('studentCode')?.trim();
        
        if (!parentCode) {
            errors.push('parent code');
            errorFields.push('parentCode');
        }
        if (!studentCode) {
            errors.push('student code');
            errorFields.push('studentCode');
        }
        
        if (errors.length > 0) {
            showError(`Please add your ${errors.join(', ')} to continue.`);
            highlightErrors(errorFields);
            shakeCard();
            return;
        }
        
        // Validate codes
        if (!appState.data.codes.parents.includes(parentCode)) {
            showError('Parent code is not valid.');
            highlightErrors(['parentCode']);
            shakeCard();
            return;
        }
        
        const student = appState.data.students.find(s => s.studentCode === studentCode && s.parentCode === parentCode);
        if (!student) {
            showError('Student code does not match the parent code.');
            highlightErrors(['studentCode']);
            shakeCard();
            return;
        }
        
    } else if (role === 'teacher') {
        const teacherCode = formData.get('teacherCode')?.trim();
        
        if (!teacherCode) {
            errors.push('teacher code');
            errorFields.push('teacherCode');
        }
        
        if (errors.length > 0) {
            showError(`Please add your ${errors.join(', ')} to continue.`);
            highlightErrors(errorFields);
            shakeCard();
            return;
        }
        
        if (teacherCode !== appState.data.codes.teacher) {
            showError('Teacher code is not valid.');
            highlightErrors(['teacherCode']);
            shakeCard();
            return;
        }
    }
    
    // Check if phone already exists
    if (!appState.data.accounts) {
        appState.data.accounts = [];
    }
    
    if (appState.data.accounts.find(acc => acc.phone === phone)) {
        showError('This phone number is already registered.');
        highlightErrors(['phone']);
        shakeCard();
        return;
    }
    
    // Show loading
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Creating account';
    
    // Simulate async
    setTimeout(() => {
        // Create account
        const account = {
            id: `ACC${Date.now()}`,
            name,
            phone,
            password,
            role,
            status: role === 'teacher' ? 'pending' : 'active',
            createdAt: new Date().toISOString()
        };
        
        if (role === 'parent') {
            const parentCode = formData.get('parentCode').trim();
            const studentCode = formData.get('studentCode').trim();
            account.parentCode = parentCode;
            account.studentCodes = [studentCode];
        }
        
        appState.data.accounts.push(account);
        saveState();
        
        appState.currentUser = account;
        saveCurrentUser();
        
        const card = document.querySelector('.auth-card');
        card.classList.add('success');
        
        setTimeout(() => {
            renderPortal(account);
        }, 500);
    }, 1000);
}

// ===== Error Handling =====
function showError(message) {
    const container = document.getElementById('error-container');
    if (!container) return;
    
    container.innerHTML = `
        <div class="error-message">
            <span>⚠️</span>
            <span>${message}</span>
        </div>
    `;
}

function clearErrors() {
    const container = document.getElementById('error-container');
    if (container) container.innerHTML = '';
    
    document.querySelectorAll('.form-input').forEach(input => {
        input.classList.remove('error');
    });
}

function highlightErrors(fields) {
    fields.forEach(field => {
        const input = document.querySelector(`input[name="${field}"]`);
        if (input) {
            input.classList.add('error');
        }
    });
    
    // Focus first error
    if (fields.length > 0) {
        const firstInput = document.querySelector(`input[name="${fields[0]}"]`);
        if (firstInput) firstInput.focus();
    }
}

function shakeCard() {
    const card = document.querySelector('.auth-card');
    if (card) {
        card.classList.add('error');
        setTimeout(() => card.classList.remove('error'), 500);
    }
}

// ===== Portal Router =====
function renderPortal(account) {
    switch(account.role) {
        case 'parent':
            renderParentPortal(account);
            break;
        case 'teacher':
            renderTeacherPortal(account);
            break;
        case 'office':
            renderOfficePortal(account);
            break;
    }
}

// ===== Parent Portal =====
function renderParentPortal(account) {
    const main = document.querySelector('.main-content');
    
    // Get children
    const children = appState.data.students.filter(s => 
        account.studentCodes?.includes(s.studentCode)
    );
    
    if (children.length === 0) {
        main.innerHTML = `
            <div class="portal">
                <div class="pending-message">
                    <div class="pending-icon">⏳</div>
                    <h2 class="pending-title">Waiting for Link</h2>
                    <p>Your account is being linked to your child's record by the school office.</p>
                </div>
            </div>
        `;
        return;
    }
    
    let currentChildIndex = 0;
    
    function renderContent() {
        const child = children[currentChildIndex];
        const feesPaid = calculateFeesPaid(child);
        const feesExpected = appState.data.fees.expected;
        const feesDue = feesExpected - feesPaid;
        
        main.innerHTML = `
            <div class="portal">
                <div class="portal-header">
                    <h1 class="portal-title">Welcome, ${account.name.split(' ')[0]}</h1>
                    ${children.length > 1 ? `
                        <div class="child-switcher">
                            ${children.map((c, i) => `
                                <button class="child-chip ${i === currentChildIndex ? 'active' : ''}" data-index="${i}">
                                    ${c.name}
                                </button>
                            `).join('')}
                        </div>
                    ` : `<p>${child.name} - ${getClassName(child.class)}</p>`}
                    
                    <div class="fees-chip ${feesDue <= 0 ? 'paid' : 'due'}">
                        ${feesDue <= 0 ? '✓ Fees paid' : '! Fees due'}
                    </div>
                </div>
                
                <div class="tabs">
                    <button class="tab-button active" data-tab="reports">Reports</button>
                    <button class="tab-button" data-tab="fees">Fees</button>
                    <button class="tab-button" data-tab="forms">Forms</button>
                    <button class="tab-button" data-tab="circulars">Circulars</button>
                    <button class="tab-button" data-tab="calendar">Calendar</button>
                    <button class="tab-button" data-tab="messages">Messages</button>
                </div>
                
                <div id="tab-reports" class="tab-content active">
                    ${renderReportsTab(child, feesDue)}
                </div>
                
                <div id="tab-fees" class="tab-content">
                    ${renderFeesTab(child, feesPaid, feesDue)}
                </div>
                
                <div id="tab-forms" class="tab-content">
                    ${renderFormsTab(child, account)}
                </div>
                
                <div id="tab-circulars" class="tab-content">
                    ${renderCircularsTab()}
                </div>
                
                <div id="tab-calendar" class="tab-content">
                    ${renderCalendarTab()}
                </div>
                
                <div id="tab-messages" class="tab-content">
                    ${renderMessagesTab(child)}
                </div>
            </div>
        `;
        
        setupTabs();
        setupChildSwitcher();
        setupParentPortalActions(child, account);
    }
    
    function setupChildSwitcher() {
        document.querySelectorAll('.child-chip').forEach(chip => {
            chip.addEventListener('click', (e) => {
                currentChildIndex = parseInt(e.target.dataset.index);
                renderContent();
            });
        });
    }
    
    renderContent();
}

// Helper functions for parent portal
function calculateFeesPaid(student) {
    return student.feePayments.reduce((sum, payment) => sum + payment.amount, 0);
}

function getClassName(classId) {
    const classObj = appState.data.classes.find(c => c.id === classId);
    return classObj ? classObj.name : classId;
}

function calculateAverage(marks) {
    const scores = Object.values(marks);
    if (scores.length === 0) return 0;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
}

function renderReportsTab(student, feesDue) {
    const term1Avg = calculateAverage(student.marks.term1);
    const term2Avg = calculateAverage(student.marks.term2);
    const latestAvg = term2Avg;
    
    // Days left in term 3
    const termEndDate = new Date('2026-12-06');
    const today = new Date();
    const daysLeft = Math.ceil((termEndDate - today) / (1000 * 60 * 60 * 24));
    
    const locked = feesDue > 0;
    
    let html = `
        <div class="info-strip">
            ${daysLeft} days left in Term 3
        </div>
        
        <div class="card average-card">
            <div class="average-value">${latestAvg}%</div>
            <div class="average-label">Average</div>
            <div class="goal-bar">
                <div class="goal-progress" style="width: ${Math.min(latestAvg / 75 * 100, 100)}%"></div>
            </div>
        </div>
    `;
    
    if (locked) {
        html += `
            <div class="card locked-report">
                <div class="card-content">
                    <h3 class="card-title">Term 2 Report <span class="latest-pill">Latest</span></h3>
                    ${renderTermReport(student, 'term2', term2Avg, false)}
                </div>
                <div class="unlock-overlay">
                    <p>Report locked</p>
                    <div class="unlock-balance">UGX ${feesDue.toLocaleString()}</div>
                    <p class="schoolpay-code">${student.schoolPayCode}</p>
                    <button class="btn btn-danger" onclick="switchToFeesTab()">Pay now</button>
                </div>
            </div>
        `;
    } else {
        html += `
            <div class="card">
                <h3 class="card-title">Term 2 Report <span class="latest-pill">Latest</span></h3>
                ${renderTermReport(student, 'term2', term2Avg, true)}
            </div>
        `;
    }
    
    html += `
        <div class="card">
            <h3 class="card-title">Term 1 Report</h3>
            ${renderTermReport(student, 'term1', term1Avg, !locked)}
        </div>
    `;
    
    // Add history
    if (student.history && student.history.length > 0) {
        html += `
            <div class="card">
                <h3 class="card-title">Past Years</h3>
                ${student.history.map(h => `
                    <div class="highlight">
                        <div class="highlight-item">
                            <div class="highlight-label">Year</div>
                            <div class="highlight-value">${h.year}</div>
                        </div>
                        <div class="highlight-item">
                            <div class="highlight-label">Class</div>
                            <div class="highlight-value">${h.class}</div>
                        </div>
                        <div class="highlight-item">
                            <div class="highlight-label">Average</div>
                            <div class="highlight-value">${h.average}%</div>
                        </div>
                        <div class="highlight-item">
                            <div class="highlight-label">Status</div>
                            <div class="highlight-value">${h.status}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    return html;
}

function renderTermReport(student, term, average, unlocked) {
    const marks = student.marks[term];
    const subjects = Object.keys(marks);
    
    if (!unlocked) {
        return `<div style="filter: blur(5px);">${renderTermReportContent(marks, subjects, average)}</div>`;
    }
    
    return renderTermReportContent(marks, subjects, average);
}

function renderTermReportContent(marks, subjects, average) {
    const sorted = subjects.sort((a, b) => marks[b] - marks[a]);
    const strongest = sorted[0];
    const weakest = sorted[sorted.length - 1];
    
    return `
        <div class="subject-bars">
            ${subjects.map(subject => `
                <div class="subject-bar">
                    <div class="subject-name">${subject}</div>
                    <div class="subject-progress">
                        <div class="subject-fill" style="width: ${marks[subject]}%"></div>
                    </div>
                    <div class="subject-score">${marks[subject]}%</div>
                </div>
            `).join('')}
        </div>
        
        <div class="highlight">
            <div class="highlight-item">
                <div class="highlight-label">Strongest</div>
                <div class="highlight-value">${strongest}</div>
            </div>
            <div class="highlight-item">
                <div class="highlight-label">Weakest</div>
                <div class="highlight-value">${weakest}</div>
            </div>
        </div>
        
        <div class="remark">
            ${average >= 75 ? 'Excellent performance! Keep up the great work.' :
              average >= 60 ? 'Good work. Continue to put in effort.' :
              average >= 50 ? 'Satisfactory performance. More effort needed.' :
              'Needs improvement. Please seek extra help.'}
        </div>
        
        <button class="btn btn-outline" onclick="printReport(this)">Print</button>
    `;
}

function renderFeesTab(student, paid, due) {
    const dueDate = new Date(appState.data.fees.dueDate);
    const today = new Date();
    const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    
    return `
        <div class="card balance-card">
            <div class="balance-amount ${due > 0 ? 'due' : 'paid'}">
                UGX ${due > 0 ? due.toLocaleString() : '0'}
            </div>
            <div class="balance-label">${due > 0 ? 'Balance Due' : 'Fully Paid'}</div>
            ${due > 0 ? `<p>${daysUntilDue} days until due date</p>` : ''}
            <div class="schoolpay-code">${student.schoolPayCode}</div>
            ${due > 0 ? `
                <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1rem;">
                    <button class="btn btn-primary">Pay now</button>
                    <button class="btn btn-outline">Remind me</button>
                </div>
            ` : ''}
        </div>
        
        <div class="card">
            <h3 class="card-title">Payment History</h3>
            <div class="payment-history">
                ${student.feePayments.length > 0 ? student.feePayments.map(payment => `
                    <div class="payment-item">
                        <div>
                            <div class="payment-date">${new Date(payment.date).toLocaleDateString()}</div>
                            <div>${payment.method}</div>
                        </div>
                        <div class="payment-amount">UGX ${payment.amount.toLocaleString()}</div>
                    </div>
                `).join('') : '<p>No payments recorded yet.</p>'}
            </div>
        </div>
    `;
}

function renderFormsTab(student, account) {
    return `
        <div class="card">
            <h3 class="card-title">Permission Slips</h3>
            <div class="slip-list">
                ${appState.data.permissionSlips.map(slip => {
                    const response = getSlipResponse(student.id, slip.id);
                    return `
                        <div class="slip-item">
                            <div>
                                <div class="slip-title">${slip.title}</div>
                                <div class="slip-date">Deadline: ${new Date(slip.deadline).toLocaleDateString()}</div>
                                ${response ? `<div style="margin-top: 0.5rem; color: var(--color-green); font-weight: 600;">${response.status === 'approved' ? '✓ Approved' : '✗ Declined'}</div>` : ''}
                            </div>
                            ${!response ? `<button class="btn btn-primary" onclick="openSlip('${slip.id}', '${student.id}', '${account.name}')">Read and sign</button>` : ''}
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
        
        <div class="card">
            <h3 class="card-title">Medical Details</h3>
            <div class="medical-details">
                <div class="detail-row">
                    <div class="detail-label">Allergies</div>
                    <div class="detail-value">${student.medical.allergies || 'None recorded'}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Medication</div>
                    <div class="detail-value">${student.medical.medication || 'None recorded'}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Blood Group</div>
                    <div class="detail-value">${student.medical.bloodGroup || 'Not specified'}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Emergency Contact</div>
                    <div class="detail-value">${student.medical.emergencyContact || 'Not specified'}</div>
                </div>
            </div>
            <button class="btn btn-outline mt-2" onclick="editMedicalDetails('${student.id}')">Update Details</button>
        </div>
    `;
}

function renderCircularsTab() {
    return `
        <div class="card">
            <h3 class="card-title">School Circulars</h3>
            <div class="slip-list">
                ${appState.data.circulars.map(circular => `
                    <div class="slip-item">
                        <div>
                            <div class="slip-title">${circular.title}</div>
                            <div class="slip-date">${new Date(circular.date).toLocaleDateString()}</div>
                        </div>
                        <button class="btn btn-primary" onclick="openCircular('${circular.id}')">Read</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderCalendarTab() {
    return `
        <div class="card">
            <div class="calendar-controls">
                <h3 class="card-title" id="calendar-month">November 2026</h3>
                <div style="display: flex; gap: 1rem; align-items: center;">
                    <div class="view-toggle">
                        <button class="view-option active" onclick="switchCalendarView('grid')">Calendar</button>
                        <button class="view-option" onclick="switchCalendarView('list')">List</button>
                    </div>
                    <div class="calendar-nav">
                        <button class="btn btn-outline" onclick="changeMonth(-1)">←</button>
                        <button class="btn btn-outline" onclick="changeMonth(1)">→</button>
                    </div>
                </div>
            </div>
            
            <div id="calendar-grid-view">
                <div class="calendar-grid">
                    <div class="calendar-header">Sun</div>
                    <div class="calendar-header">Mon</div>
                    <div class="calendar-header">Tue</div>
                    <div class="calendar-header">Wed</div>
                    <div class="calendar-header">Thu</div>
                    <div class="calendar-header">Fri</div>
                    <div class="calendar-header">Sat</div>
                    ${renderCalendarDays(10, 2026)}
                </div>
                <div id="day-events"></div>
            </div>
            
            <div id="calendar-list-view" class="hidden">
                <div class="event-list">
                    ${appState.data.calendarEvents.map(event => `
                        <div class="event-item">
                            <div class="event-title">${event.title}</div>
                            <div class="event-time">${new Date(event.date).toLocaleDateString()} - ${event.time}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderCalendarDays(month, year) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();
    const totalDays = lastDay.getDate();
    
    let html = '';
    
    // Previous month days
    const prevMonthLast = new Date(year, month, 0).getDate();
    for (let i = startDay - 1; i >= 0; i--) {
        html += `<div class="calendar-day other-month">${prevMonthLast - i}</div>`;
    }
    
    // Current month days
    for (let day = 1; day <= totalDays; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const hasEvent = appState.data.calendarEvents.some(e => e.date === dateStr);
        const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
        
        html += `
            <div class="calendar-day ${isToday ? 'today' : ''} ${hasEvent ? 'has-event' : ''}" 
                 onclick="showDayEvents('${dateStr}')">
                ${day}
            </div>
        `;
    }
    
    // Next month days
    const remaining = 42 - (startDay + totalDays);
    for (let day = 1; day <= remaining; day++) {
        html += `<div class="calendar-day other-month">${day}</div>`;
    }
    
    return html;
}

function renderMessagesTab(student) {
    return `
        <div class="card">
            <h3 class="card-title">Report Absence</h3>
            <form class="message-form" onsubmit="reportAbsence(event, '${student.id}')">
                <div class="form-group">
                    <label class="form-label">Date</label>
                    <input type="date" name="date" class="form-input" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Reason</label>
                    <textarea name="reason" class="form-input" rows="3" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
        
        <div class="card">
            <h3 class="card-title">Message Teacher</h3>
            <form class="message-form" onsubmit="messageTeacher(event, '${student.id}')">
                <div class="form-group">
                    <label class="form-label">Message</label>
                    <textarea name="message" class="form-input" rows="4" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Send</button>
            </form>
        </div>
        
        <div class="card">
            <h3 class="card-title">Notification Preferences</h3>
            <div class="notification-channels">
                <div class="channel-option">
                    <input type="checkbox" class="checkbox" id="notify-app" checked>
                    <label for="notify-app">App Notifications</label>
                </div>
                <div class="channel-option">
                    <input type="checkbox" class="checkbox" id="notify-sms" checked>
                    <label for="notify-sms">SMS</label>
                </div>
                <div class="channel-option">
                    <input type="checkbox" class="checkbox" id="notify-whatsapp">
                    <label for="notify-whatsapp">WhatsApp</label>
                </div>
            </div>
        </div>
    `;
}

// Setup parent portal actions
function setupParentPortalActions(student, account) {
    // Add event listeners as needed
}

// Global functions for parent portal (called from onclick)
function switchToFeesTab() {
    const tabs = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));
    
    document.querySelector('[data-tab="fees"]').classList.add('active');
    document.getElementById('tab-fees').classList.add('active');
}

function printReport(button) {
    const card = button.closest('.card');
    const originalContents = document.body.innerHTML;
    const printContents = card.innerHTML;
    
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    location.reload();
}

function getSlipResponse(studentId, slipId) {
    if (!appState.data.slipResponses) {
        appState.data.slipResponses = [];
    }
    return appState.data.slipResponses.find(r => r.studentId === studentId && r.slipId === slipId);
}

function openSlip(slipId, studentId, parentName) {
    const slip = appState.data.permissionSlips.find(s => s.id === slipId);
    if (!slip) return;
    
    const overlay = document.createElement('div');
    overlay.className = 'sheet-overlay';
    overlay.innerHTML = `
        <div class="sheet">
            <div class="read-progress">
                <div class="read-progress-fill" style="width: 0%"></div>
            </div>
            
            <div class="sheet-header">
                <h2 class="sheet-title">${slip.title}</h2>
                <div class="sheet-date">${new Date(slip.date).toLocaleDateString()}</div>
            </div>
            
            <div class="sheet-content" id="slip-content">
                ${slip.content.split('\n').map(p => `<p>${p}</p>`).join('')}
            </div>
            
            <div id="slip-actions" class="hidden">
                <div class="form-group signature-input">
                    <label class="form-label">Type your full name to approve</label>
                    <input type="text" id="signature" class="form-input" placeholder="Full name">
                </div>
                
                <div class="sheet-actions">
                    <button class="btn btn-primary" onclick="approveSlip('${slipId}', '${studentId}', '${parentName}')">Approve</button>
                    <button class="btn btn-outline" onclick="declineSlip('${slipId}', '${studentId}')">Decline</button>
                </div>
            </div>
            
            <div class="sheet-actions">
                <button class="btn btn-outline" onclick="closeSheet()" style="width: 100%;">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Track scroll progress
    const content = document.getElementById('slip-content');
    const progressFill = document.querySelector('.read-progress-fill');
    const actions = document.getElementById('slip-actions');
    
    content.addEventListener('scroll', () => {
        const scrollPercentage = (content.scrollTop / (content.scrollHeight - content.clientHeight)) * 100;
        progressFill.style.width = scrollPercentage + '%';
        
        if (scrollPercentage >= 95) {
            actions.classList.remove('hidden');
        }
    });
    
    // Check if sheet itself is scrolled
    const sheet = overlay.querySelector('.sheet');
    sheet.addEventListener('scroll', () => {
        const scrollPercentage = (sheet.scrollTop / (sheet.scrollHeight - sheet.clientHeight)) * 100;
        progressFill.style.width = scrollPercentage + '%';
        
        if (scrollPercentage >= 95) {
            actions.classList.remove('hidden');
        }
    });
}

function approveSlip(slipId, studentId, requiredName) {
    const signature = document.getElementById('signature').value.trim();
    
    if (signature.toLowerCase() !== requiredName.toLowerCase()) {
        alert('Please type your full name exactly as registered.');
        return;
    }
    
    if (!appState.data.slipResponses) {
        appState.data.slipResponses = [];
    }
    
    appState.data.slipResponses.push({
        slipId,
        studentId,
        status: 'approved',
        signature,
        timestamp: new Date().toISOString()
    });
    
    saveState();
    closeSheet();
    renderPortal(appState.currentUser);
}

function declineSlip(slipId, studentId) {
    if (!appState.data.slipResponses) {
        appState.data.slipResponses = [];
    }
    
    appState.data.slipResponses.push({
        slipId,
        studentId,
        status: 'declined',
        timestamp: new Date().toISOString()
    });
    
    saveState();
    closeSheet();
    renderPortal(appState.currentUser);
}

function openCircular(circularId) {
    const circular = appState.data.circulars.find(c => c.id === circularId);
    if (!circular) return;
    
    const overlay = document.createElement('div');
    overlay.className = 'sheet-overlay';
    overlay.innerHTML = `
        <div class="sheet">
            <div class="sheet-header">
                <h2 class="sheet-title">${circular.title}</h2>
                <div class="sheet-date">${new Date(circular.date).toLocaleDateString()}</div>
            </div>
            
            <div class="sheet-content">
                ${circular.message.split('\n').map(p => `<p>${p}</p>`).join('')}
            </div>
            
            <div class="sheet-actions">
                <button class="btn btn-primary" onclick="closeSheet()" style="width: 100%;">Done</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
}

function closeSheet() {
    const overlay = document.querySelector('.sheet-overlay');
    if (overlay) overlay.remove();
}

function editMedicalDetails(studentId) {
    // Implementation for editing medical details
    alert('Medical details editor - to be implemented');
}

function changeMonth(direction) {
    // Implementation for calendar navigation
    alert('Calendar navigation - to be implemented');
}

function showDayEvents(dateStr) {
    const events = appState.data.calendarEvents.filter(e => e.date === dateStr);
    const container = document.getElementById('day-events');
    
    if (events.length === 0) {
        container.innerHTML = '<p class="mt-2">No events on this day.</p>';
        return;
    }
    
    container.innerHTML = `
        <h4 class="mt-2 mb-1" style="font-weight: 700;">Events on ${new Date(dateStr).toLocaleDateString()}</h4>
        <div class="event-list">
            ${events.map(event => `
                <div class="event-item">
                    <div class="event-title">${event.title}</div>
                    <div class="event-time">${event.time}</div>
                </div>
            `).join('')}
        </div>
    `;
}

function switchCalendarView(view) {
    const gridView = document.getElementById('calendar-grid-view');
    const listView = document.getElementById('calendar-list-view');
    const buttons = document.querySelectorAll('.view-option');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    if (view === 'grid') {
        gridView.classList.remove('hidden');
        listView.classList.add('hidden');
    } else {
        gridView.classList.add('hidden');
        listView.classList.remove('hidden');
    }
}

function reportAbsence(event, studentId) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    if (!appState.data.requests) {
        appState.data.requests = [];
    }
    
    appState.data.requests.push({
        id: `REQ${Date.now()}`,
        type: 'absence',
        studentId,
        date: formData.get('date'),
        reason: formData.get('reason'),
        timestamp: new Date().toISOString(),
        status: 'pending'
    });
    
    saveState();
    form.reset();
    alert('Absence reported successfully.');
}

function messageTeacher(event, studentId) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    if (!appState.data.requests) {
        appState.data.requests = [];
    }
    
    appState.data.requests.push({
        id: `REQ${Date.now()}`,
        type: 'message',
        studentId,
        message: formData.get('message'),
        timestamp: new Date().toISOString(),
        status: 'pending'
    });
    
    saveState();
    form.reset();
    alert('Message sent successfully.');
}

// ===== Tab Management =====
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.dataset.tab;
            
            // Update active states
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show active content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`tab-${tabName}`).classList.add('active');
        });
    });
}

// ===== Teacher Portal =====
function renderTeacherPortal(account) {
    const main = document.querySelector('.main-content');
    
    if (account.status === 'pending') {
        main.innerHTML = `
            <div class="portal">
                <div class="pending-message">
                    <div class="pending-icon">⏳</div>
                    <h2 class="pending-title">Waiting for approval</h2>
                    <p>Your account is being reviewed by the school office.</p>
                </div>
            </div>
        `;
        return;
    }
    
    // Check for assignments
    const hasAssignments = account.assignments && account.assignments.length > 0;
    
    if (!hasAssignments) {
        main.innerHTML = `
            <div class="portal">
                <div class="pending-message">
                    <div class="pending-icon">📚</div>
                    <h2 class="pending-title">No classes yet</h2>
                    <p>You haven't been assigned any classes. Please contact the school office.</p>
                </div>
            </div>
        `;
        return;
    }
    
    // Render teacher dashboard
    main.innerHTML = `
        <div class="portal">
            <div class="portal-header">
                <h1 class="portal-title">Welcome, ${account.name.split(' ')[0]}</h1>
            </div>
            
            <div id="teacher-content">
                ${renderTeacherAssignments(account)}
            </div>
        </div>
    `;
}

function renderTeacherAssignments(account) {
    // This would render the teacher's class and subject assignments
    return `
        <div class="card">
            <h3 class="card-title">My Assignments</h3>
            <p>Subject and class assignments will appear here once assigned by the office.</p>
        </div>
    `;
}

// ===== Office Portal =====
function renderOfficePortal(account) {
    const main = document.querySelector('.main-content');
    
    main.innerHTML = `
        <div class="portal">
            <div class="portal-header">
                <h1 class="portal-title">Office Portal</h1>
            </div>
            
            <div class="tabs">
                <button class="tab-button active" data-tab="overview">Overview</button>
                <button class="tab-button" data-tab="students">Students</button>
                <button class="tab-button" data-tab="staff">Staff</button>
                <button class="tab-button" data-tab="review">Review</button>
                <button class="tab-button" data-tab="circulars">Circulars</button>
                <button class="tab-button" data-tab="requests">Requests</button>
                <button class="tab-button" data-tab="yearend">Year-end</button>
            </div>
            
            <div id="tab-overview" class="tab-content active">
                ${renderOfficeOverview()}
            </div>
            
            <div id="tab-students" class="tab-content">
                ${renderOfficeStudents()}
            </div>
            
            <div id="tab-staff" class="tab-content">
                ${renderOfficeStaff()}
            </div>
            
            <div id="tab-review" class="tab-content">
                ${renderOfficeReview()}
            </div>
            
            <div id="tab-circulars" class="tab-content">
                ${renderOfficeCirculars()}
            </div>
            
            <div id="tab-requests" class="tab-content">
                ${renderOfficeRequests()}
            </div>
            
            <div id="tab-yearend" class="tab-content">
                ${renderOfficeYearEnd()}
            </div>
        </div>
    `;
    
    setupTabs();
}

function renderOfficeOverview() {
    const totalStudents = appState.data.students.length;
    const totalCollected = appState.data.students.reduce((sum, s) => sum + calculateFeesPaid(s), 0);
    const totalExpected = totalStudents * appState.data.fees.expected;
    const totalDue = totalExpected - totalCollected;
    
    const pendingTeachers = appState.data.accounts?.filter(a => a.role === 'teacher' && a.status === 'pending').length || 0;
    
    return `
        <div class="overview-cards">
            <div class="overview-card" onclick="switchTab('students')">
                <div class="overview-value">${totalStudents}</div>
                <div class="overview-label">Students</div>
            </div>
            
            <div class="overview-card" onclick="openFeesSheet()">
                <div class="overview-value">UGX ${(totalCollected / 1000000).toFixed(1)}M</div>
                <div class="overview-label">Fees collected</div>
                <div class="overview-sublabel">UGX ${(totalDue / 1000000).toFixed(1)}M still due</div>
            </div>
            
            <div class="overview-card" onclick="switchTab('staff')">
                <div class="overview-value">${pendingTeachers}</div>
                <div class="overview-label">Needs you</div>
                <div class="overview-sublabel">Pending approvals</div>
            </div>
        </div>
        
        <div class="card">
            <h3 class="card-title">Classes</h3>
            <div class="class-list">
                ${appState.data.classes.map(cls => {
                    const students = appState.data.students.filter(s => s.class === cls.id);
                    return `
                        <div class="class-item">
                            <div class="class-item-name">${cls.name}</div>
                            <div class="class-status">${students.length} students</div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

function renderOfficeStudents() {
    return `
        <div class="search-bar">
            <input type="text" class="search-input" placeholder="Search by name or code" onkeyup="searchStudents(this.value)">
            <select class="filter-select" onchange="filterStudents(this.value)">
                <option value="">All Classes</option>
                ${appState.data.classes.map(cls => `
                    <option value="${cls.id}">${cls.name}</option>
                `).join('')}
            </select>
        </div>
        
        <div class="student-list" id="students-list">
            ${appState.data.students.map(student => `
                <div class="student-item" onclick="openStudentProfile('${student.id}')">
                    <div class="student-info">
                        <div class="student-name-item">${student.name}</div>
                        <div class="student-code">${student.studentCode} - ${getClassName(student.class)}</div>
                    </div>
                    <span>→</span>
                </div>
            `).join('')}
        </div>
    `;
}

function renderOfficeStaff() {
    const pendingTeachers = appState.data.accounts?.filter(a => a.role === 'teacher' && a.status === 'pending') || [];
    const approvedTeachers = appState.data.accounts?.filter(a => a.role === 'teacher' && a.status === 'active') || [];
    
    return `
        ${pendingTeachers.length > 0 ? `
            <div class="card pending-approval">
                <h3 class="card-title">Waiting for approval</h3>
                <div class="staff-list">
                    ${pendingTeachers.map(teacher => `
                        <div class="staff-item">
                            <div class="staff-header">
                                <div>
                                    <div class="staff-name">${teacher.name}</div>
                                    <div class="staff-phone">${teacher.phone}</div>
                                </div>
                                <button class="btn btn-primary" onclick="approveTeacher('${teacher.id}')">Approve</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}
        
        <div class="card">
            <h3 class="card-title">Teacher Code</h3>
            <div class="code-display">
                <div class="code-value">${appState.data.codes.teacher}</div>
                <button class="btn btn-outline" onclick="generateNewTeacherCode()">New Code</button>
            </div>
        </div>
        
        <div class="card">
            <h3 class="card-title">Add Account</h3>
            <form onsubmit="addStaffAccount(event)">
                <div class="form-group">
                    <label class="form-label">Name</label>
                    <input type="text" name="name" class="form-input" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Phone</label>
                    <input type="tel" name="phone" class="form-input" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Password</label>
                    <input type="password" name="password" class="form-input" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Role</label>
                    <select name="role" class="filter-select" required>
                        <option value="teacher">Teacher</option>
                        <option value="office">Office</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Add Account</button>
            </form>
        </div>
        
        ${approvedTeachers.length > 0 ? `
            <div class="card">
                <h3 class="card-title">Approved Teachers</h3>
                <div class="staff-list">
                    ${approvedTeachers.map(teacher => `
                        <div class="staff-item">
                            <div class="staff-header">
                                <div>
                                    <div class="staff-name">${teacher.name}</div>
                                    <div class="staff-phone">${teacher.phone}</div>
                                    ${teacher.assignments ? `<div class="staff-assignments">${teacher.assignments.join(', ')}</div>` : ''}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}
    `;
}

function renderOfficeReview() {
    return `
        <div class="card">
            <h3 class="card-title">Class Reports</h3>
            <p>Class reports submitted by teachers will appear here for review and publishing.</p>
        </div>
    `;
}

function renderOfficeCirculars() {
    return `
        <div class="card">
            <h3 class="card-title">Create Circular</h3>
            <form class="circular-editor" onsubmit="createCircular(event)">
                <div class="form-group">
                    <label class="form-label">Title</label>
                    <input type="text" name="title" class="form-input" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Event Date (optional)</label>
                    <input type="date" name="eventDate" class="form-input">
                </div>
                <div class="form-group">
                    <label class="form-label">Message</label>
                    <textarea name="message" class="form-input" rows="6" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Publish Circular</button>
            </form>
        </div>
        
        <div class="card">
            <h3 class="card-title">Published Circulars</h3>
            <div class="circular-list">
                ${appState.data.circulars.map(circular => `
                    <div class="circular-item">
                        <div class="circular-header">
                            <div>
                                <div class="circular-title-item">${circular.title}</div>
                                <div class="circular-preview">${new Date(circular.date).toLocaleDateString()}</div>
                            </div>
                            <button class="btn btn-outline" onclick="removeCircular('${circular.id}')">Remove</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderOfficeRequests() {
    const requests = appState.data.requests || [];
    const slipResponses = appState.data.slipResponses || [];
    
    return `
        <div class="card">
            <h3 class="card-title">Parent Requests</h3>
            <div class="request-list">
                ${requests.length > 0 ? requests.filter(r => r.status === 'pending').map(request => {
                    const student = appState.data.students.find(s => s.id === request.studentId);
                    return `
                        <div class="request-item">
                            <div class="request-header">
                                <div>
                                    <div class="request-type">${request.type === 'absence' ? 'Absence Report' : 'Message'}</div>
                                    <div class="request-time">${student?.name} - ${new Date(request.timestamp).toLocaleString()}</div>
                                </div>
                                <button class="btn btn-primary" onclick="markRequestDone('${request.id}')">Done</button>
                            </div>
                            <div class="request-content">
                                ${request.type === 'absence' ? 
                                    `Date: ${request.date}<br>Reason: ${request.reason}` :
                                    request.message}
                            </div>
                        </div>
                    `;
                }).join('') : '<p>No pending requests.</p>'}
            </div>
        </div>
        
        <div class="card">
            <h3 class="card-title">Permission Slip Responses</h3>
            ${slipResponses.length > 0 ? `
                <p>${slipResponses.filter(r => r.status === 'approved').length} approved, 
                ${slipResponses.filter(r => r.status === 'declined').length} declined</p>
            ` : '<p>No responses yet.</p>'}
        </div>
    `;
}

function renderOfficeYearEnd() {
    return `
        <div class="card">
            <h3 class="card-title">Year-end Processing</h3>
            <div class="yearend-table">
                <table>
                    <thead>
                        <tr>
                            <th>Student</th>
                            <th>Class</th>
                            <th>Average</th>
                            <th>Decision</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${appState.data.students.map(student => {
                            const avg = calculateAverage(student.marks.term2);
                            const suggestion = avg >= 50 ? 'promote' : 'repeat';
                            return `
                                <tr>
                                    <td>${student.name}</td>
                                    <td>${getClassName(student.class)}</td>
                                    <td>${avg}%</td>
                                    <td>
                                        <select class="yearend-decision" data-student="${student.id}">
                                            <option value="promote" ${suggestion === 'promote' ? 'selected' : ''}>Promote</option>
                                            <option value="repeat" ${suggestion === 'repeat' ? 'selected' : ''}>Repeat</option>
                                            <option value="graduate">Graduate</option>
                                            <option value="transfer">Transfer</option>
                                        </select>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
        
        <div class="yearend-actions">
            <div class="yearend-warning">⚠️ This action cannot be undone</div>
            <p>This will move all promoted students to their next class, record the year in student history, reset marks and fees, and increment the academic year.</p>
            <button class="btn btn-danger" onclick="confirmYearEnd()">Close the year and move students</button>
        </div>
    `;
}

// Office portal functions
function switchTab(tabName) {
    const button = document.querySelector(`[data-tab="${tabName}"]`);
    if (button) button.click();
}

function openFeesSheet() {
    // Implementation for fees sheet
    alert('Fees breakdown sheet - to be implemented');
}

function searchStudents(query) {
    // Implementation for student search
}

function filterStudents(classId) {
    // Implementation for student filter
}

function openStudentProfile(studentId) {
    // Implementation for student profile sheet
    alert('Student profile - to be implemented');
}

function approveTeacher(teacherId) {
    const teacher = appState.data.accounts.find(a => a.id === teacherId);
    if (teacher) {
        teacher.status = 'active';
        saveState();
        renderPortal(appState.currentUser);
    }
}

function generateNewTeacherCode() {
    const newCode = `TCH${Date.now().toString().slice(-6)}`;
    appState.data.codes.teacher = newCode;
    saveState();
    renderPortal(appState.currentUser);
}

function addStaffAccount(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const account = {
        id: `ACC${Date.now()}`,
        name: formData.get('name'),
        phone: formData.get('phone'),
        password: formData.get('password'),
        role: formData.get('role'),
        status: 'active',
        createdAt: new Date().toISOString()
    };
    
    if (!appState.data.accounts) {
        appState.data.accounts = [];
    }
    
    appState.data.accounts.push(account);
    saveState();
    event.target.reset();
    renderPortal(appState.currentUser);
}

function createCircular(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const circular = {
        id: `CIR${Date.now()}`,
        title: formData.get('title'),
        message: formData.get('message'),
        date: new Date().toISOString().split('T')[0],
        eventDate: formData.get('eventDate') || null
    };
    
    appState.data.circulars.unshift(circular);
    
    // Add to calendar if event date
    if (circular.eventDate) {
        appState.data.calendarEvents.push({
            date: circular.eventDate,
            title: circular.title,
            time: 'All day'
        });
    }
    
    saveState();
    event.target.reset();
    renderPortal(appState.currentUser);
}

function removeCircular(circularId) {
    if (confirm('Remove this circular?')) {
        appState.data.circulars = appState.data.circulars.filter(c => c.id !== circularId);
        saveState();
        renderPortal(appState.currentUser);
    }
}

function markRequestDone(requestId) {
    const request = appState.data.requests.find(r => r.id === requestId);
    if (request) {
        request.status = 'done';
        saveState();
        renderPortal(appState.currentUser);
    }
}

function confirmYearEnd() {
    if (confirm('Are you sure? This will move all students and cannot be undone.')) {
        if (confirm('Click OK to confirm year-end processing.')) {
            processYearEnd();
        }
    }
}

function processYearEnd() {
    const classOrder = ["s1-east", "s2-east", "s3-east", "s4-east", "s5-sciences", "s6-sciences"];
    
    appState.data.students.forEach((student, index) => {
        const decisionSelect = document.querySelector(`select[data-student="${student.id}"]`);
        const decision = decisionSelect?.value || 'promote';
        
        const currentIndex = classOrder.indexOf(student.class);
        const avg = calculateAverage(student.marks.term2);
        
        // Add to history
        if (!student.history) student.history = [];
        student.history.push({
            year: appState.data.academicYear,
            class: getClassName(student.class),
            status: decision,
            average: avg
        });
        
        // Move student
        if (decision === 'promote' && currentIndex < classOrder.length - 1) {
            student.class = classOrder[currentIndex + 1];
        } else if (decision === 'graduate') {
            student.status = 'graduated';
        } else if (decision === 'transfer') {
            student.status = 'transferred';
        }
        // repeat: stay in same class
        
        // Reset marks
        student.marks = {
            term1: {},
            term2: {},
            term3: {}
        };
        
        // Reset fees
        student.feePayments = [];
    });
    
    // Increment academic year
    appState.data.academicYear++;
    
    saveState();
    alert('Year-end processing complete. Students have been moved to their next classes.');
    renderPortal(appState.currentUser);
}
