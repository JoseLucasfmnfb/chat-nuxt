export function useFormatTime() {
    function formatTime(sendAt: string): string {
        const date = new Date(sendAt)
        return date.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        })
    }
  
    return { formatTime }
}