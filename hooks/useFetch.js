import { useEffect, useState } from 'react'
import { auth } from '../config/firebase-config'
import { getDocs } from 'firebase/firestore'

const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    const data = await getDocs(url)
    const newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    const finalRel = newData.filter(
      (item) => item.author.id === auth.currentUser.uid
    )

    setData(finalRel)
  }

  useEffect(() => {
    getData()
    console.log('URL Running...')
  }, [url])

  return { data, isLoading }
}

export default useFetch
