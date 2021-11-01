import Link from 'next/link'
import utilStyles from '../../styles/utils.module.css'

const ProjectMeetings = ({ meetings }) => {
  return (
    <section className={utilStyles.quicksection}>
      <h3>Meetings relating to this project</h3>
      <ul>
      {meetings && meetings.map(m => (
        <li key={m.slug}>
          <Link href={`/meetings/${m.slug}`}>
            {m.name}
          </Link>
        </li>
        ))}
      </ul>
    </section>
  )
}

export default ProjectMeetings;