import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Card, Icon, Modal, PageHeader, Col, Row,  Form, Input} from 'antd';
import 'antd/dist/antd.css';
import "firebase/auth";
import "firebase/database";

import firebaseObj from './../firebase';
import AddFoodSection from './../components/addFoodSection';
import { fetchAllFoodAction } from '../redux/actions';
import './homepage.css';
import Carousel from './../components/carousel';
import FoodOrders from './../components/orders';

export class HomePage extends Component {

state = {
  allFood: null,
  visible: false,
  confirmLoading: false,
  username: null,
  password: null,
  loginMesCol: '#ffffff',
  unLoginMesCol: '#ffffff',
  userView: true,
  showOrderForm: false,
}

componentDidMount(){
  // this.seedData();
  const {fetchAllFoodAction} = this.props;
  fetchAllFoodAction();
}

static getDerivedStateFromProps(props, state) {
  if (props.allFood !== state.allFood) {
    return {
      allFood: props.allFood,
    };
  }
  return null;
}

// modal functionalities.

showSignInModal = () => {
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

handleOk = () => {
  const {username, password} = this.state;

  if (username === 'admin254' && password === 'password254'){
      this.setState({
        loginMesCol: '#00CC00',
        userView: false,
      });
  } else {
    this.setState({
      unLoginMesCol: 'red',
    })
  }

  setTimeout(() => {
    this.setState({
      visible: false,
      confirmLoading: false,
      unLoginMesCol: '#ffffff',
      loginMesCol: '#ffffff'
    });
  }, 2000);
};


renderSignInModal = () => {
  const FormItem = Form.Item;
  const { visible, confirmLoading } = this.state;

  return(

      <Modal
        title="admin login"
        visible={visible}
        onOk={this.handleOk}
        confirmLoading={confirmLoading}
        onCancel={this.handleCancel}>
          <Form onSubmit={this.handleSubmit} autocomplete="off" >
              <FormItem
              label="username"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
            >
              <Input id="username" name="username"  placeholder="username" autoComplete="off" onChange={(e) => this.handleInputChange(e)}/>
            </FormItem>

            <FormItem
              label="password"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
            >
              <Input id="password"   placeholder="Password"  onChange={(e) => this.handleInputChange(e)}/>
            </FormItem>
          </Form>

          <div style={{color: this.state.unLoginMesCol}}>wrong password / username.</div>
          <div style={{color: this.state.loginMesCol}}>successful login, welcome.</div>
      </Modal>

  );
}

orderFormDetails = (item, price) => {
  this.setState({
    showOrderForm: true,
    foodItemName: item,
    foodItemPrice: price,
  });

}

handleOrderInputChange = (e) => {
  e.preventDefault();
  e.persist();

  let inputId = e.target.id;
  let value = e.target.value;

  if (inputId === 'quantity'){
      let number = Number(value);
      const price = this.state.foodItemPrice;
      let amount = price * number;

      this.setState({
          amount
      })
  }
          this.setState((state) => {
              state[inputId] = value;
              return state;
          });
  }

handleOrderOk = async() => {
  const {foodItemName, quantity, amount, address, phoneNo} = this.state;

  await firebaseObj.database().ref(`/orders/${foodItemName}`).set({
      quantity,
      amount,
      address,
      phoneNo,
  });

  this.setState({
      visible: false,
  })
}

showOrderForm = () => {
  const FormItem = Form.Item;

  return(
    <Modal
    title="food order details"
    visible={this.state.showOrderForm}
    onOk={this.handleOrderOk}
    // confirmLoading={confirmLoading}
    onCancel={this.handleCancel}>
        <Form onSubmit={this.handleSubmit} autocomplete="off" >
            <FormItem
            label="name"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            >
            <Input id="username" name="username"  value={this.state.foodItemName}/>
            </FormItem>
    
            <FormItem
            label="quantity"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            >
            <Input id="quantity"   placeholder="quantity"  type="number" onChange={(e) => this.handleOrderInputChange(e)}/>
            </FormItem>

            <FormItem
            label="amount"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            >
            <Input id="amount"   placeholder="amount" value={this.state.amount}/>
            </FormItem>

            <FormItem
            label="address"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            >
            <Input id="address"   placeholder="address"  onChange={(e) => this.handleOrderInputChange(e)}/>
            </FormItem>

            <FormItem
            label="phoneNo."
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            >
            <Input id="phoneNo"   placeholder="phoneNo."  onChange={(e) => this.handleOrderInputChange(e)}/>
            </FormItem>
        </Form>
</Modal>
  );
}


renderCardItems = () => {
  const { Meta } = Card;
  const allFood = this.state.allFood;
  const gridStyle = {
    width: '25%',
    textAlign: 'center',
    };

  return Object.keys(allFood).map((item) => {
    let foodItemObject = allFood[item];
    return (<Col span={6}>
      <div style={{marginTop: '20px'}}>
      <Card
          hoverable={true}
          style={{ gridStyle }}
          cover={
              <div 
              style={{
                height: '30vh',
                width: '100%', 
                background: 'blue',
                backgroundImage: `url(${foodItemObject.photo})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                }}>

              </div>

            }
          actions={ this.state.userView ? 
            [<span onClick={() => this.orderFormDetails(item, foodItemObject.price)}><Icon type="smile" key="smile" /> order</span>] : [
            <span><Icon type="edit" key="edit" /></span>,
            <span><Icon type="delete" key="delete" /></span>,
          ]}
        >
        <Meta style={{borderBottom: 'solid 0.2px #F5F5F5', marginBottom: '15px'}} title={item}/>
        <Meta
          title={`${foodItemObject.price} ksh.`}
          description={foodItemObject.description}
        />
      </Card>
      </div>
    </Col>);
  });
}

  render(){

    const { Header, Footer, Content } = Layout;

      return (
        <div>
          <Layout style={{width: "100vw"}}>
            <Header style={{ background: '#fff', padding: 0 }}>
            <PageHeader
                title="Vello Foods"
                extra={[
                  <span style={{cursor: 'pointer'}} key="3">orders</span>,
                  <span style={{cursor: 'pointer'}} key="2" onClick={this.showSignInModal}>admin</span>
                ]}
              ></PageHeader>
            </Header>
            <Content>

              {this.state.userView ? 
              <div>
                <Carousel/>
                {this.renderSignInModal()}
              </div> 
              :
              <>
              <FoodOrders/>
              <AddFoodSection/>
              </>
              }
              {this.showOrderForm()}
            <div style={{ background: '#ECECEC', padding: '30px' }}>
              <Row gutter={16}>
                  {this.renderCardItems()}
              </Row>
            </div>
            </Content>
            <Footer></Footer>
          </Layout>
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
)(HomePage);
