

# 🚀 Orbit: Gamified Productivity & Habit Tracker

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Tech Stack](https://img.shields.io/badge/tech-stack-blueviolet.svg)]()

Orbit transforms your goals into an interactive galaxy—create planets for each objective, complete tasks to earn XP, and level up your productivity in a fun, visual way. Designed for modern users, Orbit combines habit tracking, gamification, and beautiful UI to help you stay motivated and organized.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **State Management:** @tanstack/react-query, Zustand (store)
- **Styling:** Tailwind CSS, Framer Motion, Embla Carousel
- **3D/Graphics:** Three.js, @react-three/fiber, @react-three/drei
- **Forms & Validation:** React Hook Form, Zod, @hookform/resolvers
- **UI Components:** Radix UI, Lucide React, shadcn/ui
- **HTTP Client:** Axios
- **Utilities:** clsx, class-variance-authority, react-toastify

---

## 🚦 Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/yousefmobelal/orbit.git
cd orbit/frontend
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Configure Environment Variables

Copy the example file and edit as needed:

```sh
cp .env.example .env
# Edit .env with your API keys and settings
```

> **Note:** The app expects a `VITE_API_URL` variable for backend API access.

### 4. Start the Development Server

```sh
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to view the app.

---

## 🗂️ Project Structure

```plaintext
src/
   app/           # Main app and routing
   assets/        # Static assets (images, etc.)
   components/    # Shared and UI components
      layout/      # Layout components (AppLayout, AuthLayout, etc.)
      shared/      # Reusable UI elements (Button, Loader, etc.)
      ui/          # UI primitives (input, dialog, etc.)
   features/      # Feature modules (auth, home, onboarding, galaxy, etc.)
   lib/           # API clients and utilities
      api/         # HTTP clients and interceptors
      utils/       # Utility functions (toast, storage, etc.)
   pages/         # Top-level pages (NotFoundPage, etc.)
   store/         # State management (onboarding-store, user-store)
   styles/        # CSS and theme files
   types/         # TypeScript types and interfaces
```

---

## 💡 Usage

### Start Development Server

```sh
npm run dev
```

### Build for Production

```sh
npm run build
```

### Lint the Codebase

```sh
npm run lint
```

### Preview Production Build

```sh
npm run preview
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add your message"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request describing your changes.

Please follow the existing code style and include tests where appropriate.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
