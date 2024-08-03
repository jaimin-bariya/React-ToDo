
# React ToDo App

A simple and interactive ToDo application built with React and Vite. This app allows users to manage their tasks with features such as adding, editing, deleting, and dragging tasks to reorder them. It also supports marking tasks as complete and clearing all tasks.



## Features

- **Add Tasks**: Add new tasks with a title.
- **Edit Tasks**: Edit the title of existing tasks.
- **Delete Tasks**: Remove individual tasks.
- **Complete/Uncomplete Tasks**: Toggle the completion status of tasks.
- **Drag and Drop**: Reorder tasks using drag and drop.
- **Clear All Tasks**: Remove all tasks with a single click.
- **Local Storage**: Tasks are saved and loaded from local storage to persist across page refreshes.



## Live Demo

You can view the live demo of the application [here](https://jaimin-bariya.github.io/React-ToDo/).



## Installation

To set up and run the project locally, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/jaimin-bariya/React-ToDo.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd React-ToDo
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Run the Development Server**

   ```bash
   npm run dev
   ```

   Open `http://localhost:5173` in your browser to view the application.



## Build and Deploy

To build and deploy the application, follow these commands:

1. **Build the Project**

   ```bash
   npm run build
   ```

   This command creates a `dist` directory with the production build.

2. **Deploy to GitHub Pages**

   ```bash
   npm run deploy
   ```

   This command deploys the contents of the `dist` directory to GitHub Pages.



## Libraries and Tools Used

- **React**: A JavaScript library for building user interfaces. [React](https://reactjs.org/)
- **Vite**: A build tool that provides a faster development experience. [Vite](https://vitejs.dev/)
- **React-Bootstrap**: Provides Bootstrap components as React components. [React-Bootstrap](https://react-bootstrap.github.io/)
- **React-Beautiful-Dnd**: A library for drag-and-drop interactions in React. [React-Beautiful-Dnd](https://github.com/atlassian/react-beautiful-dnd)
- **gh-pages**: A utility for deploying to GitHub Pages. [gh-pages](https://github.com/gh-pages/gh-pages)
- **Tailwind CSS**: A utility-first CSS framework for building custom designs. [Tailwind CSS](https://tailwindcss.com/)
- **ESLint**: A tool for identifying and fixing problems in JavaScript code. [ESLint](https://eslint.org/)
- **Autoprefixer**: A PostCSS plugin to parse CSS and add vendor prefixes. [Autoprefixer](https://github.com/postcss/autoprefixer)
- **PostCSS**: A tool for transforming CSS with JavaScript plugins. [PostCSS](https://postcss.org/)



## Configuration

- **Vite Base Path**: The `vite.config.js` file is configured with a base path of `/React-ToDo/` to match the GitHub Pages deployment path.



## Contributing

Contributions are welcome! Please open an issue or a pull request if you have any suggestions or improvements.



## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
