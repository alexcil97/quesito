"use client"
import { useChat } from "ai/react"

// Define la interfaz para los mensajes
interface Message {
    id: string; // O el tipo correcto que estás utilizando
    content: string;
}

export function Chat() {
    const { messages, input, handleInputChange, handleSubmit } = useChat()

    return (
        <div className="flex flex-col max-w-xl px-8 mx-auto space-y-4">
            {messages.map((message: Message) => ( // Especifica el tipo aquí
                <div key={message.id} className="bg-indigo-500 p-3 rounded-lg shadow-md">
                    <p>{message.content}</p>
                </div>
            ))}

            <form onSubmit={handleSubmit} className="mt-4">
                <label htmlFor="content" className="block mb-2 text-sm font-medium text-indigo-500">
                    Escribe aquí...
                </label>
                <input
                    id="content"
                    type="text"
                    name="content"
                    value={input}
                    onChange={handleInputChange}
                    className="text-black w-full p-2 border border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Escribe tu mensaje"
                />
            </form>
        </div>
    )
}
