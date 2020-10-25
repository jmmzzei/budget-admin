import React, { useEffect, useState } from 'react'
import Icon from '@material-ui/core/Icon'

export const Item = ({ id, concept, amount, type, date, onUpdate }) => {
  const deleteOperation = () => {
    fetch(`/api/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
        onUpdate(data.deleted)
      })
  }

  const editOperation = id => {}

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
        <div className="concept">{concept}</div>
        <div className="amount">${amount}</div>
        <div className="list-buttons">
          <div className="icon">
            <Icon onClick={editOperation}>create</Icon>
          </div>
          <div className="icon">
            <Icon onClick={deleteOperation}>delete</Icon>
          </div>
        </div>
      </div>
    </li>
  )
}
