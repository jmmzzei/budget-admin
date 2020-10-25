import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'

export const Form = ({ onUpdate, reduced, prevValues }) => {
  let [state, setState] = useState({
    concept: '',
    amount: '',
    date: '2020-10-25',
    type: 'Income',
  })

  const inputHandler = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const submit = e => {
    e.preventDefault()
    if (reduced) {
      fetch(`/api/${prevValues.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: prevValues.id,
          date: state.date,
          concept: state.concept,
          amount: state.amount,
        }),
      })
        .then(res => res.json())
        .then(data => {
          onUpdate({
            id: prevValues.id,
            date: state.date,
            concept: state.concept,
            amount: state.amount,
          })
        })
    } else {
      fetch('/api/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state),
      })
        .then(res => res.json())
        .then(data => {
          let jsonData = JSON.parse(data.created)
          onUpdate(JSON.parse(data.created))
        })
    }
  }

  useEffect(() => {
    if (prevValues) {
      setState({
        concept: prevValues.concept,
        amount: prevValues.amount,
        date: prevValues.date,
      })
    }
  }, [])

  return (
    <>
      <form className="form">
        <fieldset>
          <label htmlFor="concept">Concept:</label>
          <input
            type="text"
            id="concept"
            name="concept"
            value={state.concept}
            onChange={inputHandler}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={state.amount}
            onChange={inputHandler}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={state.value}
            onChange={inputHandler}
          />
        </fieldset>
        {!reduced && (
          <>
            <label htmlFor="type">Operation:</label>
            <fieldset id="type">
              <div className="radio-container">
                <label htmlFor="income">Income</label>
                <input
                  type="radio"
                  id="income"
                  name="type"
                  defaultChecked="checked"
                  value="Income"
                  onChange={inputHandler}
                />
              </div>
              <div className="radio-container">
                <label htmlFor="outcome">Outcome</label>
                <input
                  onChange={inputHandler}
                  type="radio"
                  id="outcome"
                  value="Outcome"
                  name="type"
                />
              </div>
            </fieldset>
          </>
        )}
        <Button color="primary" onClick={submit}>
          {reduced ? 'EDIT' : 'CREATE'}
        </Button>
      </form>
    </>
  )
}
