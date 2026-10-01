import { useState } from 'react'

const emptyAttend = {
  name: '',
  phone: '',
  hasPlusOne: false,
  plusOneName: '',
}

const EventDetails = ({ invitation }) => {
  const [response, setResponse] = useState(null)
  const [attend, setAttend] = useState(emptyAttend)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const choose = (next) => {
    setResponse(next)
    setSubmitted(false)
    setError('')
  }

  const updateAttend = (field) => (event) => {
    setAttend((current) => ({ ...current, [field]: event.target.value }))
    setError('')
  }

  const setPlusOne = (hasPlusOne) => {
    setAttend((current) => ({ ...current, hasPlusOne }))
    setError('')
  }

  const submitAttend = (event) => {
    event.preventDefault()
    const name = attend.name.trim()
    const phone = attend.phone.trim()
    const plusOneName = attend.plusOneName.trim()
    const digits = phone.replace(/\D/g, '')

    if (!name || digits.length < 7 || (attend.hasPlusOne && !plusOneName)) {
      setError(
        'Please add your name, a phone number, and your plus one\'s name if you are bringing someone.',
      )
      return
    }

    setAttend({ ...attend, name, phone, plusOneName })
    setSubmitted(true)
  }

  return (
    <section className="details" aria-label="Event details">
      <div className="details__inner">
        <h2 className="details__title">{invitation.title}</h2>
        <div className="details__actions">
          {invitation.rsvp.map((label) => {
            const value = label === 'Will attend' ? 'attend' : 'decline'
            const selected = response === value

            return (
              <button
                key={label}
                className={selected ? 'details__button is-selected' : 'details__button'}
                type="button"
                aria-pressed={selected}
                onClick={() => choose(value)}
              >
                {label}
              </button>
            )
          })}
        </div>

        {response === 'decline' && (
          <p className="details__note">{invitation.declineMessage}</p>
        )}

        {response === 'attend' && submitted && (
          <p className="details__note">
            {attend.hasPlusOne
              ? `Thank you, ${attend.name}. We look forward to celebrating with you and ${attend.plusOneName}.`
              : `Thank you, ${attend.name}. We look forward to celebrating with you.`}
          </p>
        )}

        {response === 'attend' && !submitted && (
          <form className="details__form" onSubmit={submitAttend}>
            <label className="details__field">
              <span>Name</span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                value={attend.name}
                onChange={updateAttend('name')}
              />
            </label>
            <label className="details__field">
              <span>Phone number</span>
              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                value={attend.phone}
                onChange={updateAttend('phone')}
              />
            </label>
            <fieldset className="details__plus">
              <legend>Plus one</legend>
              <div className="details__actions details__actions--compact">
                <button
                  className={attend.hasPlusOne ? 'details__button' : 'details__button is-selected'}
                  type="button"
                  aria-pressed={!attend.hasPlusOne}
                  onClick={() => setPlusOne(false)}
                >
                  No
                </button>
                <button
                  className={attend.hasPlusOne ? 'details__button is-selected' : 'details__button'}
                  type="button"
                  aria-pressed={attend.hasPlusOne}
                  onClick={() => setPlusOne(true)}
                >
                  Yes
                </button>
              </div>
            </fieldset>
            {attend.hasPlusOne && (
              <label className="details__field">
                <span>Plus one name</span>
                <input
                  type="text"
                  name="plusOneName"
                  value={attend.plusOneName}
                  onChange={updateAttend('plusOneName')}
                />
              </label>
            )}
            {error && (
              <p className="details__error" role="alert">
                {error}
              </p>
            )}
            <button className="details__button details__submit" type="submit">
              Submit
            </button>
          </form>
        )}

        <p className="details__label">{invitation.dateLabel}</p>
        {invitation.dateLines.map((line) => (
          <p key={line} className="details__line">
            {line}
          </p>
        ))}
        <p className="details__label">{invitation.addressLabel}</p>
        {invitation.addressLines.map((line) => (
          <p key={line} className="details__line">
            {line}
          </p>
        ))}
      </div>
    </section>
  )
}

export default EventDetails
