import React, { useState, useCallback, useEffect }
  from 'react';
import
  {
    SafeAreaView,
    StatusBar,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Modal,
    TextInput
  } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

import TaskList from '../components/TaskList';
import styles from '../../global';

const AnimatableBtn =
  Animatable.createAnimatableComponent(TouchableOpacity);

export default function App() {

  const [task, setTask] = useState([]);
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState('');

  // Obtendo todas as tarefas ao iniciar o app
  useEffect(() => {
    async function loadTasks() {
      const taskStorage = await AsyncStorage.getItem('@task');

      if(taskStorage){
        setTask(JSON.parse(taskStorage));
      }
    }

    loadTasks();
  }, []);

  // Monitorar tasks, para salvar tarefas que foram alteradas
  useEffect(() => {
    async function saveTasks(){
      await AsyncStorage.setItem('@task', JSON.stringify(task));
    }

    saveTasks();
  }, [task]);

  function handleAdd() {
    if(input === '') return;

    const data = {
      key: input,
      task: input
    };

    setTask([...task, data]);
    setVisible(false);
    setInput('');
  }

  const handleDelete = useCallback((data) => {
    // Filtrar e retornar todos os itens com exceção do clicado
    const find = task.filter(result => result.key !== data.key);

    setTask(find);
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#1DB863"
        barStyle="light-content"
      />

      <View style={styles.content}>
        <Text style={styles.title}>Minhas tarefas</Text>
      </View>

      <FlatList
        marginHorizontal={10}
        showsHorizontalScrollIndicator={false}
        data={ task }
        keyExtractor={(item) => String(item.key)}
        renderItem={({ item }) =>
          <TaskList
            data={ item }
            handleDelete={ handleDelete }
          />
        }
      />

      {/* Modal -- Adicionar nova tarefa */}
      <Modal
        animationType="slide"
        transparent={false}
        translucent={false}
        visible={visible}
      >
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Ionicons
                style={{marginLeft: 5, marginRight: 5}}
                name="md-arrow-back"
                size={30}
                color="#1DB863"
              />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Nova tarefa</Text>
          </View>

          <Animatable.View
            style={styles.modalBody}
            useNativeDriver
            animation="fadeInUp"
          >
            <TextInput
              multiline={true}
              placeholder="O que precisa fazer hoje?"
              placeholderTextColor="#737373"
              autoCorrect={false}
              style={styles.modalInput}
              value={ input }
              onChangeText={(text) => setInput(text)}
            />

            <TouchableOpacity
              style={styles.modalAddBtn}
              onPress={ handleAdd }
            >
              <Text style={styles.modalAddText}>Cadastrar</Text>
            </TouchableOpacity>
          </Animatable.View>
        </SafeAreaView>
      </Modal>

      <AnimatableBtn
        style={styles.addBtn}
        useNativeDriver
        animation="fadeInUp"
        duration={2000}
        onPress={() => setVisible(true)}
      >
        <Ionicons
          name="ios-add"
          size={35}
          color="#FFF"
        />
      </AnimatableBtn>
    </SafeAreaView>
  );
};