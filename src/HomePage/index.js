import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Card, Icon, Modal, PageHeader, Carousel, Col, Row,  Form, Input} from 'antd';
import 'antd/dist/antd.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import firebaseObj from './../firebase';
import { fetchAllFoodAction } from '../redux/actions';
import foodSeedData from './../helpers';
import logo from './../assets/applogo.png';
import './homepage.css';




export class HomePage extends Component {

state = {
  allFood: null,
  visible: false,
  confirmLoading: false,
  username: null,
  password: null,
  loginMesCol: '#ffffff',
  unLoginMesCol: '#ffffff',
}

seedData = async() => {
  for(let foodItem in foodSeedData){
    let foodObj = foodSeedData[foodItem];
    let price = foodObj.price;
    let onOffer = foodObj.onOffer;
    let photo = foodObj.photo;
    let description = foodObj.description;

    await firebaseObj.database().ref(`/data/${foodItem}`).set({
      price,
      onOffer,
      photo,
      description,
    })

  }
}

componentDidMount(){
  this.seedData();
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

  console.log('form attributes', this.state.username);
  if (username === 'admin254' && password === 'password254'){
      this.setState({
        loginMesCol: '#00CC00',
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
              <Input id="username" name="username" type='text' placeholder="username" autoComplete="off" onChange={(e) => this.handleInputChange(e)}/>
            </FormItem>

            <FormItem
              label="password"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
            >
              <Input id="password" type="password" placeholder="Password" autoComplete="off" onChange={(e) => this.handleInputChange(e)}/>
            </FormItem>
          </Form>

          <div style={{color: this.state.unLoginMesCol}}>wrong password / username.</div>
          <div style={{color: this.state.loginMesCol}}>successful login, welcome.</div>
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
          actions={[
            <Icon type="setting" key="setting" />,
            <Icon type="edit" key="edit" />,
            <Icon type="ellipsis" key="ellipsis" />,
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
            <Carousel autoplay style={{
                textAlign: 'center',
                height: '25vw',
                background: '#364d79',
                overflow: 'hidden',
              }}>
                <div>
                    <div className="carousel-item-1"
                    style={{
                    height:'50vh',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    }}>
                    </div>
                </div>
                <div>
                <div className="carousel-item-2"
                    style={{
                    height:'55vh',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    }}>
                      should display image
                    </div>
                </div>
                <div>
                <div 
                    className="carousel-item-3"
                    style={{
                    height:'50vh',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    }}>
                      should display image
                    </div>
                </div>
            </Carousel>

            <div style={{ background: '#ECECEC', padding: '30px' }}>
              <Row gutter={16}>
                  {this.renderCardItems()}
              </Row>
            </div>

              {this.renderSignInModal()}

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
)(HomePage)
