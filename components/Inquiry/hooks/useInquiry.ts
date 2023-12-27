import { useState } from 'react'

export const useInquiry = () => {
  const [data, setData] = useState<any>()
  const [error, setError] = useState<any>()
  const [loading, setLoading] = useState(false)

  const submitInquiry = (route?: string, name?: string, email?: string, inquiry?: string) => {

    if (!inquiry || !name || !route) {
      return
    }
    setLoading(true)
    const options = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ route, name, email, inquiry })
    }
    fetch('/api/message', options)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw Error("There was an issue posting your message")
        }
      })
      .then((fetchData) => {
        setData(fetchData)
        setLoading(false)
      })
      .catch(error => {
        setError(error.message)
        setLoading(false)
      })
  }

  return { submitInquiry, loading, data, error, setData, setError }
}
