import React from "react";
import CarouselPic from "../../components/Carousel";
import "./home.css";
import NewSong from "../../components/newsong";
import SongSheet from "../../components/songsheet";
import RecommedMv from "../../components/recommendmv";
function Home() {
  return (
    <div className="home">
      <div className="carousel">
        <CarouselPic></CarouselPic>
      </div>
      <SongSheet></SongSheet>
      <div className="newsong">
        <NewSong></NewSong>
      </div>
      <RecommedMv></RecommedMv>
    </div>
  );
}
export default Home;
