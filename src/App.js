import React, { Component } from 'react';
import _ from 'lodash'
import uuid from 'uuid'
import './App.css'
import { seatLayout } from './layout';
import Summary from './components/summary';
import Message from './components/message';
import SelectBox from './components/selectBox';

class App extends Component {

  state = {

    prevFirstSelectedSeat:null,
    prevLastSelectedSeat:null,
    selectedRowId: null,
    totalCost: 0,
    royalType: 400,
    normalType: 200,
    selectNoOfSeats: 0,
    message: '',
    seatingLayout: seatLayout,
    selectedRowData:null,

  }

  getIndexDiffFromNextTrue(rows, seatNo) {
    console.log('1ndrrrrr', rows);

    const nextTrue = _.findIndex(rows, { 'isBooked': true }, (seatNo - 1))
    const diff = nextTrue - (seatNo - 1)
    return diff

  }

  selectSeats(rows, isBooked, seatNo, rowId) {

    const { selectedRowId,selectNoOfSeats, seatingLayout, royalType, normalType , prevFirstSelectedSeat , prevLastSelectedSeat,} = this.state
    let prevOldRowData = []
    prevOldRowData = JSON.parse(sessionStorage.getItem('oldRowData'))


    let rowType
    if (rowId < 2) {
      rowType = royalType
    } else {
      rowType = normalType
    }

    // alert('clicked')
    if (isBooked) {
      this.setState({
        message: 'Seat is already taken'
      })
    } else {

      const consequitiveAvailableSeats = this.getIndexDiffFromNextTrue(rows, seatNo)
      console.log('yessssss', consequitiveAvailableSeats);
      if (selectNoOfSeats > consequitiveAvailableSeats) {
        this.setState({
          message: 'You will not get consequitiveSeats'
        })
      } else {

        // const isNewSeatSelected = this.isNewSeatSelected(rowId,)

        console.log('bookwill success');
        const clikedSeatIndex = seatNo - 1
        console.log('firstTicket', clikedSeatIndex)
        console.log('lastticket', clikedSeatIndex + (selectNoOfSeats - 1));
        const lastSeat = clikedSeatIndex + (selectNoOfSeats - 1)
        const dupRow = rows.slice()
        let selectedSeats = _.filter(dupRow, (o) => {
          return o.isBooked === false && o.seatNo >= (clikedSeatIndex + 1) && o.seatNo <= (lastSeat + 1)
        });
        // console.log(dupRow);
        // console.log('aaaaaaaaa', selectedSeats);
        selectedSeats = selectedSeats.map(o => {
          o.isBooked = true
          return o;
        })
        console.log('dddddddddd', dupRow);


        console.log(prevOldRowData);

        var oldRow
        
        if(prevOldRowData !== null){
          oldRow = prevOldRowData.slice()
          let prevSelectedSeats = _.filter(oldRow, (o) => {
            return o.isBooked === true && o.seatNo >= (prevFirstSelectedSeat + 1) && o.seatNo <= (prevLastSelectedSeat + 1)
          });
          prevSelectedSeats = prevSelectedSeats.map(o => {
            o.isBooked = false
            return o;
          })
        }
        console.log(oldRow);
        
       
        debugger
        this.setState(() => ({
          [seatingLayout[rowId]]: dupRow,
          selectedRowData:dupRow,
          totalCost: rowType * selectNoOfSeats,
          message: '',
          selectedRowId: rowId,
          prevFirstSelectedSeat:clikedSeatIndex,
          prevLastSelectedSeat:lastSeat,
        }),() => ({
          [seatingLayout[selectedRowId]]: oldRow,
        }))
      }

    }

  }

  noOfSeats = (e) => {
    this.setState({
      selectNoOfSeats: e.target.value
    })
  }

  render() {

    const { seatingLayout, message, selectNoOfSeats, totalCost,selectedRowData } = this.state
    sessionStorage.setItem('oldRowData',JSON.stringify(selectedRowData))

    return (
      <div>
        <span>How many tickets</span>
        <SelectBox selectNoOfSeats={selectNoOfSeats} selectSeats={this.noOfSeats} />

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          justifyContent: 'space-around'
        }}>
          {seatingLayout.map((rows, index) => {
            // console.log('wwwwwwwwwwwww',rows);

            return (
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around'
              }}
                key={uuid()}
              >

                <div>{index + 1}</div>
                {rows.map((seat) => {

                  const seatColor = seat.isBooked ? '#b3b3b3' : 'white'

                  const rowId = uuid()
                  return (
                    <div
                      className="seatColor"
                      key={rowId}
                      id={rowId}
                      style={{
                        border: '2px solid black',
                        borderRadius: '35%',
                        backgroundColor: seatColor,
                        width: '20px'

                      }}

                      onClick={() => this.selectSeats(rows, seat.isBooked, seat.seatNo, index)}
                    ></div>
                  )
                })}
              </div>
            )
          })}

          <Message message={message} />

          <Summary selectNoOfSeats={selectNoOfSeats} totalCost={totalCost} />
        </div>

      </div>
    )
  }
}

export default App;
