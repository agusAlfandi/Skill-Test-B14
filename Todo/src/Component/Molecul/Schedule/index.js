import React, { PureComponent } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { Agenda, AgendaSchedule, DateData } from 'react-native-calendars';
import { Avatar, Card } from 'react-native-paper';

// interface State {
//   items?: AgendaSchedule;
// }

class Schedule extends React.PureComponent {
  state = {
    items: undefined,
  };

  render() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems}
        selected={'2017-05-16'}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
        rowHasChanged={this.rowHasChanged}
        initialNumToRender={7}
      />
    );
  }

  loadItems = (day) => {
    const items = this.state.items || {};

    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);

        if (!items[strTime]) {
          items[strTime] = [];

          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
              day: strTime,
            });
          }
        }
      }

      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      this.setState({
        items: newItems,
      });
    }, 1000);
  };

  renderItem = (reservation) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 10,
        }}
        onPress={() => Alert.alert(reservation.name)}
      >
        <Card>
          <Card.Content>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: 'green',
              }}
            >
              <Text style={{ fontSize: 15, color: 'black' }}>{reservation.name}</Text>
              <View style={{ paddingHorizontal: 10 }}>
                <Avatar.Text label="A" />
              </View>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
});

export default Schedule;
