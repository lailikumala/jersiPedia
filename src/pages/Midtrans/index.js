import React, { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { updatePesanan } from '../../config/actions/PesananAction'
import { colors } from '../../utils';

export default function Midtrans({route, navigation}) {

    const  { order_id, url} = route.params;
    const dispatch = useDispatch(); 

    const {updatePesananLoading} = useSelector(
        state => state.PesananReducer,
      );

    useEffect(() => {
        if(order_id) {
            dispatch(updatePesanan(route.params))
        }
    },[])

    const onMessage = (data) => {
        if(data.nativeEvent.data === "Selesai") {
            navigation.replace('History')
        }
    }

    return (
        <>
        {updatePesananLoading ? (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        ) : (
          <WebView source={{ uri: url }} onMessage={onMessage} />
        )}
        </>
    )
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        marginTop: 10,
        marginBottom: 50,
    }
})
