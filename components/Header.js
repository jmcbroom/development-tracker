import Link from 'next/link'
import utilStyles from '../styles/utils.module.css'
import styles from './layout.module.css'
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
  console.log(router.pathname)

  return (
    <header className="md:flex sm:block items-center justify-between mx-4 md:mx-4 lg:mx-8 p-2">
      <h2 className={utilStyles.headingLg}>
        <Link href="/">
          <a className={utilStyles.colorInherit}>{siteTitle}</a>
        </Link>
      </h2>
      <div className="flex items-center justify-evenly">
        {sections.map(s => (
          <Link href={s.href} key={s.text}  >
            <span
              className={
                s.href === router.pathname ?
                "border border-black rounded-full px-4 text-sm py-2 ml-3" :
                "bg-blue-200 rounded-full text-sm px-4 py-2 ml-3"
              }
            >
              {s.text}
            </span>
          </Link>
        ))}
      </div>
    </header>
  )
}

export default Header;