import React, { Component } from "react";
import { Carousel } from "antd";
import getCarouselResource from "../../axios/getCarouselResource";
import './carousel.css'
class CarouselPic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      List: [],
    };
  }
  componentDidMount() {
    getCarouselResource().then((res) => {
      this.setState({
        List: res.data.banners,
      });
    });
  }
  render() {
    return (
      <div>
          <Carousel effect="fade" autoplay className="item">
        {this.state.List.map((item, index) => {
          return (
            <div key={item + index}>
              <img src={item.imageUrl} alt="" className="item" />
            </div>
          );
        })}
      </Carousel>
      </div>
    );
  }
}
export default CarouselPic;
