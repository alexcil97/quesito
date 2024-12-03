declare module "ai/react" {
    // Define aquí las interfaces y tipos que necesitas
    export function useChat(): {
        messages: Array<{ id: string; content: string }>;
        input: string;
        handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    };
}
