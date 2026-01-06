"use client"

import { useState } from "react"
import { Search, Heart, Clock, ChefHat, Cookie, Coffee, IceCream, Wine, X, ArrowLeft, Circle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type Category = "Todas" | "Comidas" | "Sobremesas" | "Drinks" | "Doces" | "Bolos" | "Fitness"

interface Recipe {
  id: number
  name: string
  category: Category
  time: string
  difficulty: string
  image: string
  ingredients: string[]
  instructions: string[]
  isFavorite: boolean
  isFitness?: boolean
}

const recipes: Recipe[] = [
  {
    id: 1,
    name: "Macarrão ao Alho e Óleo",
    category: "Comidas",
    time: "15 min",
    difficulty: "Fácil",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=400&fit=crop",
    ingredients: [
      "500g de macarrão espaguete",
      "6 dentes de alho fatiados finamente",
      "100ml de azeite extra virgem de boa qualidade",
      "1 colher (chá) de pimenta calabresa",
      "Sal a gosto",
      "Queijo parmesão ralado para finalizar (opcional)",
      "Salsinha fresca picada para decorar"
    ],
    instructions: [
      "Em uma panela grande, coloque bastante água para ferver (cerca de 3 litros). Quando estiver fervendo, adicione 1 colher (sopa) de sal.",
      "Adicione o macarrão espaguete e cozinhe seguindo o tempo indicado na embalagem, mexendo ocasionalmente para não grudar. O macarrão deve ficar al dente (firme ao morder).",
      "Enquanto o macarrão cozinha, em uma frigideira grande, aqueça o azeite em fogo médio-baixo. Adicione o alho fatiado e refogue lentamente, mexendo constantemente, até que fique dourado e perfumado (cerca de 2-3 minutos). Cuidado para não queimar o alho, pois fica amargo.",
      "Quando o alho estiver dourado, adicione a pimenta calabresa ao azeite e misture bem. Desligue o fogo.",
      "Escorra o macarrão reservando 1 xícara da água do cozimento. Transfira o macarrão imediatamente para a frigideira com o alho.",
      "Ligue o fogo baixo e misture bem o macarrão com o azeite de alho, adicionando um pouco da água do cozimento aos poucos para criar um molho cremoso e solto.",
      "Prove e ajuste o sal se necessário. Finalize com salsinha fresca picada e, se desejar, queijo parmesão ralado na hora. Sirva imediatamente bem quente."
    ],
    isFavorite: false
  },
  {
    id: 2,
    name: "Brownie de Chocolate",
    category: "Doces",
    time: "30 min",
    difficulty: "Médio",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=400&fit=crop",
    ingredients: [
      "200g de chocolate meio amargo (50-70% cacau) picado",
      "100g de manteiga sem sal em cubos",
      "3 ovos grandes em temperatura ambiente",
      "1 xícara (chá) de açúcar refinado",
      "1/2 xícara (chá) de farinha de trigo peneirada",
      "1/4 colher (chá) de sal",
      "1 colher (chá) de essência de baunilha",
      "1/2 xícara de nozes ou castanhas picadas (opcional)"
    ],
    instructions: [
      "Preaqueça o forno a 180°C. Unte uma forma quadrada de 20x20cm com manteiga e polvilhe com cacau em pó ou forre com papel manteiga.",
      "Em uma tigela resistente ao calor, coloque o chocolate picado e a manteiga. Derreta em banho-maria (tigela sobre uma panela com água fervente, sem encostar na água), mexendo constantemente até ficar completamente liso e brilhante. Retire do fogo e deixe esfriar por 5 minutos.",
      "Em outra tigela grande, bata os ovos com o açúcar usando um batedor de arame ou fouet por cerca de 3-4 minutos, até a mistura ficar clara, volumosa e formar fitas ao levantar o batedor.",
      "Adicione a essência de baunilha à mistura de ovos e mexa delicadamente.",
      "Despeje o chocolate derretido morno sobre a mistura de ovos e incorpore com movimentos suaves e envolventes, usando uma espátula de silicone, fazendo movimentos de baixo para cima.",
      "Adicione a farinha peneirada e o sal de uma só vez. Misture delicadamente apenas até não ver mais farinha seca. Não mexa demais para não perder a textura fudgy. Se usar nozes, adicione neste momento.",
      "Despeje a massa na forma preparada e espalhe uniformemente. Leve ao forno preaquecido por 20-25 minutos. O brownie está pronto quando a superfície estiver firme mas o centro ainda levemente mole ao inserir um palito (deve sair com algumas migalhas úmidas grudadas).",
      "Retire do forno e deixe esfriar completamente na forma sobre uma grade antes de cortar em quadrados. Para cortes perfeitos, leve à geladeira por 1 hora antes de cortar com uma faca afiada limpa."
    ],
    isFavorite: false
  },
  {
    id: 3,
    name: "Mojito Clássico",
    category: "Drinks",
    time: "5 min",
    difficulty: "Fácil",
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&h=400&fit=crop",
    ingredients: [
      "60ml de rum branco de boa qualidade",
      "10-12 folhas frescas de hortelã",
      "1/2 limão cortado em 4 pedaços",
      "2 colheres (sopa) de açúcar refinado ou 30ml de xarope simples",
      "Água com gás gelada (cerca de 100ml)",
      "Gelo em cubos (bastante)",
      "Ramo de hortelã para decorar",
      "Rodela de limão para decorar"
    ],
    instructions: [
      "Em um copo alto (tipo highball ou collins), coloque as folhas de hortelã e o açúcar. Com um pilão (muddler), pressione suavemente as folhas contra o açúcar, fazendo movimentos circulares para liberar os óleos essenciais da hortelã. Não esmague demais para não amargar.",
      "Adicione os pedaços de limão ao copo e pressione levemente com o pilão para extrair o suco, mas sem esmagar a casca (que pode deixar amargo).",
      "Adicione o rum branco ao copo e mexa bem com uma colher bailarina para dissolver completamente o açúcar e misturar todos os sabores.",
      "Encha o copo até a borda com gelo em cubos. Quanto mais gelo, melhor será a diluição e temperatura.",
      "Complete o copo com água com gás bem gelada, despejando lentamente para não perder o gás.",
      "Mexa delicadamente de baixo para cima com a colher bailarina para integrar todos os ingredientes sem perder muito gás.",
      "Decore com um ramo generoso de hortelã fresca (bata levemente nas mãos antes para liberar o aroma) e uma rodela de limão na borda do copo. Sirva imediatamente com canudos."
    ],
    isFavorite: false
  },
  {
    id: 4,
    name: "Bolo de Cenoura com Cobertura de Chocolate",
    category: "Bolos",
    time: "45 min",
    difficulty: "Fácil",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop",
    ingredients: [
      "3 cenouras médias descascadas e picadas (cerca de 300g)",
      "3 ovos grandes",
      "2 xícaras (chá) de açúcar refinado",
      "2 xícaras (chá) de farinha de trigo",
      "1 xícara (chá) de óleo de girassol ou canola",
      "1 colher (sopa) de fermento em pó",
      "Para a cobertura: 4 colheres (sopa) de chocolate em pó",
      "2 colheres (sopa) de manteiga",
      "3 colheres (sopa) de leite",
      "1 xícara (chá) de açúcar"
    ],
    instructions: [
      "Preaqueça o forno a 180°C. Unte uma forma de furo central (24cm) com manteiga e polvilhe com farinha, batendo para retirar o excesso.",
      "No liquidificador, adicione as cenouras picadas, os ovos e o óleo. Bata em velocidade alta por cerca de 3 minutos até obter uma mistura completamente lisa e homogênea, sem pedaços de cenoura.",
      "Transfira a mistura do liquidificador para uma tigela grande. Adicione o açúcar e misture bem com uma espátula ou fouet até incorporar completamente.",
      "Peneie a farinha de trigo sobre a mistura em três adições, incorporando delicadamente com movimentos envolventes após cada adição. Isso garante uma massa aerada e sem grumos.",
      "Por último, adicione o fermento em pó peneirado e misture delicadamente apenas até incorporar. Não mexa demais nesta etapa para não perder o poder do fermento.",
      "Despeje a massa na forma preparada e leve ao forno preaquecido. Asse por 35-40 minutos ou até que um palito inserido no centro saia limpo. O bolo deve estar dourado e firme ao toque.",
      "Enquanto o bolo assa, prepare a cobertura: Em uma panela pequena, coloque todos os ingredientes da cobertura (chocolate em pó, manteiga, leite e açúcar). Leve ao fogo médio, mexendo constantemente até levantar fervura.",
      "Deixe ferver por 2-3 minutos, mexendo sem parar, até engrossar levemente e formar uma calda brilhante. A cobertura deve ter consistência de ganache líquido.",
      "Retire o bolo do forno e deixe esfriar na forma por 10 minutos. Desenforme ainda morno sobre um prato de servir.",
      "Despeje a cobertura de chocolate ainda quente sobre o bolo morno, espalhando com uma espátula para cobrir toda a superfície. A cobertura vai escorrer naturalmente pelas laterais. Deixe esfriar completamente antes de servir para a cobertura firmar."
    ],
    isFavorite: false
  },
  {
    id: 5,
    name: "Mousse de Maracujá",
    category: "Sobremesas",
    time: "20 min",
    difficulty: "Fácil",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&h=400&fit=crop",
    ingredients: [
      "1 lata (395g) de leite condensado",
      "1 lata (300g) de creme de leite sem soro",
      "1 xícara (chá) de suco de maracujá concentrado coado (cerca de 6-8 maracujás)",
      "1 envelope (12g) de gelatina em pó sem sabor",
      "5 colheres (sopa) de água fria para hidratar a gelatina",
      "Polpa de maracujá com sementes para decorar",
      "Folhas de hortelã para decorar (opcional)"
    ],
    instructions: [
      "Prepare a gelatina: Em uma tigela pequena, coloque a gelatina em pó e adicione a água fria. Misture bem e deixe hidratar por 5 minutos até formar uma massa esponjosa.",
      "Leve a gelatina hidratada ao micro-ondas por 15 segundos (ou aqueça em banho-maria) até dissolver completamente, formando um líquido transparente. Não deixe ferver. Reserve.",
      "No liquidificador, coloque o leite condensado, o creme de leite e o suco de maracujá coado. Bata em velocidade média por 1 minuto até obter uma mistura homogênea e cremosa.",
      "Com o liquidificador em velocidade baixa, adicione a gelatina dissolvida em fio, batendo por mais 30 segundos para incorporar completamente. A gelatina deve estar morna, não quente, para não talhar o creme.",
      "Despeje a mousse em taças individuais, copos de vidro ou em uma travessa grande. A mousse renderá cerca de 6-8 porções.",
      "Leve à geladeira por no mínimo 4 horas ou até firmar completamente. O ideal é deixar de um dia para o outro para garantir a textura perfeita.",
      "Na hora de servir, decore cada porção com polpa de maracujá fresca com sementes por cima e, se desejar, uma folhinha de hortelã. A acidez da polpa fresca contrasta perfeitamente com a doçura da mousse."
    ],
    isFavorite: false
  },
  {
    id: 25,
    name: "Bolo Fitness de Banana e Aveia",
    category: "Fitness",
    time: "35 min",
    difficulty: "Fácil",
    image: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=600&h=400&fit=crop",
    ingredients: [
      "3 bananas maduras amassadas (cerca de 300g)",
      "2 ovos grandes",
      "1/4 xícara (chá) de mel ou xarope de agave",
      "1/4 xícara (chá) de óleo de coco derretido",
      "1 colher (chá) de essência de baunilha",
      "1 e 1/2 xícara (chá) de aveia em flocos finos",
      "1 colher (chá) de fermento em pó",
      "1 colher (chá) de canela em pó",
      "1 pitada de sal",
      "1/2 xícara de nozes picadas (opcional)"
    ],
    instructions: [
      "Preaqueça o forno a 180°C. Unte uma forma retangular (20x10cm) com óleo de coco e polvilhe com aveia.",
      "Em uma tigela grande, amasse bem as bananas com um garfo até formar um purê liso.",
      "Adicione os ovos, o mel, o óleo de coco derretido e a essência de baunilha. Misture bem com um fouet até incorporar completamente.",
      "Em outra tigela, misture a aveia, o fermento, a canela e o sal.",
      "Adicione os ingredientes secos aos úmidos e misture delicadamente até formar uma massa homogênea. Se usar nozes, adicione neste momento.",
      "Despeje a massa na forma preparada e espalhe uniformemente. Se desejar, decore com rodelas de banana por cima.",
      "Leve ao forno por 25-30 minutos ou até que um palito inserido no centro saia limpo e a superfície esteja dourada.",
      "Retire do forno e deixe esfriar completamente antes de cortar. Sirva em temperatura ambiente ou levemente aquecido. Guarde na geladeira por até 5 dias."
    ],
    isFavorite: false,
    isFitness: true
  },
  {
    id: 26,
    name: "Smoothie Bowl de Açaí Fitness",
    category: "Fitness",
    time: "10 min",
    difficulty: "Fácil",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&h=400&fit=crop",
    ingredients: [
      "200g de polpa de açaí congelada sem açúcar",
      "1 banana congelada em rodelas",
      "1/2 xícara de leite de amêndoas ou leite desnatado",
      "1 colher (sopa) de pasta de amendoim natural",
      "1 colher (chá) de mel (opcional)",
      "Para cobertura: granola sem açúcar",
      "Frutas frescas (morango, banana, kiwi)",
      "Sementes de chia",
      "Coco ralado sem açúcar",
      "Nibs de cacau"
    ],
    instructions: [
      "No liquidificador, coloque a polpa de açaí congelada, a banana congelada, o leite de amêndoas e a pasta de amendoim.",
      "Bata em velocidade alta por 1-2 minutos até obter uma consistência cremosa e espessa, semelhante a sorvete. Se necessário, adicione mais leite aos poucos.",
      "A consistência ideal é bem espessa, para que as coberturas não afundem. Se ficar muito líquido, adicione mais açaí ou banana congelada.",
      "Despeje o smoothie em uma tigela funda.",
      "Decore com as coberturas de sua preferência: distribua a granola, frutas frescas fatiadas, sementes de chia, coco ralado e nibs de cacau de forma organizada e colorida.",
      "Sirva imediatamente com uma colher. O smoothie bowl é perfeito para café da manhã pós-treino ou lanche saudável."
    ],
    isFavorite: false,
    isFitness: true
  },
  {
    id: 27,
    name: "Brownie Fit de Batata Doce",
    category: "Fitness",
    time: "40 min",
    difficulty: "Médio",
    image: "https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=600&h=400&fit=crop",
    ingredients: [
      "1 batata doce média cozida e amassada (cerca de 200g)",
      "2 ovos grandes",
      "1/4 xícara (chá) de cacau em pó 100%",
      "1/4 xícara (chá) de mel ou xarope de agave",
      "2 colheres (sopa) de pasta de amendoim natural",
      "1 colher (chá) de essência de baunilha",
      "1/2 colher (chá) de fermento em pó",
      "1 pitada de sal",
      "1/4 xícara de chocolate 70% cacau picado (opcional)"
    ],
    instructions: [
      "Preaqueça o forno a 180°C. Forre uma forma quadrada pequena (15x15cm) com papel manteiga.",
      "Cozinhe a batata doce até ficar bem macia. Descasque e amasse completamente até formar um purê liso sem grumos.",
      "No liquidificador ou processador, coloque a batata doce amassada, os ovos, o mel, a pasta de amendoim e a essência de baunilha. Bata até obter uma mistura completamente homogênea.",
      "Adicione o cacau em pó, o fermento e o sal. Bata novamente até incorporar bem.",
      "Se usar chocolate picado, adicione à massa e misture delicadamente com uma espátula.",
      "Despeje a massa na forma preparada e espalhe uniformemente.",
      "Leve ao forno por 25-30 minutos. O brownie fit deve estar firme nas bordas mas ainda levemente mole no centro.",
      "Retire do forno e deixe esfriar completamente na forma antes de cortar em quadrados. A textura fica ainda melhor após algumas horas na geladeira. Guarde refrigerado por até 5 dias."
    ],
    isFavorite: false,
    isFitness: true
  },
  {
    id: 28,
    name: "Panqueca Proteica de Banana",
    category: "Fitness",
    time: "15 min",
    difficulty: "Fácil",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600&h=400&fit=crop",
    ingredients: [
      "1 banana madura grande",
      "2 ovos grandes",
      "2 colheres (sopa) de aveia em flocos finos",
      "1 scoop de whey protein de baunilha (opcional)",
      "1/2 colher (chá) de fermento em pó",
      "1 pitada de canela",
      "Óleo de coco para untar",
      "Para servir: mel, frutas frescas, pasta de amendoim"
    ],
    instructions: [
      "No liquidificador, coloque a banana, os ovos, a aveia, o whey protein (se usar), o fermento e a canela.",
      "Bata em velocidade alta por 1 minuto até obter uma massa lisa e homogênea. A consistência deve ser cremosa, semelhante a uma massa de panqueca tradicional.",
      "Deixe a massa descansar por 2-3 minutos para a aveia hidratar e o fermento ativar.",
      "Aqueça uma frigideira antiaderente em fogo médio-baixo e unte levemente com óleo de coco.",
      "Despeje cerca de 1/4 de xícara da massa na frigideira, formando um círculo. Não espalhe - deixe a massa se acomodar naturalmente.",
      "Cozinhe por 2-3 minutos até aparecerem bolhas na superfície e as bordas ficarem firmes. Vire com cuidado e cozinhe por mais 2 minutos do outro lado até dourar.",
      "Repita o processo com o restante da massa, untando a frigideira entre cada panqueca.",
      "Sirva as panquecas empilhadas, regadas com mel, cobertas com frutas frescas e uma colherada de pasta de amendoim. Perfeito para café da manhã pós-treino!"
    ],
    isFavorite: false,
    isFitness: true
  },
  {
    id: 29,
    name: "Piña Colada",
    category: "Drinks",
    time: "5 min",
    difficulty: "Fácil",
    image: "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=600&h=400&fit=crop",
    ingredients: [
      "60ml de rum branco",
      "90ml de leite de coco cremoso",
      "90ml de suco de abacaxi fresco",
      "2 xícaras de gelo em cubos",
      "1 colher (sopa) de açúcar ou mel (opcional)",
      "Fatia de abacaxi para decorar",
      "Cereja maraschino para decorar",
      "Folhas de hortelã (opcional)"
    ],
    instructions: [
      "No liquidificador, coloque o rum branco, o leite de coco, o suco de abacaxi fresco e o açúcar (se usar).",
      "Adicione o gelo em cubos. Use bastante gelo para obter uma consistência cremosa e frozen.",
      "Bata em velocidade alta por 30-40 segundos até obter uma mistura completamente lisa, cremosa e homogênea, com consistência de smoothie espesso.",
      "Prove e ajuste a doçura se necessário. Se estiver muito espesso, adicione mais suco de abacaxi; se muito líquido, adicione mais gelo e bata novamente.",
      "Despeje em um copo alto ou taça de furacão (copo típico de drinks tropicais).",
      "Decore com uma fatia de abacaxi na borda do copo, uma cereja maraschino e, se desejar, folhas de hortelã.",
      "Sirva imediatamente com canudos largos. A piña colada perfeita deve ser cremosa, refrescante e equilibrada entre o coco e o abacaxi."
    ],
    isFavorite: false
  },
  {
    id: 30,
    name: "Margarita Clássica",
    category: "Drinks",
    time: "5 min",
    difficulty: "Fácil",
    image: "https://images.unsplash.com/photo-1609951651556-5334e2706168?w=600&h=400&fit=crop",
    ingredients: [
      "60ml de tequila 100% agave",
      "30ml de triple sec ou Cointreau",
      "30ml de suco de limão fresco",
      "15ml de xarope simples (ou 1 colher de açúcar)",
      "Gelo em cubos",
      "Sal grosso para a borda do copo",
      "Rodela de limão para decorar"
    ],
    instructions: [
      "Prepare a borda do copo: passe uma rodela de limão na borda de um copo baixo (old fashioned) ou taça de margarita.",
      "Coloque sal grosso em um prato raso. Vire o copo de cabeça para baixo e pressione a borda úmida no sal, girando para cobrir uniformemente. Reserve.",
      "Em uma coqueteleira, coloque o gelo até a metade.",
      "Adicione a tequila, o triple sec, o suco de limão fresco e o xarope simples.",
      "Tampe a coqueteleira e agite vigorosamente por 15-20 segundos. A coqueteleira deve ficar bem gelada do lado de fora.",
      "Coe o drink para o copo preparado com sal, usando um coador fino para reter pedaços de gelo.",
      "Se preferir frozen (margarita batida), bata todos os ingredientes com gelo no liquidificador até obter consistência de granizado.",
      "Decore com uma rodela de limão na borda. Sirva imediatamente bem gelado."
    ],
    isFavorite: false
  },
  {
    id: 31,
    name: "Aperol Spritz",
    category: "Drinks",
    time: "3 min",
    difficulty: "Fácil",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&h=400&fit=crop",
    ingredients: [
      "90ml de Prosecco (espumante italiano) bem gelado",
      "60ml de Aperol",
      "30ml de água com gás gelada",
      "Gelo em cubos grandes",
      "1 fatia de laranja para decorar",
      "Azeitona verde (opcional)"
    ],
    instructions: [
      "Encha um copo de vinho grande (tipo balão) ou copo old fashioned com gelo em cubos grandes até a borda.",
      "Adicione o Aperol sobre o gelo.",
      "Despeje o Prosecco gelado lentamente para não perder muito gás.",
      "Complete com a água com gás, também despejando delicadamente.",
      "Mexa suavemente com uma colher bailarina por 2-3 segundos apenas para integrar os ingredientes, sem perder o gás.",
      "Decore com uma fatia generosa de laranja e, se desejar, uma azeitona verde espetada em um palito.",
      "Sirva imediatamente. O Aperol Spritz perfeito deve ter cor laranja vibrante, ser levemente amargo, refrescante e bem gaseificado."
    ],
    isFavorite: false
  },
  {
    id: 32,
    name: "Limonada de Morango (Sem Álcool)",
    category: "Drinks",
    time: "10 min",
    difficulty: "Fácil",
    image: "https://images.unsplash.com/photo-1544145945-35c4e5d6e8b6?w=600&h=400&fit=crop",
    ingredients: [
      "2 limões tahiti médios",
      "1 xícara de morangos frescos lavados e sem folhas",
      "1/2 xícara (chá) de açúcar ou mel",
      "1 litro de água gelada filtrada",
      "Gelo em cubos",
      "Folhas de hortelã para decorar",
      "Morangos inteiros para decorar"
    ],
    instructions: [
      "Lave bem os limões e corte em 4 partes, removendo as pontas.",
      "No liquidificador, coloque os limões cortados COM casca, os morangos lavados, o açúcar e metade da água (500ml).",
      "Bata em velocidade alta por apenas 15 segundos. Não bata por muito tempo para não amargar.",
      "Coe a mistura através de uma peneira fina, pressionando levemente para extrair todo o líquido. Descarte os resíduos.",
      "Transfira o líquido coado para uma jarra grande. Adicione o restante da água gelada (500ml) e misture bem.",
      "Prove e ajuste a doçura se necessário, adicionando mais açúcar ou água conforme preferir.",
      "Sirva em copos altos cheios de gelo. Decore cada copo com folhas de hortelã fresca e um morango inteiro na borda.",
      "Para uma apresentação especial, corte morangos em fatias e coloque dentro dos copos antes de adicionar o gelo. Sirva imediatamente bem gelado."
    ],
    isFavorite: false
  },
  {
    id: 33,
    name: "Chá Gelado de Pêssego (Sem Álcool)",
    category: "Drinks",
    time: "15 min",
    difficulty: "Fácil",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=400&fit=crop",
    ingredients: [
      "4 sachês de chá preto ou chá verde",
      "1 litro de água fervente",
      "1 pêssego maduro grande cortado em fatias",
      "1/2 xícara (chá) de açúcar ou mel",
      "Suco de 1 limão",
      "Gelo em cubos",
      "Fatias de pêssego para decorar",
      "Folhas de hortelã para decorar"
    ],
    instructions: [
      "Em uma jarra resistente ao calor, coloque os sachês de chá e despeje a água fervente.",
      "Deixe o chá em infusão por 5-7 minutos para extrair todo o sabor. Não deixe mais tempo para não amargar.",
      "Retire os sachês de chá, espremendo levemente para extrair o líquido.",
      "Adicione o açúcar ou mel ao chá ainda quente e mexa bem até dissolver completamente.",
      "Adicione as fatias de pêssego à jarra e amasse levemente com um garfo para liberar o suco e sabor.",
      "Deixe esfriar em temperatura ambiente por 10 minutos, depois leve à geladeira por pelo menos 1 hora.",
      "Quando estiver bem gelado, adicione o suco de limão e misture bem.",
      "Sirva em copos altos cheios de gelo. Decore com fatias frescas de pêssego e folhas de hortelã.",
      "Para um sabor mais intenso, deixe as fatias de pêssego no chá por algumas horas antes de servir."
    ],
    isFavorite: false
  },
  {
    id: 34,
    name: "Bolo de Chocolate com Recheio de Brigadeiro",
    category: "Bolos",
    time: "60 min",
    difficulty: "Médio",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop",
    ingredients: [
      "Para a massa: 2 xícaras (chá) de farinha de trigo",
      "2 xícaras (chá) de açúcar",
      "3/4 xícara (chá) de cacau em pó 50%",
      "2 colheres (chá) de fermento em pó",
      "1 colher (chá) de bicarbonato de sódio",
      "1 pitada de sal",
      "2 ovos grandes",
      "1 xícara (chá) de leite integral",
      "1/2 xícara (chá) de óleo",
      "1 colher (chá) de essência de baunilha",
      "1 xícara (chá) de água quente",
      "Para o recheio: 2 latas de leite condensado",
      "4 colheres (sopa) de chocolate em pó",
      "2 colheres (sopa) de manteiga",
      "Para a cobertura: 200g de chocolate meio amargo",
      "1 lata de creme de leite"
    ],
    instructions: [
      "Preaqueça o forno a 180°C. Unte e enfarinhe duas formas redondas de 20cm.",
      "Em uma tigela grande, peneie juntos a farinha, o açúcar, o cacau, o fermento, o bicarbonato e o sal.",
      "Adicione os ovos, o leite, o óleo e a baunilha. Bata com batedeira em velocidade média por 2 minutos.",
      "Adicione a água quente aos poucos, mexendo delicadamente. A massa ficará bem líquida - isso é normal.",
      "Divida a massa entre as duas formas. Asse por 30-35 minutos ou até que um palito saia limpo.",
      "Deixe esfriar nas formas por 10 minutos, depois desenforme sobre grades e deixe esfriar completamente.",
      "Prepare o recheio: Em uma panela, coloque o leite condensado, o chocolate em pó e a manteiga. Cozinhe em fogo médio, mexendo sempre, por 10 minutos até engrossar. Deixe esfriar.",
      "Prepare a cobertura: Derreta o chocolate em banho-maria. Retire do fogo e adicione o creme de leite, mexendo até ficar liso.",
      "Monte o bolo: Coloque uma camada de massa em um prato, espalhe o brigadeiro, cubra com a segunda camada e despeje a ganache por cima, deixando escorrer pelas laterais.",
      "Leve à geladeira por 1 hora antes de servir para firmar a cobertura."
    ],
    isFavorite: false
  },
  {
    id: 35,
    name: "Bolo Red Velvet",
    category: "Bolos",
    time: "50 min",
    difficulty: "Médio",
    image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&h=400&fit=crop",
    ingredients: [
      "2 e 1/2 xícaras (chá) de farinha de trigo",
      "1 e 1/2 xícara (chá) de açúcar",
      "1 colher (chá) de bicarbonato de sódio",
      "1 colher (chá) de cacau em pó",
      "1 colher (chá) de sal",
      "2 ovos grandes",
      "1 e 1/2 xícara (chá) de óleo",
      "1 xícara (chá) de leitelho (ou leite com 1 colher de vinagre)",
      "2 colheres (sopa) de corante vermelho em gel",
      "1 colher (chá) de essência de baunilha",
      "1 colher (chá) de vinagre branco",
      "Para o frosting: 200g de cream cheese",
      "100g de manteiga sem sal",
      "3 xícaras de açúcar de confeiteiro",
      "1 colher (chá) de essência de baunilha"
    ],
    instructions: [
      "Preaqueça o forno a 180°C. Unte e enfarinhe duas formas redondas de 20cm.",
      "Em uma tigela, peneire a farinha, o açúcar, o bicarbonato, o cacau e o sal. Misture bem.",
      "Em outra tigela, bata os ovos levemente. Adicione o óleo, o leitelho, o corante vermelho e a essência de baunilha. Misture bem.",
      "Adicione os ingredientes líquidos aos secos e misture delicadamente até incorporar. Não mexa demais.",
      "Por último, adicione o vinagre e misture rapidamente por 10 segundos.",
      "Divida a massa entre as formas. Asse por 30-35 minutos ou até que um palito saia limpo.",
      "Deixe esfriar completamente antes de desenformar.",
      "Prepare o frosting: Bata o cream cheese e a manteiga em temperatura ambiente até ficar cremoso. Adicione o açúcar de confeiteiro aos poucos, batendo bem. Adicione a baunilha.",
      "Monte o bolo: Coloque uma camada de massa, espalhe frosting, cubra com a segunda camada e cubra todo o bolo com o restante do frosting.",
      "Decore com raspas de chocolate branco ou frutas vermelhas. Leve à geladeira por 30 minutos antes de servir."
    ],
    isFavorite: false
  },
  {
    id: 36,
    name: "Palha Italiana",
    category: "Doces",
    time: "20 min",
    difficulty: "Fácil",
    image: "https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?w=600&h=400&fit=crop",
    ingredients: [
      "1 lata (395g) de leite condensado",
      "2 colheres (sopa) de chocolate em pó 50%",
      "1 colher (sopa) de manteiga",
      "200g de biscoito maisena ou maria",
      "Chocolate granulado para decorar"
    ],
    instructions: [
      "Em uma panela média, coloque o leite condensado, o chocolate em pó peneirado e a manteiga.",
      "Leve ao fogo médio-baixo, mexendo constantemente com uma colher de pau por 8-10 minutos até engrossar e começar a desgrudar do fundo da panela.",
      "Retire do fogo e deixe esfriar por 10 minutos até ficar morno.",
      "Enquanto isso, quebre os biscoitos em pedaços pequenos (não triture completamente - deixe alguns pedaços maiores para dar textura).",
      "Adicione os biscoitos quebrados ao creme de chocolate morno e misture bem até todos os pedaços estarem cobertos.",
      "Transfira a mistura para um refratário ou prato fundo. Espalhe uniformemente e alise a superfície com uma espátula.",
      "Cubra completamente com chocolate granulado, pressionando levemente para aderir.",
      "Leve à geladeira por no mínimo 2 horas até firmar completamente.",
      "Corte em quadrados ou retângulos. Sirva em forminhas de papel. Guarde na geladeira em recipiente fechado por até 1 semana."
    ],
    isFavorite: false
  },
  {
    id: 37,
    name: "Pudim de Leite Ninho",
    category: "Sobremesas",
    time: "70 min",
    difficulty: "Médio",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&h=400&fit=crop",
    ingredients: [
      "1 lata (395g) de leite condensado",
      "1 lata (medida da lata) de leite integral",
      "1 xícara (chá) de leite em pó Ninho",
      "3 ovos grandes",
      "Para a calda: 1 xícara (chá) de açúcar",
      "1/2 xícara (chá) de água"
    ],
    instructions: [
      "Prepare a calda: Em uma forma de pudim com furo central, coloque o açúcar e leve ao fogo direto. Mexa até caramelizar completamente.",
      "Adicione a água com cuidado (vai espirrar!). Mexa até dissolver e formar uma calda lisa. Espalhe pela forma e reserve.",
      "Preaqueça o forno a 180°C. Prepare uma assadeira grande com água quente para banho-maria.",
      "No liquidificador, coloque o leite condensado, o leite, o leite em pó Ninho e os ovos. Bata por 3 minutos até ficar completamente homogêneo.",
      "Despeje a mistura na forma caramelizada através de uma peneira para remover bolhas.",
      "Cubra a forma com papel alumínio. Coloque na assadeira com água quente (banho-maria).",
      "Asse por 50-60 minutos até firmar. Teste com um palito - deve sair limpo.",
      "Deixe esfriar completamente, depois leve à geladeira por no mínimo 6 horas ou de um dia para o outro.",
      "Para desenformar, passe uma faca nas bordas e vire em um prato com borda. Sirva bem gelado."
    ],
    isFavorite: false
  },
  {
    id: 38,
    name: "Tiramisu Clássico",
    category: "Sobremesas",
    time: "30 min",
    difficulty: "Médio",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&h=400&fit=crop",
    ingredients: [
      "500g de queijo mascarpone em temperatura ambiente",
      "6 ovos grandes (gemas e claras separadas)",
      "1 xícara (chá) de açúcar refinado",
      "2 xícaras (chá) de café expresso forte e frio",
      "3 colheres (sopa) de licor de café ou amaretto (opcional)",
      "300g de biscoitos champagne ou savoiardi",
      "Cacau em pó 70% para polvilhar",
      "Chocolate meio amargo ralado para decorar (opcional)"
    ],
    instructions: [
      "Prepare o café expresso bem forte e deixe esfriar completamente. Se usar licor, adicione ao café frio e misture.",
      "Em uma tigela, bata as gemas com metade do açúcar (1/2 xícara) usando batedeira por 3-4 minutos até ficar claro e cremoso.",
      "Adicione o mascarpone às gemas batidas e misture delicadamente com uma espátula até incorporar completamente. Reserve.",
      "Em outra tigela limpa e seca, bata as claras em neve até formar picos moles. Adicione o restante do açúcar aos poucos e continue batendo até formar picos firmes e brilhantes.",
      "Incorpore as claras em neve ao creme de mascarpone em três etapas, fazendo movimentos suaves e envolventes de baixo para cima para não perder o ar.",
      "Mergulhe rapidamente os biscoitos no café (1-2 segundos de cada lado - não deixe encharcar) e disponha em uma camada no fundo de um refratário (20x30cm).",
      "Espalhe metade do creme de mascarpone sobre a camada de biscoitos, distribuindo uniformemente.",
      "Faça outra camada de biscoitos molhados no café e cubra com o restante do creme, alisando bem a superfície.",
      "Cubra com filme plástico e leve à geladeira por no mínimo 4 horas ou, de preferência, de um dia para o outro.",
      "Na hora de servir, polvilhe generosamente com cacau em pó peneirado e, se desejar, decore com chocolate ralado. Corte em quadrados e sirva bem gelado."
    ],
    isFavorite: false
  },
  {
    id: 39,
    name: "Cookies de Chocolate",
    category: "Doces",
    time: "25 min",
    difficulty: "Fácil",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&h=400&fit=crop",
    ingredients: [
      "1 xícara (chá) de manteiga sem sal em temperatura ambiente",
      "1 xícara (chá) de açúcar mascavo",
      "1/2 xícara (chá) de açúcar refinado",
      "2 ovos grandes",
      "2 colheres (chá) de essência de baunilha",
      "2 e 1/4 xícaras (chá) de farinha de trigo",
      "1 colher (chá) de bicarbonato de sódio",
      "1 colher (chá) de sal",
      "2 xícaras de gotas de chocolate meio amargo",
      "1 xícara de nozes picadas (opcional)"
    ],
    instructions: [
      "Preaqueça o forno a 180°C. Forre duas assadeiras com papel manteiga.",
      "Em uma tigela grande, bata a manteiga com os dois tipos de açúcar usando batedeira por 3 minutos até ficar cremoso e fofo.",
      "Adicione os ovos um de cada vez, batendo bem após cada adição. Adicione a essência de baunilha e misture.",
      "Em outra tigela, misture a farinha, o bicarbonato e o sal.",
      "Adicione os ingredientes secos aos úmidos aos poucos, misturando delicadamente com uma espátula apenas até incorporar. Não mexa demais.",
      "Adicione as gotas de chocolate e as nozes (se usar), misturando delicadamente com uma espátula.",
      "Com uma colher de sorvete ou colher grande, faça bolinhas de massa e disponha nas assadeiras, deixando 5cm de espaço entre cada cookie (eles vão se espalhar).",
      "Asse por 10-12 minutos. Os cookies devem estar dourados nas bordas mas ainda levemente macios no centro.",
      "Retire do forno e deixe esfriar nas assadeiras por 5 minutos (eles vão firmar). Depois transfira para uma grade e deixe esfriar completamente.",
      "Guarde em recipiente fechado por até 1 semana. Os cookies ficam perfeitos: crocantes por fora e macios por dentro!"
    ],
    isFavorite: false
  },
  {
    id: 40,
    name: "Bolo Fit de Chocolate com Whey",
    category: "Fitness",
    time: "35 min",
    difficulty: "Fácil",
    image: "https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=600&h=400&fit=crop",
    ingredients: [
      "3 ovos grandes",
      "1/2 xícara (chá) de cacau em pó 100%",
      "1/2 xícara (chá) de farinha de aveia",
      "2 scoops de whey protein de chocolate",
      "1/3 xícara (chá) de mel ou xarope de agave",
      "1/2 xícara (chá) de leite de amêndoas",
      "1/4 xícara (chá) de óleo de coco derretido",
      "1 colher (chá) de fermento em pó",
      "1 pitada de sal",
      "1/2 xícara de chocolate 70% cacau picado (opcional)"
    ],
    instructions: [
      "Preaqueça o forno a 180°C. Unte uma forma retangular (20x10cm) com óleo de coco.",
      "No liquidificador, coloque os ovos, o mel, o leite de amêndoas e o óleo de coco. Bata por 1 minuto.",
      "Adicione o cacau em pó, a farinha de aveia, o whey protein, o fermento e o sal. Bata novamente até obter uma massa homogênea.",
      "Se usar chocolate picado, adicione à massa e misture delicadamente com uma espátula.",
      "Despeje a massa na forma preparada e espalhe uniformemente.",
      "Leve ao forno por 25-30 minutos ou até que um palito inserido no centro saia limpo.",
      "Retire do forno e deixe esfriar completamente antes de cortar.",
      "Sirva em temperatura ambiente ou levemente aquecido. Guarde na geladeira em recipiente fechado por até 5 dias. Perfeito para lanche pré ou pós-treino!"
    ],
    isFavorite: false,
    isFitness: true
  },
  // NOVAS RECEITAS ADICIONADAS
  {
    id: 41,
    name: "Risoto de Camarão",
    category: "Comidas",
    time: "40 min",
    difficulty: "Médio",
    image: "https://images.unsplash.com/photo-1476124369491-f0ca4e8fea1c?w=600&h=400&fit=crop",
    ingredients: [
      "400g de camarões médios limpos",
      "2 xícaras (chá) de arroz arbóreo",
      "1 cebola pequena picada finamente",
      "3 dentes de alho picados",
      "1 litro de caldo de peixe ou legumes quente",
      "1/2 xícara (chá) de vinho branco seco",
      "1/2 xícara de queijo parmesão ralado",
      "3 colheres (sopa) de manteiga",
      "Azeite extra virgem",
      "Sal e pimenta do reino a gosto",
      "Salsinha fresca picada para finalizar"
    ],
    instructions: [
      "Tempere os camarões com sal, pimenta e um fio de azeite. Reserve.",
      "Em uma panela grande, aqueça 2 colheres (sopa) de azeite em fogo médio. Adicione a cebola e refogue por 3 minutos até ficar translúcida.",
      "Adicione o alho e refogue por mais 1 minuto até perfumar.",
      "Adicione o arroz arbóreo e mexa bem por 2 minutos para tostar levemente os grãos, até ficarem translúcidos nas bordas.",
      "Adicione o vinho branco e mexa até evaporar completamente o álcool (cerca de 2 minutos).",
      "Comece a adicionar o caldo quente, uma concha de cada vez, mexendo constantemente. Só adicione mais caldo quando o anterior for absorvido. Continue por 18-20 minutos.",
      "Enquanto isso, em uma frigideira, aqueça um fio de azeite e grelhe os camarões por 2 minutos de cada lado até ficarem rosados. Reserve.",
      "Quando o arroz estiver al dente (macio mas com leve resistência ao morder), desligue o fogo.",
      "Adicione a manteiga e o queijo parmesão, mexendo vigorosamente para criar uma textura cremosa (mantecare).",
      "Adicione os camarões grelhados e misture delicadamente. Ajuste o sal e pimenta.",
      "Sirva imediatamente em pratos fundos, finalizando com salsinha fresca, um fio de azeite extra virgem e mais parmesão se desejar."
    ],
    isFavorite: false
  },
  {
    id: 42,
    name: "Frango Xadrez",
    category: "Comidas",
    time: "30 min",
    difficulty: "Médio",
    image: "https://images.unsplash.com/photo-1603073203463-178a0c940d8e?w=600&h=400&fit=crop",
    ingredients: [
      "500g de peito de frango cortado em cubos",
      "1 pimentão vermelho cortado em cubos",
      "1 pimentão verde cortado em cubos",
      "1 cebola grande cortada em cubos",
      "100g de castanha de caju torrada",
      "3 dentes de alho picados",
      "2 colheres (sopa) de molho shoyu",
      "1 colher (sopa) de molho de ostra",
      "1 colher (chá) de açúcar",
      "1 colher (sopa) de amido de milho",
      "3 colheres (sopa) de óleo",
      "Sal e pimenta do reino a gosto",
      "Cebolinha verde picada para decorar"
    ],
    instructions: [
      "Tempere os cubos de frango com sal, pimenta, 1 colher (sopa) de shoyu e deixe marinar por 15 minutos.",
      "Em uma tigela pequena, misture o molho de ostra, o restante do shoyu, o açúcar e o amido de milho dissolvido em 3 colheres (sopa) de água. Reserve.",
      "Aqueça 2 colheres (sopa) de óleo em um wok ou frigideira grande em fogo alto.",
      "Adicione o frango marinado e refogue em fogo alto por 5-6 minutos até dourar bem e cozinhar completamente. Retire e reserve.",
      "No mesmo wok, adicione mais 1 colher (sopa) de óleo. Adicione o alho e refogue por 30 segundos até perfumar.",
      "Adicione a cebola e refogue por 2 minutos em fogo alto, mexendo constantemente.",
      "Adicione os pimentões e refogue por 3 minutos. Os legumes devem ficar crocantes (al dente).",
      "Retorne o frango ao wok. Adicione o molho preparado e mexa bem por 1-2 minutos até o molho engrossar e envolver todos os ingredientes.",
      "Adicione as castanhas de caju e misture rapidamente.",
      "Finalize com cebolinha verde picada. Sirva imediatamente acompanhado de arroz branco soltinho."
    ],
    isFavorite: false
  },
  {
    id: 43,
    name: "Strogonoff de Carne",
    category: "Comidas",
    time: "35 min",
    difficulty: "Fácil",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&h=400&fit=crop",
    ingredients: [
      "600g de filé mignon cortado em tiras",
      "1 cebola média picada",
      "2 dentes de alho picados",
      "200g de champignon fatiado",
      "2 colheres (sopa) de manteiga",
      "1 colher (sopa) de mostarda",
      "2 colheres (sopa) de ketchup",
      "1 lata (300g) de creme de leite",
      "1 xícara (chá) de caldo de carne",
      "Sal e pimenta do reino a gosto",
      "Batata palha para servir",
      "Salsinha picada para decorar"
    ],
    instructions: [
      "Tempere as tiras de carne com sal e pimenta do reino a gosto.",
      "Em uma panela grande, derreta a manteiga em fogo alto. Adicione a carne e sele rapidamente por 2-3 minutos até dourar levemente. Não cozinhe demais para não ressecar. Retire e reserve.",
      "Na mesma panela, adicione a cebola e refogue em fogo médio por 3 minutos até ficar translúcida.",
      "Adicione o alho e refogue por 1 minuto até perfumar.",
      "Adicione os champignons e refogue por 4-5 minutos até murcharem e soltarem água.",
      "Adicione a mostarda e o ketchup, mexendo bem para incorporar.",
      "Adicione o caldo de carne e deixe ferver por 2 minutos.",
      "Retorne a carne à panela com todo o suco que soltou. Misture bem.",
      "Reduza o fogo para médio-baixo e adicione o creme de leite. Mexa delicadamente e deixe aquecer por 2-3 minutos sem ferver (para não talhar o creme).",
      "Prove e ajuste o sal e pimenta se necessário.",
      "Sirva imediatamente sobre arroz branco, coberto com batata palha crocante e decorado com salsinha fresca picada."
    ],
    isFavorite: false
  },
  {
    id: 44,
    name: "Lasanha Bolonhesa",
    category: "Comidas",
    time: "90 min",
    difficulty: "Médio",
    image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=600&h=400&fit=crop",
    ingredients: [
      "500g de carne moída",
      "1 cebola picada",
      "3 dentes de alho picados",
      "1 lata de molho de tomate (340g)",
      "2 tomates maduros picados",
      "1 colher (sopa) de extrato de tomate",
      "Sal, pimenta, orégano e manjericão a gosto",
      "500g de massa para lasanha pré-cozida",
      "Para o molho branco: 4 colheres (sopa) de manteiga",
      "4 colheres (sopa) de farinha de trigo",
      "1 litro de leite integral",
      "Noz-moscada ralada a gosto",
      "300g de queijo mussarela ralado",
      "100g de queijo parmesão ralado"
    ],
    instructions: [
      "Prepare o molho bolonhesa: Em uma panela grande, refogue a cebola e o alho no azeite até dourarem. Adicione a carne moída e refogue até dourar completamente.",
      "Adicione os tomates picados, o molho de tomate, o extrato de tomate, sal, pimenta, orégano e manjericão. Cozinhe em fogo baixo por 20 minutos, mexendo ocasionalmente. Reserve.",
      "Prepare o molho branco (bechamel): Em uma panela, derreta a manteiga em fogo médio. Adicione a farinha e mexa rapidamente por 1 minuto para formar um roux.",
      "Adicione o leite aos poucos, mexendo constantemente com um fouet para não empelotar. Continue mexendo até engrossar (cerca de 8-10 minutos).",
      "Tempere o molho branco com sal, pimenta e noz-moscada ralada. Reserve.",
      "Preaqueça o forno a 180°C.",
      "Monte a lasanha: Em um refratário grande (30x20cm), espalhe uma camada fina de molho bolonhesa no fundo.",
      "Cubra com uma camada de massa para lasanha. Espalhe molho bolonhesa, depois molho branco e polvilhe queijos. Repita as camadas até terminar os ingredientes.",
      "A última camada deve ser de molho branco coberto generosamente com os queijos.",
      "Cubra com papel alumínio e leve ao forno por 30 minutos. Retire o papel alumínio e asse por mais 15 minutos até gratinar e dourar.",
      "Retire do forno e deixe descansar por 10 minutos antes de cortar. Sirva quente."
    ],
    isFavorite: false
  },
  {
    id: 45,
    name: "Brigadeiro Gourmet",
    category: "Doces",
    time: "25 min",
    difficulty: "Fácil",
    image: "https://images.unsplash.com/photo-1558326567-98ae2405596b?w=600&h=400&fit=crop",
    ingredients: [
      "1 lata (395g) de leite condensado",
      "3 colheres (sopa) de chocolate em pó 50% cacau",
      "1 colher (sopa) de manteiga",
      "1 pitada de sal",
      "Chocolate granulado belga para decorar",
      "Forminhas de papel número 5"
    ],
    instructions: [
      "Em uma panela de fundo grosso, coloque o leite condensado, o chocolate em pó peneirado, a manteiga e a pitada de sal.",
      "Leve ao fogo médio-baixo, mexendo constantemente com uma colher de pau ou espátula de silicone.",
      "Continue mexendo sem parar por 10-15 minutos. O brigadeiro está no ponto quando você consegue ver o fundo da panela ao passar a colher e a mistura se move em bloco.",
      "Transfira o brigadeiro para um prato untado com manteiga e deixe esfriar completamente (cerca de 1 hora) ou leve à geladeira por 30 minutos.",
      "Unte as mãos com manteiga e faça bolinhas do tamanho de uma noz.",
      "Passe cada bolinha no chocolate granulado, cobrindo completamente.",
      "Coloque cada brigadeiro em uma forminha de papel.",
      "Guarde em recipiente fechado em temperatura ambiente por até 3 dias ou na geladeira por até 1 semana.",
      "Dica: Para brigadeiro mais cremoso, retire do fogo um pouco antes do ponto. Para brigadeiro mais firme (ideal para decorar bolos), cozinhe até o ponto bem firme."
    ],
    isFavorite: false
  },
  {
    id: 46,
    name: "Beijinho de Coco",
    category: "Doces",
    time: "25 min",
    difficulty: "Fácil",
    image: "https://images.unsplash.com/photo-1587241321921-91a834d82e01?w=600&h=400&fit=crop",
    ingredients: [
      "1 lata (395g) de leite condensado",
      "1 colher (sopa) de manteiga",
      "100g de coco ralado fino",
      "1 pitada de sal",
      "Coco ralado para decorar",
      "Cravos da índia para decorar",
      "Forminhas de papel número 5"
    ],
    instructions: [
      "Em uma panela de fundo grosso, coloque o leite condensado, a manteiga, o coco ralado e a pitada de sal.",
      "Leve ao fogo médio-baixo, mexendo constantemente com uma colher de pau.",
      "Continue mexendo sem parar por 10-12 minutos até o beijinho começar a desgrudar do fundo da panela e formar uma massa consistente.",
      "Transfira para um prato untado com manteiga e deixe esfriar completamente.",
      "Unte as mãos com manteiga e modele bolinhas do tamanho de uma noz.",
      "Passe cada bolinha no coco ralado, cobrindo toda a superfície.",
      "Coloque cada beijinho em uma forminha de papel e decore o topo com um cravo da índia.",
      "Guarde em recipiente fechado em temperatura ambiente por até 3 dias ou na geladeira por até 1 semana.",
      "Variação: Adicione raspas de limão à massa para um sabor cítrico especial."
    ],
    isFavorite: false
  },
  {
    id: 47,
    name: "Trufas de Chocolate Belga",
    category: "Doces",
    time: "40 min",
    difficulty: "Médio",
    image: "https://images.unsplash.com/photo-1548848979-47519fe73dca?w=600&h=400&fit=crop",
    ingredients: [
      "300g de chocolate meio amargo (50-70% cacau) picado",
      "200ml de creme de leite fresco",
      "2 colheres (sopa) de manteiga em temperatura ambiente",
      "2 colheres (sopa) de licor (opcional: amaretto, rum, Grand Marnier)",
      "Para cobertura: 200g de chocolate meio amargo derretido",
      "Cacau em pó 70%, chocolate granulado ou coco ralado para decorar"
    ],
    instructions: [
      "Pique o chocolate em pedaços pequenos e coloque em uma tigela resistente ao calor.",
      "Em uma panela, aqueça o creme de leite até começar a ferver (não deixe ferver completamente).",
      "Despeje o creme quente sobre o chocolate picado. Deixe descansar por 2 minutos sem mexer.",
      "Mexa delicadamente com uma espátula em movimentos circulares do centro para fora até o chocolate derreter completamente e formar uma ganache lisa e brilhante.",
      "Adicione a manteiga em temperatura ambiente e o licor (se usar). Misture até incorporar completamente.",
      "Cubra com filme plástico em contato direto com a ganache e leve à geladeira por 2-3 horas até firmar.",
      "Com uma colher de chá ou saco de confeitar, faça pequenas porções e modele bolinhas com as mãos (trabalhe rápido para não derreter).",
      "Leve as bolinhas à geladeira por 30 minutos para firmar novamente.",
      "Derreta o chocolate para cobertura em banho-maria. Mergulhe cada trufa no chocolate derretido usando um garfo, deixe escorrer o excesso.",
      "Antes de secar, passe no cacau em pó, chocolate granulado ou coco ralado. Coloque em forminhas.",
      "Guarde na geladeira em recipiente fechado por até 2 semanas. Retire 10 minutos antes de servir para melhor sabor."
    ],
    isFavorite: false
  },
  {
    id: 48,
    name: "Caipirinha Clássica",
    category: "Drinks",
    time: "5 min",
    difficulty: "Fácil",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&h=400&fit=crop",
    ingredients: [
      "60ml de cachaça de boa qualidade",
      "1 limão tahiti médio",
      "2 colheres (sopa) de açúcar refinado ou cristal",
      "Gelo em cubos (bastante)"
    ],
    instructions: [
      "Lave bem o limão e corte as pontas. Corte o limão ao meio no sentido do comprimento e depois cada metade em 4 pedaços (total de 8 pedaços).",
      "Coloque os pedaços de limão em um copo baixo (old fashioned) e adicione o açúcar.",
      "Com um socador (pilão), pressione e torça os pedaços de limão para extrair o suco e os óleos da casca. Faça isso com força mas sem esmagar demais a parte branca (que amarga).",
      "Encha o copo com gelo em cubos até a borda. Quanto mais gelo, melhor a diluição e temperatura.",
      "Adicione a cachaça sobre o gelo.",
      "Mexa vigorosamente com uma colher bailarina por 10-15 segundos para misturar bem todos os ingredientes e gelar o drink.",
      "Prove e ajuste o açúcar se necessário (adicione mais açúcar e mexa novamente).",
      "Sirva imediatamente com canudos curtos. A caipirinha perfeita deve ser equilibrada: nem muito doce, nem muito ácida, bem gelada e refrescante."
    ],
    isFavorite: false
  },
  {
    id: 49,
    name: "Gin Tônica Premium",
    category: "Drinks",
    time: "5 min",
    difficulty: "Fácil",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&h=400&fit=crop",
    ingredients: [
      "60ml de gin de qualidade",
      "150ml de água tônica premium bem gelada",
      "Gelo em cubos grandes",
      "Especiarias: zimbro, cardamomo ou pimenta rosa",
      "Ervas: alecrim fresco ou tomilho",
      "Frutas: fatias de limão siciliano, laranja ou toranja",
      "Casca de pepino (opcional)"
    ],
    instructions: [
      "Escolha um copo de vinho grande (tipo balão) ou copo highball. Encha com gelo em cubos grandes até a borda.",
      "Adicione os botânicos escolhidos: 2-3 bagas de zimbro, 1 ramo de alecrim ou tomilho, e algumas especiarias.",
      "Despeje o gin sobre o gelo e os botânicos.",
      "Complete delicadamente com a água tônica bem gelada, despejando lentamente pela lateral do copo para preservar o gás.",
      "Mexa suavemente UMA vez com uma colher bailarina, fazendo um movimento de baixo para cima.",
      "Adicione as frutas cítricas em fatias ou cascas como decoração e para perfumar.",
      "Sirva imediatamente. Não mexa mais - deixe os aromas se desenvolverem naturalmente.",
      "Dica: A proporção ideal é 1 parte de gin para 2,5 partes de tônica. Use sempre água tônica de qualidade e bem gelada."
    ],
    isFavorite: false
  },
  {
    id: 50,
    name: "Suco Verde Detox (Sem Álcool)",
    category: "Drinks",
    time: "10 min",
    difficulty: "Fácil",
    image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=600&h=400&fit=crop",
    ingredients: [
      "1 maçã verde com casca cortada em pedaços",
      "1 xícara de couve manteiga (3-4 folhas)",
      "1/2 pepino com casca",
      "Suco de 1 limão tahiti",
      "1 pedaço pequeno de gengibre (2cm)",
      "1 colher (sopa) de hortelã fresca",
      "500ml de água de coco gelada ou água filtrada",
      "1 colher (chá) de mel (opcional)",
      "Gelo a gosto"
    ],
    instructions: [
      "Lave muito bem todos os ingredientes, especialmente a couve e a hortelã.",
      "Corte a maçã em pedaços, removendo apenas as sementes. Mantenha a casca para mais fibras.",
      "Corte o pepino em rodelas grossas (pode manter a casca).",
      "Descasque o gengibre e corte em pedaços pequenos.",
      "No liquidificador, coloque primeiro os líquidos: água de coco e suco de limão.",
      "Adicione a couve rasgada em pedaços, a hortelã, o gengibre, o pepino e por último a maçã.",
      "Bata em velocidade alta por 1-2 minutos até obter uma mistura completamente homogênea e sem pedaços.",
      "Se preferir textura mais lisa, coe através de uma peneira fina ou coador de pano.",
      "Prove e adicione mel se desejar adoçar levemente.",
      "Sirva imediatamente em copos altos com gelo. O suco verde deve ser consumido logo após o preparo para preservar os nutrientes.",
      "Dica: Beba em jejum ou 30 minutos antes do café da manhã para melhor absorção dos nutrientes."
    ],
    isFavorite: false
  },
  {
    id: 51,
    name: "Bolo de Limão com Cobertura",
    category: "Bolos",
    time: "50 min",
    difficulty: "Fácil",
    image: "https://images.unsplash.com/photo-1519915212116-7cfef71f1d3e?w=600&h=400&fit=crop",
    ingredients: [
      "3 ovos grandes",
      "2 xícaras (chá) de açúcar",
      "1 xícara (chá) de óleo",
      "Raspas de 2 limões sicilianos",
      "Suco de 1 limão siciliano",
      "2 xícaras (chá) de farinha de trigo",
      "1 colher (sopa) de fermento em pó",
      "1 pitada de sal",
      "Para a cobertura: 1 xícara (chá) de açúcar de confeiteiro",
      "Suco de 1 limão siciliano",
      "Raspas de limão para decorar"
    ],
    instructions: [
      "Preaqueça o forno a 180°C. Unte e enfarinhe uma forma de bolo inglês (30x10cm) ou forma redonda com furo central.",
      "Em uma tigela grande, bata os ovos com o açúcar usando batedeira por 3-4 minutos até ficar claro e volumoso.",
      "Adicione o óleo, as raspas de limão e o suco de limão. Bata por mais 2 minutos.",
      "Peneie a farinha de trigo com o sal sobre a mistura. Incorpore delicadamente com uma espátula em movimentos envolventes.",
      "Por último, adicione o fermento peneirado e misture delicadamente apenas até incorporar.",
      "Despeje a massa na forma preparada e leve ao forno por 35-40 minutos ou até que um palito inserido no centro saia limpo.",
      "Enquanto o bolo assa, prepare a cobertura: Em uma tigela, misture o açúcar de confeiteiro com o suco de limão até formar uma calda lisa e brilhante.",
      "Retire o bolo do forno e deixe esfriar na forma por 10 minutos. Desenforme ainda morno.",
      "Com o bolo ainda morno, despeje a cobertura de limão por cima, espalhando com uma espátula. A cobertura vai penetrar levemente no bolo.",
      "Decore com raspas frescas de limão siciliano. Deixe a cobertura secar completamente antes de cortar (cerca de 30 minutos).",
      "Sirva em temperatura ambiente. O bolo fica ainda mais saboroso no dia seguinte!"
    ],
    isFavorite: false
  },
  {
    id: 52,
    name: "Bolo de Fubá Cremoso",
    category: "Bolos",
    time: "45 min",
    difficulty: "Fácil",
    image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&h=400&fit=crop",
    ingredients: [
      "3 ovos grandes",
      "2 xícaras (chá) de açúcar",
      "1 xícara (chá) de fubá mimoso",
      "1 xícara (chá) de farinha de trigo",
      "1 xícara (chá) de óleo",
      "2 xícaras (chá) de leite integral",
      "1 colher (sopa) de fermento em pó",
      "1 pitada de sal",
      "50g de queijo parmesão ralado (opcional)",
      "Manteiga e fubá para untar"
    ],
    instructions: [
      "Preaqueça o forno a 180°C. Unte uma forma redonda de 24cm com manteiga e polvilhe com fubá.",
      "No liquidificador, coloque os ovos, o açúcar, o óleo e o leite. Bata por 2 minutos até ficar homogêneo.",
      "Adicione o fubá, a farinha de trigo, o sal e o queijo parmesão (se usar). Bata novamente por 2 minutos.",
      "Por último, adicione o fermento em pó e bata rapidamente por 10 segundos apenas para incorporar.",
      "Despeje a massa na forma preparada. A massa ficará bem líquida - isso é normal e é o que dá a textura cremosa característica.",
      "Leve ao forno por 40-45 minutos. O bolo estará pronto quando a superfície estiver dourada e firme, mas o centro ainda levemente mole (ele firma ao esfriar).",
      "Retire do forno e deixe esfriar na forma por 15 minutos antes de desenformar.",
      "Desenforme em um prato de servir. O bolo de fubá cremoso tem textura úmida e levemente pudim no centro.",
      "Sirva morno ou em temperatura ambiente, polvilhado com açúcar de confeiteiro se desejar.",
      "Perfeito para acompanhar café da tarde! Guarde na geladeira por até 4 dias."
    ],
    isFavorite: false
  },
  {
    id: 53,
    name: "Bolo Nega Maluca",
    category: "Bolos",
    time: "40 min",
    difficulty: "Fácil",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop",
    ingredients: [
      "3 ovos grandes",
      "2 xícaras (chá) de açúcar",
      "1 xícara (chá) de óleo",
      "1 xícara (chá) de água quente",
      "2 xícaras (chá) de farinha de trigo",
      "1 xícara (chá) de chocolate em pó 50%",
      "1 colher (sopa) de fermento em pó",
      "Para a cobertura: 1 lata de leite condensado",
      "3 colheres (sopa) de chocolate em pó",
      "1 colher (sopa) de manteiga",
      "Chocolate granulado para decorar"
    ],
    instructions: [
      "Preaqueça o forno a 180°C. Unte e enfarinhe uma forma retangular (30x20cm).",
      "No liquidificador, bata os ovos, o açúcar e o óleo por 2 minutos até ficar homogêneo.",
      "Adicione a água quente e bata rapidamente por 30 segundos.",
      "Em uma tigela grande, peneie juntos a farinha de trigo e o chocolate em pó.",
      "Despeje a mistura líquida do liquidificador sobre os ingredientes secos. Misture delicadamente com uma espátula até incorporar.",
      "Adicione o fermento peneirado e misture delicadamente apenas até incorporar. A massa ficará bem líquida.",
      "Despeje na forma preparada e leve ao forno por 30-35 minutos ou até que um palito inserido no centro saia limpo.",
      "Enquanto o bolo assa, prepare a cobertura: Em uma panela, coloque o leite condensado, o chocolate em pó e a manteiga. Leve ao fogo médio, mexendo constantemente até levantar fervura. Ferva por 2 minutos até engrossar levemente.",
      "Retire o bolo do forno e ainda quente, fure toda a superfície com um garfo.",
      "Despeje a cobertura de chocolate quente sobre o bolo quente, espalhando uniformemente. A cobertura vai penetrar nos furos.",
      "Polvilhe chocolate granulado por cima enquanto a cobertura ainda está quente.",
      "Deixe esfriar completamente antes de cortar. Sirva em temperatura ambiente ou gelado."
    ],
    isFavorite: false
  },
  {
    id: 54,
    name: "Cheesecake de Frutas Vermelhas",
    category: "Sobremesas",
    time: "90 min",
    difficulty: "Médio",
    image: "https://images.unsplash.com/photo-1533134242820-b4f6b6e7f7e9?w=600&h=400&fit=crop",
    ingredients: [
      "Para a base: 200g de biscoito maisena triturado",
      "100g de manteiga derretida",
      "Para o recheio: 600g de cream cheese em temperatura ambiente",
      "1 xícara (chá) de açúcar",
      "3 ovos grandes",
      "1 colher (chá) de essência de baunilha",
      "1 xícara (chá) de creme de leite",
      "Para a calda: 300g de frutas vermelhas congeladas",
      "1/2 xícara (chá) de açúcar",
      "Suco de 1/2 limão"
    ],
    instructions: [
      "Preaqueça o forno a 160°C. Forre o fundo de uma forma de aro removível (20cm) com papel manteiga.",
      "Prepare a base: Misture o biscoito triturado com a manteiga derretida até formar uma farofa úmida.",
      "Pressione a mistura no fundo da forma, compactando bem com as costas de uma colher. Leve à geladeira enquanto prepara o recheio.",
      "Prepare o recheio: Em uma tigela grande, bata o cream cheese com o açúcar usando batedeira em velocidade média por 3 minutos até ficar cremoso.",
      "Adicione os ovos um de cada vez, batendo bem após cada adição. Adicione a essência de baunilha.",
      "Adicione o creme de leite e bata em velocidade baixa apenas até incorporar. Não bata demais.",
      "Despeje o recheio sobre a base gelada. Bata levemente a forma na bancada para eliminar bolhas de ar.",
      "Leve ao forno por 50-60 minutos. O cheesecake está pronto quando as bordas estiverem firmes mas o centro ainda levemente mole (vai firmar ao esfriar).",
      "Desligue o forno, abra a porta e deixe o cheesecake esfriar dentro do forno por 1 hora (isso evita rachaduras).",
      "Retire do forno, deixe esfriar completamente e leve à geladeira por no mínimo 4 horas ou de um dia para o outro.",
      "Prepare a calda: Em uma panela, cozinhe as frutas vermelhas com o açúcar e o suco de limão por 10 minutos até formar uma calda. Deixe esfriar.",
      "Desenforme o cheesecake e cubra com a calda de frutas vermelhas. Sirva bem gelado."
    ],
    isFavorite: false
  },
  {
    id: 55,
    name: "Pavê de Chocolate",
    category: "Sobremesas",
    time: "30 min",
    difficulty: "Fácil",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&h=400&fit=crop",
    ingredients: [
      "2 latas de leite condensado",
      "2 latas de creme de leite (use a lata do leite condensado como medida)",
      "4 colheres (sopa) de chocolate em pó 50%",
      "2 colheres (sopa) de manteiga",
      "400g de biscoito maisena ou champagne",
      "2 xícaras (chá) de leite integral para molhar os biscoitos",
      "Chocolate granulado para decorar",
      "Raspas de chocolate para decorar"
    ],
    instructions: [
      "Prepare o creme de chocolate: Em uma panela, coloque o leite condensado, 1 lata de creme de leite, o chocolate em pó peneirado e a manteiga.",
      "Leve ao fogo médio, mexendo constantemente por 8-10 minutos até engrossar e começar a desgrudar do fundo da panela. Reserve e deixe esfriar.",
      "Prepare o creme branco: Em uma tigela, misture a outra lata de creme de leite com 3 colheres (sopa) do creme de chocolate já pronto. Misture bem até ficar homogêneo. Reserve.",
      "Coloque o leite em um prato fundo. Mergulhe rapidamente os biscoitos no leite (1 segundo de cada lado - não deixe encharcar).",
      "Monte o pavê: Em um refratário retangular (20x30cm), faça uma camada de biscoitos molhados no fundo.",
      "Espalhe metade do creme de chocolate sobre os biscoitos, distribuindo uniformemente.",
      "Faça outra camada de biscoitos molhados no leite.",
      "Espalhe todo o creme branco sobre a segunda camada de biscoitos.",
      "Faça a terceira camada de biscoitos e cubra com o restante do creme de chocolate.",
      "Alise bem a superfície com uma espátula. Decore com chocolate granulado e raspas de chocolate.",
      "Cubra com filme plástico e leve à geladeira por no mínimo 4 horas ou de um dia para o outro para firmar.",
      "Corte em quadrados e sirva bem gelado. O pavê fica ainda melhor no dia seguinte!"
    ],
    isFavorite: false
  },
  {
    id: 56,
    name: "Salada de Quinoa Fitness",
    category: "Fitness",
    time: "25 min",
    difficulty: "Fácil",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=600&h=400&fit=crop",
    ingredients: [
      "1 xícara (chá) de quinoa em grãos",
      "2 xícaras (chá) de água",
      "1 pepino médio cortado em cubos",
      "2 tomates médios cortados em cubos",
      "1/2 cebola roxa picada finamente",
      "1 xícara de grão de bico cozido",
      "1/2 xícara de folhas de hortelã picadas",
      "1/2 xícara de salsinha picada",
      "Suco de 2 limões",
      "3 colheres (sopa) de azeite extra virgem",
      "Sal e pimenta do reino a gosto",
      "Sementes de girassol ou abóbora para decorar (opcional)"
    ],
    instructions: [
      "Lave bem a quinoa em água corrente usando uma peneira fina para remover o sabor amargo natural.",
      "Em uma panela média, coloque a quinoa lavada e a água. Leve ao fogo alto até ferver.",
      "Quando ferver, reduza o fogo para baixo, tampe a panela e cozinhe por 15 minutos até a água secar completamente e a quinoa ficar macia.",
      "Desligue o fogo e deixe a quinoa descansar tampada por 5 minutos. Depois solte os grãos com um garfo e deixe esfriar completamente.",
      "Em uma tigela grande, coloque a quinoa fria, o pepino, os tomates, a cebola roxa e o grão de bico.",
      "Adicione a hortelã e a salsinha picadas.",
      "Em uma tigela pequena, misture o suco de limão, o azeite, sal e pimenta do reino. Bata bem com um garfo para emulsificar.",
      "Despeje o molho sobre a salada e misture delicadamente para incorporar todos os ingredientes.",
      "Prove e ajuste o sal e limão se necessário.",
      "Leve à geladeira por 30 minutos antes de servir para os sabores se integrarem.",
      "Sirva gelada, decorada com sementes de girassol ou abóbora. Perfeita para marmitas fitness!",
      "Guarde na geladeira em recipiente fechado por até 3 dias."
    ],
    isFavorite: false,
    isFitness: true
  },
  {
    id: 57,
    name: "Wrap de Frango Fitness",
    category: "Fitness",
    time: "20 min",
    difficulty: "Fácil",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&h=400&fit=crop",
    ingredients: [
      "2 tortilhas integrais grandes",
      "300g de peito de frango grelhado cortado em tiras",
      "1 xícara de alface americana picada",
      "1 tomate médio cortado em cubos",
      "1/2 cebola roxa fatiada finamente",
      "1 cenoura ralada",
      "1/2 abacate fatiado",
      "2 colheres (sopa) de iogurte grego natural",
      "1 colher (chá) de mostarda dijon",
      "Suco de 1/2 limão",
      "Sal, pimenta e páprica a gosto",
      "Azeite para grelhar"
    ],
    instructions: [
      "Tempere o peito de frango com sal, pimenta e páprica. Grelhe em uma frigideira com um fio de azeite por 4-5 minutos de cada lado até cozinhar completamente e dourar. Corte em tiras.",
      "Prepare o molho: Em uma tigela pequena, misture o iogurte grego, a mostarda dijon, o suco de limão, sal e pimenta. Reserve.",
      "Aqueça levemente as tortilhas em uma frigideira seca por 30 segundos de cada lado para ficarem mais flexíveis.",
      "Monte os wraps: Coloque cada tortilla em uma superfície plana.",
      "Espalhe metade do molho de iogurte no centro de cada tortilla, deixando as bordas livres.",
      "Distribua a alface picada, o tomate, a cebola roxa, a cenoura ralada e o abacate fatiado sobre o molho.",
      "Coloque as tiras de frango grelhado por cima dos vegetais.",
      "Para enrolar: Dobre as laterais da tortilla para dentro, depois enrole firmemente de baixo para cima, pressionando levemente para compactar.",
      "Se desejar, aqueça o wrap montado na frigideira por 1 minuto de cada lado para tostar levemente e selar.",
      "Corte ao meio na diagonal e sirva imediatamente.",
      "Perfeito para marmitas! Embrulhe em papel alumínio e leve na bolsa. Consuma em até 4 horas."
    ],
    isFavorite: false,
    isFitness: true
  },
  {
    id: 58,
    name: "Omelete Fitness de Claras",
    category: "Fitness",
    time: "10 min",
    difficulty: "Fácil",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&h=400&fit=crop",
    ingredients: [
      "6 claras de ovos grandes",
      "1 ovo inteiro",
      "1/2 xícara de espinafre fresco picado",
      "1/2 tomate picado",
      "1/4 cebola picada",
      "2 colheres (sopa) de queijo cottage ou ricota",
      "Sal, pimenta do reino e orégano a gosto",
      "Spray de óleo ou 1 colher (chá) de azeite",
      "Cebolinha verde picada para decorar"
    ],
    instructions: [
      "Em uma tigela, bata levemente as claras com o ovo inteiro usando um garfo. Tempere com sal, pimenta e orégano.",
      "Adicione o espinafre picado, o tomate e a cebola à mistura de ovos. Misture bem.",
      "Aqueça uma frigideira antiaderente média em fogo médio. Borrife spray de óleo ou adicione o azeite.",
      "Despeje a mistura de ovos na frigideira e espalhe uniformemente.",
      "Cozinhe em fogo médio-baixo por 3-4 minutos sem mexer, até as bordas começarem a firmar.",
      "Quando a superfície ainda estiver levemente úmida, distribua o queijo cottage ou ricota sobre metade da omelete.",
      "Com uma espátula, dobre a omelete ao meio, cobrindo o queijo.",
      "Cozinhe por mais 1-2 minutos até o queijo derreter e a omelete firmar completamente.",
      "Deslize para um prato, decore com cebolinha verde picada.",
      "Sirva imediatamente acompanhado de torradas integrais ou salada verde.",
      "Perfeito para café da manhã pós-treino! Alto em proteínas e baixo em calorias."
    ],
    isFavorite: false,
    isFitness: true
  }
]

export default function RecipesApp() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("Todas")
  const [searchTerm, setSearchTerm] = useState("")
  const [recipesList, setRecipesList] = useState(recipes)
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)

  const categories: { name: Category; icon: any }[] = [
    { name: "Todas", icon: ChefHat },
    { name: "Comidas", icon: ChefHat },
    { name: "Sobremesas", icon: IceCream },
    { name: "Drinks", icon: Coffee },
    { name: "Doces", icon: Cookie },
    { name: "Bolos", icon: Circle },
    { name: "Fitness", icon: Heart }
  ]

  const filteredRecipes = recipesList.filter(recipe => {
    const matchesCategory = selectedCategory === "Todas" || recipe.category === selectedCategory
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const toggleFavorite = (id: number) => {
    setRecipesList(recipesList.map(recipe => 
      recipe.id === id ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-orange-400 to-red-500 p-2 sm:p-3 rounded-2xl shadow-lg">
                <ChefHat className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Receitas Rápidas
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Delícias em minutos</p>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Buscar receitas ou ingredientes..."
                className="pl-10 pr-4 py-2 w-full rounded-xl border-2 focus:border-orange-400 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Categories */}
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <Button
                key={cat.name}
                variant={selectedCategory === cat.name ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-xl transition-all duration-300 ${
                  selectedCategory === cat.name
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg scale-105"
                    : "hover:border-orange-400 hover:text-orange-600"
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.name}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="container mx-auto px-4 pb-12">
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-16">
            <ChefHat className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-xl text-gray-500">Nenhuma receita encontrada</p>
            <p className="text-sm text-gray-400 mt-2">Tente buscar por outro termo</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredRecipes.map((recipe) => (
              <Card 
                key={recipe.id} 
                className="group hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden rounded-2xl border-2 hover:border-orange-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-3 right-3 rounded-full bg-white/90 hover:bg-white shadow-lg"
                    onClick={() => toggleFavorite(recipe.id)}
                  >
                    <Heart 
                      className={`w-5 h-5 transition-colors ${
                        recipe.isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
                      }`}
                    />
                  </Button>
                  <Badge className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                    {recipe.category}
                  </Badge>
                  {recipe.isFitness && (
                    <Badge className="absolute top-12 left-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                      Fitness
                    </Badge>
                  )}
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg sm:text-xl line-clamp-1">{recipe.name}</CardTitle>
                  <CardDescription className="flex items-center gap-4 text-xs sm:text-sm">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {recipe.time}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {recipe.difficulty}
                    </Badge>
                  </CardDescription>
                </CardHeader>

                <CardContent className="pb-3">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Ingredientes:</p>
                    <ul className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      {recipe.ingredients.slice(0, 3).map((ing, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-orange-500 mt-1">•</span>
                          <span className="line-clamp-1">{ing}</span>
                        </li>
                      ))}
                    </ul>
                    {recipe.ingredients.length > 3 && (
                      <p className="text-xs text-gray-500">+ {recipe.ingredients.length - 3} ingredientes</p>
                    )}
                  </div>
                </CardContent>

                <CardFooter>
                  <Button 
                    onClick={() => setSelectedRecipe(recipe)}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl shadow-md transition-all duration-300"
                  >
                    Ver Receita Completa
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Recipe Detail Dialog */}
      <Dialog open={!!selectedRecipe} onOpenChange={() => setSelectedRecipe(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedRecipe && (
            <div className="space-y-6">
              <DialogHeader>
                <div className="relative w-full h-64 rounded-xl overflow-hidden mb-4">
                  <img
                    src={selectedRecipe.image}
                    alt={selectedRecipe.name}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-4 right-4 rounded-full bg-white/90 hover:bg-white shadow-lg"
                    onClick={() => toggleFavorite(selectedRecipe.id)}
                  >
                    <Heart 
                      className={`w-5 h-5 transition-colors ${
                        selectedRecipe.isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
                      }`}
                    />
                  </Button>
                </div>
                <DialogTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  {selectedRecipe.name}
                </DialogTitle>
                <div className="flex items-center gap-4 pt-2">
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                    {selectedRecipe.category}
                  </Badge>
                  {selectedRecipe.isFitness && (
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                      Fitness
                    </Badge>
                  )}
                  <span className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    {selectedRecipe.time}
                  </span>
                  <Badge variant="outline">
                    {selectedRecipe.difficulty}
                  </Badge>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                {/* Ingredientes */}
                <div className="bg-orange-50 dark:bg-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                      1
                    </span>
                    Ingredientes
                  </h3>
                  <ul className="space-y-3">
                    {selectedRecipe.ingredients.map((ingredient, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                        <span className="text-orange-500 text-xl mt-0.5">•</span>
                        <span className="text-base">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Modo de Preparo */}
                <div className="bg-red-50 dark:bg-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                      2
                    </span>
                    Modo de Preparo
                  </h3>
                  <ol className="space-y-4">
                    {selectedRecipe.instructions.map((instruction, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-base text-gray-700 dark:text-gray-300 pt-1">
                          {instruction}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Dica Extra */}
                <div className="bg-gradient-to-r from-orange-100 to-red-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border-l-4 border-orange-500">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-bold text-orange-600 dark:text-orange-400">💡 Dica:</span> {selectedRecipe.isFitness ? "Perfeito para pré ou pós-treino! Rico em proteínas e nutrientes." : "Sirva imediatamente para melhor sabor e textura!"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
