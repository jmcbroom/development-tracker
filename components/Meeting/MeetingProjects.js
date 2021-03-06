import Link from "next/link"

const MeetingProjects = ({ projects }) => {

  return (
    <section>
      <h3>Related to the following projects:</h3>
      <ul>

      {projects && projects.map(p => (
        <li key={p.slug}><Link href={`/projects/${p.slug}`}>{p.name}</Link></li>
      ))}
      </ul>
    </section>
  )
}

export default MeetingProjects;