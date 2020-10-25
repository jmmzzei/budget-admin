import React, { useEffect, useState } from 'react'
export const Balance = () => {
  let [balance, setBalance] = useState({ income: 0, outcome: 0, total: 0 })

  useEffect(() => {
    fetch('/api/balance')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setBalance(data.balance)
      })
  }, [])

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
