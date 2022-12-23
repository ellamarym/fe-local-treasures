import { Image, View } from "react-native";
const noUserImg = require("../assets/user.png");
import { styles } from "../styles/imageViewer";

export default function ImageViewer({ selectedImage }) {
  const imageSource =
    selectedImage !== null ? { uri: selectedImage } : noUserImg;
  return (
    <View style={styles.ImageContainer}>
      <Image source={imageSource} style={styles.tinyLogo} />
    </View>
  );
}
