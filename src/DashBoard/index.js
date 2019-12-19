import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchAllFoodAction } from '../redux/actions';
import 'antd/dist/antd.css';

    export class DashBoard extends Component {
        state={
        }

        render() {

            return(
                <div>
                    dashboard mister!
                </div>
            );
        }

    }

    const mapDispatchToProps = {
        fetchAllFoodAction,
    }

    const mapStateToProps = (state) => {
        return {
        allFood: state.allFood
        }
    };

    export default connect(
    mapStateToProps,
    mapDispatchToProps,
    )(DashBoard);