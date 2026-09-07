import { useScrollDirection } from '../../hooks/useScrollDirection'
import './Header.css'

function Header() {
  const direction = useScrollDirection()

  return (
    <header className={`header ${direction === 'down' ? 'header--hidden' : ''}`} />
  )
}

export default Header
