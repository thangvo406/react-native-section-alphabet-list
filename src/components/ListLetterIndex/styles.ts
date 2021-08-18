import { StyleSheet } from "react-native";

const sizes = {
  containerWidth: 10,
  itemHeight: 15,
  itemFontSize: 10,
};

export const styles = StyleSheet.create({
  letterIndexContainer: {
    width: sizes.containerWidth,
    height: "100%",
    position: "absolute",
    top: 0,
    right: 0,
  },

  letterIndexList: {
    justifyContent: "flex-start",
    alignItems: 'flex-start',
    height: "100%",
    marginTop: 20,
  },

  letterIndexItem: {
    width: sizes.containerWidth,
    height: sizes.itemHeight,
    alignItems: "center",
    justifyContent: "center",
  },

  letterIndexLabel: {
    fontSize: sizes.itemFontSize,
    fontWeight: "bold",
    color: "grey",
  },
});





