# PromptVault 🚀

A modern, responsive marketplace for AI prompts built with Next.js, TypeScript, and Tailwind CSS. PromptVault provides a beautiful interface for discovering, browsing, and purchasing high-quality AI prompts for various use cases.

## ✨ Features

- **Modern Design**: Clean, professional interface with smooth animations
- **Responsive Layout**: Fully responsive design that works on all devices
- **Component-Based Architecture**: Modular React components for easy maintenance
- **TypeScript Support**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Framer Motion**: Smooth animations and transitions
- **Heroicons**: Beautiful SVG icons
- **Next.js 14**: Latest Next.js features including App Router

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Heroicons
- **UI Components**: Headless UI
- **Package Manager**: npm

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd prompt-vault
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
prompt-vault/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       ├── Categories.tsx
│       ├── FeaturedPrompts.tsx
│       ├── Footer.tsx
│       ├── Hero.tsx
│       ├── Navigation.tsx
│       ├── Pricing.tsx
│       ├── PromptModal.tsx
│       └── PromptPacks.tsx
├── public/
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🎨 Components

### Navigation
- Responsive navigation bar with search functionality
- Mobile-friendly hamburger menu
- Smooth animations and hover effects

### Hero Section
- Eye-catching landing section with animated counters
- Call-to-action buttons
- Trust indicators and platform badges

### Categories
- Interactive category grid with progress indicators
- Hover effects and smooth transitions
- Color-coded categories

### Featured Prompts
- Product cards with ratings and pricing
- Like functionality
- Preview and purchase options

### Prompt Packs
- Curated prompt bundles with gradient backgrounds
- Feature lists and pricing
- Popular badges and animations

### Pricing
- Three-tier pricing structure
- Feature comparison
- Trust indicators

### Footer
- Newsletter subscription
- Social media links
- Comprehensive site links
- Status indicators

### Prompt Modal
- Detailed prompt preview
- Star ratings
- Purchase interface

## 🚀 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Key Features Implemented

### Fixed Issues
1. **Dynamic Tailwind Classes**: Replaced dynamic class generation with static classes for proper Tailwind compilation
2. **Heroicons Integration**: Properly configured Heroicons imports for both outline and solid variants
3. **Custom CSS Classes**: Replaced custom CSS classes with Tailwind utilities
4. **TypeScript Errors**: Resolved all TypeScript compilation errors
5. **Component Structure**: Ensured all components follow React best practices

### Responsive Design
- Mobile-first approach
- Breakpoint-specific layouts
- Touch-friendly interactions

### Performance Optimizations
- Static generation where possible
- Optimized images and assets
- Efficient component rendering

## 🎨 Design System

### Colors
- **Primary**: Indigo (600, 500, 400)
- **Secondary**: Purple (600, 500, 400)
- **Accent**: Pink, Green, Blue variants
- **Neutral**: Gray scale (50-900)

### Typography
- **Headings**: Font weights from medium to black
- **Body**: Regular and medium weights
- **Gradients**: Text gradients for emphasis

### Spacing
- Consistent spacing scale
- Responsive padding and margins
- Grid-based layouts

## 🔧 Configuration

### Tailwind CSS
The project uses a custom Tailwind configuration with:
- Extended color palette
- Custom font families
- Animation utilities
- Responsive breakpoints

### TypeScript
Strict TypeScript configuration for:
- Type safety
- Better developer experience
- Compile-time error checking

## 🌟 Future Enhancements

- [ ] User authentication system
- [ ] Payment integration (Stripe)
- [ ] Database integration (Supabase)
- [ ] Search functionality
- [ ] User reviews and ratings
- [ ] Admin dashboard
- [ ] API endpoints
- [ ] Email notifications
- [ ] Advanced filtering
- [ ] Wishlist functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first approach
- Heroicons for beautiful icons
- Framer Motion for smooth animations

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the documentation
- Contact the development team

---

**Built with ❤️ for creators**
