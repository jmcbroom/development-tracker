import Link from 'next/link';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'

let divStyle = {
  background: 'rgba(20,40,80,0.1)',
  padding: '0.5em 1em'
}

const ProjectListEntry = ({ project }) => {
  dayjs.extend(relativeTime)
  return (
    <section>
      <h3>
        <Link href={`/projects/${project.slug}`}>
          {project.name}
        </Link>
      </h3>
      <span className="">last updated {dayjs(project.lastModified).fromNow()}</span>
    </section>
  );
};

export default ProjectListEntry;