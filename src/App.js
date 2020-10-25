import React, { useState } from 'react'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import { Form } from './components/Form'
import { List } from './components/List'
import { Balance } from './components/Balance'
import './styles/main.scss'

function App() {
  let [update, setUpdate] = useState('')
  let [formVisibility, setFormVisibility] = useState(false)
  let [longListVisibility, setLongListVisibility] = useState(false)

  const updateList = e => {
    setUpdate(e)
  }

  const showForm = e => {
    setFormVisibility(!formVisibility)
  }

  const hideForm = e => {
    setFormVisibility(false)
  }

  const showLongList = e => {
    setLongListVisibility(!longListVisibility)
  }

  const hideLongList = e => {
    setLongListVisibility(false)
  }

  return (
    <main className="home">
      <Balance />

      <div className="container">
        <h2>LAST OPERATIONS</h2>
        <List
          reduced
          update={update}
          onUpdate={updateList}
          longListIsVisible={longListVisibility}
        />
      </div>

      <div className="buttons-container">
        <ButtonGroup
          variant="text"
          color="primary"
          aria-label="text primary button group">
          <Button onClick={showForm}>create new operation</Button>
          <Button onClick={showLongList}>list all operations</Button>
        </ButtonGroup>
      </div>

      {longListVisibility && (
        <div className="container">
          <button className="btn-close" onClick={hideLongList}>
            X
          </button>
          <h2>HISTORY</h2>
          <List
            update={update}
            onUpdate={updateList}
            longListIsVisible={longListVisibility}
          />
        </div>
      )}

      {formVisibility && (
        <div className="container">
          <button className="btn-close" onClick={hideForm}>
            X
          </button>
          <h2>NEW OPERATION</h2>
          <Form onUpdate={updateList} />
        </div>
      )}
    </main>
  )
}

export default App
