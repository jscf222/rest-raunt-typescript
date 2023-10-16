import React, { createContext, ReactNode, useState, useEffect } from 'react'
type UserData = {
  userId: string
  firstName: string
  lastName: string
  role: string
}

export type CurrentUserContextType = {
  
  currentUser: UserData
  setCurrentUser: React.Dispatch<React.SetStateAction<UserData>>
};

export const CurrentUser = createContext<CurrentUserContextType>({
   currentUser:{ userId: '',
   firstName: '',
   lastName: '', 
   role: '',},setCurrentUser:()=>{}
  })

type CurrentUserProviderProps = {
  children: ReactNode
}

function CurrentUserProvider({ children }: CurrentUserProviderProps) {
  const [currentUser, setCurrentUser] = useState<UserData>({
    userId: '',
    firstName: '',
    lastName: '', 
    role: '',
  })

  useEffect(() => {
    const getLoggedInUser = async () => {
      let response = await fetch('http://localhost:5000/authentication/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      let user: UserData = await response.json()
      setCurrentUser(user)
    };
    getLoggedInUser()
  }, [])

  return (
    <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUser.Provider>
  )
}

export default CurrentUserProvider