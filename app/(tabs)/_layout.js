import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        tabBarActiveTintColor: "#D95D82",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          headerTitle: "Projeto Base",
        }}
      />

      <Tabs.Screen
        name="aulas"
        options={{
          title: "Aulas",
          headerTitle: "Conteúdo",
        }}
      />

      <Tabs.Screen
        name="interface"
        options={{
          title: "Interface",
          headerTitle: "Interface",
        }}
      />

      <Tabs.Screen
        name="sobre"
        options={{
          title: "Sobre",
          headerTitle: "Sobre",
        }}
      />

      <Tabs.Screen
        name="api"
        options={{
          title: "API",
          headerTitle: "Conteúdo - API",
        }}
      />

      <Tabs.Screen
        name="buscar"
        options={{
          title: "Buscar",
          headerTitle: "Buscar Jogo",
        }}
      />

      <Tabs.Screen
        name="post"
        options={{
          title: "Post",
          headerTitle: "Cadastrar Jogo",
        }}
      />

      <Tabs.Screen
        name="delete"
        options={{
          title: "Delete",
          headerTitle: "Excluir Jogo",
        }}
      />

      <Tabs.Screen
        name="update"
        options={{
          title: "Update",
          headerTitle: "Atualizar Jogo",
        }}
      />
    </Tabs>
  );
}