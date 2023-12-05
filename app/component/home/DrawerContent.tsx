import React from 'react';
import {View, StyleSheet, Text, StatusBar, SafeAreaView} from 'react-native';
import {Avatar} from 'react-native-elements';

import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface IProps {
  navigation: {goBack: () => void; navigate: (arg: string) => void};
}

const DrawerContent = (props: IProps) => {
  return (
    <SafeAreaView style={styles.drawerContainer}>
      <StatusBar hidden={true} />
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{marginVertical: 10}}>
              <Avatar
                size="medium"
                rounded
                source={{
                  uri: 'https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg',
                }}
              />
            </View>
            <View style={{flexDirection: 'column', marginTop: 15}}>
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Text style={styles.titleAdminText}>Admin</Text>
                <Text style={styles.captionNameStyle}>Jack Philips</Text>
              </View>
            </View>
          </View>

          <View style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon
                  name="information-circle-sharp"
                  color={color}
                  size={size}
                />
              )}
              label="About us"
              onPress={() => {
                props.navigation.navigate('Aboutus');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="bookmark-outline" color={color} size={size} />
              )}
              label="FAQ'S"
              onPress={() => {
                props.navigation.navigate('Faq');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <MaterialIcons name="headphones" color={color} size={size} />
              )}
              label="Contact"
              onPress={() => {
                props.navigation.navigate('Contact');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <FontAwesome6 name="truck-moving" color={color} size={20} />
              )}
              label="fipola on Wheels"
              onPress={() => {
                props.navigation.navigate('Faq');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Octicons name="history" color={color} size={size} />
              )}
              label="Order History"
              onPress={() => {
                props.navigation.navigate('Faq');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <FontAwesome name="file-text-o" color={color} size={size} />
              )}
              label="Term &
            Conditions"
              onPress={() => {
                props.navigation.navigate('Faq');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <MaterialCommunityIcons
                  name="file-check"
                  color={color}
                  size={size}
                />
              )}
              label="Certficates"
              onPress={() => {
                props.navigation.navigate('Faq');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <MaterialCommunityIcons
                  name="garage"
                  color={color}
                  size={size}
                />
              )}
              label="Franchise"
              onPress={() => {
                props.navigation.navigate('Faq');
              }}
            />
          </View>
        </View>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

export default DrawerContent;
const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 30,
    borderBottomStartRadius: 40,
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  titleAdminText: {
    fontFamily: 'Lato',
    fontSize: 16,
    fontWeight: '700',
    color: '#24222066',
    lineHeight: 22,
    letterSpacing: 0.4,
  },
  captionNameStyle: {
    fontFamily: 'Lato',
    fontSize: 16,
    fontWeight: '700',
    color: '#242220',
    lineHeight: 22,
    letterSpacing: 0.4,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
