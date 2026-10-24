import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <section>
      <h1>Page not found</h1>
      <p className="muted">
        The page you’re looking for doesn’t exist or has moved.{' '}
        <Link to="/">Go to the dashboard</Link>
      </p>
    </section>
  )
}

export default NotFoundPage
