import React from 'react'

const Summary = (props) => {
    const {selectNoOfSeats , totalCost} = props
    return (
        <div>
        Total Tickets : {selectNoOfSeats}
        <br></br>
        Total Cost : {totalCost}
     </div>
    )
}

export default Summary