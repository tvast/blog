# Contributing to π DJ

Thank you for your interest in contributing to **π DJ**! Here's how you can help.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/π-dj.git
   cd π-dj
   ```
3. **Create a feature branch**:
   ```bash
   git checkout -b feature/my-awesome-feature
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```

## Development Workflow

### Running the App

```bash
# Desktop (Electron) - recommended for development
npm run dev:electron

# Web version
npm run dev
```

### Making Changes

- **Vue Components**: Update files in `src/components/` or `src/layouts/`
- **Scenes**: Add new ASCII art scenes in `src/scenes/`
- **Shaders**: Modify GLSL in `src/components/AsciiCanvas.vue`
- **State**: Update Pinia store in `src/stores/config.js`
- **Styles**: Edit global styles in `src/css/app.scss`

### Code Style

- Use **Vue 3 Composition API** with `<script setup>`
- Use **descriptive variable names** (not single letters except in loops)
- Add comments only for non-obvious logic
- Keep functions **under 50 lines** when possible
- Use **const** by default, **let** only when necessary

### Building

```bash
# Build SPA (web)
npm run build

# Build Electron app
npm run build:electron

# Test production build
npx serve -s dist/spa
```

## Adding Features

### New ASCII Scene

1. Create `src/scenes/myScene.js`:
   ```javascript
   export default {
     id: 'myScene',
     label: 'My Scene',
     defaults: { speed: 1 },
     controls: [
       { key: 'speed', label: 'Speed', type: 'slider', min: 0.1, max: 4, step: 0.1 }
     ],
     create() {
       return {
         render({ cols, rows, t, params, charset }) {
           const ramp = charset || ' .:-=+*#%@'
           let output = ''
           // Your animation logic here
           return output
         }
       }
     }
   }
   ```

2. Register in `src/scenes/index.js`:
   ```javascript
   import myScene from './myScene'
   const scenes = [donut, matrix, plasma, waves, starfield, life, myScene]
   ```

3. Add the control to the studio dock in `src/components/ControlPanel.vue`:
   ```javascript
   const asciiScenes = [
     // ... existing scenes
     { id: 'myScene', label: 'My Scene' }
   ]
   ```

### Modify Shader

Edit `VisualizationShaders` class in `src/components/AsciiCanvas.vue`:

```glsl
// Vertex Shader
void main() {
  // Modify vDisplace, position, or other uniforms
}

// Fragment Shader
vec3 palette(float t, float palMode) {
  // Modify color calculations
}
```

### New Audio Feature

1. Add to audio setup in `AsciiCanvas.vue`:
   ```javascript
   async function setupAudio() {
     const audio = await ensureAudio()
     // Your audio logic
   }
   ```

2. Update the control dock in the template:
   ```vue
   <button @click="myAudioFunction">New Audio Feature</button>
   ```

## Submitting Changes

### Commit Messages

Write clear commit messages:
- ✅ `Add audio frequency analyzer`
- ✅ `Fix shader color bleeding`
- ✅ `Refactor AsciiCanvas component`
- ❌ `fixed stuff`
- ❌ `update`

### Pull Request Process

1. **Push to your fork**:
   ```bash
   git push origin feature/my-awesome-feature
   ```

2. **Open a Pull Request** on GitHub with:
   - Clear title describing the feature/fix
   - Description of what changed and why
   - Screenshots for UI changes
   - Link to any related issues

3. **Wait for review** — maintainers will provide feedback

4. **Make requested changes** and push again

5. **Merge!** Once approved, your PR will be merged

## Testing

### Manual Testing Checklist

- [ ] Feature works in development (`npm run dev:electron`)
- [ ] Feature works in web version (`npm run dev`)
- [ ] Production build succeeds (`npm run build`)
- [ ] No console errors
- [ ] Audio reactivity works (if relevant)
- [ ] Studio dock displays correctly

### Browser Testing

Test in:
- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (macOS)
- Edge (Windows)

## Performance Tips

- Use **requestAnimationFrame** for animations
- Avoid DOM manipulation in hot loops
- Cache complex calculations
- Use **GPU** for rendering (WebGL/shaders)
- Profile with DevTools (Chrome: F12 → Performance)

## Documentation

- Update README.md for user-facing changes
- Add JSDoc comments for complex functions
- Document new features in code comments

## Questions?

- Check existing [Issues](https://github.com/YOUR_USERNAME/π-dj/issues)
- Read [README.md](README.md) for architecture overview
- Ask in Pull Request comments

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for helping make π DJ even better!** 🍅✨
