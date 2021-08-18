import * as React from "react";
import { useEffect, useState, useRef } from "react"
import { SectionList, View, Text, SectionListData } from "react-native";
import sectionListGetItemLayout from "react-native-section-list-get-item-layout";
import { getSectionData } from "../../utils/getSectionData";
import { ListLetterIndex } from "../ListLetterIndex";
import { IData, ISectionData, AlphabetListProps } from "./types";
import { styles } from "./styles";
import { sizes } from "../../values/sizes";
import { DEFAULT_CHAR_INDEX } from "../../values/consts"

export const AlphabetList: React.FC<AlphabetListProps> = (props) => {
  const {
    data,
    index = DEFAULT_CHAR_INDEX,
    style,
    indexContainerStyle,
    indexLetterStyle,
    indexLetterContainerStyle,
    getItemHeight: onGetItemHeight = () => sizes.itemHeight,
    sectionHeaderHeight = sizes.itemHeight,
    listHeaderHeight = sizes.listHeaderHeight,
    uncategorizedAtTop = false,
    renderCustomSectionHeader,
    renderCustomItem,
    renderCustomListHeader,
    renderCustomIndexLetter,
    renderCustomListEmpty,
    indexListContentContainer,
    originData,
    ...sectionListProps
  } = props

  const sectionListRef = useRef(null);
  const [sectionData, setSectionData] = useState<ISectionData[]>([])
  const [realData, setRealData] = useState<ISectionData[]>([])

  useEffect(() => {
    const rawData = originData.length > data.length ? originData : data;
    setSectionData(getSectionData(rawData, index, uncategorizedAtTop))
    setRealData(getSectionData(data, index, uncategorizedAtTop))
  }, [data])

  const onScrollToSection = (sectionIndex: number) => {
    const sectionList = sectionListRef.current! as SectionList;
    if (!sectionList) return

    sectionList.scrollToLocation({
      sectionIndex,
      itemIndex: 0,
    });
  }


  const onGetItemLayout: any = sectionListGetItemLayout({
    getItemHeight: (_rowData, sectionIndex: number, rowIndex: number) => {
      return onGetItemHeight(sectionIndex, rowIndex)
    },
    getSectionHeaderHeight: () => sectionHeaderHeight,
    getSectionFooterHeight: () => 0,
    listHeaderHeight,
  });

  const onRenderSectionHeader = ({ section }: { section: SectionListData<IData> }) => {
    if (renderCustomSectionHeader) return renderCustomSectionHeader(section);

    return (
      <View testID="header" style={styles.sectionHeaderContainer}>
        <Text testID="header__label" style={styles.sectionHeaderLabel}>{section.title}</Text>
      </View>
    );
  };

  const onRenderItem = ({ item }: { item: IData }) => {
    if (renderCustomItem) return renderCustomItem(item);

    return (
      <View testID="cell" style={styles.listItemContainer}>
        <Text testID="cell__label" style={styles.listItemLabel}>{item.value}</Text>
      </View>
    );
  };


  return (
    <View style={[styles.container, style]}>
      <SectionList
        {...sectionListProps}
        testID="sectionList"
        ref={sectionListRef}
        sections={realData}
        keyExtractor={(item: IData) => item.key}
        renderItem={onRenderItem}
        ListEmptyComponent={renderCustomListEmpty}
        renderSectionHeader={onRenderSectionHeader}
        ListHeaderComponent={renderCustomListHeader}
        getItemLayout={onGetItemLayout}
      />

      <ListLetterIndex
        realData={realData}
        sectionData={sectionData}
        onPressLetter={onScrollToSection}
        indexContainerStyle={indexContainerStyle}
        indexLetterStyle={indexLetterStyle}
        indexLetterContainerStyle={indexLetterContainerStyle}
        renderCustomIndexLetter={renderCustomIndexLetter}
        indexListContentContainer={indexListContentContainer}
      />
    </View>
  );
}
