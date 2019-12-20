import React, {useState, useEffect} from 'react'

// 自定义HOOK
function useGetthing (name) {
  const [mz, setMz] = useState(name)
  useEffect(() => {
    setMz(name)
  })
  return mz
}

export default useGetthing