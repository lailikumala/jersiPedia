import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ListHistory } from '../../components'
import { dummyPesanans } from '../../data'
import { colors } from '../../utils'

const History = () => {

    const [pesanans, setPesanans] = useState(dummyPesanans);
        return (
            <View style={styles.pages}>
                <ListHistory pesanans={pesanans} />
            </View>
        )
    }
    export default History

const styles = StyleSheet.create({
    pages: {
        backgroundColor: colors.white,
        flex: 1
    }
})
