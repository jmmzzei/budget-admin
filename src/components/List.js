import React, { useEffect, useState } from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Icon from '@material-ui/core/Icon'
import { Item } from './Item'
import { API } from '../services/client'

export const List = ({ update, onUpdate, reduced, longListIsVisible }) => {
  let [operations, setOperations] = useState([])
  let [selection, setSelection] = useState('ALL')
  let [loading, setLoading] = useState(true)

  useEffect(() => {
    if (reduced) {
      API.getGroup(10)
        .then(response => {
          if (response.status == 'success') {
            setOperations(response.data)
            setLoading(false)
          }
        })
        .catch(err => {
          alert('There is a server error')
        })
    } else {
      API.getAll()
        .then(response => {
          if (response.status == 'success') {
            setOperations(response.data)
            setLoading(false)
          }
        })
        .catch(err => {
          alert('There is a server error')
        })
    }
  }, [update])

  const changeSelection = e => {
    const selected = e.target.innerText
    setSelection(selected)
  }

  return (
    <section
      className={
        longListIsVisible === true && reduced === true ? 'list light' : 'list '
      }>
      {!reduced && (
        <div className="buttons-container">
          <ButtonGroup
            variant="text"
            color="primary"
            aria-label="text primary button group">
            <Button onClick={changeSelection}>All</Button>
            <Button onClick={changeSelection}>Income</Button>
            <Button onClick={changeSelection}>Outcome</Button>
          </ButtonGroup>
        </div>
      )}

      {!loading ? (
        <ul>
          <li className="item header">
            <div className="item-content ">
              <div className="type">
                <Icon style={{ opacity: 0.6 }}>compare_arrows</Icon>
              </div>
              <div className="concept">Content</div>
              <div className="amount">Amount</div>
              {reduced || <div className="void"></div>}
            </div>
          </li>

          {operations &&
            (selection !== 'ALL'
              ? operations.map(
                  (e, i) =>
                    selection === e.type.toUpperCase() && (
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
                    ),
                )
              : operations.map((e, i) => (
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
                )))}
        </ul>
      ) : (
        <div className="progress">
          <LinearProgress />
        </div>
      )}
    </section>
  )
}
