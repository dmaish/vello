import React, { Component } from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import { fetchAllOrdersAction } from './../redux/actions';

export class FoodOrders extends Component {

    state={
        allOrders: null,
    }

    componentDidMount(){
        const {fetchAllOrdersAction} = this.props;
        fetchAllOrdersAction();
    }

    static getDerivedStateFromProps(props, state) {
        if (props.allOrders !== state.allOrders) {
            return {
                allOrders: props.allOrders,
            };
            }
            return null;
        }

    renderTable = () => {
        const allOrders = this.state.allOrders;
        let orders = Object.keys(allOrders).map((item) => {
            let orderItemObject = {...allOrders[item], item};
            return orderItemObject;
        });
        console.log('ORDERSSS', orders);
        const dataSource = orders;
            const columns = [
            {
                title: 'item',
                dataIndex: 'item',
            },
            {
                title: 'address',
                dataIndex: 'address',
            },
            {
                title: 'amount',
                dataIndex: 'amount',
            },
            {
                title: 'phoneNo',
                dataIndex: 'phoneNo',
            },
            {
                title: 'quantity',
                dataIndex: 'quantity',
            },
            ];
        
        return (<Table dataSource={dataSource} columns={columns} />);
    }
    

    render() {
        return(
            <div>
                {this.renderTable()}
            </div>
        );
    }
}

const mapDispatchToProps = {
    fetchAllOrdersAction,
    }
    
    const mapStateToProps = (state) => {
        return {
        allOrders: state.allOrders
        }
    };
    
    export default connect(
        mapStateToProps,
        mapDispatchToProps,
    )(FoodOrders);