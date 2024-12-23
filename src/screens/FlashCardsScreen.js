import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  SafeAreaView,
  useColorScheme,
  Image,
  Modal as ImageModal,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

const FlashCardsScreen = () => {
  const { currentUser, updateFlashCard, addFlashCard } = useAuth();
  const [activeTab, setActiveTab] = useState('active');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [cardTitle, setCardTitle] = useState('');
  const [cardContent, setCardContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const renderCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => {
        setEditingCard(item);
        setCardTitle(item.title);
        setCardContent(item.content);
        setModalVisible(true);
      }}
    >
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardContent}>{item.content}</Text>
      
      {item.image && (
        <TouchableOpacity 
          onPress={() => setSelectedImage(item.image)}
          style={styles.imageContainer}
        >
          <Image 
            source={{ uri: item.image }} 
            style={styles.cardImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}

      <Text style={styles.cardDate}>Created: {item.createdAt}</Text>
      
      <View style={styles.cardActions}>
        {activeTab === 'active' && (
          <>
            <TouchableOpacity 
              onPress={() => updateFlashCard(item.id, item, 'completed')}
              style={styles.actionButton}
            >
              <Text style={styles.actionText}>Complete</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => updateFlashCard(item.id, item, 'archived')}
              style={styles.actionButton}
            >
              <Text style={styles.actionText}>Archive</Text>
            </TouchableOpacity>
          </>
        )}
        {activeTab === 'completed' && (
          <>
            <TouchableOpacity 
              onPress={() => updateFlashCard(item.id, item, 'active')}
              style={styles.actionButton}
            >
              <Text style={styles.actionText}>Move to Active</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => updateFlashCard(item.id, item, 'archived')}
              style={styles.actionButton}
            >
              <Text style={styles.actionText}>Archive</Text>
            </TouchableOpacity>
          </>
        )}
        {activeTab === 'archived' && (
          <TouchableOpacity 
            onPress={() => updateFlashCard(item.id, item, 'active')}
            style={styles.actionButton}
          >
            <Text style={styles.actionText}>Move to Active</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  const handleSave = () => {
    if (editingCard) {
      updateFlashCard(editingCard.id, {
        ...editingCard,
        title: cardTitle,
        content: cardContent
      }, activeTab);
    } else {
      addFlashCard({
        title: cardTitle,
        content: cardContent
      });
    }
    setModalVisible(false);
    setEditingCard(null);
    setCardTitle('');
    setCardContent('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'active' && styles.activeTab]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'archived' && styles.activeTab]}
          onPress={() => setActiveTab('archived')}
        >
          <Text style={[styles.tabText, activeTab === 'archived' && styles.activeTabText]}>Archived</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={currentUser?.flashCards[activeTab] || []}
        renderItem={renderCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />

      {activeTab === 'active' && (
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => {
            setEditingCard(null);
            setCardTitle('');
            setCardContent('');
            setModalVisible(true);
          }}
        >
          <Text style={styles.addButtonText}>+ Create Flash Card</Text>
        </TouchableOpacity>
      )}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingCard ? 'Edit Flash Card' : 'Create New Flash Card'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              placeholderTextColor="#666"
              value={cardTitle}
              onChangeText={setCardTitle}
            />
            <TextInput
              style={[styles.input, styles.contentInput]}
              placeholder="Content"
              placeholderTextColor="#666"
              value={cardContent}
              onChangeText={setCardContent}
              multiline
            />
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSave}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ImageModal
        visible={!!selectedImage}
        transparent={true}
        onRequestClose={() => setSelectedImage(null)}
      >
        <TouchableOpacity 
          style={styles.imageModalContainer}
          activeOpacity={1}
          onPress={() => setSelectedImage(null)}
        >
          <Image 
            source={{ uri: selectedImage }} 
            style={styles.fullScreenImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </ImageModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  tabs: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    margin: 10,
  },
  tab: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    color: '#888',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  list: {
    padding: 10,
  },
  card: {
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 12,
    lineHeight: 24,
  },
  cardDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  actionButton: {
    marginLeft: 15,
    padding: 8,
    backgroundColor: '#3a3a3a',
    borderRadius: 6,
  },
  actionText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    margin: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#2a2a2a',
    margin: 20,
    padding: 25,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    color: '#fff',
    fontSize: 16,
  },
  contentInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#444',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  imageContainer: {
    marginVertical: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#3a3a3a',
  },
  imageModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: '100%',
    height: '80%',
  },
});

export default FlashCardsScreen; 