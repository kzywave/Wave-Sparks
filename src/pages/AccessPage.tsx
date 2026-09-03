import { type FormEvent, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getAccessCode } from '../access'
import { Brand } from '../components/Brand'
import { grantAccess } from '../storage'

const safeDestination = (candidate: string | null) =>
  candidate?.startsWith('/prototype') || candidate === '/showcase' || candidate === '/config'
    ? candidate
    : '/prototype'

export const AccessPage = () => {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (code !== getAccessCode()) {
      setError('Access code not accepted.')
      return
    }

    grantAccess(window.localStorage)
    navigate(safeDestination(searchParams.get('next')), { replace: true })
  }

  return (
    <main className="access-shell">
      <section className="access-card" aria-labelledby="access-title">
        <Brand />
        <p className="eyebrow">Private presentation build</p>
        <h1 id="access-title">Prototype access</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <form onSubmit={submit}>
          <label htmlFor="access-code">Access code</label>
          <input
            id="access-code"
            type="password"
            autoComplete="off"
            value={code}
            onChange={(event) => setCode(event.target.value)}
          />
          <button className="button button--primary" type="submit">Enter</button>
          {error ? <p className="form-error" role="alert">{error}</p> : null}
        </form>
        <p className="access-card__footer">Illustrative prototype fixture</p>
      </section>
    </main>
  )
}
