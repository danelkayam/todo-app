import { Get, Hidden, Route, SuccessResponse } from 'tsoa';
import { Controller } from '@tsoa/runtime';

@Hidden()
@Route('health')
export class HealthRouter extends Controller {
    @Get()
    @SuccessResponse(204, 'Checked')
    public check(): Promise<any> {
        return;
    }
}
