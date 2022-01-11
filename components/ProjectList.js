import utilStyles from '../styles/utils.module.css'
import ProjectListEntry from './ProjectListEntry'

const ProjectList = ({ projects, title=`List of development projects` }) => {

  return (
    <section className={utilStyles.quicksection}>
      <h3 className="pb-3">{title}</h3>
      {projects.map(proj => <ProjectListEntry key={proj.slug} project={proj} />)}
    </section>
  )
}

export default ProjectList;