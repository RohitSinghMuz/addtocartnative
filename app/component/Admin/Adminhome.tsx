import React, {useEffect, useState} from 'react';
import {
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  Platform,
} from 'react-native';
import ImageCropPicker, {
  Image as ImageType,
} from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import {getFontSize, getHeight, getWidth} from '../../utils/responsiveScale';
import {translate} from '../../config/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ListItem {
  id: number;
  brandName: string;
  image: string;
  price: string;
  size: string;
}

const Adminhome: React.FC = () => {
  const [ListItems, setListItems] = useState<ListItem[]>([]);
  const [brandName, setbrandName] = useState<string>('');
  const [size, setSize] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [editItemId, setEditItemId] = useState<number | null>(null);
  const [isAddElement, setIsAddElement] = useState<boolean>(false);
  const [isEditElement, setisEditElement] = useState<boolean>(false);
  const [isBorder, isSetBorder] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('ListItems');
      if (jsonData) {
        const data = JSON.parse(jsonData);
        console.log('Data loaded from AsyncStorage:', data);
        setListItems(data);
      }
    } catch (error) {
      console.error('Error loading data from AsyncStorage:', error);
    }
  };

  const handleModalFeedback = (): void => {
    setisEditElement(false);
    setIsAddElement(false);
    setbrandName('');
    setSize('');
    setPrice('');
    setImage(null);
  };
  const handleChoosePhoto = () => {
    try {
      ImageCropPicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        cropperCircleOverlay: false,
        freeStyleCropEnabled: true,
        compressImageQuality: 0.7,
        includeBase64: false,
      })
        .then(image => {
          if (image) {
            setImage(image.path);
          }
        })
        .catch(error => {
          console.log('ImagePicker Error: ', error);
        });
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  };
  const handleSelectedItem = (id: number) => {
    setSelectedItem(id);
    isSetBorder(true);
  };

  const handleAddListItem = async () => {
    if (brandName && price && size && image) {
      if (editItemId !== null) {
        const updatedItems = ListItems.map(item =>
          item.id === editItemId
            ? {...item, brandName, price, size, image}
            : item,
        );
        setListItems(updatedItems);
        setEditItemId(null);
        await AsyncStorage.setItem('ListItems', JSON.stringify(updatedItems));
      } else {
        const newListItem = {
          id: Date.now(),
          brandName,
          price,
          size,
          image,
        };
        const updatedListItems = [...ListItems, newListItem];
        setListItems(updatedListItems);
        await AsyncStorage.setItem(
          'ListItems',
          JSON.stringify(updatedListItems),
        );
      }

      setbrandName('');
      setSize('');
      setPrice('');
      setImage(null);
      setIsAddElement(false);
    }
  };

  const handleEdit = (
    id: number,
    image: string,
    price: string,
    size: string,
  ) => {
    setIsAddElement(true);
    setisEditElement(true);
    setEditItemId(id);
    setbrandName(ListItems.find(item => item.id === id)?.brandName || '');
    setSize(ListItems.find(item => item.id === id)?.size || '');
    setPrice(ListItems.find(item => item.id === id)?.price || '');
    setImage(image);
  };

  const handleUpdateElement = async () => {
    if (editItemId !== null && brandName && image && price && size) {
      const updatedItems = ListItems.map(item =>
        item.id === editItemId
          ? {id: item.id, brandName, image, price, size}
          : item,
      );
      setListItems(updatedItems);
      await AsyncStorage.setItem('ListItems', JSON.stringify(updatedItems));
      setEditItemId(null);
      setIsAddElement(false);
    }
  };
  const handleDelete = async (id: number) => {
    const updatedItems = ListItems.filter(item => item.id !== id);
    setListItems(updatedItems);
    await AsyncStorage.setItem('ListItems', JSON.stringify(updatedItems));
  };

  const renderElement = ({item, index}: {item: ListItem; index: number}) => (
    <View style={styles.ListItemViewStyle}>
      <TouchableOpacity
        onPress={() => handleSelectedItem(item.id)}
        style={styles.selectedItemStyle}>
        <Image
          source={{uri: item.image}}
          style={[
            styles.imageStyle,
            isBorder &&
              selectedItem === item.id && {
                borderWidth: 2,
                borderColor: '#36CC55',
              },
          ]}
        />
        <View style={styles.brandNameViewStyle}>
          <Text style={styles.brandNameStyle} numberOfLines={1}>
            Brand:{item.brandName}
          </Text>
          <Text numberOfLines={1} style={styles.brandNameStyle}>
            Size:{item.size}
          </Text>
          <Text numberOfLines={1} style={styles.brandNameStyle}>
            Price:{item.price}
          </Text>
        </View>
      </TouchableOpacity>
      {isBorder && selectedItem === item.id ? (
        <View style={styles.editDeleteViewStyle}>
          <TouchableOpacity
            onPress={() =>
              handleEdit(item.id, item.image, item.size, item.price)
            }
            style={styles.buttonEditStyle}>
            <FeatherIcon
              name="edit-3"
              color="white"
              size={20}
              style={styles.buttonTextStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDelete(item.id)}
            style={styles.buttonDeleteStyle}>
            <MaterialIconsIcon
              name="delete"
              color="white"
              size={25}
              style={styles.buttonTextStyle}
            />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );

  return (
    <>
      <View style={styles.container}>
        <StatusBar animated={true} hidden={true} />

        <Text style={styles.CategoriesTextStyle}>
          {translate('shoesShopText')}
        </Text>
        <View>
          <TouchableOpacity
            style={styles.addButtonElement}
            onPress={() => setIsAddElement(true)}>
            <View style={styles.plusViewStyle}>
              <Text style={styles.plusTextStyle}>+</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.parentFlatlistViewStyle} />

        <TouchableWithoutFeedback onPress={() => isSetBorder(false)}>
          <View style={styles.flatlistViewStyle}>
            <FlatList
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={ListItems}
              renderItem={renderElement}
              keyExtractor={item => item.toString()}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <Modal animationType="slide" transparent={true} visible={isAddElement}>
        <TouchableWithoutFeedback onPress={handleModalFeedback}>
          <View style={styles.centeredView}>
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <View>
                  {image ? (
                    <View>
                      {image && (
                        <TouchableOpacity onPress={handleChoosePhoto}>
                          <Image
                            source={{uri: image}}
                            style={styles.imageUploadStyle}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={handleChoosePhoto}
                      style={styles.handleChoosePhotoStyle}>
                      <Icon
                        name="image"
                        color={'#19212699'}
                        size={40}
                        style={styles.uploadImgStyle}
                      />
                      <Text style={styles.uploadButtonStyle}>
                        {translate('uploadImg')}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>

                <TextInput
                  placeholder={translate('brandNameText')}
                  value={brandName}
                  onChangeText={setbrandName}
                  style={styles.inputStyleText}
                />
                <TextInput
                  placeholder={translate('sizeText')}
                  value={size}
                  onChangeText={setSize}
                  style={styles.inputStyleText}
                />
                <TextInput
                  keyboardType="numeric"
                  placeholder={translate('rupessText')}
                  value={price}
                  onChangeText={setPrice}
                  style={styles.inputStyleText}
                />

                <TouchableOpacity
                  onPress={
                    isAddElement
                      ? () => handleAddListItem()
                      : () => handleUpdateElement()
                  }
                  style={styles.saveNewCategoryButtonStyle}>
                  <View style={styles.saveNewCategoryViewStyle}>
                    <Text style={styles.saveNewCategoryTextStyle}>
                      {isAddElement && isEditElement === false
                        ? translate('saveNewBrandText')
                        : translate('saveChangesText')}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};
export default Adminhome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: getWidth(100),
    height: getHeight(100),
  },
  CategoriesTextStyle: {
    marginTop: getHeight(3),
    color: '#192126',
    textAlign: 'center',
    fontFamily: 'Lato',
    fontSize: getFontSize(4.5),
    paddingTop: Platform.OS === 'android' ? getHeight(0.3) : getHeight(4),
    fontWeight: Platform.OS === 'android' ? '700' : '600',
  },
  saveNewCategoryTextStyle: {
    backgroundColor: '#BBF246',
    color: '#192126',
    textAlign: 'center',
    width: getWidth(84.5),
    padding: getHeight(2),
    marginBottom: getHeight(0.2),
    borderRadius: 50,
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: getFontSize(4),
    paddingVertical: getHeight(2.5),
  },
  saveNewCategoryViewStyle: {
    borderRadius: getHeight(5),
    overflow: 'hidden',
  },
  saveNewCategoryButtonStyle: {
    width: getWidth(84),
  },
  listItemGapStyle: {
    marginLeft: getHeight(1.5),
  },
  addButtonElement: {
    width: getWidth(10),
    height: getHeight(5),
    borderRadius: getHeight(2),
    alignSelf: 'center',
    marginVertical: getHeight(1),
  },
  ListItemViewStyle: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  listItemStyle: {
    flex: 1,
    height: '100%',
    marginRight: getWidth(5),
  },
  plusTextStyle: {
    fontFamily: 'Lato',
    fontWeight: '400',
    fontSize: getFontSize(6.5),
    color: '#192126',
    lineHeight: 23,
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  plusViewStyle: {
    fontFamily: 'Lato',
    fontWeight: '400',
    fontSize: getFontSize(6),
    color: '#192126',
    lineHeight: 23,
    backgroundColor: '#36CC55',
    width: getWidth(11),
    height: getHeight(5),
    paddingVertical: getHeight(1.5),
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: getHeight(4.5),
  },
  uploadButtonStyle: {
    padding: getHeight(1.4),
    color: '#19212699',
    marginLeft: getHeight(1.3),
    fontFamily: 'Urbanist',
    fontWeight: '500',
    fontSize: getFontSize(4),
    textAlign: 'center',
  },
  selectedItemStyle: {
    width: getWidth(48),
    marginHorizontal: getHeight(0.3),
  },
  imageStyle: {
    marginTop: getHeight(1.4),
    width: getWidth(43),
    height: getHeight(19.2),
    borderTopRightRadius: getHeight(3.2),
    borderTopLeftRadius: getHeight(3.2),
  },
  imageUploadStyle: {
    marginTop: getHeight(0),
    width: getWidth(85),
    height: getHeight(25),
    borderRadius: getHeight(3.2),
    borderWidth: getHeight(0.3),
    borderColor: '#36CC55',
  },
  centeredView: {
    height: getWidth(100),
    width: getWidth(100),
    flex: 1,
    backgroundColor: 'rgba(25, 33, 38,0.3)',
    justifyContent: 'center',
  },
  modalView: {
    margin: getHeight(1.4),
    backgroundColor: 'white',
    borderRadius: getHeight(3.4),
    padding: getHeight(2),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: getHeight(0.4),
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  handleChoosePhotoStyle: {
    width: getWidth(85),
    height: getHeight(23),
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: getHeight(0.4),
    borderColor: '#36CC55',
    borderRadius: getHeight(3),
  },
  uploadImgStyle: {
    width: getWidth(10),
    height: getHeight(5),
    alignSelf: 'center',
  },
  addNewStyle: {
    textAlign: 'center',
    backgroundColor: '#D4DAE3',
    paddingVertical: getHeight(0.4),
    marginTop: getHeight(-0.6),
    marginHorizontal: getHeight(2),
    overflow: 'hidden',
    zIndex: -2,
    color: '#192126',
    fontFamily: 'Lato',
    fontWeight: Platform.OS === 'android' ? '700' : '600',
    lineHeight: getHeight(3.8),
    fontSize: getFontSize(3.5),
  },
  addNewViewStyle: {
    backgroundColor: '#D4DAE3',
    height: getHeight(3.9),
    width: getWidth(35),
    paddingVertical: getHeight(0.2),
    marginTop: getHeight(-2),
    marginHorizontal: getHeight(1.6),
    borderBottomLeftRadius: getHeight(5.5),
    borderBottomRightRadius: getHeight(3.5),
    overflow: 'hidden',
    zIndex: -2,
    lineHeight: getHeight(3.8),
    fontSize: getFontSize(4),
  },
  brandNameStyle: {
    textAlign: 'center',
    paddingVertical: getHeight(0.1),
    marginTop: getHeight(0.2),
    overflow: 'hidden',
    zIndex: -2,
    color: '#192126',
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: getFontSize(4.5),
    margin: getHeight(0.1),
  },
  brandNameViewStyle: {
    textAlign: 'left',
    backgroundColor: '#D4DAE3',
    width: getWidth(43),
    paddingVertical: getHeight(1),
    overflow: 'hidden',
    zIndex: -2,
    fontSize: getFontSize(4),
    borderBottomLeftRadius: getHeight(3.4),
    borderBottomRightRadius: getHeight(3.4),
  },
  editDeleteViewStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: getHeight(2),
    marginVertical: getHeight(1.4),
  },
  buttonDeleteStyle: {
    backgroundColor: '#EB001BE0',
    borderRadius: getHeight(1.4),
    paddingHorizontal: getHeight(1.5),
    paddingVertical: getHeight(1.2),
    alignSelf: 'center',
    width: getWidth(12),
    height: getHeight(5),
    marginHorizontal: getHeight(1.2),
  },
  buttonEditStyle: {
    backgroundColor: '#36CC55',
    alignSelf: 'center',
    borderRadius: getHeight(1.4),
    paddingHorizontal: getHeight(1.5),
    paddingVertical: getHeight(1.2),
    marginHorizontal: getHeight(1.4),
  },
  buttonTextStyle: {
    width: getWidth(6),
    height: getHeight(2.4),
  },
  flatlistViewStyle: {
    backgroundColor: '#f7f8fc',
    borderTopRightRadius: getHeight(3.4),
    borderTopLeftRadius: getHeight(3.4),
    paddingHorizontal: getHeight(1.7),
    marginTop: getHeight(-3.3),
    flex: 1,
  },
  parentFlatlistViewStyle: {
    height: getHeight(5.5),
    width: getWidth(90),
    borderTopRightRadius: getHeight(10),
    borderTopLeftRadius: getHeight(10),
    marginTop: getHeight(0.1),
    marginHorizontal: getHeight(2.4),
    paddingHorizontal: getHeight(3.4),
  },

  inputContainer: {
    borderWidth: 1,
    borderRadius: getHeight(1.4),
    borderColor: 'rgba(25, 33, 38, 0.4)',
    width: getWidth(85),
    height: getHeight(10.4),
    marginVertical: getHeight(1.8),
  },
  focusedInputContainer: {
    borderColor: 'rgba(25, 33, 38, 0.4)',
    borderWidth: 1,
    borderRadius: getHeight(1.8),
    width: getWidth(85),
    height: getHeight(10.3),
    marginVertical: getHeight(1.8),
  },
  labelTextStyle: {
    height: getHeight(2.8),
    top: getHeight(3.8),
    left: getHeight(2.8),
    fontSize: getFontSize(4),
    fontFamily: 'Lato',
    color: 'rgba(25, 33, 38, 0.4)',
    backgroundColor: 'white',
    zIndex: 99,
    width: getWidth(60),
  },
  focusedLabel: {
    fontSize: getFontSize(3.5),
    fontFamily: 'Lato',
    color: 'rgba(25, 33, 38, 0.4)',
    top: 10,
    left: 15,
    backgroundColor: 'white',
    zIndex: 99,
    width: getWidth(80),
  },
  inputStyleText: {
    textAlign: 'left',
    width: getWidth(80),
    paddingHorizontal: getHeight(2),
    paddingVertical: getHeight(1),
    marginVertical: getHeight(1),
    fontSize: getFontSize(4),
    fontWeight: '400',
    color: 'rgba(25, 33, 38, 1)',
    height: getHeight(6),
    borderRadius: getHeight(1),
    borderWidth: 1,
    borderColor: 'rgba(25, 33, 38, 0.4)',
  },
  focusedInput: {
    height: getHeight(6),
    marginVertical: getHeight(0),
    fontFamily: 'Lato',
    fontWeight: '400',
    fontSize: getFontSize(4),
    color: 'rgba(25, 33, 38, 1)',
  },
});
