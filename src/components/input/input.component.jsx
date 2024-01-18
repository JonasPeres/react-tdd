import { useCallback, useEffect, useState } from 'react'
import './input.component.css'

const Input = (props) => {
  const { id, name, type, label, value, error, onChange, autocomplete } = props
  const randomId = `random-id-input-${(1 + Date.now() + Math.random()).toString().replace('.', '')}`

  const [state, setState] = useState('')

  useEffect(() => {
    if (state !== value) {
      setState(value)
    }
  }, [state, value])

  const handleChange = useCallback(
    (event) => {
      const newValue = event?.target?.value || (event?.length ? event : '')

      setState(newValue)

      if (onChange && typeof onChange === 'function') {
        onChange(newValue)
      }
    },
    [props]
  )

  return (
    <div className="wrapper-input">
      <label htmlFor={id || randomId}>{label}</label>
      <input
        className={error ? 'error' : ''}
        id={id || randomId}
        name={name}
        value={state}
        onChange={handleChange}
        type={type || 'text'}
        autoComplete={autocomplete}
      />
      {error ? <span className="error">{error}</span> : null}
    </div>
  )
}

export default Input
