import Link from 'next/link'

let sections = [
  {
    href: `/map`,
    text: `View the map`
  },
  {
    href: `/projects`,
    text: `View a list of projects`
  },
  {
    href: `/reporter`,
    text: `Report a project`
  },
  {
    href: `/meetings`,
    text: `View upcoming meetings`
  }
]

export default function Home() {


  return (
    <>
      <h1>Projects</h1>
      <p><Link href={`/map`}>View a map</Link> of projects</p>
      <p><Link href={`/projects`}>View a list</Link> of projects</p>
      <h1>Meetings</h1>
      <p><Link href={`/meetings`}>View a list</Link> of meetings</p>
    </>
  )
}
