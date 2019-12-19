import React, { Component } from 'react';
import { Button, Row, Col, Modal, Form, Input } from 'antd';
import firebaseObj from './../firebase';
import { connect } from 'react-redux';

import { fetchAllFoodAction } from './../redux/actions';

export class AddFoodSection extends Component{

    state={
        displayAddForm: false,
        name: null,
        price: null,
        description: null,
        visible: false,
    }

    handleOk = async () => {
    const {fetchAllFoodAction} = this.props;
    const { name, price, photo, description } = this.state;

    await firebaseObj.database().ref(`/data/${name}`).set({
        price,
        photo,
        description,
    })

    setTimeout(() => {
        this.setState({
            visible: false,
            confirmLoading: false,
            });

    fetchAllFoodAction();
        }, 2000);

    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleInputChange = (e) => {
        e.preventDefault();
        e.persist();
        
                this.setState((state) => {
                    let inputId = e.target.id;
                    state[inputId] = e.target.value;
                    console.log('event', this.state.password);
                    return state;
                });
        }

    renderAddForm = () => {
        const FormItem = Form.Item;
        const { visible, confirmLoading } = this.state;
        return(
            <Modal
            title="add food"
            visible={visible}
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}>
                <Form onSubmit={this.handleSubmit} autocomplete="off" >
                    <FormItem
                    label="name"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}>
                        <Input id="name" name="name"  placeholder="name" autoComplete="off" onChange={(e) => this.handleInputChange(e)}/>
                    </FormItem>
        
                    <FormItem
                    label="photo"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}> 
                        <Input id="photo"   placeholder="photo"  onChange={(e) => this.handleInputChange(e)}/>
                    </FormItem>

                    <FormItem
                    label="price"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}> 
                        <Input id="price"   placeholder="price"  onChange={(e) => this.handleInputChange(e)}/>
                    </FormItem>

                    <FormItem
                    label="description"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}> 
                        <Input id="description"   placeholder="description"  onChange={(e) => this.handleInputChange(e)}/>
                    </FormItem>
                </Form>
            </Modal>);
    }

    render(){
        return(
            <div style={{width: '100vw', paddingTop: '10px', background: '#ECECEC'}}>
                {this.renderAddForm()}
                <Row>
                    <Col span={2} offset={22}>
                    <Button type="primary" icon="plus" onClick={this.showModal} >
                        add food
                    </Button>
                    </Col>
                </Row>
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
    )(AddFoodSection);
