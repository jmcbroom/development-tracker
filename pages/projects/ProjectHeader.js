import Image from 'next/image';
import remarkGfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown';

const ProjectHeader = ({ name, synopsis, status, link, buildType, uses, id, images }) => {

  return (
    <section>
      <p>This <strong>{uses && uses.join("/")}</strong> project is <strong>{status}</strong>.</p>
      {synopsis && <ReactMarkdown remarkPlugins={[remarkGfm]}>{synopsis}</ReactMarkdown>}
      {images && <Image 
        src={images[0].thumbnails.large.url} 
        width={images[0].thumbnails.large.width}
        height={images[0].thumbnails.large.height}
        alt={images[0].filename.replace(".png", "")} 
      />}
    </section>
  )

}

export default ProjectHeader;