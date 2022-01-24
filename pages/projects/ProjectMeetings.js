import Link from 'next/link'
import PageSection from '../../components/PageSection';

const ProjectMeetings = ({ meetings }) => {
  return (
    <PageSection title="Meetings related to this project">
      <ul className="pt-2">
      {meetings && meetings.map(m => (
        <li key={m.slug} className='list-none'>
          <Link href={`/meetings/${m.slug}`}>
            {m.name}
          </Link>
        </li>
        ))}
      </ul>
    </PageSection>
  )
}

export default ProjectMeetings;