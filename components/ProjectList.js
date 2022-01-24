import ProjectListEntry from './ProjectListEntry'

const ProjectList = ({ projects }) => {

  return (
    <div className="mt-6 flex flex-col gap-6">
      {projects.map(proj => <ProjectListEntry key={proj.slug} project={proj} />)}
    </div>
  )
}

export default ProjectList;