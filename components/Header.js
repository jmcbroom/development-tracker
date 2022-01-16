import Link from 'next/link'
import { siteTitle } from './layout'
import { useRouter } from 'next/router'

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
    href: `/meetings`,
    text: `Meetings`
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


const Header = () => {

  const router = useRouter();

  return (
    <header>
      <div className="container">
      <h1>
        <Link href="/">
          {siteTitle}
        </Link>
      </h1>

      <nav>
        <ul>
          {sections.map(s => (
            <Link href={s.href} key={s.text}>
              <li className={s.href === router.pathname ? 'nav-here' : ''}>
                {s.text}
              </li>
            </Link>
          ))}
        </ul>
      </nav>
      </div>
    </header>
  )
}

export default Header;