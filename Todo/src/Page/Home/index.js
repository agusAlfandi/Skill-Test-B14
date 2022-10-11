import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Header } from '../../Component';
import { getData, storeData } from '../../Utils';
import uuid from 'react-native-uuid';
import moment from 'moment';

const Home = ({ onPress }) => {
  const [text, setText] = useState('');
  const [todos, setTodo] = useState([]);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [type, setType] = useState('newData');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState({});
  const refInput = useRef();

  // const login = route.params;
  // console.log('params: ', login);

  useEffect(() => {
    getData('todos').then((res) => {
      // const data = res.map((item) => {
      //   console.log(date.toLocaleString());
      //   return { ...item };
      // });
      setTodo(res);
      console.log('data local 1 :', res);
    });
  }, []);

  useEffect(() => {
    storeData('todos', todos);
  }, [todos]);

  const addTodo = () => {
    if (text == '') {
      Alert.alert('Warning', 'Please Write Your Task');
    } else {
      showDatepicker();
    }
  };

  const onChange = (event, selectedDate) => {
    // console.log('event :', event);
    const currentDate = selectedDate;

    if (event.type === 'dismissed') return;
    setShow(false);
    setDate(currentDate);

    if (mode === 'date') {
      showTimepicker();
    } else if (type === 'newData') {
      alert('New Data');

      setTodo((value) => [
        ...value,
        { id: uuid.v4(), date: moment(currentDate).format('dddd, MMM DD YYYY, h:mm a'), text },
      ]);
      setText('');
      setTodo(value);
    } else if (type === 'Update') {
      alert('update');

      const newTodo = todos.map((item) => {
        if (item.id == selected) {
          return {
            ...item,
            id: uuid.v4(),
            text,
            date: moment(currentDate).format('dddd, MMM DD YYYY, h:mm a'),
          };
          // const data = {
          //   ...item,
          //   id: uuid.v4(),
          //   text,
          //   date: currentDate,
          // };
          // return data;
        } else {
          return item;
        }
      });
      setTodo(newTodo);
      setText('');
      // console.log('data update', newTodo);
      setType('newData');
    }
  };

  const showMode = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow(true);
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const deleteTodo = (id) => {
    console.log(id);
    Alert.alert('Warning', 'Are you seru want delete this ?', [
      { text: 'No' },
      { text: 'Yes', onPress: () => setTodo(todos.filter((items) => items.id !== id)) },
    ]);
  };

  const updateTodo = (data) => {
    setText(data.text);
    setSelected(data.id);
    setType('Update');
  };

  return (
    <View style={{ flex: 1 }}>
      <Header onPress={onPress} />
      <View style={styles.wrapperSearch}>
        <View style={styles.search}>
          <TextInput
            style={{ color: 'black' }}
            placeholderTextColor="black"
            placeholder="Type text to search"
            value={search}
            onChangeText={(value) => setSearch(value)}
          />
        </View>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          onChange={onChange}
          // display: 'default',
          mode={mode}
          is24Hour={true}
          dateFormat="dayofweek day month"
        />
      )}

      <ScrollView
        ref={refInput}
        onContentSizeChange={() => refInput.current.scrollToEnd({ animated: true })}
        style={styles.list}
      >
        {todos
          .filter(
            (data) =>
              data.text.toLowerCase().includes(search) || data.text.toUpperCase().includes(search)
          )
          .map((items) => (
            <View key={items.id} style={styles.output}>
              <ScrollView style={styles.task}>
                <Text style={{ color: 'black' }}>{items.date.toLocaleString()}</Text>
                <Text style={{ color: 'black' }}>{items.text}</Text>
              </ScrollView>
              <View style={styles.icon}>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'green',
                    alignItems: 'center',
                    paddingVertical: 5,
                    borderRadius: 8,
                  }}
                  onPress={() => updateTodo(items)}
                >
                  <FontAwesomeIcon icon={faEdit} size={23} style={styles.iconDelete} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'red',
                    alignItems: 'center',
                    paddingVertical: 5,
                    borderRadius: 8,
                    paddingHorizontal: 8,
                  }}
                  onPress={() => deleteTodo(items.id)}
                >
                  <FontAwesomeIcon icon={faDeleteLeft} size={23} style={styles.iconDelete} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
      </ScrollView>
      <View style={styles.input}>
        <View style={styles.inputText}>
          <TextInput
            style={{ color: 'black' }}
            placeholderTextColor="black"
            placeholder="Write Your Task"
            value={text}
            onChangeText={(value) => setText(value)}
          />
        </View>
        <TouchableOpacity style={styles.tambah} onPress={addTodo} type="newData">
          <Text style={{ color: 'black' }}>Tambah</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  wrapperSearch: { padding: 5 },
  search: { borderWidth: 1, borderRadius: 5 },
  subTitle: { fontSize: 20, fontWeight: '900', color: '#FABE2C' },
  list: {
    flex: 1,
    padding: 10,
  },
  output: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 100,
    backgroundColor: 'white',
    marginVertical: 5,
    padding: 8,
    borderRadius: 10,
    elevation: 3,
    padding: 10,
  },
  task: { width: '85%', paddingLeft: 10, overflow: 'scroll', color: 'black' },
  icon: { justifyContent: 'space-between' },
  iconDelete: { color: 'white' },
  outputList: { flexDirection: 'row' },
  input: { flexDirection: 'row', padding: 5 },
  inputText: { flex: 1, borderWidth: 1, color: '#e0e0e0', borderRadius: 5 },
  tambah: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    borderWidth: 1,
    color: '#e0e0e0',
    borderRadius: 5,
  },
});
