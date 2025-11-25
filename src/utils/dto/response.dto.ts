type Icon = 'success' | 'error';

export class ResponseDto {
    message: string;
    icon: Icon;
    data: [] | Object;
    erors?: [] | Object;
    ok: boolean
    token?: string;
    status?: number;
}