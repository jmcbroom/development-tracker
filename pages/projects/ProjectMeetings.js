import Link from 'next/link'

const ProjectMeetings = ({ meetings }) => {
  return (
    <div>
      <ul>
      {meetings && meetings.map(m => (
        <li key={m.slug}>
          <Link href={`/meetings/${m.slug}`}>
            {m.name}
          </Link>
        </li>
        ))}
      </ul>
    </div>
  )
}

export default ProjectMeetings;