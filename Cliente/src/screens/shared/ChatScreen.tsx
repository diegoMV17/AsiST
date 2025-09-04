import React, { useEffect, useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import io, { Socket } from "socket.io-client";

const SOCKET_URL = "*"; 

type Message = {
  senderId: string;
  text: string;
  tripId: string;
};

type ChatScreenRoute = {
  params: {
    tripId: string;
    userId: string;
  };
};

export default function ChatScreen({ route }: { route: ChatScreenRoute }) {
  const { tripId, userId } = route.params;
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(SOCKET_URL, { transports: ["websocket"] });
    socketRef.current = socket;

    socket.emit("joinRoom", tripId);

    const handleReceiveMessage = (message: Message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.emit("leaveRoom", tripId);
      socket.disconnect();
    };
  }, [tripId]);

  const sendMessage = () => {
    if (!text.trim() || !socketRef.current) return;
    const newMessage = { tripId, senderId: userId, text };
    socketRef.current.emit("sendMessage", newMessage);
    setText("");
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={item.senderId === userId ? styles.myMsg : styles.otherMsg}>
            <Text style={styles.sender}>{item.senderId}</Text>
            <Text>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
      />
      <View style={styles.inputRow}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Escribe..."
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
          <Text style={{ color: "#fff" }}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: "#fff",
  },
  sendBtn: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
  },
  myMsg: {
    alignSelf: "flex-end",
    backgroundColor: "#dbeafe",
    borderRadius: 10,
    marginVertical: 2,
    padding: 8,
    maxWidth: "80%",
  },
  otherMsg: {
    alignSelf: "flex-start",
    backgroundColor: "#f3f4f6",
    borderRadius: 10,
    marginVertical: 2,
    padding: 8,
    maxWidth: "80%",
  },
  sender: {
    fontSize: 10,
    color: "#64748b",
    marginBottom: 2,
  },
});
