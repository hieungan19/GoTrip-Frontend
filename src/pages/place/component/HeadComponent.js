import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import NearMeIcon from "@mui/icons-material/NearMe";
import RatingBox from "./RatingBox";
import RoomIcon from "@mui/icons-material/Room";
import HashTagChip from "./Chip";
import { Typography, Box, Avatar, Container } from "@mui/material";
import { useState } from "react";
import { Colors } from "../../../styles/theme";
function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const HeadComponent = () => {
  const [showMoreImages, setShowMoreImages] = useState(false);

  const toggleShowMoreImages = () => {
    setShowMoreImages(!showMoreImages);
  };

  const toggleShowLessImages = () => {
    setShowMoreImages(false);
  };

  const showLess = showMoreImages ? (
    <Typography
      onClick={toggleShowLessImages}
      sx={{
        position: "absolute",
        bottom: 0,
        right: 0,
        margin: 2,
        cursor: "pointer",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
      }}
    >
      SHOW LESS
    </Typography>
  ) : null;

  return (
    <>
      <ImageList
        sx={{
          marginLeft: "auto",
          marginRight: "auto",
          width: "auto",
          overflow: "hidden",
          position: "relative",
        }}
        variant="quilted"
        cols={4}
        rowHeight={121}
      >
        {showMoreImages
          ? itemData.map((item) => (
              <ImageListItem
                key={item.img}
                cols={item.cols || 1}
                rows={item.rows || 1}
              >
                <img
                  {...srcset(item.img, 121, item.rows, item.cols)}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))
          : itemData.slice(0, 8).map((item) => (
              <ImageListItem
                key={item.img}
                cols={item.cols || 1}
                rows={item.rows || 1}
              >
                <img
                  {...srcset(item.img, 121, item.rows, item.cols)}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
        {!showMoreImages && (
          <Typography
            onClick={toggleShowMoreImages}
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              margin: 2,
              cursor: "pointer",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
            }}
          >
            SHOW MORE
          </Typography>
        )}
        {showLess}
      </ImageList>
      <Typography variant="h4" sx={{ display: "flex", alignItems: "center" }}>
        Hotel de la Coupole MGallery
        <Box
          sx={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Avatar
            sx={{
              backgroundColor: "primary.main",
              color: "common.white",
              width: 40,
              height: 40,
              borderRadius: "50%",
            }}
          >
            <NearMeIcon />
          </Avatar>
        </Box>
      </Typography>
      <Container sx={{ display: "flex", alignItems: "center" }}>
        <RatingBox />
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            textDecoration: "underline",
            display: "flex",
            alignItems: "center",
            color: "primary.main",
            marginLeft: 3,
          }}
        >
          <RoomIcon style={{ fontSize: "1.2rem", marginRight: 5 }} />
          Phú Quốc
        </Typography>
      </Container>
      <HashTagChip tag="Hotel" />
      <HashTagChip tag="Restaurant" />
    </>
  );
};

const itemData = [
  {
    img: "/place_images/place1.jpg",
    title: "img1",
    rows: 2,
    cols: 2,
  },
  {
    img: "/place_images/place2.jpg",
    title: "img2",
  },
  {
    img: "/place_images/place3.jpg",
    title: "img3",
  },
  {
    img: "/place_images/place4.jpg",
    title: "img4",
    cols: 2,
  },
  {
    img: "/place_images/place5.jpg",
    title: "img5",
    cols: 2,
  },
  {
    img: "/place_images/place6.jpg",
    title: "img6",
    rows: 2,
    cols: 2,
  },
  {
    img: "/place_images/place7.jpg",
    title: "img7",
  },
  {
    img: "/place_images/place8.jpg",
    title: "img8",
  },
  {
    img: "/place_images/place9.jpg",
    title: "img9",
    rows: 2,
    cols: 2,
  },
  {
    img: "/place_images/place10.jpg",
    title: "img10",
  },
  {
    img: "/place_images/place11.jpg",
    title: "img11",
  },
  {
    img: "/place_images/place12.jpg",
    title: "img12",
    cols: 2,
  },
];
export default HeadComponent;
