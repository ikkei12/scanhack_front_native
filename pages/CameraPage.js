import React from "react";
import { Text, View, TouchableHighlight } from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import axios from "axios";
export default class CameraPage extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  async takePicture() {
    if (this.camera) {
      const pictureData = await this.camera.takePictureAsync({ base64: true });
      // console.log(pictureData.base64);
      // MediaLibrary.saveToLibraryAsync(pictureData.uri);
      console.log(pictureData.base64);

      // const A = axios.create({
      //   baseURL: "http://10.0.2.2:3000",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "X-Requested-With": "XMLHttpRequest",
      //   },
      // });
      await axios
        .post(
          "http://localhost:3000/test",
          { base64: pictureData.base64 },
          {
            headers: {
              "Content-Type": "application/json",
              "X-Requested-With": "XMLHttpRequest",
            },
          }
        )
        .then((res) => {
          console.log(res.data.massege);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.type}
            ref={(ref) => {
              this.camera = ref;
            }}
          >
            <TouchableHighlight
              style={{
                marginTop: 30,
                marginLeft: 20,
                justifyContent: "flex-start",
                alignSelf: "flex-start",
              }}
              underlayColor="#ccc"
              onPress={() => this.backToHome()}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Back</Text>
            </TouchableHighlight>
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              {/* <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: "flex-end",
                  alignItems: "center",
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}
              >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                >
                  Flip
                </Text>
              </TouchableOpacity> */}
              <TouchableHighlight
                style={{
                  borderRadius: 50,
                  height: 80,
                  width: 80,
                  marginBottom: 10,
                  backgroundColor: "#fff",
                  justifyContent: "center",
                  alignSelf: "flex-end",
                }}
                underlayColor="#ccc"
                onPress={() => this.takePicture()}
              >
                <View
                  style={{
                    borderRadius: 50,
                    height: 70,
                    width: 70,
                    borderColor: "#333",
                    borderWidth: "1px",
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                  underlayColor="#ccc"
                >
                  <Text></Text>
                </View>
              </TouchableHighlight>
              {/* <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: "flex-end",
                  alignItems: "center",
                }}
                onPress={() => this.takePicture()}
              >

                <Button
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 0,
                    marginBottom: 50,
                    border: "1px solid white",
                    backgroundColor: "white",
                  }}
                  title="a"
                ></Button>
              </TouchableOpacity> */}
            </View>
          </Camera>
        </View>
      );
    }
  }
}
// import React, { Component } from "react";
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { RNCamera } from "react-native-camera";

// const PendingView = () => (
//   <View
//     style={{
//       flex: 1,
//       backgroundColor: "lightgreen",
//       justifyContent: "center",
//       alignItems: "center",
//     }}
//   >
//     <Text>Waiting</Text>
//   </View>
// );

// export default class Home extends Component {
//   //コンストラクタ
//   constructor(props) {
//     super(props); //必ず呼ぶ
//     this.state = {
//       url: null,
//     };
//   }
//   render() {
//     let { url } = this.state; // ...(4)
//     return (
//       <View style={styles.container}>
//         <RNCamera
//           style={styles.preview}
//           type={RNCamera.Constants.Type.back}
//           captureAudio={false}
//           flashMode={RNCamera.Constants.FlashMode.on}
//           permissionDialogTitle={"Permission to use camera"}
//           permissionDialogMessage={
//             "We need your permission to use your camera phone"
//           }
//         >
//           {({ camera, status }) => {
//             if (status !== "READY") return <PendingView />;
//             return (
//               <View
//                 style={{
//                   flex: 0,
//                   flexDirection: "row",
//                   justifyContent: "center",
//                 }}
//               >
//                 <TouchableOpacity
//                   onPress={() => this.takePicture(camera)}
//                   style={styles.capture}
//                 >
//                   <Text style={{ fontSize: 14 }}> SNAP </Text>
//                 </TouchableOpacity>
//               </View>
//             );
//           }}
//         </RNCamera>
//       </View>
//     );
//   }

//   takePicture = async function (camera) {
//     const options = { quality: 0.5, base64: true, fixOrientation: true };
//     const data = await camera.takePictureAsync(options);
//     //  eslint-disable-next-linse
//     this.props.navigation.navigate("Conf", {
//       url: data.uri,
//       base64: data.base64,
//     });
//   };
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: "column",
//     backgroundColor: "aliceblue",
//   },
//   preview: {
//     flex: 1,
//     justifyContent: "flex-end",
//     alignItems: "center",
//   },
//   capture: {
//     flex: 0,
//     backgroundColor: "#fff",
//     borderRadius: 5,
//     padding: 15,
//     paddingHorizontal: 20,
//     alignSelf: "center",
//     margin: 20,
//   },
// });