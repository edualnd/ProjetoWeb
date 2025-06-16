import { ImageList, ImageListItem } from "@mui/material";

const PostsProfileCard = ({ list }) => {
  return (
    <>
      <ImageList cols={3} rowHeight={250}>
        {list.map((image, index) => (
          <ImageListItem
            key={index}
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              ":hover": {
                cursor: "pointer",
              },
            }}
          >
            <img
              src={image}
              alt="tez"
              style={{
                maxHeight: "250px",
                width: "100%",
                height: "auto",
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
};

export default PostsProfileCard;
