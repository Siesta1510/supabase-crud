// import {moment} from 'moment'

export function formatDateTime(date) {
    // var dateFormat = Time
    const value = moment(date).format('MMMM Do yy, h:mm:ss a');
    console.log(value)
    return value;
}
