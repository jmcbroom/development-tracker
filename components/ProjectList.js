import ProjectListEntry from './ProjectListEntry'

const ProjectList = ({ projects }) => {

  return (
    <div className="mt-6 flex flex-col gap-6 mx-auto max-w-xl pt-16">
      {projects.map(proj => <ProjectListEntry key={proj.slug} project={proj} />)}
    </div>
  )
}

export default ProjectList;