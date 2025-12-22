import { useEffect, useState } from "react"

function getToken() {
  if (typeof window === "undefined") return null
  return window.localStorage.getItem("accessToken")
}

export function useAuthStatus() {
  const [isAuthed, setIsAuthed] = useState(!!getToken())

  useEffect(() => {
    setIsAuthed(!!getToken())
  }, [])

  const logout = () => {
    if (typeof window === "undefined") return
    window.localStorage.removeItem("accessToken")
    setIsAuthed(false)
  }

  return { isAuthed, logout }
}
