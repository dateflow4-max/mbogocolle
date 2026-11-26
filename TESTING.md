# Testing Guide for Mbogo College School Management System

## Quick Start Testing

### 1. Open the App
Open `index.html` in your web browser. You should see:
- Animated splash screen with flying crest
- "Mbogo College" title
- Sign up and Sign in buttons

### 2. Test Parent Sign-up

1. Click **Sign up**
2. Select **Parent** (should be default)
3. Fill in the form:
   - **Name**: John Doe
   - **Phone**: +256 700 123 456
   - **Password**: password123
   - **Parent Code**: PAR001
   - **Student Code**: STU001
4. Click **Sign up**
5. You should see a loading spinner, then be taken to the Parent Portal

### 3. Test Parent Portal Features

#### Reports Tab
- View student's Term 1 and Term 2 reports
- Check subject bars and averages
- See strongest/weakest subjects
- Try the Print button

#### Fees Tab
- View fee balance
- See SchoolPay code
- Check payment history

#### Forms Tab
- Click "Read and sign" on a permission slip
- Scroll to the bottom (progress bar fills)
- Type your full name exactly: "John Doe"
- Click Approve
- Verify the slip shows as approved

#### Circulars Tab
- Click "Read" on any circular
- Verify it opens in a sheet overlay

#### Calendar Tab
- View the November 2026 calendar grid
- Click on a day with a green dot to see events
- Try the Calendar/List toggle
- Use ← → buttons to navigate months

#### Messages Tab
- Report an absence
- Send a message to teacher
- Toggle notification preferences

### 4. Test Sign Out and Sign In

1. Refresh the page
2. You should see your account is still logged in
3. To test sign-in flow, clear localStorage:
   - Open browser DevTools (F12)
   - Go to Application > Storage > Local Storage
   - Delete the `mbogoCurrentUser` item
   - Refresh the page

4. Click **Sign in**
5. Enter:
   - **Phone**: +256 700 123 456
   - **Password**: password123
6. Select **Parent**
7. Click **Sign in**

### 5. Test Teacher Sign-up

1. Clear localStorage again or use a different browser/incognito
2. Click **Sign up**
3. Select **Teacher**
4. Fill in:
   - **Name**: Jane Teacher
   - **Phone**: +256 700 999 888
   - **Password**: teacher123
   - **Teacher Code**: TCH2026
5. Click **Sign up**
6. You should see: "Waiting for approval" message
7. Teacher cannot access classes until approved by office

### 6. Test Office Portal

Since no default office account exists, you need to create one:

1. Open browser DevTools Console (F12)
2. Run this code to create an office account:

```javascript
const state = JSON.parse(localStorage.getItem('mbogoCollege'));
if (!state.accounts) state.accounts = [];
state.accounts.push({
    id: 'OFFICE001',
    name: 'Office Admin',
    phone: '+256700000000',
    password: 'office123',
    role: 'office',
    status: 'active',
    createdAt: new Date().toISOString()
});
localStorage.setItem('mbogoCollege', JSON.stringify(state));
localStorage.removeItem('mbogoCurrentUser');
location.reload();
```

3. Sign in with:
   - **Phone**: +256700000000
   - **Password**: office123
   - **Role**: Office

#### Test Office Features

**Overview Tab:**
- See total students count
- View fees collected/due
- Check pending teacher approvals

**Students Tab:**
- Search for students
- Filter by class
- Click a student to view profile (placeholder)

**Staff Tab:**
- See pending teacher (Jane Teacher)
- Click **Approve** to activate teacher
- View current teacher code
- Generate new teacher code
- Add new teacher or office account

**Circulars Tab:**
- Create a new circular
- Add optional event date (adds to calendar)
- Remove existing circulars

**Requests Tab:**
- View absence reports from parents
- View messages from parents
- Mark requests as done

**Year-end Tab:**
- View all students with current averages
- Change promotion decisions
- Click "Close the year" (requires double confirmation)
- **Warning**: This is irreversible and will:
  - Move promoted students to next class
  - Add to student history
  - Reset marks and fees
  - Increment academic year

### 7. Test Dark Mode

1. Click the **Dark** button in the header
2. Verify theme switches to dark colors
3. Button text changes to **Light**
4. Refresh page - theme should persist

### 8. Test Mobile View

1. Open DevTools (F12)
2. Click the device toolbar icon (Ctrl+Shift+M)
3. Select iPhone or similar (390px width)
4. Verify:
   - Tab bar moves to bottom in parent portal
   - Cards are responsive
   - Buttons are touch-friendly
   - Calendar grid adapts

### 9. Test Error Handling

#### Invalid Sign-up
1. Try signing up with:
   - Wrong parent code: PAR999
   - Wrong student code: STU999
   - Mismatched parent/student codes
2. Verify error messages are clear and specific
3. Check that fields are highlighted in red
4. Card should shake

#### Invalid Sign-in
1. Try wrong password
2. Try wrong role (create parent account, try to sign in as teacher)
3. Verify error messages

### 10. Test Multiple Children

1. Create a parent account with PAR001 and STU001
2. In DevTools Console, add a second child:

```javascript
const state = JSON.parse(localStorage.getItem('mbogoCollege'));
const account = state.accounts.find(a => a.phone === '+256 700 123 456');
account.studentCodes.push('STU026');
localStorage.setItem('mbogoCollege', JSON.stringify(state));
localStorage.removeItem('mbogoCurrentUser');
location.reload();
```

3. Sign in again
4. Verify child switcher appears at top
5. Click between children to switch views

## Code Combinations for Testing

### Valid Parent/Student Pairs
- PAR001 → STU001 (Nakato Aisha, S.1 East)
- PAR002 → STU002 (Okello David, S.1 East)
- PAR010 → STU010 (Kasozi Emmanuel, S.2 East)
- PAR019 → STU019 (Namukasa Christine, S.3 East)
- PAR026 → STU031 (Achola Irene, S.4 East)
- PAR015 → STU045 (Nakabugo Sharon, S.6 Sciences)

### Students with Multiple Parents
- PAR001 → STU001 and STU026 (siblings)
- PAR002 → STU002 and STU027 (siblings)

### Fee Payment Status
- Students 001, 004, 007, 010, etc. (every 3rd): **Fully paid**
- Students 002, 005, 008, 011, etc.: **Half paid**
- Students 003, 006, 009, 012, etc.: **Unpaid**

## Browser Console Tips

### View all data
```javascript
JSON.parse(localStorage.getItem('mbogoCollege'))
```

### Clear all data (reset app)
```javascript
localStorage.clear();
location.reload();
```

### View current user
```javascript
JSON.parse(localStorage.getItem('mbogoCurrentUser'))
```

### Add an office account
```javascript
const state = JSON.parse(localStorage.getItem('mbogoCollege'));
if (!state.accounts) state.accounts = [];
state.accounts.push({
    id: 'OFFICE001',
    name: 'Admin',
    phone: '+256700000000',
    password: 'admin',
    role: 'office',
    status: 'active'
});
localStorage.setItem('mbogoCollege', JSON.stringify(state));
```

## Known Limitations (Demo)

1. No actual authentication/security
2. Data only stored in browser localStorage
3. No real payment processing
4. No actual SMS/WhatsApp integration
5. Some office features show placeholders
6. Calendar navigation partially implemented
7. Student profile sheets show alert placeholders

## Checklist from Requirements

- [x] Crest shows in header, splash, and home
- [x] Office role does not show "Create an account"
- [x] Pending teachers cannot access classes
- [x] Parents cannot add children
- [x] Errors are specific, animated, and highlight fields
- [x] Fees collected section in overview
- [x] Year-end moves students and records history
- [x] Calendar shows month grid by default
- [x] Dark mode works everywhere
- [x] Works on 390px phone and desktop
- [x] Liquid glass on auth pages only
- [x] Solid cards in portals
- [x] Button ripples and haptic feedback
- [x] Pull to refresh
- [x] Scroll header shrink
- [x] Permission slip reading progress
- [x] Mascot privacy shield animation
- [x] Role selector pill animation
- [x] Report locked when fees unpaid
