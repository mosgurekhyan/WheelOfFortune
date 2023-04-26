import './App.css'
import { useCallback, useState } from "react"
import Form from "./components/Form/Form"
import Sectors from './components/Sectors/Sectors'

function App() {
  const [sectors, setSectors] = useState([])
  const [editingSector, setEditingSector] = useState(null)
  const [editedText, setEditedText] = useState('')
  const [editedColor, setEditedColor] = useState('')

  const add = useCallback((text) => {
    if(!text) return
    setSectors(sectors => [
      ...sectors,
      {
        id: Date.now().toString(),
        text: text,
        color: `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`,
        textColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
      }
    ])
  }, [])

  const delet = useCallback((id) => {
    setSectors(sectors => [
      ...sectors.filter(e => e.id !== id)
    ])
  }, [])

  const edit = useCallback((id, text, color) => {
    setSectors(sectors => {
      const index = sectors.findIndex(e => e.id === id)
      if (index < 0) return sectors
      const updatedSectors = [...sectors]
      updatedSectors[index] = { id, text, color: color ?? updatedSectors[index].color }
      return updatedSectors
    })
  }, [])
  
  return (
    <div className='app'>
      <Sectors {...{sectors, setEditingSector, setEditedText, setEditedColor}}/> 
      <Form {...{add, sectors, delet, edit, editingSector, setEditingSector, editedText, setEditedText, editedColor, setEditedColor}}/>
    </div>
  )
}

export default App