import PageSection from '../../components/PageSection';

const ProjectHeader = ({ name, address }) => {
  return (
    <PageSection title={name} className='col-span-1 md:col-span-2'>
      <p>See details about the development at <strong>{address}</strong></p>
        {/* <p>This <strong>{uses && uses.join("/")}</strong> project is <strong>{status}</strong>.</p> */}
        {/* {synopsis && <ReactMarkdown remarkPlugins={[remarkGfm]}>{synopsis}</ReactMarkdown>}
        {images && <Image 
          src={images[0].thumbnails.large.url} 
          width={images[0].thumbnails.large.width}
          height={images[0].thumbnails.large.height}
          alt={images[0].filename.replace(".png", "")} 
          />} */}
    </PageSection>
  )
}

export default ProjectHeader;