// proxy-response.dto.ts
import { JsonValue } from 'type-fest'; // or from Prisma, or use `any`

export class ProxyResponseDto {
  status: number;
  headers: JsonValue; // <- allow any structured object
  body: JsonValue;
}
