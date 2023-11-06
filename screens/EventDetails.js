import { View, Text, Pressable, Image } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { styles } from '../styles'
import Page from '../shared/Page'
import Avatar from '../assets/avatar.png'
import Back from '../assets/arrow-back.svg'
import { auth } from '../config/firebase-config'

const EventDetails = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { item, imgDisplay, fullNameDisplay } = route.params

  return (
    <Page>
      <View style={[styles.page__content, styles.pageTopPadding]}>
        <View style={styles.page__upper}>
          {auth.currentUser.uid !== 'KgJLUBI6d9QIpR0tnGKPERyF0S03' ||
          auth.currentUser.uid !== 'LkdoS9fnSDNwhH22mfrmzh7DLG83' ? (
            <Pressable
              onPress={() =>
                navigation.navigate('Relationships', {
                  item,
                  imgDisplay,
                  fullNameDisplay,
                })
              }
            >
              <Image
                source={Back}
                style={{ width: 20, height: 20, marginBottom: 16 }}
              />
            </Pressable>
          ) : (
            <Pressable onPress={() => navigation.navigate('Admin')}>
              <Image
                source={Back}
                style={{ width: 20, height: 20, marginBottom: 16 }}
              />
            </Pressable>
          )}
          <View style={styles.eventHeading}>
            <Text style={[styles.h2, styles.alignLeft]}>{item?.eventName}</Text>
          </View>
          <View style={styles.eventRelGraphic}>
            <Text>With</Text>
            <View style={styles.eventRelGraphic__pill}>
              {imgDisplay ? (
                <Image
                  source={imgDisplay}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    marginRight: 10,
                  }}
                />
              ) : (
                <Image
                  source={Avatar}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    marginRight: 10,
                  }}
                />
              )}
              <Text style={styles.eventRelGraphic__text}>
                {item?.name} {item?.lastName}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ paddingTop: 16 }}>
          <Text style={styles.h4}>DATE AND TIME</Text>
          <Text style={[styles.p, styles.alignLeft, { marginBottom: 32 }]}>
            {item?.dateDate &&
              !item?.dateTime &&
              new Date(item?.dateDate).toLocaleDateString()}
            {item?.dateTime && (
              <>
                {new Date(item?.dateDate).toLocaleDateString()}{' '}
                {item?.state !== 'past' ? `@ ${item?.dateTime}` : ''}
              </>
            )}
            {!item?.dateDate && !item?.dateTime && <Text>Not set </Text>}
          </Text>
        </View>
        <View>
          <Text style={styles.h4}>LOCATION</Text>
          {item?.datePlace ? (
            <Text style={[styles.p, styles.alignLeft, { marginBottom: 32 }]}>
              {item?.datePlace}
            </Text>
          ) : (
            <Text>Not set </Text>
          )}
        </View>
        <View>
          <Text style={styles.h4}>ADDITIONAL NOTES</Text>
          {item?.additionalComments ? (
            <Text style={[styles.p, styles.alignLeft, { marginBottom: 32 }]}>
              {item?.additionalComments}
            </Text>
          ) : (
            <Text>Not set </Text>
          )}
        </View>

        {item?.state !== 'past' ? (
          <View style={styles.page__lower}>
            <Pressable
              style={[styles.button, styles.buttonGrey, styles.center]}
              onPress={() =>
                navigation.navigate('Edit Event', {
                  item,
                  imgDisplay,
                  fullNameDisplay,
                })
              }
            >
              <Text
                style={[
                  styles.button__text,
                  styles.buttonGrey__text,
                  styles.superBold,
                ]}
              >
                EDIT EVENT DETAILS
              </Text>
            </Pressable>
          </View>
        ) : (
          ''
        )}
      </View>
    </Page>
  )
}

export default EventDetails
