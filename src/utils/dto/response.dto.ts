type Icon = 'success' | 'error';

export class ResponseDto {
    message: string;
    icon: Icon;
    data: [] | Object;
    ok: boolean
    token?: string;
    status?: number;
}