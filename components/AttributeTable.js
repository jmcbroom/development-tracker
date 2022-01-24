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
    <table className="mb-4">
      <tbody>
        {attributes.length > 0 && attributes.map((at, i) => (
          <tr key={i} className={i + 1 < attributes.length && "border-b-1 border-uploadblue"}>
            <th className="text-left font-normal w-2/5 py-2 leading-6">{at.title}:</th>
            <td>{at.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default AttributeTable