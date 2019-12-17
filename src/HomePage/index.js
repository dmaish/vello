import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Card, Icon, Avatar,Carousel, Col, Row } from 'antd';
import 'antd/dist/antd.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import firebaseObj from './../firebase';
import { fetchAllFoodAction } from '../redux/actions';
import foodSeedData from './../helpers';




export class HomePage extends Component {

state = {
  allFood: null,
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
        <Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={foodItemObject.price}
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
              vello foods
            </Header>
            <Content>
            <Carousel autoplay style={{
                textAlign: 'center',
                height: '25vw',
                background: '#364d79',
                overflow: 'hidden',
              }}>
                <div>
                  <h3>1</h3>
                </div>
                <div>
                  <h3>2</h3>
                </div>
                <div>
                  <h3>3</h3>
                </div>
                <div>
                  <h3>4</h3>
                </div>
            </Carousel>

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
)(HomePage)
