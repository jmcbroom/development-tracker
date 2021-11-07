import styles from './AttributeTable.module.css'

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
    <table className={styles.table} className="my-4">
      <tbody>
        {attributes.length > 0 && attributes.map((at, i) => (
          <tr key={i} className={styles.tr}>
            <th className={styles.th}>{at.title}</th>
            <td className={styles.td}>{at.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default AttributeTable