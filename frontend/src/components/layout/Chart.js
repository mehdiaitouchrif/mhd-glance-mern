import React from 'react'
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


const Chart = ({ orders, customers }) => {
    return (
        <div className='chart'>
            <Line
                data={
                    {
                        labels: ['Orders', 'Customers', 'Delivered', 'Non Delivered'],
                        datasets: [
                            {
                                label: 'Count',
                                data: [
                                    orders && orders.length,
                                    customers && customers.length - 1,
                                    orders && orders.filter(order => order.status !== 'pending').length,
                                    orders && orders.filter(order => order.status !== 'delivered').length
                                ],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.6)',
                                    'rgba(255, 206, 86, 0.6)',
                                    'rgba(75, 192, 192, 0.6)',
                                    'rgba(255, 159, 64, 0.6)'
                                ],
                                fill: false
                            },

                        ]
                    }
                }
                options={{
                    title: {
                        display: true,
                        text: 'SALES AND CUSTOMERS STATISTICS',
                        fontSize: 25,
                    },
                    legend: {
                        display: false,
                        position: 'top'
                    },
                }}
            />
        </div>
    )
}

const mapStateToProps = state => ({
    orders: state.orders.orders,
    customers: state.customers.customers
})

Chart.propTypes = {
    orders: PropTypes.array,
    customers: PropTypes.array,
}

export default connect(mapStateToProps)(Chart)
