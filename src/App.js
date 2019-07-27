import React, { Component } from 'react';
import _ from 'lodash'
import uuid from 'uuid'
class App extends Component {

  state = {


    totalCost:0,
    royalType:400,
    normalType:200,
    selectNoOfSeats: 0,
    message: '',
    seatingLayout: [
      [       //Single Row
        {
          rowId: 'A',
          seatNo: 1,
          isBooked: Boolean(Math.round(Math.random()))
        },
        {
          rowId: 'A',
          seatNo: 2,
          isBooked: Boolean(Math.round(Math.random()))
        },
        {
          rowId: 'A',
          seatNo: 3,
          isBooked: Boolean(Math.round(Math.random()))
        },
        {
          rowId: 'A',
          seatNo: 4,
          isBooked: Boolean(Math.round(Math.random()))
        },
        {
          rowId: 'A',
          seatNo: 5,
          isBooked: Boolean(Math.round(Math.random()))
        },
        {
          rowId: 'A',
          seatNo: 6,
          isBooked: Boolean(Math.round(Math.random()))
        },
        {
          rowId: 'A',
          seatNo: 7,
          isBooked: Boolean(Math.round(Math.random()))
        },
        {
          rowId: 'A',
          seatNo: 8,
          isBooked: Boolean(Math.round(Math.random()))
        },
        {
          rowId: 'A',
          seatNo: 9,
          isBooked: Boolean(Math.round(Math.random()))
        },
        {
          rowId: 'A',
          seatNo: 10,
          isBooked: Boolean(Math.round(Math.random()))
        }
      ],
      [       //Single Row
        {
          rowId: 'B',
          seatNo: 1,
          isBooked: Boolean(Math.round(Math.random()))
        },
        {
          rowId: 'B',
          seatNo: 2,
          isBooked: Boolean(Math.round(Math.random()))
        },
        {
          rowId: 'B',
          seatNo: 3,
          isBooked: Boolean(Math.round(Math.random()))
        },
        {
          rowId: 'B',
          seatNo: 4,
          isBooked: Boolean(Math.round(Math.random()))
        },
        {
          rowId: 'B',
          seatNo: 5,
          isBooked: Boolean(Math.round(Math.random()))
        },
        {
          rowId: 'B',
          seatNo: 6,
          isBooked: Boolean(Math.round(Math.random()))
        },
        {
          rowId: 'B',
          seatNo: 7,
          isBooked: Boolean(Math.round(Math.random()))
        },
        {
          rowId: 'B',
          seatNo: 8,
          isBooked: Boolean(Math.round(Math.random()))
        },
        {
          rowId: 'B',
          seatNo: 9,
          isBooked: Boolean(Math.round(Math.random()))
        },
        {
          rowId: 'B',
          seatNo: 10,
          isBooked: Boolean(Math.round(Math.random()))
        }
      ],
      [       //Single Row
        {
          rowId: 'C',
          seatNo: 1,
          isBooked: Boolean(Math.round(Math.random()))
        },
        {
          rowId: 'C',
          seatNo: 2,
          isBooked: Boolean(Math.round(Math.random()))
        },
        {
          rowId: 'C',
          seatNo: 3,
          isBooked: Boolean(Math.round(Math.random()))
        },
        {
          rowId: 'C',
          seatNo: 4,
          isBooked: Boolean(Math.round(Math.random()))
        },
        {
          rowId: 'C',
          seatNo: 5,
          isBooked: Boolean(Math.round(Math.random()))
        },
        {
          rowId: 'C',
          seatNo: 6,
          isBooked: Boolean(Math.round(Math.random()))
        },
        {
          rowId: 'C',
          seatNo: 7,
          isBooked: Boolean(Math.round(Math.random()))
        },
        {
          rowId: 'C',
          seatNo: 8,
          isBooked: Boolean(Math.round(Math.random()))
        },
        {
          rowId: 'C',
          seatNo: 9,
          isBooked: Boolean(Math.round(Math.random()))
        },
        {
          rowId: 'C',
          seatNo: 10,
          isBooked: Boolean(Math.round(Math.random()))
        }
      ],
    ]

  }

  getIndexDiffFromNextTrue(rows, seatNo) {
    console.log('1ndrrrrr', rows);

    const nextTrue = _.findIndex(rows, { 'isBooked': true }, (seatNo - 1))
    const diff = nextTrue - (seatNo - 1)
    return diff

  }

  selectSeats(rows, isBooked, seatNo, rowId) {
    const { selectNoOfSeats, seatingLayout ,royalType,normalType } = this.state
    let rowType
    if (rowId < 2) {
      rowType = royalType
    }else{
      rowType = normalType
    }

    console.log('rr', rowId);

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
        console.log('aaaaaaaaaaaaaaaaa', seatingLayout[rowId]);
        this.setState({
          [seatingLayout[rowId]]: dupRow,
          totalCost: rowType * selectNoOfSeats
        })

      }

    }

  }

  noOfSeats = (e) => {
    this.setState({
      selectNoOfSeats: e.target.value
    })
  }

  render() {

    const { seatingLayout, message ,selectNoOfSeats , totalCost} = this.state

    return (
      <div>
        <span>How many tickets</span>
        <select value={selectNoOfSeats} onChange={this.noOfSeats}>

          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>


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

          <span>{message}</span>

          <div>
             Total Tickets : {selectNoOfSeats}
             <br></br>
             Total Cost : {totalCost}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
