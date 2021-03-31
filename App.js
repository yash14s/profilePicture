import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import { RNCamera} from 'react-native-camera';

const LoadView = () => (
  <View
  style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }}
  >
    <Text 
    style={{
      fontSize: 30,
      color: 'red',
    }}
    >
      Loading Camera...
    </Text>
  </View>
)

const App = () => {
  const [image,setImage] = useState(null)

  const takePicture = async (camera) => {
    try {
      const options = {quality: 0.7,base64: false}
      const data = await camera.takePictureAsync(options)
      setImage(data.uri)
    }
    catch (error) {
      console.warn(error)
    }
  }
  return (
    <View style={styles.container}>
      {image ? (
        <View style={styles.preview}>
          <Text style={styles.camtext}>Here's your click</Text>
          <Image style={styles.clicked} source={{uri:image,width:'100%',height:'80%'}}/>
          <Button
          title='Click a new photo'
          onPress={() => {
            setImage(null)
          }}
          >
          </Button>
        </View> 
      ) : (
        <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.front}
        captureAudio={false}
        flashMode={RNCamera.Constants.FlashMode.auto}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'Please allow camera for this app',
          buttonPositive: 'Allow',
          buttonNegative: 'Deny',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use mic',
          message: 'Please allow mic for this app',
          buttonPositive: 'Allow',
          buttonNegative: 'Deny',
        }}
        >
          {({camera,status}) => {
            if(status!='READY') return <LoadView/>
            return(
              <View
              style={{
                flex: 0,
                flexDirection: 'row',
                justifyContent: 'center',
              }}
              >
                <TouchableOpacity
                style={styles.capture}
                onPress={() => takePicture(camera)}
                >
                  <Text>Click</Text>
                </TouchableOpacity>
              </View>
            )
          }}
        </RNCamera>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#0A79DF',
  },
  preview: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#DDD101',
    padding: 20,
    marginTop: 550,
    alignSelf: 'center',
    borderRadius: 250,
  },
  camtext: {
    backgroundColor: '#3498DB',
    color: '#FFFFFF',
    marginBottom: 10,
    width: '100%',
    textAlign: 'center',
    fontSize: 25,
  },
  clicked: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
})

export default App;
