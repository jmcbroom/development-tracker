import Image from 'next/image';

const ProjectHeader = ({ name, synopsis, status, link, buildType, uses, id, images }) => {

  let divStyle = {
    background: `rgba(0,0,100,0.2)`,
    padding: `1em`
  }

  return (
    <div className="p-3 bg-gray-100">
      <p>This <strong>{uses && uses.join("/")}</strong> project is <strong>{status}</strong>.</p>
      <p>{synopsis}</p>
      {images && <Image 
        src={images[0].thumbnails.large.url} 
        width={images[0].thumbnails.large.width}
        height={images[0].thumbnails.large.height}
        alt={images[0].filename.replace(".png", "")} 
      />}
    </div>
  )

}

export default ProjectHeader;