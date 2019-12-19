import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Card, Icon, Modal, PageHeader, Col, Row,  Form, Input} from 'antd';
import 'antd/dist/antd.css';
import "firebase/auth";
import "firebase/database";

import AddFoodSection from './../components/addFoodSection';
// import firebaseObj from './../firebase';
import { fetchAllFoodAction } from '../redux/actions';
// import foodSeedData from './../helpers';
// import logo from './../assets/applogo.png';
import './homepage.css';
import Carousel from './../components/carousel';

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
          actions={ this.state.userView ? [<span>order</span>] : [
            <span><Icon type="edit" key="edit" /></span>,
            <span><Icon type="ellipsis" key="ellipsis" /></span>,
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
              <AddFoodSection/>
              </>
              }


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
