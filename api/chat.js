// Serverless function for secure OpenAI integration
// This keeps the API key safe on the server side

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check if API key is configured
  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ 
      error: 'OpenAI API key not configured on server' 
    });
  }

  try {
    const { messages, type = 'chat' } = req.body;

    // Validate input
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ 
        error: 'Messages array is required' 
      });
    }

    // Import OpenAI only when needed (serverless optimization)
    const { default: OpenAI } = await import('openai');
    
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    let systemPrompt;
    let maxTokens;
    let temperature;

    if (type === 'proposal') {
      // Prompt for proposal generation
      systemPrompt = `Você é um especialista em criação de propostas técnicas para projetos digitais. 
Com base na conversa anterior, crie uma proposta detalhada e profissional que inclua:

1. Resumo executivo
2. Escopo detalhado do projeto  
3. Fases de desenvolvimento
4. Tecnologias recomendadas
5. Cronograma estimado
6. Diferenciais técnicos
7. Resultados esperados
8. Investimento sugerido (baseado no que foi discutido)

Use formatação markdown e seja específico e técnico. A proposta deve ser convincente e profissional.`;
      
      maxTokens = 2000;
      temperature = 0.3;
    } else {
      // Prompt for chat refinement
      systemPrompt = `Você é um especialista em refinamento de propostas de projetos digitais. Sua função é:

1. Analisar a ideia inicial do usuário
2. Fazer perguntas estratégicas para entender melhor o projeto
3. Identificar pontos que precisam ser aprofundados
4. Sugerir melhorias e oportunidades

Mantenha um tom profissional, mas amigável. Faça perguntas uma de cada vez e seja específico. 
Foque em entender: público-alvo, objetivos, diferencial competitivo, tecnologias preferidas, e resultados esperados.

Quando o usuário responder suas perguntas, faça follow-ups inteligentes para aprofundar o entendimento.
Limite suas respostas a 2-3 frases por vez para manter a conversa dinâmica.`;
      
      maxTokens = 150;
      temperature = 0.7;
    }

    // Prepare messages for OpenAI
    const messagesForAPI = [
      { role: 'system', content: systemPrompt },
      ...messages.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      }))
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messagesForAPI,
      max_tokens: maxTokens,
      temperature: temperature,
    });

    const response = completion.choices[0]?.message?.content || 
                    'Desculpe, não consegui processar sua mensagem.';

    // Return successful response
    res.status(200).json({ 
      response,
      usage: completion.usage 
    });

  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    // Handle different types of errors
    if (error.status === 401) {
      return res.status(401).json({ 
        error: 'Invalid OpenAI API key' 
      });
    }
    
    if (error.status === 429) {
      return res.status(429).json({ 
        error: 'Rate limit exceeded. Please try again later.' 
      });
    }
    
    if (error.status === 503) {
      return res.status(503).json({ 
        error: 'OpenAI service temporarily unavailable' 
      });
    }

    // Generic error
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
}
