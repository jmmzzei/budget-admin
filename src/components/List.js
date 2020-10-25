import React, { useEffect, useState } from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Icon from '@material-ui/core/Icon'
import { Item } from './Item'

export const List = ({ update, onUpdate }) => {
  let [operations, setOperations] = useState([])
  let [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/')
      .then(res => res.json())
      .then(data => {
        setOperations(data.operations)
        setLoading(false)
      })
  }, [update])

  return (
    <section className={'list '}>
      {!loading ? (
        <ul>
          <li className="item header">
            <div className="item-content ">
              <div className="type">
                <Icon style={{ opacity: 0.6 }}>compare_arrows</Icon>
              </div>
              <div className="concept">Content</div>
              <div className="amount">Amount</div>
            </div>
          </li>

          {operations &&
            operations.map((e, i) => (
              <Item
                reduced={reduced}
                key={e.id}
                id={e.id}
                concept={e.concept}
                amount={e.amount}
                type={e.type}
                date={e.date}
                onUpdate={onUpdate}
              />
            ))}
        </ul>
      ) : (
        <div className="progress">
          <LinearProgress />
        </div>
      )}
    </section>
  )
}
