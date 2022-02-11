import Link from 'next/link';
import Tag from './Tag';

const ProjectListEntry = ({ project }) => {

  let uses = project.uses ? project.uses.split(", ") : ['No data']

  return (
    <Link href={`/projects/${project.slug}`}>
      <div className="border-1 border-black bg-white max-w-xl p-5 hover:cursor-pointer">
        <h3 className="text-base leading-6 mb-2">
          <Link href={`/projects/${project.slug}`}>
            {project.name}
          </Link>
        </h3>
        {project.address !== "null" && <span className="font-normal text-sm">{` ${project.address ? project.address : `N/A`}`}</span>}
        {uses.length > 0 &&
          <div className="flex gap-3 mt-4 flex-wrap ">
            {uses.map(u => (
              <Tag key={u} type="use" value={u} />
            ))}
          </div>
        }
      </div>
    </Link>
  );
};

export default ProjectListEntry;