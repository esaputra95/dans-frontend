export interface queryType {
    location?: string;
    description?: string;
}


export type UserDataType = {
    id: string;
    type?: string;
    url?: string;
    created_at?: string;
    company?: string;
    company_url?: string;
    location?: string;
    title?: string;
    description?: string;
    how_to_apply?: string;
    company_logo?: string;
}
  
export type ApiResponse = {
    code: number;
    message: string;
    data?: any;
}