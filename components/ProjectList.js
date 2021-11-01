import utilStyles from '../styles/utils.module.css'
import ProjectListEntry from './ProjectListEntry'

const ProjectList = ({ projects }) => {

  return (
    <section className={utilStyles.quicksection}>
      <h3 style={{paddingBottom: `.25em`}}>Project list</h3>
      {projects.map(proj => <ProjectListEntry key={proj.slug} project={proj} />)}
    </section>
  )
}

export default ProjectList;