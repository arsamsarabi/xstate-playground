import { FC, useState, ChangeEvent } from 'react'
import { useMachine } from '@xstate/react'
import { IconUser, IconAlertCircle } from '@tabler/icons-react'

import { paymentMachine } from '@/lib'

type FormState = {
  name: string
  card: string
}

export const PaymentForm: FC = () => {
  const [form, setForm] = useState<FormState>({ name: '', card: '' })
  const [machine, send] = useMachine(paymentMachine)

  function handleSubmit() {
    send({ type: 'SUBMIT', data: form })
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  console.log(machine.value)

  return (
    <div className="card w-96 bg-base-100 shadow-xl shadow-gray-900 p-8">
      <h2 className="text-2xl font-bold mb-4">Payment form</h2>

      <div className="flex flex-col">
        <div className="form-control mb-6">
          <label className="label" htmlFor='name'>
            <span className="label-text">Your Name</span>
          </label>
          <label className="input-group" htmlFor='name'>
            <span>
              <IconUser />
            </span>
            <input onChange={handleChange} type="text" name="name" placeholder="Full name" className="input input-bordered flex-1" />
          </label>
        </div>

        <div className="form-control mb-6">
          <label className="label" htmlFor='card'>
            <span className="label-text">Card number</span>
          </label>
          <label className="input-group" htmlFor='card'>
            <span>
              <IconUser />
            </span>
            <input onChange={handleChange} type="number" name="card" placeholder="0000 0000 0000 0000" className="input input-bordered flex-1" />
          </label>
        </div>

        {machine.matches('error') && (
          <div className="alert alert-error shadow-lg mb-6">
            <div>
              <IconAlertCircle />
              <span>{machine.context.message.length ? machine.context.message : 'Oh no! no error message.'}</span>
            </div>
          </div>

        )}

        <button className={["btn", "btn-secondary", machine.matches('loading') && 'loading'].join(' ')} onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}
