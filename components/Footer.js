
import { sections } from './Header'
import Link from 'next/link';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="w-full md:w-1/2 pt-8 md:pt-0">
          <h1>Detroit Development Tracker</h1>
          <button>Contact us</button>
        </div>
        <div className="w-full md:w-1/2 footer-nav">
          {sections.map(s => (
            <Link href={s.href} key={s.href}>
              <span>{s.text}</span>
            </Link>
          ))}
        </div>
      </div>
      <p className='container text-xs leading-10'>Lorem ipsum legal line {new Date().getFullYear()}.</p>
    </footer>
  )
}

export default Footer;