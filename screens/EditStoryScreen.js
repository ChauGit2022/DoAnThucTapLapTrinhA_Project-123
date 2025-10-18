import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";

import { colors, globalStyles, bookCover } from './GlobalStyle';
import { Filigree2, Filigree4, Filigree5_Bottom } from './Decorations/Filigree';
import { OrnateButton, OrnateOption } from './Decorations/DecoButton';
import MaterialIcons from '@react-native-vector-icons/material-icons';

import { setCreateStoryScreen_Page_Mode, setChapterToEdit, setEditStoryScreen_Detail_Mode } from '../slices/creationSlice';

const CreateStoryHeader = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.creationHeader}>
            {/* <LinearGradient
                colors={[colors.gold, 'transparent']}
                style={[globalStyles.shadow, globalStyles.bottomShadow, { bottom: -13, height: 13, opacity: 0.2 }]}
            /> */}
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={[colors.black, 'transparent']}
                style={[globalStyles.shadow, globalStyles.leftShadow, { height: 100 }]}
            />
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['transparent', colors.black]}
                style={[globalStyles.shadow, globalStyles.rightShadow, { height: 100 }]}
            />

            <TouchableOpacity style={styles.ch_button}
                onPress={() => navigation.navigate("CreateStoryScreen_Main")}
            >
                <MaterialIcons name='arrow-back' color={colors.white} size={30} />
            </TouchableOpacity>

            <View style={styles.ch_textContainer}>
                <Text style={styles.ch_text}>
                    Sửa Truyện
                </Text>
            </View>

            <TouchableOpacity style={styles.ch_button}>
                <Text style={[styles.ch_buttonText, { fontWeight: 'normal' }]}>
                    {/* Bỏ Qua */}
                </Text>
            </TouchableOpacity>
            <LinearGradient
                colors={[colors.black, 'transparent']}
                style={[globalStyles.shadow, globalStyles.bottomShadow, { bottom: -13, height: 13, opacity: 0.4 }]}
            />
        </View>
    )
}
const GenreComponent = ({ genre }) => {
    return (
        <View style={styles.genreComponent}>
            <Text style={styles.gc_text}>
                {genre}
            </Text>
        </View>
    )
}

const ChapterComponent = ({ navigation, chapter }) => {
    const dispatch = useDispatch();
    return (
        <TouchableOpacity style={styles.ornateTextbox_white}
            onPress={() => {
                dispatch(setCreateStoryScreen_Page_Mode("updateChapter"))
                dispatch(setChapterToEdit(chapter))
                navigation.navigate("CreateStoryScreen_Page")
            }}
        >
            <View>
                <View style={styles.otw_textRow}>
                    <Text style={styles.otw_title} numberOfLines={1}>
                        Chương {chapter.chapterNum}: {chapter.chapterTitle}
                    </Text>
                    <MaterialIcons name='border-color' size={18} color={colors.gray} />
                </View>
                <View style={styles.otw_textRow}>
                    <Text style={styles.otw_subtitle}>Cập nhật ngày {chapter.lastUpdateDate}</Text>
                </View>
            </View>
            <Filigree5_Bottom />
            <LinearGradient
                colors={['rgba(0,0,0,0.2)', 'transparent']}
                style={[globalStyles.shadow, globalStyles.topShadow]}
            />
        </TouchableOpacity>
    )
}

const EditStoryScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const selectedCreationId = useSelector(
        (state) => state.books.selectedCreationId
    );
    const selectedCreation = useSelector(
        (state) => state.books.bookDatabase.find((book) => book.bookId == selectedCreationId)
    );
    const chaptersOfSelectedCreation = useSelector(
        (state) => state.books.chapterDatabase.filter((chapter) => chapter.bookId == selectedCreationId)
    );

    const [progressStatus] = useState(selectedCreation.progressStatus);
    const [cover] = useState(selectedCreation.cover);
    const [title] = useState(selectedCreation.title);
    const [series] = useState(selectedCreation.series);
    const [genreList] = useState(selectedCreation.genreList);
    const [description] = useState(selectedCreation.description);
    const [bookNum] = useState(selectedCreation.bookNum);
    const [language] = useState(selectedCreation.language);
    const [translator] = useState(selectedCreation.translator);

    return (
        <View style={styles.container}>
            <CreateStoryHeader />
            <ScrollView bounces={false} overScrollMode="never" style={{ width: '100%' }}>
                <TouchableOpacity style={{ paddingVertical: 20, alignItems: 'center' }}
                    onPress={() => {
                        dispatch(setEditStoryScreen_Detail_Mode("Trạng Thái"))
                        navigation.navigate("EditStoryScreen_Detail")
                    }}
                >
                    <Text style={styles.title}>
                        Trạng Thái:{" "}
                        <Text style={progressStatus == "hoàn tất" ? { color: colors.green }
                            : progressStatus == "đang cập nhật" ? { color: colors.yellow }
                                : { color: colors.red }}
                        >
                            {progressStatus.toUpperCase()}
                        </Text>
                    </Text>
                    <Filigree2 customPosition={-70} />
                </TouchableOpacity>

                <View style={[styles.ornateTextbox_2, { marginTop: 10 }]}>
                    <Filigree4 customBottomPosition={0} customOpacity={0.12} />
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={[colors.black, 'transparent']}
                        style={[globalStyles.shadow, globalStyles.leftShadow]}
                    />
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['transparent', colors.black]}
                        style={[globalStyles.shadow, globalStyles.rightShadow]}
                    />

                    <TouchableOpacity style={styles.ot2_container}
                        onPress={() => {
                            dispatch(setEditStoryScreen_Detail_Mode("Ảnh Bìa"))
                            navigation.navigate("EditStoryScreen_Detail")
                        }}
                    >
                        <View style={styles.ot_pictureFrame}>
                            <Image source={bookCover[cover]}
                                style={styles.ot_coverImage}
                            />
                            {/* <MaterialIcons name="add" size={30} color={colors.white} /> */}
                        </View>

                        <Text style={styles.ot_text}>
                            Sửa Ảnh Bìa
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.ornateTextbox}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={[colors.black, 'transparent']}
                        style={[globalStyles.shadow, globalStyles.leftShadow]}
                    />
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['transparent', colors.black]}
                        style={[globalStyles.shadow, globalStyles.rightShadow]}
                    />
                    <Filigree5_Bottom customColor={colors.lightgray} />

                    <View style={styles.ot_container}>
                        <TouchableOpacity style={styles.ot_fieldContainer}
                            onPress={() => {
                                dispatch(setEditStoryScreen_Detail_Mode("Tựa Đề"))
                                navigation.navigate("EditStoryScreen_Detail")
                            }}
                        >
                            <Text style={[styles.ot_textInputLabel,
                            (title == null || title == '') && { color: colors.gray }
                            ]}>
                                Tựa Đề
                            </Text>
                            <TextInput style={styles.ot_textInput}
                                placeholder='Tựa Đề'
                                placeholderTextColor={colors.lightgray}
                                value={title}
                                editable={false}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'row' }}
                            onPress={() => {
                                dispatch(setEditStoryScreen_Detail_Mode("Series"))
                                navigation.navigate("EditStoryScreen_Detail")
                            }}
                        >
                            <View style={[styles.ot_fieldContainer, { width: '72%' }]}>
                                <Text style={[styles.ot_textInputLabel,
                                (series == null || series == '') && { color: colors.gray }
                                ]}>
                                    Series
                                </Text>
                                <TextInput style={styles.ot_textInput}
                                    placeholder='Series'
                                    placeholderTextColor={colors.lightgray}
                                    value={series}
                                    editable={false}
                                />
                            </View>
                            <View style={[styles.ot_fieldContainer, { width: '25%', marginLeft: '3%', }]}>
                                <Text style={[styles.ot_textInputLabel,
                                (bookNum == null || bookNum == '') && { color: colors.gray }
                                ]}>
                                    Thứ Tự
                                </Text>
                                <TextInput style={styles.ot_textInput}
                                    placeholder='Thứ Tự'
                                    placeholderTextColor={colors.lightgray}
                                    value={bookNum}
                                    keyboardType="numeric"
                                    editable={false}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.ot_fieldContainer}
                            onPress={() => {
                                dispatch(setEditStoryScreen_Detail_Mode("Mô Tả"))
                                navigation.navigate("EditStoryScreen_Detail")
                            }}
                        >
                            <Text style={[styles.ot_textInputLabel,
                            (description == null || description == '') && { color: colors.gray }
                            ]}>
                                Mô Tả
                            </Text>
                            <TextInput style={styles.ot_textInput}
                                placeholder='Mô Tả'
                                placeholderTextColor={colors.lightgray}
                                multiline={true}
                                textAlignVertical="top"
                                value={description}
                                editable={false}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.ornateTextbox}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={[colors.black, 'transparent']}
                        style={[globalStyles.shadow, globalStyles.leftShadow]}
                    />
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['transparent', colors.black]}
                        style={[globalStyles.shadow, globalStyles.rightShadow]}
                    />
                    <Filigree5_Bottom customColor={colors.lightgray} />
                    <View style={styles.ot_container}>
                        <TouchableOpacity style={[styles.ot_fieldContainer,
                        { marginTop: 20 }
                        ]}
                            onPress={() => {
                                dispatch(setEditStoryScreen_Detail_Mode("Ngôn Ngữ"))
                                navigation.navigate("EditStoryScreen_Detail")
                            }}>
                            <Text style={styles.ot_textInputLabel}>
                                {language != null && 'Ngôn Ngữ'}
                            </Text>
                            <View style={styles.ot_textInput}>
                                {
                                    language != null ?
                                        <Text style={{ color: colors.white, marginVertical: 2 }}>
                                            {language}
                                        </Text>
                                        :
                                        <Text style={{ color: colors.lightgray, marginVertical: 2 }}>
                                            Ngôn Ngữ
                                        </Text>
                                }
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.ot_fieldContainer]}
                            onPress={() => {
                                dispatch(setEditStoryScreen_Detail_Mode("Dịch Giả"))
                                navigation.navigate("EditStoryScreen_Detail")
                            }}
                        >
                            <Text style={[styles.ot_textInputLabel,
                            (translator == null || translator == '') && { color: colors.gray }
                            ]}>
                                Dịch Giả
                            </Text>
                            <TextInput style={styles.ot_textInput}
                                placeholder='Dịch Giả (Nếu Có)'
                                placeholderTextColor={colors.lightgray}
                                value={translator}
                                editable={false}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.ornateTextbox}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={[colors.black, 'transparent']}
                        style={[globalStyles.shadow, globalStyles.leftShadow]}
                    />
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['transparent', colors.black]}
                        style={[globalStyles.shadow, globalStyles.rightShadow]}
                    />
                    <Filigree5_Bottom customColor={colors.lightgray} />

                    <View style={styles.ot_container}>
                        <TouchableOpacity style={styles.ot_fieldContainer}
                            onPress={() => {
                                dispatch(setEditStoryScreen_Detail_Mode("Thể Loại"))
                                navigation.navigate("EditStoryScreen_Detail")
                            }}
                        >
                            <Text style={[styles.ot_textInputLabel,
                            (genreList != null && genreList.length == 0) && { color: colors.gray }
                            ]}>
                                Thể Loại
                            </Text>
                            <View style={styles.ot_textInput}>
                                {
                                    (genreList != null && genreList.length == 0) &&
                                    <Text style={
                                        { color: colors.lightgray, marginTop: 5 }
                                    }>
                                        Thể Loại
                                    </Text>
                                }
                                {
                                    genreList.map(
                                        (genre) =>
                                            <GenreComponent key={genre} genre={genre} />
                                    )
                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>MỤC LỤC</Text>
                </View>
                <View style={styles.chapterContainer}>
                    {
                        chaptersOfSelectedCreation != null &&
                        chaptersOfSelectedCreation.map((chapter) =>
                            <ChapterComponent chapter={chapter}
                                key={chapter.chapterId}
                                navigation={navigation}
                            />
                        )
                    }
                </View>

                <TouchableOpacity style={{ marginVertical: 0 }}
                    onPress={() => {
                        dispatch(setCreateStoryScreen_Page_Mode("newChapter"))
                        navigation.navigate("CreateStoryScreen_Page")
                    }}
                >
                    <OrnateButton ButtonText={"Thêm Chương Mới"} ButtonIcon={"add"} />
                </TouchableOpacity>

                <Filigree2 customPosition={60} />
                <View style={globalStyles.bottomPadding} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.black,
    },

    //-------------------------------------------------------//
    // CREATION HEADER

    creationHeader: {
        zIndex: 999999,

        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',

        paddingTop: 45,
        paddingBottom: 10,

        width: '100%',
        height: 'max-content',

        backgroundColor: colors.gray,
        // borderColor: colors.gold,
        // borderBottomWidth: 3
    },

    ch_button: {
        flex: 1,
        paddingHorizontal: 20
    },

    ch_buttonText: {
        textAlign: 'right',
        color: colors.white,
        fontWeight: "bold"
    },

    ch_textContainer: {
        flex: 4
    },

    ch_text: {
        textAlign: 'left',
        color: colors.white,
        fontWeight: "bold",
        fontSize: 16,
        letterSpacing: 1.2
    },

    //-------------------------------------------------------//
    // ORNATE TEXTBOX

    ornateTextbox: {
        alignItems: 'center',
        justifyContent: 'flex-start',

        width: '100%',
        height: 'auto',
        marginVertical: 5,

        overflow: 'hidden',

        borderColor: colors.white,
        borderTopWidth: 3,
        borderBottomWidth: 2,
        backgroundColor: colors.gray,
    },
    ot_container: {
        flexDirection: 'collumn',
        justifyContent: 'center',
        alignItems: 'center',

        paddingHorizontal: 20,
        paddingBottom: 50,
        width: '90%',
        height: 'auto'
    },
    ot_pictureFrame: {
        alignItems: 'center',
        justifyContent: 'center',

        width: 100,
        height: 150,

        borderRadius: 4,

        borderColor: colors.lightgray,
        borderWidth: 1,
        backgroundColor: colors.gray
    },
    ot_text: {
        color: colors.white,
        fontSize: 20,
        fontWeight: 'bold',

        marginLeft: 10,
        marginBottom: 10
    },
    ot_fieldContainer: {
        width: '100%',

        marginTop: 20
    },
    ot_textInputLabel: {
        color: colors.gold,
        fontSize: 11,
        fontWeight: 'bold'
    },
    ot_textInput: {
        flexDirection: 'row',
        flexWrap: 'wrap',

        width: '100%',
        padding: 5,
        paddingTop: 0,
        margin: 0,

        color: colors.white,
        borderBottomColor: colors.lightgray,
        borderBottomWidth: 1
    },
    ot_coverImage: {
        width: '100%',
        height: '100%',

        borderRadius: 4
    },

    //-------------------------------------------------------//
    // GENRE COMPONENT

    genreComponent: {
        width: 'auto',
        padding: 5,
        paddingHorizontal: 10,
        marginRight: 5,
        marginTop: 5,

        borderRadius: 4,

        backgroundColor: colors.black,
    },
    gc_text: {
        color: colors.white,
        fontWeight: 'bold'
    },

    //-------------------------------------------------------//
    // ORNATE TEXTBOX 2

    ornateTextbox_2: {
        alignItems: 'center',
        justifyContent: 'center',

        width: '100%',
        height: 180,
        marginTop: 5,
        marginBottom: 5,

        overflow: 'hidden',

        borderColor: colors.white,
        borderTopWidth: 3,
        borderBottomWidth: 2,
        backgroundColor: colors.gray,
    },
    ot2_container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',

        paddingHorizontal: 15,
        width: '80%'
    },

    //-------------------------------------------------------//
    // TITLE CONTAINER

    titleContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',

        width: '100%',
        height: 60,
        paddingHorizontal: 40
    },

    title: {
        fontSize: 20,
        color: colors.white,
        fontWeight: 'bold',
        letterSpacing: 2
    },

    //-------------------------------------------------------//
    // ORNATE TEXTBOX WHITE

    ornateTextbox_white: {
        alignItems: 'center',
        justifyContent: 'flex-start',

        width: '100%',
        height: 80,
        marginVertical: 2,
        paddingVertical: 10,

        overflow: 'hidden',

        borderColor: colors.white,
        borderTopWidth: 2,
        backgroundColor: colors.white,
    },
    otw_textRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        width: '100%',
        paddingHorizontal: 45
    },
    otw_title: {
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 0.4,
        color: colors.black,
        width: '100%'
    },
    otw_subtitle: {
        fontSize: 13,
        fontStyle: 'italic',
        color: colors.gray
    }
});

export default EditStoryScreen;