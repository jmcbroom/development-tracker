import ProjectListEntry from './ProjectListEntry'

const ProjectList = ({ projects, title=null }) => {

  return (
    <div className="mt-6 flex flex-col gap-6 mx-auto max-w-xl pt-16">
      {title && <h2 className="text-lg">{title}</h2>}
      {projects.map(proj => <ProjectListEntry key={proj.slug} project={proj} />)}
    </div>
  )
}

export default ProjectList;