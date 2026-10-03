const endpoint = import.meta.env.VITE_RSVP_URL

const submitRsvp = async (entry) => {
  if (!endpoint) {
    throw new Error('We could not save your reply. Please try again.')
  }

  try {
    await fetch(endpoint, {
      method: 'POST',
      mode: 'no-cors',
      body: new URLSearchParams({
        response: entry.response,
        name: entry.name,
        phone: entry.phone,
        plusOne: entry.plusOne,
        plusOneName: entry.plusOneName,
      }),
    })
  } catch {
    throw new Error('We could not save your reply. Please try again.')
  }
}

export default submitRsvp
