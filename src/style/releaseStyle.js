export default {
    contentBoxStyle: {
        backgroundColor: Predefine.BGC
    },
    imageStyle: {
        width: 28,
        height: 28,
    },
    formBoxStyle: {
        paddingHorizontal: 15,
        paddingTop: 20,
        backgroundColor: '#fff',
    },
    formBoxStyleSmall: {
        paddingHorizontal: 10,
    },
    titleStyle: {
        color: Predefine.C333,
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 30,
    },
    tipsStyle: {
        color: Predefine.colorC,
        fontSize: 14,
        marginTop: 15,
    },
    formItemStyle: {
        marginBottom: 20,
        borderColor: '#efefef',
        borderBottomWidth: 1,
    },
    formItemNolineStyle: {
        borderBottomWidth: 0,
    },
    formLabelStyle: {
        fontSize: 16,
        color: Predefine.C333,
        marginBottom: 10,
    },
    formRequiredStyle: {
        fontSize: 16,
        marginRight: 4,
        marginBottom: 5,
        color: Predefine.colorD,

    },
    formItemNumStyle: {
        paddingBottom: 10,
        borderBottomWidth: 0,
        marginBottom: 0,
    },
    formNumStyle: {
        flex: 1,
        color: Predefine.colorD,
        textAlign: 'right',
    },
    formInputLeftTextStyle: {
        fontSize: 18,
        marginRight: 5,
    },
    formTextInput: {
        flex: 1,
        padding: 0,
        height: 40,
        fontSize: 14,
        color: '#333',
        paddingVertical: 10,
    },
    codeInputStyle: {
        flex: 1,
    },
    codeBtnStyle: {
        fontSize: 14,
        lineHeight: 40,
    },
    formBtnStyle: {
        paddingVertical: 25,
    },
    okBtnStyle: {
        height: 46,
        width: 200,
        backgroundColor: Predefine.BGCP,
        borderRadius: 25,
        marginVertical: 20,
    },
    okBtnTitleStyle: {
        color: '#fff',
        fontSize: 16
    },
    // upload image picker
    uploadImgBoxStyle: {
        marginTop: 10,
    },
    uploadImgItem: {
        position: 'relative',
        width: (SCREEN_WIDTH - 50) / 3,
        height: (SCREEN_WIDTH - 50) / 3,
        borderRadius: 4,
        overflow: 'hidden',
        marginHorizontal: 5,
        marginBottom: 15,
    },
    uploadImgItemCur: {
        // marginLeft: 0,
    },
    uploadImgStyle: {
        width: '100%',
        height: '100%',
    },
    uploadDelStyle: {
        width: 18,
        height: 18,
        position: 'absolute',
        top: 0,
        right: 0,
    },
    uploadDelImgStyle: {
        width: 18,
        height: 18,
    },
    uploadBtnStyle: {
        width: (SCREEN_WIDTH - 50) / 3,
        height: (SCREEN_WIDTH - 50) / 3,
        // shadow
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: .05,
        shadowRadius: 6,
        elevation: 10,
        backgroundColor: '#fff',
        marginBottom: 15,
        marginHorizontal: 5,
    },
    uploadBtnImgStyle: {
        width: 26,
        height: 26,
        marginBottom: 10
    },
    uploadBtnTextStyle: {
        fontSize: 12,
        color: '#acacac',
        textAlign: 'center',
    },
    iconArrowStyle: {
        width: 15,
        height: 15,
        tintColor: '#666',
    },
}
