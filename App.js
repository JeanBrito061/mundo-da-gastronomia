import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

// -------------------------------------------------------------
// DADOS
// -------------------------------------------------------------
const img = (id, w = 600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const BANNER = img('photo-1504674900247-0877df9cc836', 900);

const PRATOS = [
  {
    id: '1',
    nome: 'Pizza Margherita',
    subtitulo: 'Pizza • Itália',
    imagem: img('photo-1513104890138-7c749659a591'),
    descricao: "A Pizza Margherita nasceu em Nápoles, na Itália, em 1889, criada em homenagem à rainha Margherita de Savoia. Leva molho de tomate, mussarela de búfala e folhas de manjericão fresco, que representam as cores da bandeira italiana. Assada em forno a lenha, tem massa fina e bordas aeradas.",
    info: [
      ['Origem', 'Nápoles, Itália'],
      ['Tempo de preparo', '25 min.'],
      ['Calorias (fatia)', '250 kcal'],
      ['Preço médio', 'R$ 65,00'],
    ],
    relacionados: [
      { nome: 'Pizza Pepperoni', data: 'Clássica americana', imagem: img('photo-1628840042765-356cda07504e', 200) },
      { nome: 'Pizza de Forno a Lenha', data: 'Estilo napolitano', imagem: img('photo-1565299624946-b28f40a0ae38', 200) },
      { nome: 'Pizza Rústica', data: 'Massa artesanal', imagem: img('photo-1574071318508-1cdbab80d002', 200) },
    ],
  },
  {
    id: '2',
    nome: 'Hambúrguer Artesanal',
    subtitulo: 'Lanche • Estados Unidos',
    imagem: img('photo-1568901346375-23c9450c58cd'),
    descricao: "O hambúrguer artesanal é preparado com carne bovina moída na hora, temperada apenas com sal e pimenta e grelhada no ponto desejado. Servido em pão brioche macio, recebe queijo cheddar derretido, alface, tomate, cebola caramelizada e um molho especial da casa, acompanhado de batatas crocantes.",
    info: [
      ['Origem', 'Estados Unidos'],
      ['Tempo de preparo', '20 min.'],
      ['Calorias (unidade)', '650 kcal'],
      ['Preço médio', 'R$ 42,00'],
    ],
    relacionados: [
      { nome: 'Cheeseburger Duplo', data: 'Dois blends de carne', imagem: img('photo-1550547660-d9450f859349', 200) },
      { nome: 'Combo com Fritas', data: 'Batatas rústicas', imagem: img('photo-1571091718767-18b5b1457add', 200) },
      { nome: 'Smash Burger', data: 'Carne prensada na chapa', imagem: img('photo-1568901346375-23c9450c58cd', 200) },
    ],
  },
  {
    id: '3',
    nome: 'Bolo de Chocolate',
    subtitulo: 'Sobremesa • Internacional',
    imagem: img('photo-1578985545062-69928b1d9587'),
    descricao: "O bolo de chocolate é uma das sobremesas mais amadas do mundo. Feito com cacau de qualidade, ovos, manteiga e açúcar, tem massa fofinha e úmida. Coberto por uma ganache cremosa e brilhante, combina perfeitamente com uma bola de sorvete de creme ou frutas vermelhas frescas.",
    info: [
      ['Origem', 'Europa / Américas'],
      ['Tempo de preparo', '60 min.'],
      ['Calorias (fatia)', '420 kcal'],
      ['Preço médio', 'R$ 18,00'],
    ],
    relacionados: [
      { nome: 'Sorvete Artesanal', data: 'Vários sabores', imagem: img('photo-1563805042-7684c019e1cb', 200) },
      { nome: 'Taça de Sobremesa', data: 'Camadas cremosas', imagem: img('photo-1551024506-0bccd828d307', 200) },
      { nome: 'Bolo de Frutas', data: 'Com frutas frescas', imagem: img('photo-1565958011703-44f9829ba187', 200) },
    ],
  },
  {
    id: '4',
    nome: 'Spaghetti à Carbonara',
    subtitulo: 'Massa • Roma, Itália',
    imagem: img('photo-1621996346565-e3dbc646d9a9'),
    descricao: "O Spaghetti à Carbonara é um clássico da culinária romana. A receita tradicional usa apenas massa, guanciale crocante, gemas de ovo, queijo pecorino romano e pimenta-do-reino moída na hora. O segredo está em misturar tudo fora do fogo, formando um creme sedoso sem usar creme de leite.",
    info: [
      ['Origem', 'Roma, Itália'],
      ['Tempo de preparo', '30 min.'],
      ['Calorias (prato)', '580 kcal'],
      ['Preço médio', 'R$ 55,00'],
    ],
    relacionados: [
      { nome: 'Penne ao Sugo', data: 'Molho de tomate fresco', imagem: img('photo-1473093295043-cdd812d0e601', 200) },
      { nome: 'Talharim ao Pesto', data: 'Manjericão e azeite', imagem: img('photo-1563379926898-05f4575a45d8', 200) },
      { nome: 'Massa da Casa', data: 'Receita do chef', imagem: img('photo-1621996346565-e3dbc646d9a9', 200) },
    ],
  },
  {
    id: '5',
    nome: 'Coquetéis Clássicos',
    subtitulo: 'Bebidas • Mundo',
    imagem: img('photo-1514362545857-3bc16c4c7d1b'),
    descricao: "Os coquetéis clássicos unem destilados, frutas, açúcar e gelo em combinações equilibradas e refrescantes. Entre os mais famosos estão a caipirinha brasileira, feita com cachaça e limão, e o mojito cubano, que leva rum, hortelã e água com gás. São ideais para acompanhar boas refeições.",
    info: [
      ['Origem', 'Brasil, Cuba e outros'],
      ['Tempo de preparo', '5 min.'],
      ['Calorias (copo)', '180 kcal'],
      ['Preço médio', 'R$ 28,00'],
    ],
    relacionados: [
      { nome: 'Drinks Coloridos', data: 'Frutas tropicais', imagem: img('photo-1544145945-f90425340c7e', 200) },
      { nome: 'Coquetel Cítrico', data: 'Refrescante', imagem: img('photo-1551538827-9c037cb4f32a', 200) },
      { nome: 'Drink da Casa', data: 'Receita exclusiva', imagem: img('photo-1514362545857-3bc16c4c7d1b', 200) },
    ],
  },
];

// -------------------------------------------------------------
// COMPONENTES REUTILIZÁVEIS
// -------------------------------------------------------------

function Cabecalho({ titulo, onVoltar }) {
  return (
    <View style={styles.header}>
      {onVoltar ? (
        <TouchableOpacity onPress={onVoltar} style={styles.headerVoltar}>
          <Text style={styles.headerSeta}>←</Text>
        </TouchableOpacity>
      ) : null}
      <Text style={styles.headerTitulo}>{titulo}</Text>
    </View>
  );
}

function ItemCard({ imagem, titulo, subtitulo, onPress }) {
  return (
    <TouchableOpacity style={styles.itemCard} onPress={onPress} activeOpacity={0.7}>
      <Image source={{ uri: imagem }} style={styles.itemFoto} />
      <View style={styles.itemTextos}>
        <Text style={styles.itemTitulo}>{titulo}</Text>
        <Text style={styles.itemSubtitulo}>{subtitulo}</Text>
      </View>
      <Text style={styles.itemSeta}>›</Text>
    </TouchableOpacity>
  );
}

// -------------------------------------------------------------
// PARTE 1 — Lista
// -------------------------------------------------------------
function TelaLista({ onAbrirPrato, onAbrirForm }) {
  const Topo = (
    <View>
      <Image source={{ uri: BANNER }} style={styles.banner} />
      <Text style={styles.bannerTexto}>
        Sabores do mundo inteiro: pizzas, hambúrgueres, sobremesas, massas e bebidas.
      </Text>
      <TouchableOpacity style={styles.botaoForm} onPress={onAbrirForm}>
        <Text style={styles.botaoFormTexto}>📝 Avaliar experiência (Formulário)</Text>
      </TouchableOpacity>
      <Text style={styles.secaoTitulo}>Pratos</Text>
    </View>
  );

  return (
    <FlatList
      data={PRATOS}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={Topo}
      contentContainerStyle={styles.conteudo}
      renderItem={({ item }) => (
        <ItemCard
          imagem={item.imagem}
          titulo={item.nome}
          subtitulo={item.subtitulo}
          onPress={() => onAbrirPrato(item)}
        />
      )}
    />
  );
}

// -------------------------------------------------------------
// PARTE 2 — Detalhes
// -------------------------------------------------------------
function TelaDetalhe({ prato }) {
  return (
    <ScrollView contentContainerStyle={styles.conteudo}>
      {/* Card principal */}
      <View style={styles.card}>
        <Image source={{ uri: prato.imagem }} style={styles.detalheFoto} />
        <Text style={styles.detalheNome}>{prato.nome}</Text>
        <Text style={styles.detalheDescricao}>{prato.descricao}</Text>
      </View>

      {/* Informações */}
      <View style={[styles.card, styles.cardInfo]}>
        {prato.info.map(([rotulo, valor]) => (
          <Text key={rotulo} style={styles.infoLinha}>
            {rotulo}: {valor}
          </Text>
        ))}
      </View>

      {/* Relacionados */}
      <Text style={styles.secaoVermelha}>Relacionados</Text>
      {prato.relacionados.map((rel) => (
        <ItemCard
          key={rel.nome}
          imagem={rel.imagem}
          titulo={rel.nome}
          subtitulo={rel.data}
          onPress={() => Alert.alert(rel.nome, rel.data)}
        />
      ))}
    </ScrollView>
  );
}

// -------------------------------------------------------------
// PARTE 3 — Formulário
// -------------------------------------------------------------
function TelaFormulario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cidade, setCidade] = useState('');
  const [comentario, setComentario] = useState('');
  const [pratoFavorito, setPratoFavorito] = useState('pizza');
  const [refeicao, setRefeicao] = useState('almoco');
  const [nota, setNota] = useState(5);
  const [orcamento, setOrcamento] = useState(50);
  const [vegetariano, setVegetariano] = useState(false);
  const [newsletter, setNewsletter] = useState(true);


  const enviar = () => {
    Alert.alert(
      'Resumo da avaliação',
      `Nome: ${nome || '-'}\n` +
        `E-mail: ${email || '-'}\n` +
        `Cidade: ${cidade || '-'}\n` +
        `Comentário: ${comentario || '-'}\n` +
        `Prato favorito: ${pratoFavorito}\n` +
        `Refeição: ${refeicao}\n` +
        `Nota: ${nota}/10\n` +
        `Orçamento: R$ ${orcamento}\n` +
        `Vegetariano: ${vegetariano ? 'Sim' : 'Não'}\n` +
        `Newsletter: ${newsletter ? 'Sim' : 'Não'}`
    );
  };


  const limpar = () => {
    setNome('');
    setEmail('');
    setCidade('');
    setComentario('');
    setPratoFavorito('pizza');
    setRefeicao('almoco');
    setNota(5);
    setOrcamento(50);
    setVegetariano(false);
    setNewsletter(true);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          {/* Título */}
          <Text style={styles.formTitulo}>Avalie sua experiência gastronômica</Text>

          {/* TextInputs */}
          <Text style={styles.rotulo}>Nome</Text>
          <TextInput style={styles.input} placeholder="Seu nome" value={nome} onChangeText={setNome} />

          <Text style={styles.rotulo}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="seu@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.rotulo}>Cidade</Text>
          <TextInput style={styles.input} placeholder="Sua cidade" value={cidade} onChangeText={setCidade} />

          <Text style={styles.rotulo}>Comentário</Text>
          <TextInput
            style={[styles.input, styles.inputMultilinha]}
            placeholder="Conte como foi sua experiência"
            multiline
            value={comentario}
            onChangeText={setComentario}
          />

          {/* Pickers */}
          <Text style={styles.rotulo}>Prato favorito</Text>
          <View style={styles.pickerBox}>
            <Picker selectedValue={pratoFavorito} onValueChange={setPratoFavorito}>
              <Picker.Item label="Pizza" value="pizza" />
              <Picker.Item label="Hambúrguer" value="hamburguer" />
              <Picker.Item label="Sobremesa" value="sobremesa" />
              <Picker.Item label="Massa" value="massa" />
              <Picker.Item label="Bebida" value="bebida" />
            </Picker>
          </View>

          <Text style={styles.rotulo}>Refeição preferida</Text>
          <View style={styles.pickerBox}>
            <Picker selectedValue={refeicao} onValueChange={setRefeicao}>
              <Picker.Item label="Café da manhã" value="cafe" />
              <Picker.Item label="Almoço" value="almoco" />
              <Picker.Item label="Lanche da tarde" value="lanche" />
              <Picker.Item label="Jantar" value="jantar" />
            </Picker>
          </View>

          {/* Sliders */}
          <Text style={styles.rotulo}>Nota geral: {nota}/10</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={10}
            step={1}
            value={nota}
            onValueChange={setNota}
            minimumTrackTintColor="#d32f2f"
            thumbTintColor="#d32f2f"
          />

          <Text style={styles.rotulo}>Orçamento por refeição: R$ {orcamento}</Text>
          <Slider
            style={styles.slider}
            minimumValue={10}
            maximumValue={200}
            step={10}
            value={orcamento}
            onValueChange={setOrcamento}
            minimumTrackTintColor="#d32f2f"
            thumbTintColor="#d32f2f"
          />

          {/* Switches */}
          <View style={styles.linhaSwitch}>
            <Text style={styles.rotuloSwitch}>Sou vegetariano(a)</Text>
            <Switch value={vegetariano} onValueChange={setVegetariano} />
          </View>
          <View style={styles.linhaSwitch}>
            <Text style={styles.rotuloSwitch}>Receber novidades por e-mail</Text>
            <Switch value={newsletter} onValueChange={setNewsletter} />
          </View>

          {/* Botões */}
          <View style={styles.linhaBotoes}>
            <TouchableOpacity style={[styles.botao, styles.botaoEnviar]} onPress={enviar}>
              <Text style={styles.botaoTexto}>Enviar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.botao, styles.botaoLimpar]} onPress={limpar}>
              <Text style={[styles.botaoTexto, { color: '#333' }]}>Limpar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// -------------------------------------------------------------
// APP
// -------------------------------------------------------------
export default function App() {
  const [tela, setTela] = useState('home'); 
  const [pratoSelecionado, setPratoSelecionado] = useState(null);

  const voltar = () => setTela('home');

  let titulo = 'Mundo da Gastronomia';
  let conteudo = (
    <TelaLista
      onAbrirPrato={(prato) => {
        setPratoSelecionado(prato);
        setTela('detalhe');
      }}
      onAbrirForm={() => setTela('form')}
    />
  );

  if (tela === 'detalhe' && pratoSelecionado) {
    titulo = 'Detalhes';
    conteudo = <TelaDetalhe prato={pratoSelecionado} />;
  } else if (tela === 'form') {
    titulo = 'Formulário';
    conteudo = <TelaFormulario />;
  }

  return (
    <SafeAreaView style={styles.tela}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Cabecalho titulo={titulo} onVoltar={tela !== 'home' ? voltar : null} />
      {conteudo}
    </SafeAreaView>
  );
}

// -------------------------------------------------------------
// ESTILOS
// -------------------------------------------------------------
const sombra = {
  shadowColor: '#000',
  shadowOpacity: 0.08,
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 2 },
  elevation: 2,
};

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  conteudo: { padding: 12, paddingBottom: 32 },


  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerVoltar: { paddingRight: 16, paddingVertical: 8 },
  headerSeta: { fontSize: 24, color: '#222' },
  headerTitulo: { fontSize: 18, fontWeight: '600', color: '#222' },

  
  banner: { width: '100%', height: 180, borderRadius: 12, backgroundColor: '#ddd' },
  bannerTexto: { fontSize: 14, color: '#555', marginTop: 8 },
  botaoForm: {
    marginTop: 12,
    backgroundColor: '#d32f2f',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoFormTexto: { color: '#fff', fontWeight: '600', fontSize: 15 },
  secaoTitulo: { fontSize: 22, color: '#222', marginTop: 16, marginBottom: 8 },

  
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    ...sombra,
  },
  itemFoto: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#ddd' },
  itemTextos: { flex: 1, marginLeft: 12 },
  itemTitulo: { fontSize: 16, color: '#222' },
  itemSubtitulo: { fontSize: 13, color: '#555', marginTop: 4 },
  itemSeta: { fontSize: 28, color: '#444', paddingHorizontal: 6 },


  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    ...sombra,
  },
  detalheFoto: { width: '100%', height: 220, borderRadius: 10, backgroundColor: '#ddd' },
  detalheNome: { fontSize: 22, color: '#222', marginTop: 8 },
  detalheDescricao: { fontSize: 14, color: '#333', lineHeight: 20, marginTop: 4 },
  cardInfo: { paddingVertical: 14, paddingHorizontal: 14 },
  infoLinha: { fontSize: 14, color: '#333', marginBottom: 4 },
  secaoVermelha: {
    color: '#d32f2f',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '600',
  },

 
  formTitulo: { fontSize: 20, fontWeight: '700', color: '#222', marginBottom: 8 },
  rotulo: { fontSize: 14, color: '#444', marginTop: 12, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 15,
    backgroundColor: '#fafafa',
  },
  inputMultilinha: { height: 80, textAlignVertical: 'top' },
  pickerBox: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    backgroundColor: '#fafafa',
    overflow: 'hidden',
  },
  slider: { width: '100%', height: 40 },
  linhaSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  rotuloSwitch: { fontSize: 14, color: '#444', flex: 1 },
  linhaBotoes: { flexDirection: 'row', marginTop: 20 },
  botao: { flex: 1, paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  botaoEnviar: { backgroundColor: '#d32f2f', marginRight: 6 },
  botaoLimpar: { backgroundColor: '#e0e0e0', marginLeft: 6 },
  botaoTexto: { color: '#fff', fontWeight: '600', fontSize: 15 },
});
