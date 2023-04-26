import './Sectors.css'
import { useRef, useState } from 'react'
import audio from '../../Audio/9a8a2768681c94c.mp3'

function Sectors({sectors, setEditingSector, setEditedText, setEditedColor}) {
  const [isRunning, setIsRunning] = useState(false)
  const [win, setWin] = useState(false)
  const [spin, setSpin] = useState(0)
  const audioRef = useRef()    
  const [selectedSectorText, setSelectedSectorText] = useState('')
  const ref = useRef(null)
  const arrowRef = useRef(null)
  const dotRef1 = useRef(null)
  const dotRef2 = useRef(null)
  const sectorWidth = (2 * Math.PI * 250) / sectors.length
  const angleStep = 360 / sectors.length
  const arrowY = window.innerHeight / 2

  const handleClick = () => {
    if (!isRunning) {
      setIsRunning(true)
      setWin(true)
      setSpin(spin + Math.floor(Math.random() + 200) * 500)
      audioRef.current.play()
      setTimeout(() => {
        setIsRunning(false)
        setWin(false)
        const selectedH3 = getSelectedElement()
        setSelectedSectorText(selectedH3 ? selectedH3.innerText : '')
      }, audioRef.current.duration * 1000)
    }
  }

  const handleEditClick = (e) => {
    setEditingSector(e)
    setEditedText(e.text)
    setEditedColor(e.color)
  } 

  function getSelectedElement() {
    const circularDiv = document.querySelector('.sectors')
    const elements = circularDiv.querySelectorAll('.sector')
    let selectedElement = null
  
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i]
      const dot1 = element.querySelector('.dot1')
      const dot2 = element.querySelector('.dot2')
      const { bottom: dot1Bottom } = dot1.getBoundingClientRect()
      const { bottom: dot2Bottom } = dot2.getBoundingClientRect()
  
      if (dot1Bottom > arrowY && dot2Bottom < arrowY) {
        if (!selectedElement || dot1Bottom < selectedElement.querySelector('.dot1').getBoundingClientRect().bottom) {
          selectedElement = element
        }
      }
    }
    return selectedElement?.querySelector('h3')
  } 
  
  return (
    <div className='sectors'>
      <div style={{display: win && 'none'}} className='selectedNumber'>
        <i onClick={() => setWin(true)} className="close fa-solid fa-xmark"></i>
        <h2>{selectedSectorText}</h2>
        <span>$</span>
      </div>
      <i ref={arrowRef} className="arrow fa-sharp fa-solid fa-right-long"></i>
      <div style={{transform: `rotate(${spin}deg)`}} className='circle'>
        <audio ref={audioRef} src={audio} />
        <div onClick={handleClick} className='spin'>SPIN</div>
        {sectors.map((e, i) => (
          <div ref={ref} key={e.id} onClick={() => handleEditClick(e)} style={{width: `${sectorWidth}px`, transform: `rotate(${i * angleStep}deg)`, backgroundColor: e.color}} className='sector'>    
            <div style={{width: `${sectorWidth * 79 / 100}px`}} className="triangle">
              <h3 className='h3'>{e.text}</h3>
              <div ref={dotRef1} className="dot1"></div>
              <div ref={dotRef2} className="dot2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sectors 