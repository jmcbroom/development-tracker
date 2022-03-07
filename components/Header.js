import Link from 'next/link'
import { siteTitle } from '../toolkit.config'
import { useRouter } from 'next/router'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';

export const sections = [
  {
    href: `/map`,
    text: `Map`
  },
  {
    href: `/projects`,
    text: `Projects`
  },
  {
    href: `/submit-a-tip`,
    text: `Submit a tip`
  },
  {
    href: `/about`,
    text: `About`
  }
]


const Header = ({ nav, showNav }) => {

  const router = useRouter();

  return (
    <header>
      <div className="container">
      <h1 className="md:w-1/3">
        <Link href="/">
          {siteTitle}
        </Link>
      </h1>

      <nav>
        <ul>
          {sections.map(s => (
            <Link href={s.href} key={s.text}>
              <li className={s.href === router.pathname ? 'nav-here hover:bg-white' : ''}>
                {s.text}
              </li>
            </Link>
          ))}
        </ul>
        <div onClick={() => showNav(true)}>
          <FontAwesomeIcon icon={faBars} className="block md:hidden h-6 text-turq" />
        </div>
      </nav>
      </div>
    </header>
  )
}

export default Header;