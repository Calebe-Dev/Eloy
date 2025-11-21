<?php
// Habilita o log de erros em um arquivo, para podermos depurar sem expor informações
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php-error.log');
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Responde com sucesso a requisições OPTIONS (pre-flight requests)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// VALIDAÇÃO DE SEGURANÇA BÁSICA
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['status' => 'error', 'message' => 'Método não permitido. Use POST.']);
    exit;
}

// Obtenha o corpo da requisição
$jsonPayload = file_get_contents('php://input');
$data = json_decode($jsonPayload, true);

// Validação de entrada
if ($data === null || !isset($data['name']) || !isset($data['email']) || !isset($data['phone']) || !isset($data['message'])) {
    http_response_code(400); // Bad Request
    echo json_encode(['status' => 'error', 'message' => 'Dados ausentes ou em formato inválido.']);
    exit;
}

// Limpeza e Sanitização dos Dados (evita CRLF e caracteres perigosos)
$raw_name = isset($data['name']) ? trim($data['name']) : '';
$name = htmlspecialchars(preg_replace("/[\r\n]+/", ' ', $raw_name), ENT_QUOTES, 'UTF-8');
$email = isset($data['email']) ? filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL) : '';
$phone = isset($data['phone']) ? htmlspecialchars(preg_replace("/[\r\n]+/", ' ', trim($data['phone'])), ENT_QUOTES, 'UTF-8') : '';
$message = isset($data['message']) ? nl2br(htmlspecialchars(trim($data['message']), ENT_QUOTES, 'UTF-8')) : '';
$interest = isset($data['interest']) ? htmlspecialchars(preg_replace("/[\r\n]+/", ' ', trim($data['interest'])), ENT_QUOTES, 'UTF-8') : 'Não especificado';

// Validação de E-mail
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Endereço de e-mail inválido.']);
    exit;
}

// --- CONFIGURAÇÃO DO E-MAIL ---
// Carrega as variáveis de ambiente procurando por: api/.env.local -> api/.env -> ../.env
function load_env_file($path) {
    $vars = [];
    if (!file_exists($path)) return $vars;
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || $line[0] === '#') continue;
        if (strpos($line, '=') === false) continue;
        list($k, $v) = explode('=', $line, 2);
        $k = trim($k);
        $v = trim($v);
        if (($v[0] === '"' && substr($v, -1) === '"') || ($v[0] === "'" && substr($v, -1) === "'")) {
            $v = substr($v, 1, -1);
        }
        $vars[$k] = $v;
    }
    return $vars;
}

$dotenv = [];
$candidates = [__DIR__ . '/.env.local', __DIR__ . '/.env', __DIR__ . '/../.env'];
foreach ($candidates as $p) {
    $loaded = load_env_file($p);
    if (!empty($loaded)) {
        $dotenv = array_merge($dotenv, $loaded);
    }
}

// Allow environment variables to override file values
foreach (array_keys($dotenv) as $k) {
    $envVal = getenv($k);
    if ($envVal !== false) $dotenv[$k] = $envVal;
}

// Fallback to getenv if not present in files
if (!isset($dotenv['VITE_LEAD_EMAIL'])) {
    $dotenv['VITE_LEAD_EMAIL'] = getenv('VITE_LEAD_EMAIL') ?: null;
}

$to = $dotenv['VITE_LEAD_EMAIL'] ?? null;

if (!$to) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'A variável de ambiente VITE_LEAD_EMAIL não está configurada em api/.env.local ou nas variáveis de ambiente do sistema.']);
    exit;
}

$subject = "Novo Lead do Chatbot Eloi: " . $name;
$body = "
<html>
<head>
  <title>Novo Lead Recebido</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
    h2 { color: #0056b3; }
    .field { margin-bottom: 10px; }
    .field strong { display: inline-block; width: 100px; }
  </style>
</head>
<body>
  <div class='container'>
    <h2>🚀 Novo Lead Qualificado!</h2>
    <p>Um novo contato foi feito através do chatbot Eloi em seu site.</p>
    <hr>
    <div class='field'><strong>Nome:</strong> {$name}</div>
    <div class='field'><strong>Email:</strong> {$email}</div>
    <div class='field'><strong>Telefone:</strong> {$phone}</div>
    <div class='field'><strong>Interesse:</strong> {$interest}</div>
    <div class='field'><strong>Mensagem Inicial:</strong></div>
    <p>{$message}</p>
    <hr>
    <p><em>Email enviado automaticamente pelo sistema Eloi.</em></p>
  </div>
</body>
</html>
";

// Headers do E-mail (essencial para formato HTML e codificação correta)
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
// Use host configurado em api/.env para evitar confiar em HTTP_HOST
$host = isset($dotenv['VITE_SITE_HOST']) ? preg_replace("/[\r\n]+/", '', $dotenv['VITE_SITE_HOST']) : preg_replace("/[\r\n]+/", '', $_SERVER['HTTP_HOST']);
$headers .= "From: Eloi Chatbot <noreply@" . $host . ">" . "\r\n";
// Protege contra header injection no nome
$safe_name_header = preg_replace('/[\r\n<>]/', ' ', $name);
$headers .= "Reply-to: " . $safe_name_header . " <" . $email . ">" . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Envio do e-mail
if (mail($to, $subject, $body, $headers)) {
    http_response_code(200);
    echo json_encode(['status' => 'success', 'message' => 'Email enviado com sucesso.']);
} else {
    http_response_code(500); // Internal Server Error
    // Loga o erro do PHP mail() para o arquivo de log
    $last_error = error_get_last();
    $last_message = isset($last_error['message']) ? $last_error['message'] : 'Nenhuma informação de erro disponível. Verifique a configuração do servidor de e-mail (sendmail/SMTP).';
    error_log("Erro ao enviar e-mail: " . $last_message);
    echo json_encode(['status' => 'error', 'message' => 'Ocorreu um erro no servidor ao tentar enviar o e-mail.']);
}
?>
