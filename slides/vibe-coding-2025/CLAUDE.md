# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **Vibe Coding 2025** presentation - a Quarto-based Reveal.js presentation about modern developer experience and AI-assisted coding tools, specifically focusing on Claude Code. It's part of the larger levifikri.com educational website.

## Common Development Tasks

### Building and Previewing the Presentation
```bash
# From the project root (/Users/ruangguru/Documents/projects/levifikri.com/)
make build          # Build entire website including this presentation
make preview        # Preview locally with live reload
make publish        # Publish to Netlify

# Direct Quarto commands (alternative)
quarto render       # Build entire website
quarto preview      # Start preview server
```

### Working with the Presentation
```bash
# Install dependencies (Python packages for Jupyter support)
make install        # Uses UV package manager
uv sync            # Alternative direct command

# Clean build artifacts
make clean
```

## Architecture and Key Files

### Core Files
- **`index.md`** - Main presentation content (171 lines) with YAML frontmatter
- **`custom.scss`** - Custom dark theme styling with red accent color (#e62b1e)
- **`assets/`** - Image directory containing presentation visuals and logos

### Presentation Configuration
- **Format**: Reveal.js with custom dark theme
- **Features**: Slide numbering, smooth transitions, non-incremental display
- **Styling**: Dark background with white text, system fonts, red highlights
- **Resources**: Not embedded (external links maintained)

### Content Structure
The presentation covers:
1. Developer experience evolution (syntax highlighting → AI agents)
2. Claude Code introduction and features
3. Best practices and tips
4. MCP (Model Context Protocol) integration
5. Git workflow integration
6. Real-world use cases

## Integration with Main Website

### Navigation
- Listed under "Presentations" in website sidebar
- Accessible via `/slides/vibe-coding-2025/index.html`
- Part of Quarto's unified build system

### Build System
- **Technology**: Quarto static site generator with Reveal.js
- **Dependencies**: Python packages managed by UV
- **Deployment**: Automatic Netlify deployment via `_publish.yml`
- **Styling**: SCSS with custom variables and dark theme

### File Organization
```
slides/vibe-coding-2025/
├── index.md          # Main presentation content
├── custom.scss       # Dark theme styling  
├── assets/           # Images and logos
└── CLAUDE.md         # This file
```

## Development Notes

- Presentation content is written in Markdown with Reveal.js slide separators (`---`)
- Images should be placed in `assets/` directory and referenced relatively
- Custom styling uses SCSS variables for consistent theming
- The presentation integrates with the main website's navigation structure
- No separate package.json - relies on main project's Quarto configuration