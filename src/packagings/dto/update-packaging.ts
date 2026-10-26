import { PartialType } from "@nestjs/swagger"
import { CreatePackagingDto } from "./create-packaging"

export class UpdatePackagingDto extends PartialType(CreatePackagingDto) {}