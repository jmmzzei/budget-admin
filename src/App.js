import React, { useEffect, useState } from 'react'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import { Form } from './components/Form'
import { List } from './components/List'
import { Balance } from './components/Balance'
import './styles/main.scss'

function App() {
  let [update, setUpdate] = useState('')

  const updateList = e => {
    setUpdate(e)
  }

  return (
    <main className="home">
      <Balance />

      <div className="container">
        <h2>LAST OPERATIONS</h2>
        <List update={update} onUpdate={updateList} />
      </div>

      <div className="container">
        <button className="btn-close" onClick={hideForm}>
          X
        </button>
        <h2>NEW OPERATION</h2>
        <Form onUpdate={updateList} />
      </div>
    </main>
  )
}

export default App
