import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { TranslateDesktop } from './pages/translateDesktop'
import { TranslateMobile } from './pages/translateMobile'


function App() {
  
  return (
    <>
      {(window.innerWidth < 550) ?
        <TranslateMobile />
        : <TranslateDesktop />
      }
    </>
  )
}

export default App
