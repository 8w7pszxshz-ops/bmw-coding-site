#!/bin/bash
echo "Building client..."
vite build --outDir dist/client

echo "Building server..."
vite build --ssr src/entry-server.tsx --outDir dist/server

echo "Build complete!"
