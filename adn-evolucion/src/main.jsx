import { createRoot } from 'react-dom/client'
import '@fontsource/bricolage-grotesque/latin-400.css'
import '@fontsource/bricolage-grotesque/latin-600.css'
import '@fontsource/bricolage-grotesque/latin-800.css'
import '@fontsource/jetbrains-mono/latin-400.css'
import '@fontsource/jetbrains-mono/latin-600.css'
import './styles.css'
import App from './App'

if (new URLSearchParams(location.search).has('capture')) document.documentElement.classList.add('capture')
createRoot(document.getElementById('root')).render(<App />)
