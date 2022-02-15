import ProjectListEntry from './ProjectListEntry'
import Link from 'next/link'

const ProjectList = ({ projects, search=null, title=null }) => {

  if(search !== null && search !== '' && search.length > 2) {

    search = search.toLowerCase()

    projects = projects.filter(project => {
      return (project.name.toLowerCase().indexOf(search) > -1 ||
      project.address.toLowerCase().indexOf(search) > -1 ||
      project.status.toLowerCase().indexOf(search) > -1 ||
      project.synopsis.toLowerCase().indexOf(search) > -1 ||
      project.uses.toLowerCase().indexOf(search) > -1)
    })
  }

  return (
    <div className="mt-4 flex flex-col gap-6 mx-auto max-w-xl pt-4">
      {title && <h2 className="text-lg">{title}</h2>}
      {projects.map(proj => <ProjectListEntry key={proj.slug} project={proj} />)}
      {projects.length === 0 && 
        <div>
        <span className="font-semibold text-lg block">No results found. Try searching for something else.</span>
        <span className="text-normal block mt-2">
          Having trouble finding something? <Link href={`/submit-a-tip`}>Let us know</Link> to improve the tracker.
        </span>
        </div>
      }
    </div>
  )
}

export default ProjectList;