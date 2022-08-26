import React from 'react'
import { useSession } from 'next-auth/react'
const Navbar = () => {
  const { data: session, status } = useSession()

  return <div>Navbar</div>
}

export default Navbar
