import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

// Em produção, uma chave de API não deveria morar direto no código.
// Aqui deixamos direto no código para simplificar o estudo.
const API_KEY = "cv_U_G0aJrqnGS2FfbE2Sg38HmdafnUG83sa_BbfmUvyh95008WjFNjErgPivKPS7qO";

// Instância do axios com a API já autenticada.
const api = axios.create({
  baseURL: "https://api-ds.codeverse.dev.br",
  headers: {
    "x-api-key": API_KEY,
  },
});

// ---------- PUT: editar um jogo existente ----------
// Primeiro mostramos a lista de jogos.
// Ao tocar em um jogo, aparece o formulário preenchido.

export default function JogosEditarScreen() {
  const [jogos, setJogos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // null = mostra a lista
  // objeto = mostra o formulário de edição
  const [selecionado, setSelecionado] = useState(null);

  const [nome, setNome] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [genero, setGenero] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [descricao, setDescricao] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function buscarJogos() {
    setCarregando(true);
    setErro(null);

    try {
      const resposta = await api.get("/api/jogos", {
        params: { limit: 50 },
      });

      setJogos(resposta.data.data);
    } catch (e) {
      setErro(
        "Não foi possível carregar os jogos. Tente novamente em instantes."
      );
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarJogos();
  }, []);

  function selecionarJogo(jogo) {
    setSelecionado(jogo);

    setNome(jogo.title ?? "");
    setImagemUrl(jogo.imageUrl ?? "");
    setGenero(jogo.genero ?? "");
    setPlataforma(jogo.plataforma ?? "");
    setDescricao(jogo.descricao ?? "");
  }

  async function salvarEdicao() {
    if (!selecionado) return;

    if (!nome) {
      Alert.alert("Preencha pelo menos o nome do jogo.");
      return;
    }

    setSalvando(true);

    try {
      // PUT substitui o registro inteiro.
      // O ID vai na URL.
      const resposta = await api.put(`/api/jogos/${selecionado.id}`, {
        title: nome,
        imageUrl: imagemUrl,
        genero,
        plataforma,
        descricao,
      });

      Alert.alert(
        "Jogo atualizado!",
        resposta.data.data.title
      );

      setSelecionado(null);

      // Recarrega a lista com os dados atualizados.
      buscarJogos();
    } catch (e) {
      Alert.alert(
        "Não deu para atualizar o jogo",
        "A API respondeu com erro. Confira os campos e tente novamente."
      );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        
        <View style={styles.header}>
          <Text style={styles.tituloPagina}>🎮 Editar jogo</Text>
          <Text style={styles.subtitulo}>
            PUT /api/jogos/:id
          </Text>
        </View>

        {!selecionado && (
          <>
            <Text style={styles.instrucao}>
              Toque em um jogo para editar:
            </Text>

            {carregando && (
              <ActivityIndicator color="#D95D82" style={{ marginVertical: 16 }} />
            )}

            {erro && (
              <Text style={styles.erro}>{erro}</Text>
            )}

            {!carregando &&
              jogos.map((item) => (
                <Pressable
                  key={item.id}
                  style={styles.linha}
                  onPress={() => selecionarJogo(item)}
                >
                  <Text style={styles.linhaTitulo} numberOfLines={1}>
                    🎮 {item.title}
                  </Text>

                  <View style={styles.botaoEditarItem}>
                    <Text style={styles.botaoEditarItemTexto}>
                      Editar
                    </Text>
                  </View>
                </Pressable>
              ))}
          </>
        )}

        {selecionado && (
          <>
            <Pressable
              onPress={() => setSelecionado(null)}
              style={styles.voltar}
            >
              <Text style={styles.voltarTexto}>
                ‹ voltar para lista
              </Text>
            </Pressable>

            <Text style={styles.rotulo}>
              Nome do jogo
            </Text>

            <TextInput
              style={styles.campo}
              value={nome}
              onChangeText={setNome}
              placeholder="Ex: Minecraft"
              placeholderTextColor="#999"
            />

            <Text style={styles.rotulo}>
              URL da imagem
            </Text>

            <TextInput
              style={styles.campo}
              value={imagemUrl}
              onChangeText={setImagemUrl}
              placeholder="Ex: https://exemplo.com/jogo.jpg"
              placeholderTextColor="#999"
            />

            <Text style={styles.rotulo}>
              Gênero
            </Text>

            <TextInput
              style={styles.campo}
              value={genero}
              onChangeText={setGenero}
              placeholder="Ex: Aventura"
              placeholderTextColor="#999"
            />

            <Text style={styles.rotulo}>
              Plataforma
            </Text>

            <TextInput
              style={styles.campo}
              value={plataforma}
              onChangeText={setPlataforma}
              placeholder="Ex: PC, PlayStation, Xbox"
              placeholderTextColor="#999"
            />

            <Text style={styles.rotulo}>
              Descrição
            </Text>

            <TextInput
              style={[
                styles.campo,
                styles.campoDescricao,
              ]}
              value={descricao}
              onChangeText={setDescricao}
              placeholder="Digite uma descrição do jogo"
              placeholderTextColor="#999"
              multiline
            />

            <Pressable
              style={styles.botao}
              onPress={salvarEdicao}
              disabled={salvando}
            >
              <Text style={styles.botaoTexto}>
                {salvando
                  ? "Salvando..."
                  : "🎮 Salvar alterações"}
              </Text>
            </Pressable>
          </>
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
    marginBottom: 20,
  },

  tituloPagina: {
    fontSize: 26,
    fontWeight: "800",
    color: "#D95D82",
  },

  subtitulo: {
    fontSize: 14,
    color: "#495057",
    marginTop: 4,
  },

  instrucao: {
    fontSize: 15,
    color: "#495057",
    marginBottom: 10,
  },

  erro: {
    color: "#dc3545",
    marginTop: 12,
  },

  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },

  linhaTitulo: {
    fontSize: 16,
    fontWeight: "700",
    color: "#212529",
    flex: 1,
    marginRight: 10,
  },

  botaoEditarItem: {
    backgroundColor: "#D95D82",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  botaoEditarItemTexto: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  voltar: {
    marginBottom: 20,
  },

  voltarTexto: {
    color: "#D95D82",
    fontWeight: "700",
    fontSize: 15,
  },

  rotulo: {
    fontSize: 13,
    fontWeight: "700",
    color: "#495057",
    marginBottom: 5,
  },

  campo: {
    borderWidth: 1,
    borderColor: "#CED4DA",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 11,
    marginBottom: 14,
    backgroundColor: "#FFFFFF",
    color: "#212529",
  },

  campoDescricao: {
    minHeight: 100,
    textAlignVertical: "top",
  },

  botao: {
    backgroundColor: "#D95D82",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 6,
  },

  botaoTexto: {
    color: "white",
    fontWeight: "800",
    fontSize: 15,
  },
});