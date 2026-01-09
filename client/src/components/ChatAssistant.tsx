import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, X, Bot, User } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: number;
  sender: 'user' | 'bot';
  text: string;
}

const API_ENDPOINT = "https://one-backend-6.onrender.com/api/assistant/chat";

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        setTimeout(() => {
          scrollElement.scrollTop = scrollElement.scrollHeight;
        }, 0);
      }
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: 1,
        sender: 'bot',
        text: "Bonjour ! Je suis OneHealth Assistant, votre expert en épidémiologie. Posez-moi une question sur les cas FVR, les prédictions, les risques environnementaux ou toute autre donnée du dashboard."
      }]);
    }
  }, [isOpen, messages.length]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage: Message = { id: Date.now(), sender: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.text })
      });
      if (!response.ok) throw new Error("Erreur HTTP");
      const data = await response.json();
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: data.response || "Désolé." }]);
    } catch (error) {
      toast.error("Erreur assistant.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <Button onClick={() => setIsOpen(true)} className="h-14 w-14 rounded-full shadow-2xl bg-primary">
          <MessageSquare className="h-6 w-6 text-white" />
        </Button>
      )}
      {isOpen && (
        <Card className="w-[380px] h-[500px] flex flex-col shadow-2xl border-primary/20">
          <CardHeader className="bg-primary p-4 flex flex-row items-center justify-between rounded-t-lg">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-white" />
              <CardTitle className="text-white text-lg font-semibold">OneHealth Assistant</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white h-8 w-8">
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 p-0 flex flex-col overflow-hidden bg-slate-50/50">
            <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-white border border-primary/20 text-primary'}`}>
                        {msg.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </div>
                      <div className={`p-3 rounded-2xl text-sm shadow-sm ${msg.sender === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none'}`}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 bg-white border-t border-slate-100">
              <div className="flex gap-2 items-end bg-slate-50 p-2 rounded-xl border border-slate-200">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  placeholder="Posez votre question..."
                  className="min-h-[40px] max-h-[120px] border-0 bg-transparent focus-visible:ring-0 p-1 resize-none text-sm"
                />
                <Button size="icon" onClick={sendMessage} disabled={!input.trim() || isLoading} className="h-8 w-8 shrink-0 rounded-lg">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
