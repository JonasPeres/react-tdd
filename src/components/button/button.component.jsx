import { useCallback } from 'react'
import { Loader } from 'semantic-ui-react'
import './button.component.css'

const Button = (props) => {
  const randomId = `random-id-button-${(1 + Date.now() + Math.random()).toString().replace('.', '')}`

  const handleClick = useCallback(
    (event) => {
      event.preventDefault()

      if (!props.disabled && !props.loading && props.onClick && typeof props.onClick === 'function') {
        props.onClick(event)
      }
    },
    [props]
  )

  return (
    <button
      className={`${props.disabled ? 'disabled ' : ''}` + `${props.loading ? 'loading ' : ''}`}
      id={props.id || randomId}
      onClick={(event) => handleClick(event)}
      type={props.type || 'submit'}
      disabled={props.disabled || props.loading}
      style={{
        backgroundColor: props.background || '#299C39',
        color: props.color || '#F6F6F8',
      }}
    >
      {props.label || 'Confirm'}
      {props.loading ? (
        <div className="loader">
          <Loader active size="mini" inverted />
        </div>
      ) : null}
    </button>
  )
}

export default Button
