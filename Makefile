.PHONY: help build preview publish clean install

help:
	@echo "Available targets:"
	@echo "  install          - Install dependencies"
	@echo "  build            - Build the Quarto website"
	@echo "  preview          - Preview the website locally"
	@echo "  publish          - Publish to Netlify"
	@echo "  clean            - Clean build artifacts"

install:
	@echo "Installing Python dependencies..."
	uv sync

build:
	@echo "Building Quarto website..."
	quarto render

preview:
	@echo "Starting Quarto preview server..."
	quarto preview

publish:
	@echo "Publishing to Netlify..."
	quarto publish netlify

clean:
	@echo "Cleaning build artifacts..."
	rm -rf _site
	find . -name "*.pyc" -delete
	find . -name "__pycache__" -delete
	find . -name ".ipynb_checkpoints" -delete