import * as React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { ListLetterIndexProps } from "./types"
import { styles } from "./styles";
import { ISectionData } from "../AlphabetList/types";

export const ListLetterIndex: React.FC<ListLetterIndexProps> = ({
  sectionData,
  onPressLetter,
  indexContainerStyle,
  indexLetterStyle,
  indexLetterContainerStyle,
  renderCustomIndexLetter,
  realData,
  indexListContentContainer
}) => {
  const onRenderCustomIndexLetter = ({ item, index }: { item: ISectionData, index: number }) => {
    const onPress = () => onPressLetter(index)

    if (renderCustomIndexLetter) {
      return renderCustomIndexLetter({
        item,
        index,
        onPress,
      });
    }

    const includedItem = realData?.find(it => it.title === item.title);
    let activeStyle;
    let customPress = onPress;
    if(!includedItem){
      activeStyle = {color: 'rgba(208, 47, 68, 0.5)'}
      customPress = null;
    }

    return (
      <TouchableOpacity testID="indexItem" onPress={customPress}>
        <View testID="indexItem__title-container" style={[styles.letterIndexItem, indexLetterContainerStyle]}>
          <Text testID="indexItem__title" style={[styles.letterIndexLabel, indexLetterStyle,activeStyle]}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.letterIndexContainer, indexContainerStyle]}>
      <FlatList
        contentContainerStyle={[styles.letterIndexList,indexListContentContainer]}
        data={sectionData}
        keyExtractor={(i) => i.title}
        renderItem={onRenderCustomIndexLetter}
      />
    </View>
  )
}