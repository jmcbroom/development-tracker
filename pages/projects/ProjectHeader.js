const ProjectHeader = ({ name, synopsis, status, link, buildType, uses }) => {

  let divStyle = {
    background: `rgba(0,0,100,0.2)`,
    padding: `1em`
  }

  return (
    <div style={divStyle}>
      <h1>{name}</h1>
      <p>This <strong>{uses.join("/")}</strong> project is <strong>{status}</strong>.</p>
      <p>{synopsis}</p>
    </div>
  )

}

export default ProjectHeader;