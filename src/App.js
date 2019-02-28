import React, { Component } from 'react';
import './App.css';
import HeaderCell, {DayCell} from "./components/HeaderCell/HeaderCell";
import Cell from "./components/Cell/Cell";
import {makeWeek} from "./helpers/weekHelper";
import {makeDays, makeEmptyTable, makeTable} from "./helpers/table";

class App extends Component {
  render() {
    const {weekStart, dayStart, dayEnd, delimiter} = this.props;
    const week = makeWeek(weekStart);
    const days = makeDays(dayStart, dayEnd);
    const emptyCells = makeEmptyTable(dayStart, dayEnd);
    const fullCells = makeTable(week, dayStart, emptyCells);


    return (
      <table>
        <tbody>
        <tr>
          <td/>
          {week.map((weekDay, index) => (
              <td key={index}>
                <HeaderCell date={weekDay} />
              </td>
          ))}
        </tr>
        {days.map((day, index) => (

            <tr key={index}>
              <td>
                <DayCell date={day}/>
              </td>
              {fullCells[index].map((cell, i) => (
                  <td key={i}>
                    <Cell events={cell.events} address={cell.address}/>
                  </td>
              ))}

            </tr>
        ))}
        </tbody>

      </table>
    );
  }
}

export default App;
