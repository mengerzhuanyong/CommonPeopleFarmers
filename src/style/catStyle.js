const _itemHeight = (SCREEN_WIDTH - 52) * 0.23 / 0.75;

export default {
    PT10: {
        paddingTop: 10,
    },
    NavigationBarStyle: {
        backgroundColor: '#fff5d8'
    },
    container: {
        flex: 1,
        // height: Predefine.screenHeight - Predefine.tabBarHeight,
        backgroundColor: '#fff5d8'
    },
    content: {
        marginTop: -NAV_BAR_HEIGHT,
    },
    catTopStyle: {
        height: 220,
        position: 'relative',
    },
    catTopBgStyle: {
        width: 351,
        height: 217,
    },
    catImgStyle: {
        width: 372,
        height: 140,
        position: 'absolute',
        left: '50%',
        bottom: 30,
        transform: [
            { translateX: -186 },
        ],
    },
    // cat reward
    catRewardStyle: {
        marginHorizontal: 6,
        marginBottom: 10,
    },
    catRewardStyle1: {
        marginHorizontal: 6,
        marginVertical: 20,
    },
    catRewardBgStyle: {
        width: '100%',
        position: 'relative',
    },
    catRewardTitleStyle: {
        marginTop: -12,
        marginBottom: 15,
    },
    catRewardTitleImgStyle: {
        width: 216,
        height: 37,
    },
    crRuleStyle: {
        width: 50,
        height: 50,
        position: 'absolute',
        top: 20,
        right: 15,
        zIndex: 2,
    },
    crRuleImgStyle: {
        width: 50,
        height: 50,
    },
    crTitleStyle: {
        fontSize: 24,
        color: '#fff',
        fontWeight: '600',
        textAlign: 'center',
        marginVertical: 4,
    },
    crTitleNumStyle: {
        fontSize: 34,
        color: '#FFE8B1',
        fontWeight: '600',
        fontStyle: 'italic',
        textAlign: 'center',
        marginVertical: 4,
    },
    crTitleCStyle: {
        fontSize: 24,
        color: '#FFE358',
        fontWeight: '600',
        textAlign: 'center',
        marginVertical: 4,
    },
    textShadow: {
        // textShadowOffset:{width:1,hegith:1}, 
        // textShadowRadius:2, 
        // textShadowColor:'grey'
    },
    // board
    crBoardStyle: {
        marginVertical: 15,
    },
    crBoardItemStyle: {
        flex: 1,
    },
    crBoardTitleStyle: {
        fontSize: 16,
        color: '#FFE4B6',
        textAlign: 'center',
    },
    crBoardNumStyle: {
        fontSize: 18,
        color: '#FFE4B6',
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 10,
    },
    crBoardLineStyle: {
        width: 3,
        height: 62,
        backgroundColor: '#FFE4B6',
    },
    // card
    crCardBoxStyle: {
        marginTop: 20,
        marginHorizontal: 10,
    },
    crCardItemNoStyle: {
        width: (SCREEN_WIDTH - 60) / 4,
        height: _itemHeight,
        borderRadius: 2,
        borderWidth: 2,
        borderColor: '#EE5254',
        backgroundColor: '#CE193B',
        marginHorizontal: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    crCardItemStyle: {
        width: (SCREEN_WIDTH - 60) / 4,
        height: _itemHeight,
        marginHorizontal: 3,
        marginBottom: 20,
    },
    crCardItemBackImgStyle: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: _itemHeight,
    },
    crCardItemImgStyle: {
        width: '100%',
        height: '100%',
    },
    crCardItemIconStyle: {
        width: 46,
        height: 46,
    },
    crCardItemCatImgStyle: {
        width: 66,
        height: 66,
    },
    crCardItemTextStyle: {
        fontSize: 12,
        color: Predefine.colorD,
        marginTop: 6,
    },
    textWhiteStyle: {
        color: '#fff',
    },
    textGrayStyle: {
        color: '#666',
    },
    crCardNumBgStyle: {
        position: 'absolute',
        height: 24,
        width: 24,
        top: -10,
        right: -6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    crCardNumStyle: {
        fontSize: 12,
        color: '#FFEAD8',
    },
    // btn
    crBtnBoxStyle: {
        marginHorizontal: 20,
        marginBottom: 30,
    },
    crBtnTitleStyle: {
        fontSize: 18,
        color: '#ee4c0f',
        fontWeight: '600',
        // textShadowOffset: {
        //     width: 1,
        //     height: 1,
        // },
        // textShadowRadius: 1,
        // textShadowColor: '#888',
    },
    crBtnStyle: {
        width: 140,
        height: 46,
        borderRadius: 30,
        backgroundColor: Predefine.BGCC,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 0,
        paddingHorizontal: 0,
        marginHorizontal: 6,
    },
    // pump
    pumpViewStyle: {
        marginHorizontal: 10,
        marginVertical: 30,
        height: 286,
        alignItems: 'center',
    },
    pumpBgStyle: {
        width: '100%',
        height: '100%',
    },
    pumpTitleStyle: {
        width: 286,
    },
    pumpBtnImgStyle: {
        width: 120,
        height: 120,
        marginTop: 40,
    },
    // search
    srarchBoxStyle: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    srarchInputStyle: {
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        marginRight: 20,
    },
    sraechIconStyle: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    resetBtnStyle: {
        position: 'relative',
        width: 20,
        height: 20,
        borderRadius: 20,
        backgroundColor: '#ccc',
        transform: [
            {rotateZ: '45deg',}
        ]
    },
    resetLineHStyle: {
        width: 2,
        height: 12,
        position: 'absolute',
        top: '50%',
        left: '50%',
        backgroundColor: '#fff',
        transform: [
            {translateX: -1},
            {translateY: -6}
        ]
    },
    resetLineVStyle: {
        width: 12,
        height: 2,
        position: 'absolute',
        top: '50%',
        left: '50%',
        backgroundColor: '#fff',
        transform: [
            {translateX: -6},
            {translateY: -1}
        ]
    },
    textInputStyle: {
        fontSize: 14,
        color: Predefine.C333,
    },
    // member
    giveMemberStyle: {
        marginTop: 20,
    },
    giveTipsStyle: {
        fontSize: 14,
        color: Predefine.C666,
        textAlign: 'center',
    },
    giveMemberNameStyle: {
        fontSize: 20,
        color: Predefine.C333,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 20,
    },
    // checkBox
    checkedBoxStyle: {
        position: 'absolute',
        width: 24,
        height: 24,
        bottom: -6,
        right: -6,
        borderRadius: 12,
    },
    checkedBoxNoStyle: {
        backgroundColor: 'transparent',
    },
    checkedBoxImgStyle: {
        width: 24,
        height: 24,
    },
}