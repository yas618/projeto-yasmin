import { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const API_KEY =
  "cv_U_G0aJrqnGS2FfbE2Sg38HmdafnUG83sa_BbfmUvyh95008WjFNjErgPivKPS7qO";

const api = axios.create({
  baseURL: "https://api-ds.codeverse.dev.br",
  headers: {
    "x-api-key": API_KEY,
  },
});

export default function JogosBuscarScreen() {
  const [id, setId] = useState("");
  const [jogo, setJogo] = useState(null);
  const [buscando, setBuscando] = useState(false);
  const [erro, setErro] = useState(null);
  const [naoEncontrado, setNaoEncontrado] = useState(false);

  async function buscarPorId() {
    if (!id) {
      setErro("Digite um id pra buscar.");
      return;
    }

    Keyboard.dismiss();
    setBuscando(true);
    setErro(null);
    setNaoEncontrado(false);
    setJogo(null);

    try {
      const resposta = await api.get(`/api/jogos/${id}`);
      setJogo(resposta.data);
    } catch (e) {
      if (e.response && e.response.status === 404) {
        setNaoEncontrado(true);
      } else {
        setErro("Nao foi possivel buscar o jogo. Tenta de novo em instantes.");
      }
    } finally {
      setBuscando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.header}>
          <Text style={styles.tituloPagina}>Buscar jogo</Text>
          <Text style={styles.subtitulo}>GET /api/jogos/:id</Text>
        </View>

        <Text style={styles.rotulo}>Id do jogo</Text>
        <View style={styles.linhaBusca}>
          <TextInput
            style={styles.campo}
            value={id}
            onChangeText={setId}
            placeholder="Ex: 1"
            keyboardType="numeric"
          />
          <Pressable
            style={styles.botao}
            onPress={buscarPorId}
            disabled={buscando}
          >
            <Text style={styles.botaoTexto}>{buscando ? "..." : "Buscar"}</Text>
          </Pressable>
        </View>

        {buscando && (
          <ActivityIndicator
            style={{ marginVertical: 16 }}
            color="#D95D82"
          />
        )}

        {erro && <Text style={styles.erro}>{erro}</Text>}

        {naoEncontrado && (
          <Text style={styles.avisoNaoEncontrado}>
            Nenhum jogo encontrado com o id "{id}".
          </Text>
        )}

        {jogo && (
          <View style={styles.card}>
            {jogo.imageUrl ? (
              <Image source={{ uri: jogo.imageUrl }} style={styles.imagem} />
            ) : (
              <View style={styles.semImagem}>
                <Text style={styles.semImagemTexto}>IMG</Text>
              </View>
            )}

            <View style={styles.info}>
              <Text style={styles.titulo}>{jogo.title}</Text>
              <Text style={styles.categoria}>
                {jogo.genero} · {jogo.plataforma}
              </Text>
              <Text style={styles.ano}>
                {jogo.ano_lancamento} · {jogo.desenvolvedora}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  conteudo: {
    padding: 24,
    paddingBottom: 48,
  },
  header: {
    marginBottom: 16,
  },
  tituloPagina: {
    fontSize: 24,
    fontWeight: "800",
    color: "#D95D82",
  },
  subtitulo: {
    fontSize: 14,
    color: "#495057",
    marginTop: 2,
  },
  rotulo: {
    fontSize: 13,
    fontWeight: "700",
    color: "#495057",
    marginBottom: 5,
  },
  linhaBusca: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  campo: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CED4DA",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 11,
    backgroundColor: "#FFFFFF",
    color: "#212529",
  },
  botao: {
    backgroundColor: "#D95D82",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  botaoTexto: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  erro: {
    color: "#D95D82",
    marginTop: 12,
  },
  avisoNaoEncontrado: {
    color: "#495057",
    marginTop: 16,
    fontStyle: "italic",
  },
  card: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
    backgroundColor: "#FFFFFF",
    borderColor: "#CED4DA",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    paddingRight: 12,
  },
  imagem: {
    width: 88,
    height: 88,
    backgroundColor: "#FFEBEF",
  },
  semImagem: {
    width: 88,
    height: 88,
    backgroundColor: "#FFEBEF",
    justifyContent: "center",
    alignItems: "center",
  },
  semImagemTexto: {
    fontSize: 14,
    fontWeight: "700",
    color: "#D95D82",
  },
  info: {
    flex: 1,
    justifyContent: "center",
    gap: 2,
  },
  titulo: {
    fontSize: 16,
    fontWeight: "700",
    color: "#212529",
  },
  categoria: {
    fontSize: 13,
    color: "#495057",
  },
  ano: {
    fontSize: 12,
    color: "#6C757D",
  },
});