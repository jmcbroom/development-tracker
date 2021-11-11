import dayjs from "dayjs";
import LocalizedFormat from 'dayjs/plugin/localizedFormat'

const MeetingHeader = ({ name, date, duration }) => {

  let divStyle = {
    background: `rgba(0,0,100,0.2)`,
    padding: `1em`
  }

  // calculate end time from date + duration
  dayjs.extend(LocalizedFormat)
  let formattedDate = dayjs(date).format('LLLL')
  let endDate = dayjs(date).add(duration, 'second').format('LT')

  return (
    <section>
      <h2>{name}</h2>
      <h3>{formattedDate}{duration ? `- ${endDate}` : ``}</h3>
    </div>
  )

}

export default MeetingHeader;