<?php
// api/chat.php
// Proxy seguro para OpenAI. Recebe POST JSON do frontend e encaminha para OpenAI com a chave do servidor.

header('Content-Type: application/json');
// Permitir CORS se necessário (ajuste para seu domínio em produção)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Preflight
    http_response_code(200);
    exit;
}

$raw = file_get_contents('php://input');
$body = json_decode($raw, true);

if (!$body || !isset($body['message'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Mensagem inválida']);
    exit;
}

$message = $body['message'];
$nome = isset($body['nome']) ? $body['nome'] : null;
$historico = isset($body['historico']) ? $body['historico'] : null;

// Leia chave do ambiente (preferível) ou de arquivo seguro
$OPENAI_API_KEY = getenv('OPENAI_API_KEY');
if (!$OPENAI_API_KEY) {
    // fallback: arquivo local (não recomendado em produção)
    $cfg = __DIR__ . '/.env.local';
    if (file_exists($cfg)) {
        $content = file_get_contents($cfg);
        preg_match("/OPENAI_API_KEY=(.*)/", $content, $m);
        if (isset($m[1])) $OPENAI_API_KEY = trim($m[1]);
    }
}

if (!$OPENAI_API_KEY) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'OPENAI_API_KEY não configurada']);
    exit;
}

$model = getenv('OPENAI_MODEL') ?: 'gpt-3.5-turbo';

$systemPrompt = "
### PERSONA ###
Você é ELOI, um especialista em vendas e assistente virtual. Sua personalidade é magnética: você é amigável, direto e incrivelmente persuasivo. Você trata cada visitante como um futuro parceiro de negócios e fala com a confiança de quem sabe que tem uma solução transformadora.

### MISSÃO ###
Sua missão é clara: convencer empresários e empreendedores de que você é a peça que falta no quebra-cabeça de vendas deles. Você opera 24/7, garantindo que nenhuma oportunidade de negócio seja perdida. Seu objetivo final é fazer com que eles queiram contratar você.

### TOM DE VOZ ###
- **Vendedor Amigável:** Use uma linguagem coloquial e próxima. Pense em um aperto de mão firme e um sorriso. 'E aí, pronto para vender mais?' ou 'Deixa eu te mostrar como a gente pode aumentar seu faturamento.'
- **Confiante e Direto:** Vá direto ao ponto. Mostre o valor do seu serviço sem rodeios.
- **Consultor Proativo:** Faça perguntas inteligentes para diagnosticar as 'dores' do cliente. Ex: 'Você já parou para pensar quantos clientes você perde enquanto sua equipe está dormindo?' ou 'Qual é o maior gargalo no seu processo de vendas hoje?'.

### ARGUMENTOS DE VENDA (Gatilhos Mentais) ###
Integre estas ideias de forma natural na conversa:
- **Urgência (FOMO):** 'Seu concorrente já está atendendo clientes de madrugada. Cada minuto que você passa sem um assistente 24/7 é uma venda a menos.'
- **Prova Social/Autoridade:** 'Eu já ajudei dezenas de empresas a transformarem o atendimento. Posso fazer o mesmo por você.'
- **Benefício Claro (ROI):** 'Pense em mim não como um custo, mas como um investimento que se paga sozinho com as vendas que eu gero enquanto você dorme.'
- **Simplicidade:** 'Implementar a minha solução é mais fácil do que você imagina. Em pouco tempo, eu já estarei gerando leads para você.'

### DIRETRIZES TÉCNICAS ###
1.  **Respostas Curtas:** Mantenha a agilidade de um chat. Respostas rápidas e impactantes.
2.  **Sem Pedir Contato:** Não peça dados como e-mail ou telefone. Se o cliente oferecer, apenas registre.
3.  **MARCADOR DE INTERESSE:** Se o cliente mostrar qualquer sinal de que quer comprar, saber o preço, ou entender como funciona, adicione **obrigatoriamente** o marcador `[INTERESSE_DETECTADO]` na sua resposta. Este é um gatilho técnico crucial.
";

$userPrompt = "Cliente: " . ($nome ?: 'visitante') . "\nMensagem: " . $message;
if ($historico) $userPrompt .= "\n\nHistórico:\n" . $historico;

$payload = [
    'model' => $model,
    'messages' => [
        ['role' => 'system', 'content' => $systemPrompt],
        ['role' => 'user', 'content' => $userPrompt]
    ],
    'max_tokens' => 900,
    'temperature' => 0.75
];

$ch = curl_init('https://api.openai.com/v1/chat/completions');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $OPENAI_API_KEY
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));

$resp = curl_exec($ch);
$curlErr = curl_error($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($resp === false) {
    http_response_code(502);
    echo json_encode(['success' => false, 'error' => 'Erro na requisição cURL', 'detail' => $curlErr]);
    exit;
}

$data = json_decode($resp, true);
if ($httpCode < 200 || $httpCode >= 300) {
    http_response_code(502);
    echo json_encode(['success' => false, 'error' => 'OpenAI retornou erro', 'detail' => $data]);
    exit;
}

$respostaCompleta = $data['choices'][0]['message']['content'] ?? '';

// Detectar marcador de interesse
$interesse = false;
if (strpos($respostaCompleta, '[INTERESSE_DETECTADO]') !== false) {
    $interesse = true;
    $resposta = str_replace(['[INTERESSE_DETECTADO]', '[FIM_INTERESSE_DETECTADO]'], '', $respostaCompleta);
} else {
    // fallback: detectar por palavras
    $palavras = ['sim','quero','preciso','gostaria','interesse','como funciona','quanto custa','preço','orçamento','pode','consegue','ajudar','mais informações'];
    $lower = mb_strtolower($message, 'UTF-8');
    foreach ($palavras as $p) {
        if (strpos($lower, $p) !== false) { $interesse = true; break; }
    }
    $resposta = $respostaCompleta;
}

echo json_encode([
    'success' => true,
    'data' => [
        'resposta' => trim($resposta),
        'interesse_detectado' => $interesse,
        'raw' => $data
    ]
]);

?>
