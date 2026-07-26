import './style.css'
import { renderApp } from './App.tsx'

const app = document.querySelector<HTMLDivElement>('#app')

if (app) {
  renderApp(app)
}
