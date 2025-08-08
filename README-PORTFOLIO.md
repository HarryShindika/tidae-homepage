# Harry Shindika Portfolio Website

This is a React TypeScript portfolio website recreated from your design image.

## Features

- **Dark Theme**: Black background with cyan blue accents (#00bfff)
- **Navigation Bar**: Home, Bio, Projects, Music, Gallery with dropdown arrows
- **Modern Layout**: Two-column layout with profile section and intro text
- **Responsive Design**: Mobile-friendly layout that adapts to different screen sizes
- **Typography**: Bold, modern fonts with proper hierarchy

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **View in browser**: Open [http://localhost:3000](http://localhost:3000)

## Adding Your Profile Image

To add your actual profile photo:

1. Save your profile image as `profile.jpg` in the `src/assets/` folder
2. Update `src/App.tsx` to import and use the image:

```tsx
import profileImage from './assets/profile.jpg';

// Then replace the profile-placeholder div with:
<img 
  src={profileImage} 
  alt="Harry Shindika" 
  className="profile-image"
/>
```

## Customization

### Colors
- Primary accent color: `#00bfff` (cyan blue)
- Background: `#000000` (black)
- Text colors: `#ffffff` (white), `#cccccc` (light gray)

### Fonts
- Main font: Arial (you can change this in `src/App.css`)
- Consider using Google Fonts for more variety

### Layout
- Adjust spacing in the CSS variables
- Modify breakpoints for responsive design
- Change font sizes in media queries

## Project Structure

```
src/
├── App.tsx          # Main component
├── App.css          # All styling
├── assets/          # Images and media files
└── ...
```

## Building for Production

```bash
npm run build
```

This creates an optimized build in the `build/` folder ready for deployment.

## Deployment Options

- **Netlify**: Drag and drop the build folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use `gh-pages` package
- **AWS S3**: Upload build files to S3 bucket

## Next Steps

1. Add your actual profile image
2. Update the bio text with your real introduction
3. Add click handlers to navigation items
4. Create separate pages/components for Bio, Projects, Music, Gallery
5. Add animations and transitions
6. Optimize for SEO

## Technologies Used

- React 18
- TypeScript
- CSS3 (Flexbox, Grid)
- Create React App

---

The website matches your original design with a modern, professional look. You can now customize it further with your content and additional features!
