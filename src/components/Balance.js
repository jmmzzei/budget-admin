import React, { useEffect, useState } from 'react'
import { API } from '../services/client'

export const Balance = ({ update }) => {
  let [balance, setBalance] = useState({ income: 0, outcome: 0, total: 0 })

  useEffect(() => {
    API.getBalance()
      .then(response => {
        if (response.status == 'success') setBalance(response.data)
      })
      .catch(err => {
        alert('There is a server error')
      })
  }, [update])

  return (
    <section className="balance">
      <div className="total">
        <h2>Balance</h2>
        <h1>${balance && balance.total}</h1>
      </div>
      <div className="balance-detail">
        <div className="income">
          <p>Income</p>
          <h3>${balance && balance.income}</h3>
        </div>
        <div className="outcome">
          <p>Outcome</p>
          <h3>${balance && balance.outcome}</h3>
        </div>
      </div>
    </section>
  )
}
