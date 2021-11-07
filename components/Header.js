import Link from 'next/link'
import utilStyles from '../styles/utils.module.css'
import styles from './layout.module.css'
import { siteTitle } from './layout'

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
    href: `/reporter`,
    text: `Report`
  },
  {
    href: `/meetings`,
    text: `Meetings`
  },
  {
    href: `/about`,
    text: `About`
  }
]


const Header = () => {
  return (
    <header className="md:flex sm:block items-center justify-between mx-2 md:mx-4 lg:mx-8 pb-2">
      <h2 className={utilStyles.headingLg}>
        <Link href="/">
          <a className={utilStyles.colorInherit}>{siteTitle}</a>
        </Link>
      </h2>
      <div className="flex items-center justify-evenly">
        {sections.map(s => (
          <span key={s.text} className="mx-2"><Link href={s.href} >{s.text}</Link></span>
        ))}
      </div>
  </header>
  )
}

export default Header;