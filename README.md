---

## 1. Contexto e Problema

Operações de içamento em portos, centros de distribuição e indústrias pesadas exigem que trabalhadores se posicionem manualmente para conectar eslingas (cabos ou correias de sustentação) ao gancho do guindaste e aos pontos de ancoragem da carga. Essa atividade envolve cargas de até 25 toneladas — contêineres, big bags e peças industriais — e coloca o operador dentro de uma **zona de risco** com potencial de:

- Quedas por oscilação da carga ou do gancho
- Esmagamentos durante o encaixe ou liberação
- Falhas de engate incompleto ou incorreto
- Baixa visibilidade, poeira, chuva ou vento
- Erros de comunicação entre operadores

O processo é pouco padronizado, especialmente porque os pontos de ancoragem variam entre tipos de carga, tornando difícil a automação direta sem adaptação ao contexto real.

---

## 2. Proposta de Solução

O **SARA** é uma plataforma modular de automação do engate e desengate de eslingas, composta por quatro módulos integrados que trabalham em conjunto. A filosofia central é: **não modificar nenhum equipamento certificado**. O sistema funciona como um acessório inteligente acoplado ao gancho existente, transferindo o papel do trabalhador braçal para um operador remoto posicionado a mais de 20 metros de distância.

### Princípio geral de funcionamento

> O operador sai da zona de risco. A câmera vai até onde ele estava. O robô faz o engate. O sensor confirma. O guindaste içia.
> 

---

## 3. Módulos do Sistema

### 3.1 Módulo de Engate Inteligente (MEI)

Dispositivo eletromecânico acoplado ao gancho do guindaste por abraçadeiras de alta resistência — sem solda, sem furação, sem alteração estrutural.

**Como funciona:**

- Garra com 4 dedos articulados que envolve o olhal da eslinga e a trava no ponto de ancoragem
- Atuação por motor brushless com parafuso esférico (alta força, baixo ruído)
- Força de aperto monitorada continuamente por strain gauge
- Compatível com eslingas de 1" a 4" de diâmetro
- Alimentação por bateria interna (8 horas) ou cabo da lança do guindaste

**Especificações:**

- Capacidade de carga: até 35 toneladas
- Tempo de engate: aproximadamente 8 segundos
- Peso próprio do módulo: aproximadamente 12 kg
- Instalação e remoção: menos de 30 minutos

---

### 3.2 Unidade de Visão e Posicionamento (UVP)

Sistema de percepção embarcado que substitui os olhos do trabalhador na zona de risco.

**Como funciona:**

- Par de câmeras estéreo 4K para reconstrução 3D do ambiente
- Sensor LiDAR de médio alcance para mapeamento de profundidade mesmo sem luz
- Software de detecção de objetos baseado em YOLOv8 (fine-tuned para pontos de ancoragem industriais)
- Overlay de realidade aumentada no PCR que guia o operador ao alinhamento ideal
- Funciona em condições adversas: poeira, chuva, névoa, baixa iluminação

**Especificações:**

- Alcance: 0,3 m a 8 m
- Latência de processamento: menos de 50 ms
- Acurácia de posicionamento 3D: ±5 mm
- Classificação de proteção: IP67
- Faixa de temperatura: -20°C a +65°C

---

### 3.3 Painel de Controle Remoto (PCR)

Interface que permite ao operador conduzir toda a operação de içamento a distância segura.

**Como funciona:**

- Tablet ruggedizado ou controle dedicado com vídeo ao vivo das câmeras do MEI
- Guias visuais de alinhamento em realidade aumentada
- Display em tempo real da força de engate e status do SVE
- Alertas visuais e sonoros para condições de atenção
- Botão físico de emergência com parada imediata e abertura de garra
- Comunicação redundante: Wi-Fi 6 (principal) + rádio 900 MHz (backup)
- Modo de teleoperation guiada com assistência de IA para casos difíceis

**Especificações:**

- Raio de operação seguro: mais de 20 metros
- Autonomia de bateria: 10 horas
- Certificação de resistência: IP65 (uso externo em intempéries)

---

### 3.4 Sistema de Verificação de Engate (SVE)

Camada de segurança ativa que impede o içamento em caso de engate incorreto ou incompleto.

**Como funciona:**

- Célula de carga integrada ao MEI confirma força simétrica nos pontos de ancoragem
- Câmera de inspeção angular valida visualmente o encaixe físico
- Algoritmo classifica o engate em: COMPLETO / PARCIAL / INCORRETO
- Em caso de engate PARCIAL ou INCORRETO, o sistema bloqueia o sinal de içamento via saída discreta para o CLP do guindaste (interface de comunicação existente, sem modificação física)
- Log completo de cada operação (timestamp, força, imagem, classificação) armazenado em nuvem

**Especificações:**

- Taxa de detecção de engates incorretos: 100% (design fail-safe)
- Taxa alvo de engate correto nas tentativas: ≥99,5%
- Rastreabilidade: 100% das operações registradas

---

## 4. Fluxo Operacional

### Ciclo de Conexão (Engate)

| Etapa | Descrição | Quem age | Localização do operador |
| --- | --- | --- | --- |
| 1 | Posicionamento do guindaste | Operador de cabine | Cabine (seguro) |
| 2 | Detecção dos pontos de ancoragem | UVP (automático) | — |
| 3 | Aproximação assistida com overlay de AR | Operador no PCR | Zona segura (+20 m) |
| 4 | Engate automático | MEI (automático) | — |
| 5 | Verificação e liberação | SVE (automático) | — |
| 6 | Içamento autorizado | Operador de cabine | Cabine (seguro) |

### Ciclo de Desconexão (Desengate)

| Etapa | Descrição | Quem age | Localização do operador |
| --- | --- | --- | --- |
| 1 | Deposição da carga no destino | Operador de cabine | Cabine (seguro) |
| 2 | Confirmação de peso transferido | SVE (automático) | — |
| 3 | Desengate automático | MEI (automático) | — |
| 4 | Registro do ciclo | SVE (automático) | — |
| 5 | Recolhimento das eslingas | MEI ou manual (zona já segura) | Zona segura |

---

## 5. Métricas e Desempenho Esperado

### Métrica principal

| Indicador | Processo Manual | Com SARA | Redução |
| --- | --- | --- | --- |
| Tempo em zona de risco por ciclo | 8–15 minutos | 0–90 segundos | **88–95%** |

Meta estabelecida pelo desafio: ≥80% de redução. A proposta supera esse patamar.

### Métricas secundárias

| Indicador | Meta SARA |
| --- | --- |
| Tempo de engate + verificação | ~14 segundos |
| Taxa de engate correto (1ª tentativa) | ≥99,5% |
| Repetibilidade de posicionamento | ±5 mm |
| Tempo total do ciclo de operação | Neutro a -15% versus manual |
| Detecção de engates parciais ou incorretos | 100% (fail-safe) |
| Rastreabilidade das operações | 100% (log em nuvem) |

### Comparativo de riscos

| Risco | Status com SARA |
| --- | --- |
| Queda por oscilação da carga | Eliminado |
| Esmagamento durante engate | Eliminado |
| Engate incompleto/incorreto | Detectado e bloqueado antes do içamento |
| Falha de comunicação entre operadores | Mitigado (interface visual unificada no PCR) |
| Condições adversas (chuva, poeira, escuridão) | Mitigado (IP67 + LiDAR + câmeras estéreo) |

---

## 6. Premissas do Desafio — Atendimento

| Requisito do desafio | Como o SARA atende |
| --- | --- |
| Sem modificações em equipamentos certificados | MEI fixado por abraçadeiras; SVE usa interface CLP existente |
| Adaptação a diferentes tipos de carga | UVP detecta pontos de ancoragem em contêineres, big bags e peças variadas |
| Fácil instalação e remoção | Montagem e desmontagem em menos de 30 minutos |
| Funcionamento em condições adversas | IP67, LiDAR, câmeras estéreo, faixa -20°C a +65°C |
| Alta confiabilidade / falha segura | SVE bloqueia içamento em qualquer engate incorreto |
| Viabilidade industrial | Componentes comerciais robustos, modelo HaaS para grandes empresas |

---

## 7. Adequação a Grandes Empresas

O SARA foi concebido para operar em ambientes industriais de grande escala. Para esse perfil de cliente, alguns pontos são especialmente relevantes:

**ROI claro:** Um único acidente fatal em operação portuária gera custos diretos e indiretos (processos judiciais, paralisação, seguros, reputação) que superam amplamente o investimento no sistema. Empresas com centenas de ciclos por dia têm retorno acelerado.

**Compliance e ESG:** O log automático de 100% das operações atende exigências de auditoria, relatórios ESG e seguradoras. A documentação de conformidade com NR-11 e NR-12 é facilitada pelos registros em nuvem.

**Sem disrupção operacional:** Por não modificar equipamentos e poder ser instalado e removido rapidamente, o sistema não compromete certificações existentes nem exige paradas longas para retrofit.

**Modelo de negócio recomendado:** Hardware-as-a-Service (HaaS) — mensalidade por guindaste equipado, com manutenção, atualizações de software e suporte incluídos. Elimina CAPEX elevado para o cliente e cria relação contínua de valor.

---

## 8. Tecnologias-Chave

| Componente | Tecnologia |
| --- | --- |
| Visão computacional | YOLOv8 fine-tuned + reconstrução estéreo 3D |
| Sensor de profundidade | LiDAR de médio alcance |
| Atuação mecânica | Motor brushless + parafuso esférico |
| Monitoramento de força | Strain gauge + célula de carga |
| Comunicação | Wi-Fi 6 (principal) + 900 MHz (redundante) |
| Software embarcado | Linux + ROS 2 |
| Interface de usuário | Realidade aumentada + streaming de vídeo |
| Rastreabilidade | Log em nuvem com timestamp, força e imagem |

---

## 9. Plano de Implementação

### Fase 1 — Prova de conceito (Meses 1–3)

Desenvolvimento do protótipo funcional do MEI e UVP. Testes em ambiente controlado com cargas simuladas. Validação do algoritmo de detecção de pontos de ancoragem. Levantamento de requisitos regulatórios (NR-11, NR-12, certificações aplicáveis). Entregável: protótipo + relatório de desempenho inicial.

### Fase 2 — Piloto operacional (Meses 4–8)

Instalação em guindaste real em ambiente portuário ou industrial controlado. Operação supervisionada por engenheiro. Coleta de dados de no mínimo 500 ciclos reais. Ajuste fino do modelo de visão para as condições específicas do ambiente. Treinamento de operadores no PCR. Entregável: relatório de campo com métricas reais.

### Fase 3 — Refinamento e certificação (Meses 9–14)

Ajustes baseados nos dados do piloto. Processo de homologação junto a órgãos competentes (Inmetro, Bureau Veritas ou DNV, conforme aplicável). Desenvolvimento de kit de retrofit padronizado para múltiplos modelos de guindaste. Documentação técnica completa e manual do operador.

### Fase 4 — Escalonamento (Mês 15 em diante)

Implantação em múltiplos guindastes na mesma operação. Integração com sistemas de gestão portuária ou industrial existentes (TOS, ERP). Dashboard centralizado de monitoramento e KPIs de segurança. Atualizações de firmware via OTA. Expansão para big bags com geometria variável e outros tipos de carga não padronizados.

---

## 10. Diferenciais Competitivos

1. **Não modifica equipamentos certificados** — ponto de entrada obrigatório para grandes operações industriais
2. **Adaptação a pontos de ancoragem não padronizados** — diferencial técnico crítico frente a soluções rígidas
3. **Verificação ativa de engate** — única forma confiável de garantir segurança sem presença humana na zona de risco
4. **Instalação em menos de 30 minutos** — viabiliza uso temporário, testes e rotação entre guindastes
5. **Rastreabilidade 100% das operações** — valor direto para compliance, auditorias e ESG
6. **Modelo HaaS** — reduz barreira de entrada e garante atualização contínua do sistema

---
