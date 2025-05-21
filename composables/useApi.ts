export function useApi() {
    const config = useRuntimeConfig()
    const token = useCookie('access_token').value

    async function request<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...options.headers
        }

        if (token) {
            headers['Authorization'] = `Bearer ${token}`
        }
        
        if (!token && config.public.ACCESS_TOKEN) {
            headers['Authorization'] = `Bearer ${config.public.ACCESS_TOKEN}`
        }

        const baseUrl = config.public.BASE_API_URL
        const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`

        const res = await fetch(url, {
            ...options,
            headers
        })

        if (!res.ok) {
            throw new Error(`Erro ao acessar ${url}: ${res.status}`)
        }

        return res.json()
    }

    // Estas funções precisam estar dentro do escopo de `useApi`
    function get<T = any>(url: string) {
        return request<T>(url, { method: 'GET' })
    }

    function post<T = any>(url: string, body: any) {
        return request<T>(url, {
            method: 'POST',
            body: JSON.stringify(body)
        })
    }

    function put<T = any>(url: string, body: any) {
        return request<T>(url, {
            method: 'PUT',
            body: JSON.stringify(body)
        })
    }

    function del<T = any>(url: string) {
        return request<T>(url, { method: 'DELETE' })
    }

    return { request, get, post, put, del }
}