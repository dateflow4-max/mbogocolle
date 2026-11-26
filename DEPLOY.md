# Deployment Guide

## Deploying to Netlify

### Method 1: Drag and Drop (Easiest)

1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire `mbogo` folder onto the page
3. Wait for upload to complete
4. Your site is live! You'll get a URL like `random-name-123456.netlify.app`

### Method 2: Git Repository (Recommended)

1. **Initialize Git** (if not already done):
   ```bash
   cd mbogo
   git init
   git add .
   git commit -m "Initial commit: Mbogo College School Management System"
   ```

2. **Push to GitHub**:
   ```bash
   # Create a new repository on GitHub first, then:
   git remote add origin https://github.com/yourusername/mbogo-college.git
   git branch -M main
   git push -u origin main
   ```

3. **Connect to Netlify**:
   - Log in to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your repository
   - Build settings:
     - **Build command**: Leave empty (no build needed)
     - **Publish directory**: `.` (root)
   - Click "Deploy site"

4. **Custom Domain** (optional):
   - Go to Site settings → Domain management
   - Add your custom domain
   - Follow DNS configuration instructions

### Method 3: Netlify CLI

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**:
   ```bash
   netlify login
   ```

3. **Deploy**:
   ```bash
   cd mbogo
   netlify deploy --prod
   ```

4. Follow the prompts:
   - Create new site or link existing
   - Publish directory: `.` (current directory)

## Deploying to Other Platforms

### GitHub Pages

1. Push code to GitHub
2. Go to repository Settings → Pages
3. Select branch (main) and folder (root)
4. Click Save
5. Your site will be at `https://yourusername.github.io/mbogo-college`

### Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Build settings:
   - **Framework Preset**: Other
   - **Build Command**: Leave empty
   - **Output Directory**: `.`
6. Click Deploy

### Any Static Hosting

Upload these files to your web server:
- `index.html`
- `styles.css`
- `data.js`
- `app.js`
- `assets/` (folder with logo.svg)

**Files NOT needed for deployment:**
- `README.md`
- `TESTING.md`
- `DEPLOY.md`
- `.gitignore`
- `data (1).js`
- `*.zip` files
- Mock-up files

## Post-Deployment Checklist

- [ ] Site loads without errors
- [ ] Splash screen animation works
- [ ] Logo appears correctly
- [ ] Sign up and sign in work
- [ ] Dark mode toggle works
- [ ] Mobile layout works (test on phone)
- [ ] All tabs load in portals
- [ ] LocalStorage persists data
- [ ] Calendar displays correctly
- [ ] Permission slips can be signed
- [ ] Office portal functions work

## Troubleshooting

### Logo not showing
- Check that `assets/logo.svg` was uploaded
- Verify path is `assets/logo.svg` not `assets/logo.png`

### CSS not loading
- Clear browser cache
- Check that `styles.css` is in the same directory as `index.html`

### JavaScript errors
- Open browser DevTools (F12) → Console
- Check for missing files
- Ensure `data.js` loads before `app.js`

### LocalStorage not persisting
- Check browser privacy settings
- Ensure cookies/storage are enabled
- Try a different browser

### Mobile view issues
- Test on actual device, not just DevTools
- Check viewport meta tag in `index.html`
- Verify touch events work

## Configuration

### Change School Name
1. Edit `index.html`: Update all "Mbogo College" text
2. Edit `app.js`: Update title strings
3. Edit `data.js`: Update any school-specific data

### Change Colors
1. Edit `styles.css`: Update CSS variables in `:root`
2. Main color: `--color-green: #16a34a`
3. Error color: `--color-red: #dc2626`

### Change Academic Year
Edit `data.js`:
```javascript
const SEED = {
    academicYear: 2027, // Change this
    currentTerm: 1,     // Change this
    // ...
}
```

## Security Notes

**This is a demo application. For production use:**

1. **Add backend authentication**
   - Use a real authentication service
   - Store passwords securely (hashed)
   - Implement session management

2. **Add database**
   - Replace localStorage with a real database
   - Use API endpoints for data operations
   - Implement proper access control

3. **Validate on server**
   - All validation is client-side only
   - Add server-side validation
   - Sanitize user inputs

4. **Use HTTPS**
   - Ensure site is served over HTTPS
   - Most modern hosts do this automatically

5. **Environment variables**
   - Store API keys securely
   - Don't commit sensitive data to Git

## Support

For issues or questions:
- Check `TESTING.md` for testing procedures
- Review browser console for errors
- Verify all files were deployed correctly
