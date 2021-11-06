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
    <table className={styles.table}>
      {/* <thead>
        <tr>
          <th></th>
          <th></th>
        </tr>
      </thead> */}
      <tbody>
        {attributes.length > 0 && attributes.map((at, i) => (
          <tr key={i}>
            <th className={i+1 < attributes.length ? styles.th : styles.thLast}>{at.title}</th>
            <td className={i+1 < attributes.length ? styles.td : styles.tdLast}>{at.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default AttributeTable