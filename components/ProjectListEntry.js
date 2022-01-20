import Link from 'next/link';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'

let divStyle = {
  background: 'rgba(20,40,80,0.1)',
  padding: '0.5em 1em'
}

let useColors = {
  'No data': 'rgba(223, 255, 247, 1)',
  'Entertainment': 'rgba(246, 222, 255, 1)',
  'Hotel': 'rgba(245, 255, 181, 1)',
  'Office': 'rgba(223, 251, 255, 1)',
  'Park': 'rgba(212, 255, 192, 1)',
  'Residential': 'rgba(215, 226, 255, 1)',
  'Retail': 'rgba(255, 211, 186, 1)',
  'Transportation': 'rgba(255, 217, 240, 1)',
  'Warehouse': 'rgba(207, 251, 240, 1)',
}

const ProjectListEntry = ({ project }) => {
  dayjs.extend(relativeTime)

  let uses = project.uses ? project.uses.split(", ") : ['No data']

  return (
    <Link href={`/projects/${project.slug}`}>
      <section className="border-1 border-black bg-white max-w-xl p-5 hover:cursor-pointer">
        <h3 className="text-base leading-6 mb-2">
          <Link href={`/projects/${project.slug}`}>
            {project.name}
          </Link>
        </h3>
        {project.address !== "null" && <span className="font-normal text-sm">{` ${project.address ? project.address : `N/A`}`}</span>}
        {uses.length > 0 &&
          <div className="flex gap-3 mt-4">
            {uses.map(u => (
              <span key={u} className="text-xs leading-7 px-4 font-dmmono" style={{ backgroundColor: useColors[u] }}>{u}</span>
            ))}
          </div>
        }
        {/* <span className="">last updated {dayjs(project.lastModified).fromNow()}</span> */}
      </section>
    </Link>
  );
};

export default ProjectListEntry;