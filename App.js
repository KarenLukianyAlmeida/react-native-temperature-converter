import { s } from "./App.style";
import { View, ImageBackground } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import hotBackground from "./assets/hot.png";
import coldBackground from "./assets/cold.png";
import { Input } from "./components/Input/Input.jsx";
import { useEffect, useState } from "react";
import { DisplayTemperature } from "./components/DisplayTemperature/DisplayTemperature.jsx";
import {
  convertTemperatureTo,
  getOppositeUnit,
  isIceTemperature,
} from "./utils/temperature.js";
import { ButtonConvert } from "./components/ButtonConvert/ButtonConvert.jsx";

export default function App() {
  const [inputValue, setInputValue] = useState(0);
  const [currentUnit, setCurrentUnit] = useState("ºC");
  const [currentBackground, setCurrentBackground] = useState(coldBackground);
  const oppositeUnit = getOppositeUnit(currentUnit);

  useEffect(() => {
    const isCold = isIceTemperature(inputValue, currentUnit);

    setCurrentBackground(isCold ? coldBackground : hotBackground);
  }, [inputValue, currentUnit]);

  function getConvertedTemperature() {
    if (isNaN(inputValue)) {
      return "";
    } else {
      return convertTemperatureTo(inputValue, oppositeUnit).toFixed(1);
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={s.root} edges={["left", "right"]}>
        <ImageBackground
          source={currentBackground}
          resizeMode="cover"
          style={s.backgroundImage}
        >
          <View style={s.workspace}>
            <DisplayTemperature
              unit={oppositeUnit}
              temperature={getConvertedTemperature()}
            />
            <Input
              unit={currentUnit}
              onChange={setInputValue}
              defaultValue={0}
            />
            <ButtonConvert
              onPress={() => {
                setCurrentUnit(oppositeUnit);
              }}
              unit={currentUnit}
            />
          </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
