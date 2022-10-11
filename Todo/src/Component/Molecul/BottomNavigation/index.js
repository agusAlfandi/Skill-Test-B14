import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Home, Setting, Task} from '../../../Assets';

// const Icon = ({label}) => {
//   switch (label) {
//     case 'Home':
//       return <Home />;
//     case 'Task':
//       return <Task />;
//     case 'Settings':
//       return <Setting />;
//     default:
//       return <Home />;
//   }
// };

const ButtomNavigation = ({state, descriptors, navigation}) => {
  // const focusedOptions = descriptors[state.routes[state.index].key].options;

  // if (focusedOptions.tabBarVisible === false) {
  //   return null;
  // }
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'green',
        height: 83,
        alignItems: 'center',
        paddingHorizontal: 60,
        paddingRight: 0,
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1}}>
            <Text style={{color: isFocused ? '#673ab7' : '#222'}}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
export default ButtomNavigation;
