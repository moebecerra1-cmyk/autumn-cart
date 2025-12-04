import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const botResponses: Record<string, string> = {
  envio: "📦 Realizamos envíos a toda España. El envío estándar tarda 3-5 días laborables (€4.99) y el express 24-48h (€9.99). ¡Envío gratis en pedidos superiores a €50!",
  devolucion: "🔄 Tienes 30 días para realizar devoluciones gratuitas. El producto debe estar sin usar y con etiquetas originales. Puedes iniciar tu devolución desde tu cuenta o contactándonos.",
  horario: "🕐 Nuestro horario de atención es de Lunes a Viernes de 9:00 a 20:00 y Sábados de 10:00 a 14:00. Domingos cerrado.",
  pago: "💳 Aceptamos tarjetas de crédito/débito (Visa, Mastercard), PayPal, y pago contra reembolso. Todas las transacciones son 100% seguras.",
  talla: "📏 En cada producto encontrarás una guía de tallas detallada. Si tienes dudas entre dos tallas, te recomendamos elegir la mayor. También puedes consultarnos tu caso específico.",
  descuento: "🎁 ¡Suscríbete a nuestra newsletter y obtén un 10% de descuento en tu primera compra! También tenemos ofertas especiales de temporada.",
  producto: "👗 Contamos con más de 30 productos en categorías de Moda Hombre, Moda Mujeres y Hogar. Todos nuestros productos son de alta calidad y diseño exclusivo.",
  contacto: "📞 Puedes contactarnos por email: hola@otonostore.com, teléfono: +34 900 123 456, o a través de este chat. ¡Estamos encantados de ayudarte!",
  default: "Gracias por tu mensaje. ¿En qué puedo ayudarte? Pregúntame sobre:\n\n• Envíos y entregas\n• Devoluciones\n• Métodos de pago\n• Guía de tallas\n• Descuentos\n• Nuestros productos\n• Horario de atención"
};

const quickButtons = [
  { label: "Envíos", key: "envio" },
  { label: "Devoluciones", key: "devolucion" },
  { label: "Métodos de pago", key: "pago" },
  { label: "Tallas", key: "talla" },
];

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "¡Hola! 👋 Soy el asistente virtual de OtoñoStore. ¿En qué puedo ayudarte hoy?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('envio') || lowerMessage.includes('envío') || lowerMessage.includes('entrega')) {
      return botResponses.envio;
    }
    if (lowerMessage.includes('devol') || lowerMessage.includes('cambio') || lowerMessage.includes('reembolso')) {
      return botResponses.devolucion;
    }
    if (lowerMessage.includes('horario') || lowerMessage.includes('atencion') || lowerMessage.includes('atención')) {
      return botResponses.horario;
    }
    if (lowerMessage.includes('pago') || lowerMessage.includes('tarjeta') || lowerMessage.includes('paypal')) {
      return botResponses.pago;
    }
    if (lowerMessage.includes('talla') || lowerMessage.includes('medida') || lowerMessage.includes('tamaño')) {
      return botResponses.talla;
    }
    if (lowerMessage.includes('descuento') || lowerMessage.includes('oferta') || lowerMessage.includes('promocion')) {
      return botResponses.descuento;
    }
    if (lowerMessage.includes('producto') || lowerMessage.includes('catalogo') || lowerMessage.includes('catálogo')) {
      return botResponses.producto;
    }
    if (lowerMessage.includes('contacto') || lowerMessage.includes('email') || lowerMessage.includes('telefono')) {
      return botResponses.contacto;
    }
    if (lowerMessage.includes('hola') || lowerMessage.includes('buenos')) {
      return "¡Hola! 😊 ¿En qué puedo ayudarte hoy?";
    }
    if (lowerMessage.includes('gracias') || lowerMessage.includes('adios') || lowerMessage.includes('adiós')) {
      return "¡Gracias a ti! 🧡 Ha sido un placer ayudarte. ¡Que tengas un excelente día!";
    }
    
    return botResponses.default;
  };

  const handleSend = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate bot typing delay
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: getBotResponse(messageText),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 800);
  };

  const handleQuickButton = (key: string) => {
    handleSend(key);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-40 p-4 rounded-full bg-primary text-primary-foreground shadow-elevated transition-all duration-300 hover:scale-110",
          isOpen && "hidden"
        )}
        aria-label="Abrir chat de ayuda"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 h-4 w-4 bg-autumn-burgundy rounded-full animate-pulse-warm" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] bg-background rounded-2xl shadow-elevated border border-border flex flex-col animate-scale-in overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-autumn p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-primary-foreground">Asistente Virtual</h3>
                <p className="text-xs text-primary-foreground/80">Online • Responde al instante</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-2",
                  message.isBot ? "justify-start" : "justify-end"
                )}
              >
                {message.isBot && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-line",
                    message.isBot
                      ? "bg-secondary text-secondary-foreground rounded-tl-sm"
                      : "bg-primary text-primary-foreground rounded-tr-sm"
                  )}
                >
                  {message.text}
                </div>
                {!message.isBot && (
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Buttons */}
          <div className="px-4 pb-2 flex gap-2 flex-wrap shrink-0">
            {quickButtons.map((btn) => (
              <button
                key={btn.key}
                onClick={() => handleQuickButton(btn.key)}
                className="px-3 py-1.5 text-xs bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors"
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border shrink-0">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-4 py-2 bg-secondary rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button
                type="submit"
                variant="autumn"
                size="icon"
                className="rounded-full"
                disabled={!input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
