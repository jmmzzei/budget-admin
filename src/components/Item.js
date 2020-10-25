import React, { useEffect, useState } from 'react'
import Icon from '@material-ui/core/Icon'
import { Form } from './Form'

export const Item = ({
  id,
  concept,
  amount,
  type,
  date,
  onUpdate,
  reduced,
}) => {
  let [showForm, setShowForm] = useState(false)
  let [newData, setNewData] = useState({
    concept: concept,
    amount: amount,
    date: date,
  })

  const deleteOperation = () => {
    fetch(`/api/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
        onUpdate(data.deleted)
      })
  }

  const editOperation = id => {
    setShowForm(!showForm)
  }

  useEffect(()=>{
  },[])
  const updateItem = e => {
    onUpdate({ concept: e.concept, amount: e.amount, date: e.date })
    setNewData({ concept: e.concept, amount: e.amount, date: e.date })
    setShowForm(false)
  }

  useEffect(() => {
    setNewData({ concept: concept, amount: amount, date: date })
  }, [concept, date, amount])

  return (
    <li className="item">
      <div className="item-content">
        <div className="type">
          {type === 'Income' ? (
            <Icon style={{ color: 'green' }}>east</Icon>
          ) : (
            <Icon style={{ color: 'red' }}>west</Icon>
          )}
        </div>
        <div className="concept">{newData.concept}</div>
        <div className="amount">${newData.amount}</div>
        {reduced || (
          <div className="list-buttons">
            <div className="icon">
              <Icon onClick={editOperation}>create</Icon>
            </div>
            <div className="icon">
              <Icon onClick={deleteOperation}>delete</Icon>
            </div>
          </div>
        )}
      </div>

      {showForm && (
        <div className="item-form">
          <Form
            reduced
            onUpdate={updateItem}
            prevValues={{
              id: id,
              date: date,
              concept: concept,
              amount: amount,
            }}
          />
        </div>
      )}
    </li>
  )
}
