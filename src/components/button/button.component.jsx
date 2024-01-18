import { useCallback } from 'react'
import { Loader } from 'semantic-ui-react'
import './button.component.css'

const Button = (props) => {
  const { id, type, label, disabled, loading, onClick, background, color } = props
  const randomId = `random-id-button-${(1 + Date.now() + Math.random()).toString().replace('.', '')}`

  const handleClick = useCallback(
    (event) => {
      event.preventDefault()

      if (!disabled && !loading && onClick && typeof onClick === 'function') {
        onClick(event)
      }
    },
    [props]
  )

  return (
    <button
      className={`${disabled ? 'disabled ' : ''}` + `${loading ? 'loading ' : ''}`}
      id={id || randomId}
      onClick={(event) => handleClick(event)}
      type={type || 'submit'}
      disabled={disabled || loading}
      style={{
        backgroundColor: background || '#299C39',
        color: color || '#F6F6F8',
      }}
    >
      {label || 'Confirm'}
      {loading ? (
        <div className="loader">
          <Loader active size="mini" inverted />
        </div>
      ) : null}
    </button>
  )
}

export default Button
