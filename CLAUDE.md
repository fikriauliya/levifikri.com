# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

levifikri.com is a multi-faceted educational website built by Pahlevi Fikri Auliya. It combines multiple technologies to create interactive learning experiences for programming concepts, ranging from beginner-friendly visual coding to advanced competitive programming topics.

## Common Development Tasks

### Building the Main Website
```bash
# Build the entire Quarto website
quarto render

# Preview the website locally
quarto preview

# Publish to Netlify (requires authentication)
quarto publish netlify
```

### Working with Motion Canvas Animations
```bash
# Navigate to animations directory
cd animations

# Install dependencies
npm install

# Start development server
npm start

# Build animation
npm run build
```

## High-Level Architecture

### Technology Stack
- **Quarto**: Static site generator for the main website
- **Jupyter Notebooks**: Technical content and tutorials (*.ipynb files)
- **Motion Canvas**: TypeScript-based animation framework for educational animations
- **p5.js**: JavaScript library for interactive visual coding examples
- **Netlify**: Deployment platform (two deployment targets: levifikri.com and learnfuncoding.netlify.app)

### Content Organization

1. **Fun Visual Coding** (`/fun-visual-coding/`): Indonesian-language beginner tutorials
   - Progressive lessons: function → variable → conditional → looping → array
   - Each concept has numbered HTML files (0-*.html, 1-*.html) showing progression
   - Self-contained HTML pages with embedded p5.js sketches for interactive learning

2. **Competitive Programming** (`/competitive-programming/`): Advanced topics in English
   - Data structures: balanced trees, heaps, hashmaps, etc.
   - Algorithms: recursion and other advanced concepts
   - Cryptography: cryptographic hash functions
   - Content primarily in Jupyter notebooks

3. **Rust Demystified** (`/rust/`): In-depth Rust programming concepts
   - Ownership, borrowing, algebraic data types
   - Mix of Jupyter notebooks and supporting code files

4. **Animations** (`/animations/`): Motion Canvas project
   - TypeScript source files in `/src/`
   - Audio files for synchronization in `/audio/`
   - Rendered output in `/output/`

### Key Patterns

- **Visual-First Teaching**: Heavy emphasis on interactive demonstrations
- **Progressive Difficulty**: Each section builds from basic to advanced concepts
- **Multi-Language Support**: Content in Indonesian and English
- **Code Examples**: JavaScript, Rust, Python, and Go implementations

### Important Notes

- When creating new educational content, follow the existing pattern of numbered files for concept progression
- Interactive examples should be self-contained HTML files with embedded p5.js
- Jupyter notebooks are preferred for technical explanations with executable code
- The website uses Quarto's sidebar navigation with nested sections
- Motion Canvas animations require TypeScript and use Vite as the build tool