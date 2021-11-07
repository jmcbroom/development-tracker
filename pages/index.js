import Link from 'next/link'
import utilStyles from '../styles/utils.module.css'
import gridStyles from '../styles/grids.module.css'

export default function Home() {
  return (
    <div className={gridStyles.projectGrid}>
      <section className={utilStyles.quicksection}>
        <h3>What&apos;s this site about?</h3>
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
      <p><Link href={`/projects`}>Here&apos;s a list </Link> of the projects we know about.</p>
      </section>
      <section className={utilStyles.quicksection}>
      <h2>Meetings</h2>
      <p><Link href={`/meetings`}>View a list</Link> of past or future meetings.</p>
      </section>
    </div>
  )
}
