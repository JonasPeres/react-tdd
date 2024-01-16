import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import Button from '../../components/button/button.component'
import Input from '../../components/input/input.component'
import { signUp } from '../../services/api-call.service'
import './sign-up.page.css'

const SignUpPage = () => {
  const [loadingButton, setLoadingButton] = useState(false)
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const submit = useCallback(() => {
    setLoadingButton(true)
    signUp({
      username: state.username,
      email: state.email,
      password: state.password,
    })
      .then((response) => {
        if (response?.status < 400) {
          toast.success(response?.data?.message, {})
        } else {
          throw response
        }
      })
      .catch((err) => {
        let message = ''

        const errors = err?.response?.data?.validationErrors || {}
        Object.values(errors).forEach((error, index) => {
          if (index !== 0) {
            message += '<br/>'
          }
          message += '• ' + error
        })

        toast.error(<div dangerouslySetInnerHTML={{ __html: message }} /> || 'Unexpected Error', {})
      })
      .finally(() => {
        setLoadingButton(false)
      })
  }, [state])

  const disableButton = useCallback(() => {
    return (!state.password && !state.passwordConfirm) || state.password !== state.passwordConfirm
  }, [state])

  return (
    <div className='sign-up-page'>
      <form onSubmit={submit}>
        <h1>Sign Up</h1>
        <Input
          label="User"
          name="user-name-input"
          id="user-name-input"
          value={state.username}
          onChange={(value) => setState((prevState) => ({ ...prevState, username: value }))}
          autocomplete="username"
        />
        <Input
          label="E-mail"
          name="email-input"
          id="email-input"
          value={state.email}
          onChange={(value) => setState((prevState) => ({ ...prevState, email: value }))}
        />
        <Input
          label="Password"
          name="password-input"
          id="password-input"
          type="password"
          value={state.password}
          onChange={(value) => setState((prevState) => ({ ...prevState, password: value }))}
          autocomplete="new-password"
        />
        <Input
          label="Confirm Password"
          name="confirm-password-input"
          id="confirm-password-input"
          type="password"
          value={state.passwordConfirm}
          onChange={(value) => setState((prevState) => ({ ...prevState, passwordConfirm: value }))}
          autocomplete="new-password"
        />
        <Button onClick={() => submit()} label={<span>Sign Up</span>} disabled={disableButton()} loading={loadingButton} />
      </form>
    </div>
  )
}

export default SignUpPage
