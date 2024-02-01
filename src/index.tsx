import React from 'react'
import { createRoot, Root } from 'react-dom/client'
import App from './components/App'

// div element with the root id
const root: HTMLElement | null = document.getElementById('root')

// Attach the App component to the #root element
if (root !== null) {
  const rootTarget: Root = createRoot(root)
  rootTarget.render(
      <App />
  )
}
