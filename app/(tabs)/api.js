import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

const API_KEY =
  "cv_U_G0aJrqnGS2FfbE2Sg38HmdafnUG83sa_BbfmUvyh95008WjFNjErgPivKPS7qO";

const api = axios.create({
  baseURL: "https://api-ds.codeverse.dev.br",
  headers: {
    "x-api-key": API_KEY,
  },
});

export default function JogosListarScreen() {
  const [jogos, setJogos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  async function buscarJogos() {
    setCarregando(true);
    setErro(null);

    try {
      const resposta = await api.get("/api/jogos", {
        params: {
          limit: 50,
        },
      });

      setJogos(resposta.data.data);
    } catch (error) {
      console.log(error);
      setErro("Não foi possível carregar os jogos.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarJogos();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.header}>
          <Text style={styles.tituloPagina}>Listar jogos</Text>
          <Text style={styles.subtitulo}>GET /api/jogos</Text>
        </View>

        {carregando && (
          <ActivityIndicator style={{ marginVertical: 16 }} />
        )}

        {erro && <Text style={styles.erro}>{erro}</Text>}

        {!carregando &&
          !erro &&
          jogos.map((jogo) => (
            <View key={jogo.id} style={styles.card}>
              <Image
                source={{ uri: jogo.imageUrl }}
                style={styles.imagem}
              />

              <View style={styles.info}>
                <Text style={styles.titulo}>
                  {jogo.title}
                </Text>

                <Text style={styles.descricao}>
                  {jogo.description}
                </Text>

                <Text style={styles.categoria}>
                  {jogo.category} · {jogo.year}
                </Text>
              </View>
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fbff",
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
    color: "#102542",
  },

  subtitulo: {
    fontSize: 14,
    color: "#5f6b7a",
    marginTop: 2,
  },

  erro: {
    color: "#c62828",
    marginTop: 12,
  },

  card: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    paddingRight: 12,
  },

  imagem: {
    width: 90,
    height: 90,
  },

  info: {
    flex: 1,
    justifyContent: "center",
  },

  titulo: {
    fontSize: 17,
    fontWeight: "700",
    color: "#102542",
  },

  descricao: {
    fontSize: 13,
    color: "#475569",
    marginTop: 4,
  },

  categoria: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 5,
  },
});