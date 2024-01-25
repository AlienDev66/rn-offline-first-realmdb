import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Container, Header, Title, Form } from "./styles";
import uuid from "react-native-uuid";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { TextArea } from "../../components/TextArea";
import { IconButton } from "../../components/IconButton";
import { getRealm } from "../../database/realm";
import { Alert } from "react-native";

export function NewOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState("");
  const [equipment, setEquipment] = useState("");
  const [description, setDescription] = useState("");

  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  async function handleNewOrderRegister() {
    const realm = await getRealm();

    try {
      setIsLoading(true);
      const created = realm.write(() => {
        realm.create("Order", {
          _id: uuid.v4(),
          patrimony,
          equipment,
          description,
          status: "open",
          created_at: new Date(),
        });

        console.log(created);
      });

      Alert.alert("Chamado", "Chamado cadastrado com sucesso!");
      handleBack();
    } catch (error) {
      Alert.alert("Chamado", "Não foi possível abrir o chamado!");
    } finally {
      setIsLoading(false);
      realm.close();
    }
  }

  return (
    <Container>
      <Header>
        <Title>Novo chamado</Title>
        <IconButton icon="chevron-left" onPress={handleBack} />
      </Header>

      <Form>
        <Input placeholder="Número do Patrimônio" onChangeText={setPatrimony} />

        <Input placeholder="Equipamento" onChangeText={setEquipment} />

        <TextArea
          placeholder="Descrição"
          autoCorrect={false}
          onChangeText={setDescription}
        />
      </Form>

      <Button
        title="Enviar chamado"
        isLoading={isLoading}
        onPress={handleNewOrderRegister}
      />
    </Container>
  );
}
