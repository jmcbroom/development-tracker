import Link from "next/link"

const MeetingProjects = ({ projects }) => {


  let divStyle = {
    background: `rgba(0,150,100,0.2)`,
    padding: `1em`
  }

  console.log(projects)
  return (
    <section style={divStyle}>
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