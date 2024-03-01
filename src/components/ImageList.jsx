import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function ImageListComponent() {
  return (
    <Box sx={{ width: 430, height: 400 }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}`}
              alt={item.title}
              loading="lazy"
              style={{ height: item.title === "Books" ? "12rem" : "auto" }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3ltfGVufDB8fDB8fHww",
    title: "Bed",
  },
  {
    img: "https://images.unsplash.com/photo-1685633224973-47258dc0e47e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTY3fHx3ZWlnaHRsaWZ0aW5nfGVufDB8fDB8fHww",
    title: "Books",
  },
  {
    img: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZpdG5lc3N8ZW58MHx8MHx8fDA%3D",
    title: "Sink",
  },

  {
    img: "https://images.unsplash.com/photo-1588436706487-9d55d73a39e3",
    title: "Blinds",
  },
  {
    img: "https://images.unsplash.com/photo-1623874228601-f4193c7b1818?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHdlaWdodGxpZnRpbmd8ZW58MHx8MHx8fDA%3D",
    title: "Chairs",
  },
  {
    img: "https://images.unsplash.com/photo-1591027480007-a42f6ef886c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fGd5bXxlbnwwfHwwfHx8MA%3D%3D",
    title: "Laptop",
  },
  {
    img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Doors",
  },
  {
    img: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGd5bXxlbnwwfHwwfHx8MA%3D%3D",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1517963628607-235ccdd5476c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzR8fGZpdG5lc3N8ZW58MHx8MHx8fDA%3D",
    title: "Storage",
  },
  {
    img: "https://images.unsplash.com/photo-1526401485004-46910ecc8e51?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Candle",
  },
  {
    img: "https://images.unsplash.com/photo-1591940742878-13aba4b7a34e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODJ8fHdlaWdodGxpZnRpbmd8ZW58MHx8MHx8fDA%3D",
    title: "Coffee table",
  },
];
