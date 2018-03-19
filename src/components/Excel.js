import React from 'react';



export default class Excel extends React.Component {
    render() {
        return (
            <div className="Excel">
                {
                    this._renderTable()
                }
            </div>
        )
    }


    _renderTable() {
        return (
            <table>
                <thead>
                    <tr>
                        {
                            this.props.headers.map(title =>
                                <th key={title}>{title}</th>
                            )
                        }
                    </tr>
                </thead>

                <tbody >
                    {
                        this.props.initialData.map((row, rowidx) => {
                            return (
                                <tr key={rowidx}>{
                                    Object.keys(row).map((cell, idx) => {
                                       
                                        return (
                                            <td
                                                className='ExcelDataLeft'
                                                key={idx}>
                                                {cell}
                                            </td>
                                        );
                                    }, this)}
                                </tr>
                            );
                        }, this)
                    }
                </tbody>
            </table>


        );
    }

}

