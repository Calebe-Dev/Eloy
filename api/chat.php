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

$systemPrompt = "Você é ELOI, um vendedor virtual inteligente e confiável que trabalha 24/7. Seja breve, profissional e foque em captar interesse. Use o marcador [INTERESSE_DETECTADO] quando o cliente demonstrar intenção clara. Não peça diretamente telefone/email a princípio.";

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
