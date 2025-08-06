# 💕 Date Invitation Web App

A beautiful, romantic web app to ask your special someone on a date!

## 🚀 Quick Setup

### Step 1: Set up Form Submission (to capture her choices)

You have three options to capture her responses:

#### Option A: Web3Forms (Recommended - Free & Easy)
1. Go to [https://web3forms.com](https://web3forms.com)
2. Enter your email and click "Create Access Key"
3. Copy your access key
4. Open `script.js` and replace `YOUR_ACCESS_KEY_HERE` with your actual access key (line ~164)

#### Option B: Use Console Logs Only (Simplest)
- The app already saves choices to browser's localStorage and console
- After she completes the form, you can check the browser console (F12 > Console tab)
- Look for "Date Choices:" in the console to see her selections

#### Option C: Google Forms (Alternative)
- Create a Google Form with matching fields
- Get the form submission URL and field IDs
- Update the submission function in `script.js`

### Step 2: Deploy to GitHub Pages

1. Create a new repository on GitHub
2. Upload all files (index.html, styles.css, script.js)
3. Go to Settings > Pages
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click Save
7. Your site will be available at: `https://[your-username].github.io/[repository-name]`

## 📝 Customization

### Change Images
- Replace the Unsplash URLs in `index.html` with your own images
- Add a real video URL for the placeholder on page 1

### Personalize Content
- Update the text messages throughout the pages
- Add more food/drink/dessert/activity options
- Customize the colors in `styles.css`

### Her Interests Included
The app includes subtle references to her interests:
- 🍷 Wine options in drinks
- 🍝 Pasta in food choices  
- 🌹 Flowers in animations
- 📺 Netflix & movies (Ted Lasso, Bridgerton vibes)
- 💙 Stitch meme on page 2
- 🐕 You can add dog photos/gifs!

## 🎨 Features

- Beautiful gradient backgrounds
- Smooth page transitions
- Floating hearts animation
- Confetti on completion
- Mobile responsive
- Input validation (ensures she selects required options)
- Local storage backup
- Form submission to email

## 📱 Testing

1. Open `index.html` in your browser locally first
2. Test all pages and selections
3. Check console for captured data
4. Make sure form submission works (if using Web3Forms)

## 💡 Tips

- Test on mobile to ensure it looks good on her phone
- Consider adding background music (add an audio element)
- You could record a personal video message for page 1
- Add more personalized memes or inside jokes
- Include photos of places you might go

## 🐛 Troubleshooting

**Form not submitting?**
- Check that you've added your Web3Forms access key
- Check browser console for errors
- Data is still saved in localStorage as backup

**Images not loading?**
- Check internet connection (uses Unsplash CDN)
- Replace with local images if needed

**Pages not transitioning?**
- Ensure JavaScript is enabled
- Check browser console for errors

## 💝 Have Fun!

This is your chance to make something special and personal. The code is ready to go - just add your access key and deploy!

Good luck with your date invitation! 🎉