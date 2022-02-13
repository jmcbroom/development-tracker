import ProjectListEntry from './ProjectListEntry'
import Link from 'next/link'

const ProjectList = ({ projects, search=null, title=null }) => {

  console.log(projects)

  if(search !== null && search !== '' && search.length > 2) {
    projects = projects.filter(project => {
      return (project.name.indexOf(search) > -1 ||
      project.address.indexOf(search) > -1 ||
      project.status.indexOf(search) > -1 ||
      project.synopsis.indexOf(search) > -1 ||
      project.uses.indexOf(search) > -1)
    })
  }

  return (
    <div className="mt-4 flex flex-col gap-6 mx-auto max-w-xl pt-4">
      {title && <h2 className="text-lg">{title}</h2>}
      {projects.map(proj => <ProjectListEntry key={proj.slug} project={proj} />)}
      {projects.length === 0 && 
        <div>
        <span className="font-semibold text-lg block">No results found. Try searching for something else.</span>
        <span className="text-lg block">
          See something missing? Report it <Link href={`/submit-a-tip`}>here</Link>.
        </span>
        </div>
      }
    </div>
  )
}

export default ProjectList;