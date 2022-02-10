import PageSection from '../../components/PageSection';
import Tag from '../Tag';

const ProjectHeader = ({ name, address, status, buildType, uses }) => {
  return (
    <div className="col-span-1 md:col-span-2">
      <div className="md:flex md:items-top md:justify-between">
        <div>
        <h1>
          {name}
        </h1>
        <p>
          {address}
        </p>
        </div>
        <div>
          <div className="flex flex-row items-center my-4">
            <span className="w-20">
              Build:
            </span>
            <Tag type='type' value={buildType} />
          </div>
          <div className="flex flex-row items-center my-4">
            <span className='w-20'>
              Status:
            </span>
            <Tag type='status' value={status} />
          </div>
        </div>
      </div>
      {uses && <p className="font-dmmono text-xs">
        {uses.join(", ")}
      </p>}
    </div>
    // <PageSection title={name} className='col-span-1 md:col-span-2'>
    //   <p>See details about the development at <strong>{address}</strong></p>
    //     {/* <p>This <strong>{uses && uses.join("/")}</strong> project is <strong>{status}</strong>.</p> */}
    //     {/* {synopsis && <ReactMarkdown remarkPlugins={[remarkGfm]}>{synopsis}</ReactMarkdown>}
    //     {images && <Image 
    //       src={images[0].thumbnails.large.url} 
    //       width={images[0].thumbnails.large.width}
    //       height={images[0].thumbnails.large.height}
    //       alt={images[0].filename.replace(".png", "")} 
    //       />} */}
    // </PageSection>
  )
}

export default ProjectHeader;