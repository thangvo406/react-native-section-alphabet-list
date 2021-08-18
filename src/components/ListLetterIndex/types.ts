import { AlphabetListProps, ISectionData } from "../AlphabetList/types"

export interface ListLetterIndexProps {
    onPressLetter: (sectionIndex: number) => void;
    sectionData: ISectionData[];
    realData: ISectionData[];
    indexContainerStyle?: AlphabetListProps["indexContainerStyle"],
    indexLetterStyle?: AlphabetListProps["indexLetterStyle"],
    indexLetterContainerStyle?: AlphabetListProps["indexLetterContainerStyle"],
    renderCustomIndexLetter?: AlphabetListProps["renderCustomIndexLetter"],
    indexListContentContainer?: AlphabetListProps["indexListContentContainer"],
}
