import Link from 'next/link'
import utilStyles from '../styles/utils.module.css'

export default function Home() {

  return (
    <div style={{display: `grid`, gridTemplateColumns: `repeat(auto-fit, minmax(350px, 1fr))`, gap: `1.5em` }}>
      <section className={utilStyles.quicksection}>
        <h3>What&apos;s this project about?</h3>
        <p>
          The tracker will let Detroiters look up details about developments, 
          combining information collected from public agencies and in public meetings 
          with reporting and crowdsourced updates from the tracker’s users. 
          The Detroit Development Tracker will take this information out of the domain 
          of developers and city bureaucracy, making it more accessible — and actionable — 
          for people who will be most impacted by it.
          </p>
      </section>
      <section className={utilStyles.quicksection}>
      <h2>Projects</h2>
      <p><Link href={`/projects`}>View a list</Link> of projects</p>
      <h2>Meetings</h2>
      <p><Link href={`/meetings`}>View a list</Link> of meetings</p>
      </section>
    </div>
  )
}
