import React from 'react'

const Table = (props) => {


    return (
        <>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Order Id</th>
                        <th>Customer Id
                        {/* <i onClick={this.handleInc} className="fas fa-sort-up fa-2x"></i>
                            <i onClick={this.handleDesc} className="fas fa-sort-down fa-2x"></i> */}
                        </th>
                        <th>Pin Code</th>
                        <th>Order Date</th>
                        <th>Items</th>
                    </tr>
                </thead>
                <tbody>
                    {props.jsonData.map((r) => {
                        const items = r.items.split(';')
                        items.pop()
                        return (
                            <tr key={r.orderId}>
                                <td>{r.orderId}</td>
                                <td>{r.customerId}</td>
                                <td>{r.deliveryPincode}</td>
                                <td>{r.orderDate}</td>
                                <td>{items.map((i, ind) => { return <li style={{ listStyle: 'none' }} key={ind}>{i.replace(':', '-')}</li> })}</td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </>
    )
}

export default Table
