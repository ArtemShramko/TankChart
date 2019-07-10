import React, {Component} from 'react';
import {Slider, View, Text, FlatList} from 'react-native';
import {
  convertCubicInchToGallons,
  totalCapacity,
  convertFeetToInch,
  calculateLiquidVolume,
  calculateFluidLevel,
} from './helpers';
import { tankData } from './tankData';
import { styles } from './styles';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      depthOfLiquid: 25,
      calculationDepth: 1,
      selectedTankHight: 132, // Static for now. ToDo: adjust max slider value based on tank selection feature
    };
  }

render() {
  return (
    <View style={styles.container}>
      <View style ={styles.inputLiquidLevelSection}>
        <Text style={styles.text}>Depth of liquid: {this.state.depthOfLiquid} inches</Text>
          <Slider maximumValue={this.state.selectedTankHight}
                  minimumValue="1" step="1" 
                  value={this.state.depthOfLiquid}
                  onValueChange={(depthOfLiquid) => this.setState({ depthOfLiquid })}
                  onSlidingComplete={(calculationDepth) => this.setState({ calculationDepth })} //fixes slider bug on old iOS devices and devices in low power mode
                  
          />
      </View>
      <View style ={styles.inputTankSizeSection}>
        <FlatList   data={tankData()}
          renderItem={({item}) => 
            <View style ={styles.mainGrid}>
              <Text style = {styles.tankStats}> {
                  convertCubicInchToGallons(totalCapacity(item.key[0], // calculate total Capacity
                  convertFeetToInch(item.key[1], item.key[2]))         // of the tank with given params
                  )}, Gal. 
                {item.key[0]}"x{item.key[1]}'{item.key[2]}"
              </Text>
              <Text style = {styles.fluidLevel}>
                {calculateFluidLevel(item.key[0], item.key[1], item.key[2], this.state.calculationDepth)}
              </Text>
            </View>}/>
      </View>
    </View>
    );
  }
}