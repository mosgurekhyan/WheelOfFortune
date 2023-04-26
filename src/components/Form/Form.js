import { Fragment, memo, useRef } from 'react'
import './Form.css'

function Form({add, sectors, delet, edit, editingSector, setEditingSector, editedText, setEditedText, editedColor, setEditedColor}) {
  const formRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    add(formRef.current[0].value)
    formRef.current.reset()
  }

  const handleEditSave = () => {
    if (editedText.trim() !== '') {
      edit(editingSector.id, editedText, editedColor)
      setEditingSector(null)
      setEditedText('')
      setEditedColor('')
    }
  }

  return (
    <div className='formDiv'>
      <div>
        {
          sectors.map(e => (
            <Fragment key={e.id}>
          {
            editingSector?.id === e.id && 
            <div className='inputs'>
              <input
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                placeholder='text'
              />
              <input
                type="color"
                value={editedColor}
                style={{background: e.color}}
                onChange={(e) => setEditedColor(e.target.value)}
                className='inp'
              />
              <button onClick={handleEditSave}>Save</button>
              <button onClick={() => delet(e.id)}>Delete</button>
              <button onClick={() => setEditingSector(null)}>Cancel</button>
            </div>
          }
          </Fragment>
          ))
        }
      </div>
      <form onSubmit={handleSubmit} ref={formRef}>
        <input type="text" />
        <button>Add</button>
        <h2>{sectors.length}</h2>
      </form>
    </div>
  )
}

export default memo(Form)