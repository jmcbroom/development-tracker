const AttributeTable = ({ attributes }) => {

  if (attributes === null || attributes === undefined) {
    attributes = [
      {
        title: "Dimensions",
        value: "145 x 60"
      }
    ]
  }

  return (
    <table>
      <tbody>
        {attributes.length > 0 && attributes.map((at, i) => (
          <tr key={i}>
            <th>{at.title}</th>
            <td>{at.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default AttributeTable